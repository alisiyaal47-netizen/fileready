import { FileIcon } from "@/components/Icons";
import type { FileInspection } from "@/lib/inspectFile";
import { aspectRatioLabel } from "@/lib/aspectRatio";
import { formatBytes } from "@/lib/format";

export function FileDetails({ file, onClear }: { file: FileInspection; onClear: () => void }) {
  const details = [
    ["Detected type", file.format],
    ["MIME type", file.mime],
    ["File size", formatBytes(file.size)],
    ...(file.width && file.height ? [["Dimensions", `${file.width} × ${file.height} px`], ["Aspect ratio", aspectRatioLabel(file.width, file.height)]] : []),
  ];
  return <section className="file-details" aria-label="Your file details">
    <div className="file-details-heading"><span className="file-details-icon"><FileIcon /></span><div><span className="overline">YOUR FILE</span><h3 title={file.name}>{file.name}</h3></div><button type="button" className="text-button" onClick={onClear}>Change file</button></div>
    <dl className="file-details-grid">{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    {file.browserMime !== file.mime && file.browserMime !== "Not provided" && <p className="file-note">Your browser labeled this {file.browserMime}; the detected type comes from the file signature.</p>}
  </section>;
}
