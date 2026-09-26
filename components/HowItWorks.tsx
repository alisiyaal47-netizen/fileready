import { CheckIcon, FileIcon, UploadIcon } from "@/components/Icons";

const steps = [
  { number: "01", icon: UploadIcon, title: "Drop your file", description: "Choose a JPG, PNG, WebP, MP4 or PDF. We detect its type automatically." },
  { number: "02", icon: FileIcon, title: "Choose a destination", description: "Pick where it is going. Each destination has its own reference checks." },
  { number: "03", icon: CheckIcon, title: "Get your result", description: "See what passed, what needs attention and what to change next." },
];

export function HowItWorks() {
  return <section id="how-it-works" className="section how-section" aria-labelledby="how-heading"><div className="container"><div className="section-heading center"><span className="overline">SIMPLE BY DESIGN</span><h2 id="how-heading">How it works</h2><p>Three quick steps between your file and a confident upload.</p></div><div className="steps-grid">{steps.map((step) => <article className="step-card" key={step.number}><span className="step-number">{step.number}</span><span className="step-icon"><step.icon /></span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>;
}
