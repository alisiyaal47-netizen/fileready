"use client";

import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from "react";
import { UploadIcon } from "@/components/Icons";

interface Props { onFile: (file: File) => void; busy: boolean }

export function FileUploader({ onFile, busy }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);
  const dragDepth = useRef(0);

  useEffect(() => {
    const node = zoneRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "80px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onFile(file);
    event.target.value = "";
  }

  function onDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dragDepth.current += 1;
    setDragging(true);
  }
  function onDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDragging(false);
  }
  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dragDepth.current = 0;
    setDragging(false);
    if (!busy && event.dataTransfer.files[0]) onFile(event.dataTransfer.files[0]);
  }
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  }

  return <div ref={zoneRef} className={`dropzone ${dragging ? "dropzone-active" : ""} ${busy ? "dropzone-busy" : ""} ${inView ? "dropzone-in-view" : ""}`} onDragEnter={onDragEnter} onDragOver={(event) => event.preventDefault()} onDragLeave={onDragLeave} onDrop={onDrop} onKeyDown={onKeyDown} role="button" tabIndex={busy ? -1 : 0} aria-label="Choose a file or drag and drop it here" aria-disabled={busy} onClick={() => !busy && inputRef.current?.click()}>
    <input ref={inputRef} className="visually-hidden" type="file" accept=".jpg,.jpeg,.png,.webp,.mp4,.pdf,image/jpeg,image/png,image/webp,video/mp4,application/pdf" onChange={chooseFile} aria-label="Browse files" disabled={busy} tabIndex={-1}/>
    <span className="dropzone-scan" aria-hidden="true" />
    <span className="upload-icon"><UploadIcon /></span>
    <strong>{busy ? "Reading your file…" : dragging ? "Drop your file here" : "Drop your file here"}</strong>
    <span>or <span className="browse-text">Browse Files</span> from your device</span>
    <span className="dropzone-formats">JPG, PNG, WebP, MP4 or PDF</span>
  </div>;
}
