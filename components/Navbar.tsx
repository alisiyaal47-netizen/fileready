import { ArrowIcon } from "@/components/Icons";

export function Navbar() {
  return <header className="site-header">
    <nav className="container nav-inner" aria-label="Main navigation">
      <a className="brand" href="#top" aria-label="FileReady home"><span className="brand-mark" aria-hidden="true"><span/></span><span>FileReady<span className="brand-dot">.</span></span></a>
      <div className="nav-links">
        <a href="#how-it-works">How It Works</a>
        <a href="#supported-files">Supported Files</a>
        <a href="#privacy">Privacy</a>
      </div>
      <a className="button button-primary nav-cta" href="#checker">Check File <ArrowIcon /></a>
    </nav>
  </header>;
}
