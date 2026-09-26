import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Checker } from "@/components/Checker";
import { JsonLd } from "@/components/JsonLd";
import { platformPages } from "@/data/platformPages";
import { getPlatformRule, type FileFormat, type FormatRule, type PlatformId } from "@/data/platformRules";
import { formatBytes } from "@/lib/format";
import { absoluteUrl } from "@/lib/siteUrl";
import Link from "next/link";

function describeRule(format: FileFormat, rule: FormatRule): string {
  const parts = [`${format} format`];
  if (rule.maxBytes !== undefined) parts.push(`up to ${formatBytes(rule.maxBytes)}`);
  if (rule.minWidth !== undefined || rule.maxWidth !== undefined) parts.push(`width ${rule.minWidth ?? 1}–${rule.maxWidth ?? "any"} px`);
  if (rule.minHeight !== undefined || rule.maxHeight !== undefined) parts.push(`height ${rule.minHeight ?? 1}–${rule.maxHeight ?? "any"} px`);
  if (rule.aspectRatio) parts.push(`aspect ratio ${rule.aspectRatio.description}`);
  return parts.join(" · ");
}

export function PlatformLandingPage({ id }: { id: PlatformId }) {
  const content = platformPages[id];
  const rule = getPlatformRule(id);
  const formats = Object.entries(rule.formats) as Array<[FileFormat, FormatRule]>;

  return <main>
    <div className="container content-hero"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: content.heading, href: content.path }]} /><span className="overline">DESTINATION CHECKER / {rule.name.toUpperCase()}</span><h1>{content.heading}</h1><p>{content.introduction}</p><a className="button button-primary" href="#checker">Check your file</a></div>
    <Checker defaultPlatformId={id} heading={`Check for ${rule.name}`} intro={`Choose a file to check it against the ${rule.useCase.toLowerCase()} profile.`} />
    <section className="content-section container" aria-labelledby="checks-heading"><div className="content-narrow"><span className="overline">WHAT WE CHECK</span><h2 id="checks-heading">Checks in this {rule.name} profile</h2><p>{content.checksIntroduction}</p><ul className="rule-list">{formats.map(([format, formatRule]) => <li key={format}><strong>{format}</strong><span>{describeRule(format, formatRule)}</span></li>)}</ul><p className="content-note">{rule.note} <a href={rule.sourceUrl} target="_blank" rel="noopener noreferrer">Read the platform reference</a>.</p></div></section>
    <section className="content-section content-tint" aria-labelledby="problems-heading"><div className="container content-narrow"><span className="overline">PRACTICAL GUIDANCE</span><h2 id="problems-heading">{content.problemsHeading}</h2><div className="content-cards">{content.problems.map((problem) => <article key={problem.title}><h3>{problem.title}</h3><p>{problem.detail}</p></article>)}</div><p>{content.guidance}</p></div></section>
    <section className="content-section container" aria-labelledby="related-heading"><div className="content-narrow"><h2 id="related-heading">Continue checking</h2><ul className="related-links">{content.related.map((link) => <li key={link.href}><Link href={link.href}>{link.label} <span aria-hidden="true">→</span></Link></li>)}</ul></div></section>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: `FileReady ${rule.name} file checker`, description: content.description, url: absoluteUrl(content.path), applicationCategory: "UtilitiesApplication", operatingSystem: "Any modern browser", isAccessibleForFree: true }} />
  </main>;
}
