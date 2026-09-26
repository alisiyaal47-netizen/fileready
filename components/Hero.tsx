import { ArrowIcon, CheckIcon, SparkIcon } from "@/components/Icons";

const cards = [
  { format: "JPG", className: "file-card-jpg", caption: "PHOTO" },
  { format: "PNG", className: "file-card-png", caption: "IMAGE" },
  { format: "MP4", className: "file-card-mp4", caption: "VIDEO" },
  { format: "PDF", className: "file-card-pdf", caption: "DOCUMENT" },
];

export function Hero() {
  return <section className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <div className="eyebrow"><SparkIcon /> FILE CONFIDENCE, IN SECONDS</div>
      <h1 id="hero-title">Check Before<br /><span>You Upload.</span></h1>
      <p className="hero-description">Know instantly whether your image, video or document is ready for the platform you&apos;re sending it to.</p>
      <div className="hero-actions"><a className="button button-primary button-large" href="#checker">Check Your File <ArrowIcon /></a><span className="hero-assurance">No signup <span>·</span> Private <span>·</span> Instant</span></div>
      <div className="hero-proof"><span className="proof-icon"><CheckIcon /></span><span>Upload once. Check anywhere.</span></div>
    </div>
    <div className="hero-art" aria-label="Illustration of floating JPG, PNG, MP4 and PDF file cards" role="img">
      <div className="art-orbit art-orbit-one"/><div className="art-orbit art-orbit-two"/><div className="art-glow"/>
      <div className="art-center"><span className="art-center-icon"><CheckIcon /></span><span className="art-center-title">FileReady</span><span className="art-center-sub">Ready when you are</span></div>
      {cards.map((card) => <div key={card.format} className={`floating-file ${card.className}`}><span className="floating-file-fold"/><span className="floating-file-symbol">{card.format === "MP4" ? "▶" : card.format === "PDF" ? "≡" : "◈"}</span><strong>{card.format}</strong><small>{card.caption}</small></div>)}
      <span className="art-spark art-spark-one">✦</span><span className="art-spark art-spark-two">✦</span>
    </div>
  </section>;
}
