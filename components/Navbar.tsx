import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

export function Navbar() {
  return <header className="site-header">
    <nav className="container nav-inner" aria-label="Main navigation">
      <Link className="brand" href="/" aria-label="FileReady home"><span className="brand-mark" aria-hidden="true"><span/></span><span>FileReady<span className="brand-dot">.</span></span></Link>
      <div className="nav-links">
        <Link href="/how-it-works">How It Works</Link>
        <Link href="/supported-files">Supported Files</Link>
        <Link href="/privacy">Privacy</Link>
      </div>
      <Link className="button button-primary nav-cta" href="/#checker">Check File <ArrowIcon /></Link>
    </nav>
  </header>;
}
