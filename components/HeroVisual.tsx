"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "@/components/Icons";

const FileCoreScene = dynamic(() => import("@/components/FileCoreScene"), { ssr: false });
const stages = ["FORMAT", "SIZE", "DIMENSIONS", "ASPECT RATIO"];
const formats = ["JPG", "PNG", "MP4", "PDF"];

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [webgl, setWebgl] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 760px)");
    const update = () => { setReducedMotion(motion.matches); setMobile(narrow.matches); };
    const frame = window.requestAnimationFrame(() => { update(); setWebgl(canUseWebGL()); });
    motion.addEventListener("change", update);
    narrow.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting) setSceneReady(false);
    }, { rootMargin: "120px" });
    if (container.current) observer.observe(container.current);
    return () => { window.cancelAnimationFrame(frame); motion.removeEventListener("change", update); narrow.removeEventListener("change", update); observer.disconnect(); };
  }, []);

  const renderScene = visible && webgl && !reducedMotion && !sceneFailed;

  return <div ref={container} className="hero-visual" aria-label="FileReady File Core sending a file through four validation stages to multiple destinations" role="img">
    <div className="hero-visual-orbit orbit-outer" aria-hidden="true" /><div className="hero-visual-orbit orbit-inner" aria-hidden="true" />
    <svg className="hero-signal-network" viewBox="0 0 600 555" preserveAspectRatio="none" aria-hidden="true">
      <path className="hero-signal-rail" d="M 238 197 C 164 170 151 65 61 26" />
      <path className="hero-signal-rail" d="M 362 197 C 440 171 450 79 482 42" />
      <path className="hero-signal-rail" d="M 238 272 C 157 272 128 331 29 337" />
      <path className="hero-signal-rail" d="M 362 272 C 449 271 464 331 514 337" />
      <path className="hero-signal-pulse" d="M 238 197 C 164 170 151 65 61 26" />
      <path className="hero-signal-pulse" d="M 362 197 C 440 171 450 79 482 42" />
      <path className="hero-signal-pulse" d="M 238 272 C 157 272 128 331 29 337" />
      <path className="hero-signal-pulse" d="M 362 272 C 449 271 464 331 514 337" />
    </svg>
    <div className={sceneReady && renderScene ? "hero-core-fallback hero-core-hidden" : "hero-core-fallback"} aria-hidden="true"><div className="fallback-sheet sheet-back" /><div className="fallback-sheet sheet-mid" /><div className="fallback-sheet sheet-front"><span className="fallback-fold" /><span className="fallback-core-mark"><CheckIcon /></span><strong>FILE CORE</strong><small>FILE / READY</small></div></div>
    {renderScene && <FileCoreScene mobile={mobile} onReady={() => setSceneReady(true)} onError={() => setSceneFailed(true)} />}
    <div className={sceneReady && renderScene ? "hero-format-ring hero-format-hidden" : "hero-format-ring"} aria-hidden="true">{formats.map((format, index) => <span className={`hero-format-object hero-format-${index}`} key={format}>{format}</span>)}</div>
    <div className="hero-destination hero-destination-one" aria-hidden="true"><span className="destination-pin" /> INSTAGRAM</div>
    <div className="hero-destination hero-destination-two" aria-hidden="true"><span className="destination-pin" /> TIKTOK</div>
    <div className="hero-destination hero-destination-three" aria-hidden="true"><span className="destination-pin" /> WHATSAPP</div>
    <div className="hero-destination hero-destination-four" aria-hidden="true"><span className="destination-pin" /> GMAIL</div>
    <div className="hero-validation" aria-hidden="true"><div className="hero-validation-heading"><span>VALIDATION SEQUENCE</span><b>01—04</b></div>{stages.map((stage, index) => <div className="hero-validation-row" style={{ animationDelay: `${index * 1.15}s` }} key={stage}><span>{stage}</span><i className="validation-track"><i className="validation-fill" style={{ animationDelay: `${index * 1.15}s` }} /></i><b>✓</b></div>)}<div className="hero-ready">READY <CheckIcon /></div></div>
  </div>;
}
