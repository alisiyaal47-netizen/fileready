import assert from "node:assert/strict";
import { File as NodeFile } from "node:buffer";
import test from "node:test";
import { platformRules } from "../data/platformRules";
import type { FileFormat } from "../data/platformRules";
import { aspectRatioLabel } from "../lib/aspectRatio";
import { formatBytes } from "../lib/format";
import { inspectFile, InspectionError, type FileInspection } from "../lib/inspectFile";
import { validateFile } from "../lib/validateFile";

const jpg = [0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10];
const png = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0];
const webp = [...Buffer.from("RIFF"), 0, 0, 0, 0, ...Buffer.from("WEBP")];
const mp4 = [0, 0, 0, 24, ...Buffer.from("ftypisom"), 0, 0, 0, 0];
const pdf = Buffer.from("%PDF-1.7\n1 0 obj\nendobj\n%%EOF\n");

function file(bytes: number[] | Uint8Array, name: string, type = ""): File {
  return new NodeFile([Uint8Array.from(bytes)], name, { type }) as unknown as File;
}

async function withImage(width: number, height: number, fails: boolean, run: () => Promise<void>) {
  const previous = globalThis.Image;
  globalThis.Image = class {
    naturalWidth = width;
    naturalHeight = height;
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    set src(_value: string) { queueMicrotask(() => fails ? this.onerror?.() : this.onload?.()); }
  } as unknown as typeof Image;
  try { await run(); }
  finally { globalThis.Image = previous; }
}

async function withVideo(width: number, height: number, fails: boolean, run: () => Promise<void>) {
  const previous = globalThis.document;
  const video = {
    videoWidth: width,
    videoHeight: height,
    duration: 12.5,
    preload: "",
    muted: false,
    onloadedmetadata: null as (() => void) | null,
    onerror: null as (() => void) | null,
    set src(_value: string) { queueMicrotask(() => fails ? this.onerror?.() : this.onloadedmetadata?.()); },
    removeAttribute() {},
    load() {},
  };
  globalThis.document = { createElement: () => video } as unknown as Document;
  try { await run(); }
  finally { globalThis.document = previous; }
}

function inspected(format: FileFormat, size: number, width?: number, height?: number): FileInspection {
  return { name: `sample.${format.toLowerCase()}`, size, format, mime: "", browserMime: "", kind: format === "MP4" ? "video" : format === "PDF" ? "document" : "image", width, height };
}

function profile(id: string) {
  const result = platformRules.find((rule) => rule.id === id);
  assert.ok(result);
  return result;
}

test("detects JPG, PNG, WebP, MP4, and PDF from signatures", async () => {
  await withImage(1200, 800, false, async () => {
    assert.equal((await inspectFile(file(jpg, "photo.jpg"))).format, "JPG");
    assert.equal((await inspectFile(file(png, "photo.png"))).format, "PNG");
    assert.equal((await inspectFile(file(webp, "photo.webp"))).format, "WebP");
  });
  await withVideo(1920, 1080, false, async () => {
    const result = await inspectFile(file(mp4, "video.mp4"));
    assert.equal(result.format, "MP4");
    assert.deepEqual([result.width, result.height, result.duration], [1920, 1080, 12.5]);
  });
  assert.equal((await inspectFile(file(pdf, "report.pdf"))).format, "PDF");
});

test("ignores misleading extensions and browser MIME types", async () => {
  await withImage(640, 480, false, async () => {
    const result = await inspectFile(file(jpg, "photo.pdf", "application/pdf"));
    assert.equal(result.format, "JPG");
    assert.equal(result.mime, "image/jpeg");
    assert.equal(result.browserMime, "application/pdf");
  });
  assert.equal((await inspectFile(file(pdf, "report.jpg", "image/jpeg"))).format, "PDF");
});

test("rejects unsupported, unknown, and zero-byte files", async () => {
  for (const [bytes, name] of [
    [Buffer.from("PK\x03\x04"), "archive.zip"],
    [Buffer.from("hello world"), "notes.txt"],
    [Uint8Array.from([3, 17, 44, 90]), "unknown.bin"],
  ] as const) {
    await assert.rejects(inspectFile(file(bytes, name)), (error: unknown) => error instanceof InspectionError && /not a supported/.test(error.message));
  }
  await assert.rejects(inspectFile(file([], "empty.pdf")), (error: unknown) => error instanceof InspectionError && /empty/.test(error.message));
});

test("rejects unreadable, malformed, and incomplete files with safe messages", async () => {
  const unreadable = { name: "bad.pdf", type: "application/pdf", size: 12, slice: () => ({ arrayBuffer: async () => { throw new Error("private raw exception"); } }) } as unknown as File;
  await assert.rejects(inspectFile(unreadable), (error: unknown) => error instanceof InspectionError && !error.message.includes("private raw exception"));
  await withImage(0, 0, false, async () => { await assert.rejects(inspectFile(file(jpg, "broken.jpg")), /image could not be read/); });
  await withImage(100, 100, true, async () => { await assert.rejects(inspectFile(file(png, "broken.png")), /image could not be read/); });
  await withVideo(0, 0, false, async () => { await assert.rejects(inspectFile(file(mp4, "broken.mp4")), /video could not be inspected/); });
  await withVideo(100, 100, true, async () => { await assert.rejects(inspectFile(file(mp4, "broken.mp4")), /video could not be inspected/); });
  await assert.rejects(inspectFile(file(Buffer.from("%PDF-1.7\nmissing end marker"), "broken.pdf")), /PDF appears incomplete/);
});

