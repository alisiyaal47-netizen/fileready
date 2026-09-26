import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HowItWorks } from "@/components/HowItWorks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How the FileReady Upload Checker Works",
  description: "Drop a file, choose a destination, and see format, size, resolution and aspect ratio checks performed locally in your browser.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return <main><div className="container content-hero"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How it works", href: "/how-it-works" }]} /><span className="overline">THREE SIMPLE STEPS</span><h1>How FileReady checks an upload</h1><p>FileReady reads one selected file in your browser, compares its measured properties with the destination profile you choose, and explains the result in plain language.</p><Link className="button button-primary" href="/#checker">Try the file checker</Link></div>
    <HowItWorks />
    <section className="content-section container" aria-labelledby="result-meaning"><div className="content-narrow"><h2 id="result-meaning">Understand your result</h2><div className="content-cards"><article><h3>Passed</h3><p>Your file meets that specific checked rule in the selected reference profile.</p></article><article><h3>Needs attention</h3><p>A measured property is outside the profile. FileReady shows the value and a practical change to make.</p></article><article><h3>Not checked</h3><p>That profile has no rule for the property, or the property could not be measured. A ready result never means every possible platform rule was checked.</p></article></div><p>Switch destinations without choosing the file again. FileReady keeps the selected file in this page&apos;s memory until you change it or leave the page.</p></div></section>
    <section className="content-section content-tint" aria-labelledby="how-next"><div className="container content-narrow"><h2 id="how-next">Start with a useful check</h2><ul className="related-links"><li><Link href="/gmail-attachment-checker">Check a Gmail attachment <span aria-hidden="true">→</span></Link></li><li><Link href="/whatsapp-file-checker">Check WhatsApp document sharing <span aria-hidden="true">→</span></Link></li><li><Link href="/privacy">See how your file stays private <span aria-hidden="true">→</span></Link></li></ul></div></section>
  </main>;
}
