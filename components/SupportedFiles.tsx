const formats = [
  { name: "JPG", type: "Image" },
  { name: "PNG", type: "Image" },
  { name: "WebP", type: "Image" },
  { name: "MP4", type: "Video" },
  { name: "PDF", type: "Document" },
];

export function SupportedFiles() {
  return <section id="supported-files" className="section supported-section" aria-labelledby="supported-heading"><div className="container"><div className="section-heading center"><span className="overline">WORKS WITH YOUR FILES</span><h2 id="supported-heading">The formats you use most.</h2><p>Start with the essentials. More format support is on the way.</p></div><div className="format-grid">{formats.map((format) => <div className="format-tile" key={format.name}><span className="format-file"><span className="format-fold"/><strong>{format.name}</strong></span><span><strong>{format.name}</strong><small>{format.type}</small></span></div>)}</div></div></section>;
}
