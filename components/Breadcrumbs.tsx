import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/siteUrl";
import Link from "next/link";

export interface Crumb { label: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return <>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><ol>{items.map((item, index) => <li key={item.href}>{index > 0 && <span aria-hidden="true">/</span>}{index === items.length - 1 ? <span aria-current="page">{item.label}</span> : <Link href={item.href}>{item.label}</Link>}</li>)}</ol></nav>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, item: absoluteUrl(item.href) })) }} />
  </>;
}