test("repeated media inspection revokes every temporary object URL", async () => {
  const revoke = URL.revokeObjectURL;
  let revoked = 0;
  URL.revokeObjectURL = (url) => { revoked += 1; revoke(url); };
  try {
    await withImage(300, 200, false, async () => {
      await inspectFile(file(jpg, "same.jpg"));
      await inspectFile(file(jpg, "same.jpg"));
    });
    await withVideo(1280, 720, true, async () => {
      await assert.rejects(inspectFile(file(mp4, "bad.mp4")), InspectionError);
    });
    assert.equal(revoked, 3);
  } finally { URL.revokeObjectURL = revoke; }
});

test("reads only small slices even for a large file", async () => {
  const slices: Array<[number, number | undefined]> = [];
  const size = 5_000_000_000;
  const large = {
    name: "large.pdf", type: "application/pdf", size,
    slice(start: number, end?: number) {
      slices.push([start, end]);
      return new Blob([start === 0 ? pdf.subarray(0, 32) : Buffer.from("%%EOF")]);
    },
  } as unknown as File;
  assert.equal((await inspectFile(large)).size, size);
  assert.deepEqual(slices, [[0, 32], [size - 4096, undefined]]);
});

test("formats decimal sizes and exact or simplified aspect ratios consistently", () => {
  assert.equal(formatBytes(1_000), "1.00 KB");
  assert.equal(formatBytes(25_000_000), "25.0 MB");
  assert.equal(aspectRatioLabel(1920, 1080), "16:9");
  assert.equal(aspectRatioLabel(0, 1080), "Unavailable");
});

test("Gmail passes a small PDF and leaves unavailable rules not checked", () => {
  const result = validateFile(inspected("PDF", 1_000_000), profile("gmail"));
  assert.equal(result.ready, true);
  assert.deepEqual(result.checks.map((check) => check.status), ["passed", "passed", "not-checked", "not-checked"]);
});

test("size boundaries pass exactly and fail above the limit", () => {
  const gmail = profile("gmail");
  assert.equal(validateFile(inspected("PDF", 25_000_000), gmail).checks[1].status, "passed");
  const result = validateFile(inspected("PDF", 25_000_001), gmail);
  assert.equal(result.ready, false);
  assert.equal(result.checks[1].status, "failed");
  assert.match(result.checks[1].recommendation ?? "", /smaller file/);
});

test("Instagram rejects an excluded format without pretending to check other properties", () => {
  const result = validateFile(inspected("PNG", 2_000_000, 1080, 1080), profile("instagram"));
  assert.equal(result.ready, false);
  assert.deepEqual(result.checks.map((check) => check.status), ["failed", "not-checked", "not-checked", "not-checked"]);
  assert.match(result.firstFailure?.recommendation ?? "", /JPG/);
});

test("Instagram checks image width and ratio boundaries", () => {
  const instagram = profile("instagram");
  assert.equal(validateFile(inspected("JPG", 7_000_000, 320, 400), instagram).ready, true);
  const result = validateFile(inspected("JPG", 9_000_000, 300, 1000), instagram);
  assert.equal(result.ready, false);
  assert.deepEqual(result.checks.map((check) => check.status), ["passed", "failed", "failed", "failed"]);
  assert.equal(result.checks.filter((check) => check.status === "failed" && !!check.recommendation).length, 3);
});

test("TikTok checks MP4 dimensions and reports missing dimensions as not checked", () => {
  const tiktok = profile("tiktok");
  assert.equal(validateFile(inspected("MP4", 10_000_000, 360, 4096), tiktok).checks[2].status, "passed");
  assert.equal(validateFile(inspected("MP4", 10_000_000, 359, 1080), tiktok).checks[2].status, "failed");
  assert.equal(validateFile(inspected("MP4", 10_000_000), tiktok).checks[2].status, "not-checked");
});

test("Instagram MP4 checks only the available format rule", () => {
  const result = validateFile(inspected("MP4", 4_000_000, 1920, 1080), profile("instagram"));
  assert.deepEqual(result.checks.map((check) => check.status), ["passed", "not-checked", "not-checked", "not-checked"]);
});

test("WhatsApp applies its document-size profile to a supported format", () => {
  const whatsapp = profile("whatsapp");
  assert.equal(validateFile(inspected("WebP", 2_000_000_000), whatsapp).checks[1].status, "passed");
  assert.equal(validateFile(inspected("WebP", 2_000_000_001), whatsapp).checks[1].status, "failed");
});
