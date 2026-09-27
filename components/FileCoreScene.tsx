"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { CanvasTexture, type Group } from "three";

function FloatingFile({ label, position, phase }: { label: string; position: [number, number, number]; phase: number }) {
  const ref = useRef<Group>(null);
  const labelTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, 256, 128);
      context.fillStyle = "#F8FAFC";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = "900 68px Arial";
      context.fillText(label, 128, 68);
    }
    return new CanvasTexture(canvas);
  }, [label]);
  useEffect(() => () => labelTexture.dispose(), [labelTexture]);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * .55 + phase) * .075;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * .35 + phase) * .08;
  });
  return <group ref={ref} position={position} rotation={[0, 0, phase % 2 ? .12 : -.1]}>
    <RoundedBox args={[.65, .82, .075]} radius={.05} smoothness={3}><meshPhysicalMaterial color="#F8FAFC" metalness={.13} roughness={.22} transparent opacity={.9} /></RoundedBox>
    <mesh position={[0, 0, .052]}><planeGeometry args={[.5, .55]} /><meshBasicMaterial color="#0F172A" transparent opacity={.92} /></mesh>
    <mesh position={[0, 0, .058]}><planeGeometry args={[.43, .22]} /><meshBasicMaterial map={labelTexture} transparent depthWrite={false} /></mesh>
  </group>;
}

function FileCore({ mobile }: { mobile: boolean }) {
  const ref = useRef<Group>(null);
  const faceTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, 512, 512);
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.strokeStyle = "#2563EB";
      context.lineWidth = 5;
      context.shadowColor = "#2563EB";
      context.shadowBlur = 28;
      context.beginPath();
      context.arc(256, 170, 88, 0, Math.PI * 2);
      context.stroke();
      context.shadowBlur = 0;
      context.fillStyle = "#F8FAFC";
      context.font = "86px Arial";
      context.fillText("✓", 256, 172);
      context.font = "900 45px Arial";
      context.fillText("FILE CORE", 256, 335);
      context.fillStyle = "#F8FAFC99";
      context.font = "22px Arial";
      context.fillText("CHECK / READY", 256, 382);
    }
    return new CanvasTexture(canvas);
  }, []);
  useEffect(() => () => faceTexture.dispose(), [faceTexture]);
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * .24) * .08 + pointer.x * .055;
    ref.current.rotation.x = -.06 + pointer.y * .035;
    ref.current.position.y = Math.sin(clock.elapsedTime * .42) * .055;
  });
  return <group ref={ref} rotation={[0, -.1, -.07]}>
    <RoundedBox args={[1.75, 2.2, .16]} radius={.12} smoothness={4} position={[-.15, .12, -.32]} rotation={[0, -.12, -.08]}><meshPhysicalMaterial color="#2563EB" metalness={.14} roughness={.22} transparent opacity={.38} /></RoundedBox>
    <RoundedBox args={[1.75, 2.2, .16]} radius={.12} smoothness={4} position={[.11, -.06, -.16]} rotation={[0, .08, .045]}><meshPhysicalMaterial color="#F8FAFC" metalness={.18} roughness={.22} transparent opacity={.36} /></RoundedBox>
    <RoundedBox args={[1.75, 2.2, .2]} radius={.12} smoothness={4} position={[0, 0, .08]}><meshPhysicalMaterial color="#0F172A" metalness={.34} roughness={.16} clearcoat={.7} clearcoatRoughness={.12} /></RoundedBox>
    <mesh position={[-.87, 0, .1]}><boxGeometry args={[.025, 1.85, .23]} /><meshBasicMaterial color="#2563EB" /></mesh>
    <mesh position={[0, -1.08, .1]}><boxGeometry args={[1.52, .024, .23]} /><meshBasicMaterial color="#2563EB" /></mesh>
    <mesh position={[0, 0, .205]}><planeGeometry args={[1.5, 1.7]} /><meshBasicMaterial map={faceTexture} transparent depthWrite={false} /></mesh>
    {!mobile && <>
      <FloatingFile label="JPG" position={[-2.12, 1.22, -.3]} phase={0} />
      <FloatingFile label="PNG" position={[2.02, 1.02, -.4]} phase={1.3} />
      <FloatingFile label="MP4" position={[-2.03, -1.18, -.45]} phase={2.4} />
      <FloatingFile label="PDF" position={[2.05, -1.16, -.35]} phase={3.2} />
    </>}
  </group>;
}

export default function FileCoreScene({ mobile, onReady, onError }: { mobile: boolean; onReady: () => void; onError: () => void }) {
  return <div className="file-core-canvas" aria-hidden="true"><Canvas dpr={mobile ? [1, 1.2] : [1, 1.5]} camera={{ position: [0, 0, mobile ? 6.2 : 6.5], fov: 38 }} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} onCreated={onReady} onError={onError}>
    <ambientLight intensity={1.15} /><directionalLight position={[3, 4, 5]} intensity={2} color="#F8FAFC" /><pointLight position={[-3, 1, 3]} intensity={8} distance={8} color="#2563EB" />
    <FileCore mobile={mobile} />
  </Canvas></div>;
}
