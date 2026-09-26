import Link from "next/link";
export const metadata = { title: "Page Not Found | FileReady", robots: { index: false, follow: false } };

export default function NotFound() {
  return <main className="container content-hero"><span className="overline">404 / PAGE NOT FOUND</span><h1>That page is not here.</h1><p>Head back to the checker or explore a guide for the file problem you&apos;re trying to solve.</p><div className="not-found-actions"><Link className="button button-primary" href="/#checker">Check your file</Link><Link className="button button-outline" href="/guides">Browse upload guides</Link></div></main>;
}
