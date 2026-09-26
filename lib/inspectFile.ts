import type { FileFormat } from "@/data/platformRules";

export interface FileInspection {
  name: string;
  size: number;
  format: FileFormat;
  mime: string;
  browserMime: string;
  kind: "image" | "video" | "document";
  width?: number;
  height?: number;
  duration?: number;
}

export class InspectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InspectionError";
  }
}

function detectFormat(bytes: Uint8Array): FileFormat | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "JPG";
  if (bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte)) return "PNG";
  if (bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP") return "WebP";
  if (bytes.length >= 12 && String.fromCharCode(...bytes.slice(4, 8)) === "ftyp" && ["isom", "iso2", "mp41", "mp42", "avc1", "M4V ", "dash"].includes(String.fromCharCode(...bytes.slice(8, 12)))) return "MP4";
  if (bytes.length >= 5 && String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-") return "PDF";
  return null;
}

const mimeByFormat: Record<FileFormat, string> = {
  JPG: "image/jpeg",
  PNG: "image/png",
  WebP: "image/webp",
  MP4: "video/mp4",
  PDF: "application/pdf",
};

async function readImageDimensions(file: File): Promise<{ width: number; height: number }> {
  const image = new Image();
  const url = URL.createObjectURL(file);
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await new Promise((resolve, reject) => {
      timer = setTimeout(() => reject(new InspectionError("This image could not be read. It may be damaged or encoded in an unsupported way.")), 15000);
      image.onload = () => {
        if (image.naturalWidth > 0 && image.naturalHeight > 0) resolve({ width: image.naturalWidth, height: image.naturalHeight });
        else reject(new InspectionError("This image could not be read. It may be damaged or encoded in an unsupported way."));
      };
      image.onerror = () => {
        reject(new InspectionError("This image could not be read. It may be damaged or encoded in an unsupported way."));
      };
      image.src = url;
    });
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    image.onload = null;
    image.onerror = null;
    URL.revokeObjectURL(url);
  }
}

async function readVideoMetadata(file: File): Promise<{ width: number; height: number; duration?: number }> {
  const video = document.createElement("video");
  const url = URL.createObjectURL(file);
  video.preload = "metadata";
  video.muted = true;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await new Promise((resolve, reject) => {
      timer = setTimeout(() => reject(new InspectionError("This video could not be inspected in your browser. It may be damaged or use an unsupported codec.")), 15000);
      video.onloadedmetadata = () => {
        if (video.videoWidth > 0 && video.videoHeight > 0) resolve({ width: video.videoWidth, height: video.videoHeight, duration: Number.isFinite(video.duration) ? video.duration : undefined });
        else reject(new InspectionError("This video could not be inspected in your browser. It may be damaged or use an unsupported codec."));
      };
      video.onerror = () => {
        reject(new InspectionError("This video could not be inspected in your browser. It may be damaged or use an unsupported codec."));
      };
      video.src = url;
    });
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    video.onloadedmetadata = null;
    video.onerror = null;
    try { video.removeAttribute("src"); video.load(); }
    finally { URL.revokeObjectURL(url); }
  }
}

export async function inspectFile(file: File): Promise<FileInspection> {
  if (file.size === 0) throw new InspectionError("This file is empty. Choose a file with content and try again.");

  let header: Uint8Array;
  try {
    header = new Uint8Array(await file.slice(0, 32).arrayBuffer());
  } catch {
    throw new InspectionError("This file could not be read. Try choosing it again.");
  }

  const format = detectFormat(header);
  if (!format) throw new InspectionError("This file is not a supported JPG, PNG, WebP, MP4, or PDF, or its header is damaged.");

  const base: FileInspection = {
    name: file.name,
    size: file.size,
    format,
    mime: mimeByFormat[format],
    browserMime: file.type || "Not provided",
    kind: format === "MP4" ? "video" : format === "PDF" ? "document" : "image",
  };

  if (base.kind === "image") {
    try { return { ...base, ...await readImageDimensions(file) }; }
    catch { throw new InspectionError("This image could not be read. It may be damaged or encoded in an unsupported way."); }
  }
  if (base.kind === "video") {
    try { return { ...base, ...await readVideoMetadata(file) }; }
    catch { throw new InspectionError("This video could not be inspected in your browser. It may be damaged or use an unsupported codec."); }
  }
  try {
    const ending = await file.slice(Math.max(0, file.size - 4096)).text();
    if (!ending.includes("%%EOF")) throw new InspectionError("This PDF appears incomplete or damaged. Try exporting it again.");
  } catch (cause) {
    if (cause instanceof InspectionError) throw cause;
    throw new InspectionError("This PDF could not be read. Try choosing it again.");
  }
  return base;
}
