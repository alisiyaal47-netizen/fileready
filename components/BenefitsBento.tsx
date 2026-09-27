import { ArrowIcon, LockIcon } from "@/components/Icons";
import { PrivacyValidationRails } from "@/components/PrivacyValidationRails";

export function BenefitsBento() {
  return <section className="bento-section" aria-labelledby="bento-heading"><div className="container"><div className="bento-intro"><span className="overline">BUILT FOR THE MOMENT BEFORE UPLOAD</span><h2 id="bento-heading">Everything you need.<br /><span>Nothing in your way.</span></h2></div><div className="bento-grid">
    <article className="bento-card bento-private"><div className="bento-icon"><LockIcon /></div><span className="bento-card-index">01 / PRIVACY</span><h3>Private by design.</h3><p>Your file stays on your device. Checks run in your browser.</p><PrivacyValidationRails /></article>
    <article className="bento-card bento-instant"><span className="bento-card-index">02 / SPEED</span><h3>Instant clarity.</h3><p>No account, upload queue or wait for a server.</p><div className="bento-speed" aria-hidden="true"><span>FILE</span><i /><span>CHECK</span><i /><b>READY</b></div></article>
    <article className="bento-card bento-formats"><span className="bento-card-index">03 / FORMATS</span><h3>Five formats.</h3><p>JPG, PNG, WebP, MP4 and PDF.</p><div className="bento-format-row" aria-hidden="true"><span>JPG</span><span>PNG</span><span>WEBP</span><span>MP4</span><span>PDF</span></div></article>
    <article className="bento-card bento-destinations"><span className="bento-card-index">04 / DESTINATIONS</span><h3>Four destinations.</h3><p>Instagram, TikTok, WhatsApp and Gmail reference profiles.</p><a href="#checker">Check a file <ArrowIcon /></a></article>
  </div></div></section>;
}
