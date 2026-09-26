import Link from "next/link";
export function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><div><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true"><span/></span><span>FileReady<span className="brand-dot">.</span></span></Link><p>Check Before You Upload.</p></div><nav aria-label="Footer navigation"><Link href="/how-it-works">How It Works</Link><Link href="/supported-files">Supported Files</Link><Link href="/privacy">Privacy</Link><Link href="/guides">Guides</Link><Link href="/#checker">Check File</Link></nav></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} FileReady</span><span>Made for files going places.</span></div></footer>;
}
