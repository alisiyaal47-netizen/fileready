type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>;

export function JsonLd({ data }: { data: StructuredData }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
