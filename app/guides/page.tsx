import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { guides } from "@/data/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "File Upload Help and Troubleshooting Guides",
  description: "Short guides to video upload problems, unsupported formats, file size and image dimensions, with links to the relevant FileReady checker.",
  path: "/guides",
});

export default function GuidesPage() {
  return <main><div className="container content-hero"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }]} /><span className="overline">FILE UPLOAD GUIDES</span><h1>Fix the file before you retry</h1><p>Use these short guides to understand a failed upload, inspect the right file property, and choose a practical next step.</p><Link className="button button-primary" href="/#checker">Open the file checker</Link></div><section className="content-section content-tint" aria-labelledby="guide-list-heading"><div className="container"><h2 id="guide-list-heading">Browse the guides</h2><div className="guide-grid">{guides.map((guide) => <article className="guide-card" key={guide.slug}><span className="overline">GUIDE</span><h3><Link href={`/guides/${guide.slug}`}>{guide.heading}</Link></h3><p>{guide.description}</p><Link className="text-link" href={`/guides/${guide.slug}`}>Read the guide <span aria-hidden="true">→</span></Link></article>)}</div></div></section></main>;
}
