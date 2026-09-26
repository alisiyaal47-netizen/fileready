import type { PlatformRule } from "@/data/platformRules";
import type { FileInspection } from "@/lib/inspectFile";
import { formatBytes } from "./format";

export type CheckStatus = "passed" | "failed" | "not-checked";
export interface ValidationCheck {
  label: "Format" | "File size" | "Resolution" | "Aspect ratio";
  status: CheckStatus;
  detail: string;
  recommendation?: string;
}

export interface ValidationResult {
  ready: boolean;
  checks: ValidationCheck[];
  firstFailure?: ValidationCheck;
}

export function validateFile(file: FileInspection, platform: PlatformRule): ValidationResult {
  const rule = platform.formats[file.format];
  const allowed = Object.keys(platform.formats).join(", ");
  const checks: ValidationCheck[] = [
    rule
      ? { label: "Format", status: "passed", detail: `${file.format} is in this reference profile.` }
      : { label: "Format", status: "failed", detail: `${file.format} is outside this reference profile.`, recommendation: `Use one of: ${allowed}.` },
  ];

  if (!rule) {
    checks.push(
      { label: "File size", status: "not-checked", detail: "Format is outside this profile." },
      { label: "Resolution", status: "not-checked", detail: "Format is outside this profile." },
      { label: "Aspect ratio", status: "not-checked", detail: "Format is outside this profile." },
    );
  } else {
    checks.push(rule.maxBytes === undefined
      ? { label: "File size", status: "not-checked", detail: "No size limit in this reference profile." }
      : file.size <= rule.maxBytes
        ? { label: "File size", status: "passed", detail: `${formatBytes(file.size)} is within ${formatBytes(rule.maxBytes)}.` }
        : { label: "File size", status: "failed", detail: `${formatBytes(file.size)} exceeds ${formatBytes(rule.maxBytes)}.`, recommendation: `Export a smaller file below ${formatBytes(rule.maxBytes)} and check again.` });

    const hasDimensionRule = [rule.minWidth, rule.minHeight, rule.maxWidth, rule.maxHeight].some((value) => value !== undefined);
    const width = file.width;
    const height = file.height;
    const dimensionFails = width !== undefined && height !== undefined && (
      (rule.minWidth !== undefined && width < rule.minWidth) ||
      (rule.minHeight !== undefined && height < rule.minHeight) ||
      (rule.maxWidth !== undefined && width > rule.maxWidth) ||
      (rule.maxHeight !== undefined && height > rule.maxHeight)
    );
    checks.push(!hasDimensionRule
      ? { label: "Resolution", status: "not-checked", detail: "No resolution rule in this profile." }
      : width === undefined || height === undefined
        ? { label: "Resolution", status: "not-checked", detail: "Dimensions are unavailable." }
        : dimensionFails
          ? { label: "Resolution", status: "failed", detail: `${width} × ${height} px is outside this profile.`, recommendation: `Export within ${rule.minWidth ?? 1}–${rule.maxWidth ?? "any"} px wide and ${rule.minHeight ?? 1}–${rule.maxHeight ?? "any"} px high.` }
          : { label: "Resolution", status: "passed", detail: `${width} × ${height} px meets this profile.` });

    const ratio = width && height ? width / height : undefined;
    const ratioRule = rule.aspectRatio;
    checks.push(!ratioRule
      ? { label: "Aspect ratio", status: "not-checked", detail: "No aspect ratio rule in this profile." }
      : ratio === undefined
        ? { label: "Aspect ratio", status: "not-checked", detail: "Aspect ratio is unavailable." }
        : ratio >= ratioRule.min - 0.005 && ratio <= ratioRule.max + 0.005
          ? { label: "Aspect ratio", status: "passed", detail: `Within ${ratioRule.description}.` }
          : { label: "Aspect ratio", status: "failed", detail: `Outside ${ratioRule.description}.`, recommendation: `Crop or export between ${ratioRule.description}.` });
  }

  const firstFailure = checks.find((check) => check.status === "failed");
  return { ready: !firstFailure, checks, firstFailure };
}
