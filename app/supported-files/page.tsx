import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SupportedFiles } from "@/components/SupportedFiles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Supported File Types: JPG, PNG, WebP, MP4 and PDF",
  description: "See which file types FileReady can inspect, which details it reads in your browser, and what its first version cannot validate.",
  path: "/supported-files",
});

const formats = [
  { name: "JPG", detail: "FileReady identifies the JPEG signature and asks your browser to read image width and height. It then calculates aspect ratio and checks relevant destination rules." },
  { name: "PNG", detail: "PNG images receive the same local dimension and aspect ratio inspection. A destination may still have a profile that does not include PNG." },
  { name: "WebP", detail: "WebP images can be checked when your browser decodes them. FileReady reads dimensions locally and compares the format with the chosen destination." },
  { name: "MP4", detail: "FileReady detects a recognized MP4 header and uses browser metadata for dimensions and duration when available. It does not validate codec, audio, frame rate, or all duration rules." },
  { name: "PDF", detail: "FileReady checks the PDF header and end marker and reads file size. It does not parse pages or prove that every page can be opened." },
];

export default function SupportedFilesPage() {
  return <main><div className="container content-hero"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Supported files", href: "/supported-files" }]} /><span className="overline">FILE FORMATS</span><h1>Files FileReady can inspect</h1><p>Start with JPG, PNG, WebP, MP4, or PDF. Detection uses file signatures rather than trusting the extension alone. The checks you see depend on both the file and your destination.</p><Link className="button button-primary" href="/#checker">Check a file</Link></div>
    <SupportedFiles />
    <section className="content-section container" aria-labelledby="format-details"><div className="content-narrow"><h2 id="format-details">What each format check includes</h2><div className="content-cards">{formats.map((format) => <article key={format.name}><h3>{format.name}</h3><p>{format.detail}</p></article>)}</div><p className="content-note">An unsupported signature or damaged image, video, or PDF produces a clear error. FileReady never repairs or converts a file in V1.</p></div></section>
    <section className="content-section content-tint" aria-labelledby="format-next"><div className="container content-narrow"><h2 id="format-next">Choose a destination</h2><p>Each destination has different reference checks. For example, an image format may be recognized by FileReady but not included in a particular publishing profile.</p><ul className="related-links"><li><Link href="/instagram-file-checker">Check an Instagram upload <span aria-hidden="true">→</span></Link></li><li><Link href="/tiktok-file-checker">Check a TikTok upload <span aria-hidden="true">→</span></Link></li><li><Link href="/guides/unsupported-file-format">Understand unsupported formats <span aria-hidden="true">→</span></Link></li></ul></div></section>
  </main>;
}
