"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, ShieldIcon } from "@/components/Icons";

const steps = ["FILE DETECTED", "LOCAL CHECK", "PRIVATE"];

export function PrivacyValidationRails() {
  const windowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = windowRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { threshold: .35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={windowRef} className={`bento-mini-window${active ? " is-active" : ""}`} aria-hidden="true">
    <div className="bento-mini-header"><span className="bento-mini-badge"><span className="bento-mini-dot" /><ShieldIcon /> LOCAL INSPECTION</span><span className="bento-mini-count">01—03</span></div>
    <div className="bento-mini-rails">{steps.map((step) => <div className="bento-mini-rail" key={step}><span className="bento-mini-label">{step}</span><span className="bento-mini-track"><span className="bento-mini-pulse" /></span><span className="bento-mini-check"><CheckIcon /></span></div>)}</div>
  </div>;
}
