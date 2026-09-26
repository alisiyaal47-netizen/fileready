import { ArrowIcon, FileIcon } from "@/components/Icons";

const destinations = [
  { name: "Instagram", icon: "◎", className: "instagram" },
  { name: "TikTok", icon: "♪", className: "tiktok" },
  { name: "WhatsApp", icon: "◉", className: "whatsapp" },
  { name: "Gmail", icon: "M", className: "gmail" },
];

export function OneFileEveryPlatform() {
  return <section className="every-platform-section" aria-labelledby="every-platform-heading"><div className="container every-platform-grid"><div className="every-platform-copy"><span className="overline">ONE CHECK. MORE CONFIDENCE.</span><h2 id="every-platform-heading">One File.<br /><span>Every Platform.</span></h2><p>Upload once and see where your file is ready to go. Switch destinations without starting over.</p><a className="text-link" href="#checker">Try the checker <ArrowIcon /></a></div><div className="network-art" aria-hidden="true"><div className="network-ring"/><span className="network-line line-one"/><span className="network-line line-two"/><span className="network-line line-three"/><span className="network-line line-four"/><div className="network-file"><FileIcon /><strong>YOUR FILE</strong><small>one upload</small></div>{destinations.map((destination) => <div className={`network-destination network-${destination.className}`} key={destination.name}><span>{destination.icon}</span><strong>{destination.name}</strong></div>)}</div></div></section>;
}
