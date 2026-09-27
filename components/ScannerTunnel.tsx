"use client";

import { useEffect, useRef, useState } from "react";

const checkpoints = [
  { name: "FORMAT", number: "01", description: "Identify the real file type from its signature." },
  { name: "SIZE", number: "02", description: "Compare bytes against the selected destination profile." },
  { name: "DIMENSIONS", number: "03", description: "Read image width and height when available." },
  { name: "ASPECT RATIO", number: "04", description: "Compare image proportions where a rule exists." },
];

export function ScannerTunnel() {
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setActive(3));
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          setActive((previous) => Math.max(previous, index));
        }
      }
    }, { threshold: .65 });
    refs.current.forEach((node) => { if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);

  return <section className="scanner-section" aria-labelledby="scanner-heading"><div className="container scanner-grid">
    <div className="scanner-copy"><span className="overline">THE FILE SCANNER</span><h2 id="scanner-heading">A clear path from file to ready.</h2><p>FileReady takes a selected file through the checks the destination profile supports. This visual shows the sequence; your real result always marks unavailable checks as <strong>Not checked</strong>.</p><span className="scanner-caption">EXAMPLE JOURNEY / FOUR CHECKPOINTS</span></div>
    <div className="scanner-tunnel" aria-label="Illustration of four file validation checkpoints"><div className="scanner-spine" aria-hidden="true"><div className="scanner-spine-progress" style={{ height: `${Math.max(0, active + 1) * 25}%` }} /></div><div className="scanner-travel-file" style={{ top: `${Math.max(0, active + 1) * 23}%` }} aria-hidden="true"><span>FR</span></div><ol>{checkpoints.map((point, index) => <li key={point.name} ref={(node) => { refs.current[index] = node; }} data-index={index} className={active >= index ? "scanner-gate is-active" : "scanner-gate"}><span className="gate-index">{point.number}</span><div className="gate-content"><strong>{point.name}</strong><small>{point.description}</small><span className="gate-rail" aria-hidden="true"><span /></span></div><span className="gate-check" aria-hidden="true">✓</span></li>)}</ol><div className={active >= 3 ? "scanner-complete is-active" : "scanner-complete"}>READY <span>✓</span></div></div>
  </div></section>;
}
