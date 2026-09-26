"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { FileDetails } from "@/components/FileDetails";
import { PlatformSelector } from "@/components/PlatformSelector";
import { ResultCard } from "@/components/ResultCard";
import { CheckIcon, LockIcon } from "@/components/Icons";
import { getPlatformRule, type PlatformId } from "@/data/platformRules";
import { inspectFile, type FileInspection } from "@/lib/inspectFile";
import { validateFile, type ValidationResult } from "@/lib/validateFile";

const stages = ["Format", "Size", "Dimensions", "Aspect ratio"];

export function Checker() {
  const [file, setFile] = useState<FileInspection | null>(null);
  const [error, setError] = useState("");
  const [inspecting, setInspecting] = useState(false);
  const [platformId, setPlatformId] = useState<PlatformId | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [stage, setStage] = useState(-1);
  const requestId = useRef(0);

  useEffect(() => {
    if (stage < 0 || stage >= stages.length) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setStage((current) => current + 1), reducedMotion ? 0 : 210);
    return () => window.clearTimeout(timer);
  }, [stage]);

  async function handleFile(selected: File) {
    const id = ++requestId.current;
    setFile(null);
    setError("");
    setPlatformId(null);
    setResult(null);
    setStage(-1);
    setInspecting(true);
    try {
      const inspected = await inspectFile(selected);
      if (id === requestId.current) setFile(inspected);
    } catch (cause) {
      if (id === requestId.current) setError(cause instanceof Error ? cause.message : "This file could not be inspected.");
    } finally {
      if (id === requestId.current) setInspecting(false);
    }
  }

  function clearFile() {
    requestId.current += 1;
    setFile(null);
    setError("");
    setPlatformId(null);
    setResult(null);
    setStage(-1);
    setInspecting(false);
  }

  function selectPlatform(id: PlatformId) {
    if (!file) return;
    setPlatformId(id);
    setResult(validateFile(file, getPlatformRule(id)));
    setStage(0);
  }

  return <section id="checker" className="checker-section" aria-labelledby="checker-heading"><div className="container">
    <div className="checker-intro"><div><span className="overline">THE FILE CHECKER</span><h2 id="checker-heading">Make every upload a sure thing.</h2><p>Start with a file. We&apos;ll read its details right here in your browser.</p></div><span className="privacy-chip"><LockIcon /> Your file stays on your device</span></div>
    <div className="checker-shell"><div className="checker-shell-top"><span><span className="shell-dot"/> READY TO CHECK</span><span>01 / 03</span></div><div className="checker-content">
      {!file && <FileUploader onFile={handleFile} busy={inspecting} />}
      {error && <div className="upload-error" role="alert"><strong>We couldn&apos;t check that file.</strong><p>{error}</p><span>Choose a supported file and try again.</span></div>}
      {file && <><FileDetails file={file} onClear={clearFile}/><AnimatePresence mode="wait">
        {!platformId && <motion.div key="selector" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><PlatformSelector onSelect={selectPlatform}/></motion.div>}
        {platformId && result && stage < stages.length && <motion.div key="checking" className="checking-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="status" aria-live="polite"><span className="checking-spinner"/><h3>Checking your file...</h3><p>Comparing actual file details with the {getPlatformRule(platformId).name} reference profile.</p><div className="checking-stages">{stages.map((name, index) => <span key={name} className={index < stage ? "stage-done" : index === stage ? "stage-active" : ""}>{index < stage ? <CheckIcon /> : <span className="stage-circle"/>}{name}</span>)}</div></motion.div>}
        {platformId && result && stage >= stages.length && <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><ResultCard result={result} platform={getPlatformRule(platformId)} onBack={() => { setPlatformId(null); setResult(null); setStage(-1); }}/></motion.div>}
      </AnimatePresence></>}
    </div></div>
    <p className="checker-caption">Local inspection only. No file data is sent to FileReady.</p>
  </div></section>;
}
