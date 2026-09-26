import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getGuide, guides } from "@/data/guides";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/siteUrl";

export const dynamicParams = false;
export function generateStaticParams() { return guides.map((guide) => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { robots: { index: false, follow: false } };
  return pageMetadata({ title: guide.title, description: guide.description, path: `/guides/${guide.slug}` });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const path = `/guides/${guide.slug}`;

  return <main><article className="container article-page"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.heading, href: path }]} /><header className="article-header"><span className="overline">FILEREADY GUIDE</span><h1>{guide.heading}</h1><p>{guide.lead}</p><Link className="button button-primary" href={guide.checkerHref}>{guide.checkerLabel}</Link></header><div className="article-body">{guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}</section>)}</div><aside className="article-related" aria-labelledby="related-guides"><h2 id="related-guides">Keep checking</h2><ul className="related-links"><li><Link href={guide.checkerHref}>{guide.checkerLabel} <span aria-hidden="true">→</span></Link></li>{guide.related.map((link) => <li key={link.href}><Link href={link.href}>{link.label} <span aria-hidden="true">→</span></Link></li>)}</ul></aside></article><JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: guide.heading, description: guide.description, url: absoluteUrl(path), mainEntityOfPage: absoluteUrl(path), author: { "@type": "Organization", name: "FileReady" }, publisher: { "@type": "Organization", name: "FileReady" } }} /></main>;
}
