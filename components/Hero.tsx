import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { HeroVisual } from "@/components/HeroVisual";

export function Hero() {
  return <section className="hero-section" aria-labelledby="hero-title">
    <div className="hero-atmosphere" aria-hidden="true" />
    <div className="container hero">
      <div className="hero-copy">
        <span className="eyebrow"><span className="eyebrow-signal" /> THE FILE CONFIDENCE SYSTEM</span>
        <h1 id="hero-title">Check Before<br /><span>You Upload.</span></h1>
        <p className="hero-description">Know whether your file meets the checks that matter before it reaches its destination.</p>
        <div className="hero-actions"><a className="button button-primary button-large" href="#checker">Check Your File <ArrowIcon /></a><span className="hero-assurance">No signup <span>·</span> Private <span>·</span> Instant</span></div>
        <div className="hero-proof"><span className="proof-icon"><CheckIcon /></span><span>Upload once. Check anywhere.</span></div>
      </div>
      <HeroVisual />
    </div>
    <div className="hero-bottom-line" aria-hidden="true"><span /> FORMAT <span /> SIZE <span /> DIMENSIONS <span /> ASPECT RATIO <span /> READY</div>
  </section>;
}
