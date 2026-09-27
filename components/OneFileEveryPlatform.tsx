"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon } from "@/components/Icons";

const destinations = [
  { name: "Instagram", icon: "◎", id: "instagram", context: "Explore Instagram file checks" },
  { name: "TikTok", icon: "♪", id: "tiktok", context: "Explore TikTok file checks" },
  { name: "WhatsApp", icon: "◉", id: "whatsapp", context: "Explore WhatsApp document checks" },
  { name: "Gmail", icon: "M", id: "gmail", context: "Explore Gmail attachment checks" },
];

export function OneFileEveryPlatform() {
  const [active, setActive] = useState<string | null>(null);
  const selected = destinations.find((destination) => destination.id === active);

  return <section className="every-platform-section" aria-labelledby="every-platform-heading"><div className="container every-platform-grid"><div className="every-platform-copy"><span className="overline">ONE FILE / MULTIPLE DESTINATIONS</span><h2 id="every-platform-heading">One File.<br /><span>Every Platform.</span></h2><p>Check one file against a destination, then switch to another without choosing the file again.</p><a className="text-link" href="#checker">Try the checker <ArrowIcon /></a><div className="network-context" aria-live="polite">{selected ? selected.context : "Hover or focus a destination to explore the signal."}</div></div><div className={active ? `network-art network-active network-active-${active}` : "network-art"} aria-label="One file connects to four destination profiles">
    <div className="network-orbit" aria-hidden="true" />
    {destinations.map((destination) => <div className={`network-branch branch-${destination.id}`} key={destination.id} aria-hidden="true"><span /></div>)}
    <div className="network-file-core" aria-hidden="true"><span className="network-file-fold" /><span className="network-file-check"><CheckIcon /></span><strong>FILE CORE</strong><small>ONE FILE / FOUR PROFILES</small></div>
    {destinations.map((destination) => <button type="button" className={`network-destination network-${destination.id}${active === destination.id ? " is-selected" : ""}`} key={destination.id} onMouseEnter={() => setActive(destination.id)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(destination.id)} onBlur={() => setActive(null)} onClick={() => document.getElementById("checker")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}><span aria-hidden="true">{destination.icon}</span><strong>{destination.name}</strong></button>)}
  </div></div></section>;
}
