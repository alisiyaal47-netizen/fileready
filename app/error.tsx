"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="container content-hero">
    <span className="overline">SOMETHING WENT WRONG</span>
    <h1>FileReady could not open this page.</h1>
    <p>Try again. If the problem continues, return to the checker and select your file again.</p>
    <div className="not-found-actions">
      <button type="button" className="button button-primary" onClick={reset}>Try again</button>
      <Link className="button button-outline" href="/">Return home</Link>
    </div>
  </main>;
}
