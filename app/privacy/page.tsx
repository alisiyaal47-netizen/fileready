import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PrivacySection } from "@/components/PrivacySection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy: Your File Stays on Your Device",
  description: "Learn how FileReady checks file signatures and media details in your browser without uploading or storing your selected file on a server.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <main><div className="container content-hero"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy", href: "/privacy" }]} /><span className="overline">LOCAL BY DESIGN</span><h1>What happens to your file?</h1><p>Your selected file is read by your browser for this check. FileReady V1 does not send the file to our server, require an account, or store the file server-side.</p><Link className="button button-primary" href="/#checker">Check a file privately</Link></div>
    <PrivacySection />
    <section className="content-section container" aria-labelledby="privacy-details"><div className="content-narrow"><h2 id="privacy-details">How local inspection works</h2><div className="content-cards"><article><h3>Small reads for detection</h3><p>FileReady reads a small part of the file to identify JPG, PNG, WebP, MP4, or PDF. A PDF also receives a basic end-marker check.</p></article><article><h3>Media details in your browser</h3><p>For images and videos, the browser reads dimensions through a temporary local blob URL. The URL is revoked after inspection.</p></article><article><h3>Results stay in the page</h3><p>The measured details and comparison result live in browser memory for the current session. There is no FileReady account or server-side file storage in V1.</p></article></div><p>The site still loads its normal application code and assets over the network. The privacy promise above applies to the file you select for checking.</p></div></section>
    <section className="content-section content-tint" aria-labelledby="privacy-next"><div className="container content-narrow"><h2 id="privacy-next">Learn more</h2><ul className="related-links"><li><Link href="/how-it-works">See the three checking steps <span aria-hidden="true">→</span></Link></li><li><Link href="/supported-files">See what FileReady can inspect <span aria-hidden="true">→</span></Link></li></ul></div></section>
  </main>;
}
