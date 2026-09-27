"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { FileDetails } from "@/components/FileDetails";
import { PlatformSelector } from "@/components/PlatformSelector";
import { ResultCard } from "@/components/ResultCard";
import { LockIcon } from "@/components/Icons";
import { getPlatformRule, type PlatformId } from "@/data/platformRules";
import { inspectFile, InspectionError, type FileInspection } from "@/lib/inspectFile";
import { validateFile, type ValidationResult } from "@/lib/validateFile";

export function Checker({ defaultPlatformId, heading = "Make every upload a sure thing.", intro = "Start with a file. We'll read its details right here in your browser." }: { defaultPlatformId?: PlatformId; heading?: string; intro?: string }) {
  const [file, setFile] = useState<FileInspection | null>(null);
  const [error, setError] = useState("");
  const [inspecting, setInspecting] = useState(false);
  const [platformId, setPlatformId] = useState<PlatformId | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const requestId = useRef(0);
  const reduceMotion = useReducedMotion();

  async function handleFile(selected: File) {
    const id = ++requestId.current;
    setFile(null);
    setError("");
    setPlatformId(null);
    setResult(null);
    setInspecting(true);
    try {
      const inspected = await inspectFile(selected);
      if (id === requestId.current) {
        setFile(inspected);
        if (defaultPlatformId) {
          setPlatformId(defaultPlatformId);
          setResult(validateFile(inspected, getPlatformRule(defaultPlatformId)));
        }
      }
    } catch (cause) {
      if (id === requestId.current) setError(cause instanceof InspectionError ? cause.message : "This file could not be inspected. Choose it again or try another file.");
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
    setInspecting(false);
  }

  function selectPlatform(id: PlatformId) {
    if (!file) return;
    setPlatformId(id);
    setResult(validateFile(file, getPlatformRule(id)));
  }

  return <section id="checker" className="checker-section" aria-labelledby="checker-heading"><div className="container">
    <div className="checker-intro"><div><span className="overline">THE FILE CHECKER</span><h2 id="checker-heading">{heading}</h2><p>{intro}</p></div><span className="privacy-chip"><LockIcon /> Your file stays on your device</span></div>
    <div className="checker-shell"><div className="checker-shell-top"><span><span className="shell-dot"/> READY TO CHECK</span><span>01 / 03</span></div><div className="checker-content">
      {!file && <FileUploader onFile={handleFile} busy={inspecting} />}
      {inspecting && <div role="status" className="inspection-status"><span>Reading file signature and available metadata in your browser…</span><span className="inspection-rail" aria-hidden="true"><span /></span></div>}
      {error && <div className="upload-error" role="alert"><strong>We couldn&apos;t check that file.</strong><p>{error}</p><span>Choose a supported file and try again.</span></div>}
      {file && <><FileDetails file={file} onClear={clearFile}/><AnimatePresence mode="wait">
        {!platformId && <motion.div key="selector" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}><PlatformSelector onSelect={selectPlatform}/></motion.div>}
        {platformId && result && <motion.div key="result" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><ResultCard result={result} platform={getPlatformRule(platformId)} onBack={() => { setPlatformId(null); setResult(null); }}/></motion.div>}
      </AnimatePresence></>}
    </div></div>
    <p className="checker-caption">Local inspection only. No file data is sent to FileReady.</p>
  </div></section>;
}
