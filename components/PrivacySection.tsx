import { LockIcon, ShieldIcon } from "@/components/Icons";

export function PrivacySection() {
  return <section id="privacy" className="privacy-section" aria-labelledby="privacy-heading"><div className="container privacy-inner"><div className="privacy-visual" aria-hidden="true"><div className="privacy-visual-ring"><ShieldIcon /></div><span className="privacy-visual-chip chip-one"><LockIcon /> LOCAL ONLY</span><span className="privacy-visual-chip chip-two">NO UPLOADS</span></div><div className="privacy-copy"><span className="overline">PRIVACY IS BUILT IN</span><h2 id="privacy-heading">Your file stays<br />on your device.</h2><p>FileReady inspects files in your browser. Your images, videos and documents are never uploaded to our server in V1.</p><div className="privacy-facts"><span><ShieldIcon /> Browser-based checks</span><span><LockIcon /> No account required</span></div></div></div></section>;
}
