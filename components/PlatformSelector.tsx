import { platformRules, type PlatformId } from "@/data/platformRules";
import { ArrowIcon } from "@/components/Icons";

const monograms: Record<PlatformId, string> = { instagram: "◎", tiktok: "♪", whatsapp: "◉", gmail: "M" };

export function PlatformSelector({ onSelect }: { onSelect: (id: PlatformId) => void }) {
  return <section className="platform-section" aria-labelledby="platform-heading">
    <div className="section-heading compact"><span className="overline">STEP 02 / DESTINATION</span><h3 id="platform-heading">Where are you uploading?</h3><p>Select a destination to check this file against its reference profile.</p></div>
    <div className="platform-grid">{platformRules.map((platform) => <button className="platform-card" type="button" key={platform.id} onClick={() => onSelect(platform.id)}><span className={`platform-icon platform-${platform.id}`} aria-hidden="true">{monograms[platform.id]}</span><span className="platform-copy"><strong>{platform.name}</strong><small>{platform.useCase}</small></span><ArrowIcon className="platform-arrow" /></button>)}</div>
    <div className="pending-rails" aria-label="Validation checks pending until a destination is selected">{["FORMAT", "SIZE", "DIMENSIONS", "ASPECT RATIO"].map((name) => <span className="pending-rail" key={name}><b>{name}</b><i aria-hidden="true" /><small>Pending</small></span>)}</div>
  </section>;
}
