"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

type MotionState = { motion: boolean; toggle: () => void };

const MotionContext = createContext<MotionState>({ motion: true, toggle: () => {} });

export const useMotion = () => useContext(MotionContext);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [motion, setMotion] = useState(true);
  const [ready, setReady] = useState(false);

  // Initial preference: saved choice, else the OS reduced-motion setting.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("motion");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMotion(saved ? saved === "on" : !reduce);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.motion = motion ? "on" : "off";
    try {
      localStorage.setItem("motion", motion ? "on" : "off");
    } catch {}
    if (!motion) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -90 } });
    return () => lenis.destroy();
  }, [motion, ready]);

  return (
    <MotionContext.Provider value={{ motion, toggle: () => setMotion((m) => !m) }}>
      {children}
    </MotionContext.Provider>
  );
}

export function MotionToggle() {
  const { motion, toggle } = useMotion();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!motion}
      className="flex h-11 items-center gap-2 rounded border border-smoke bg-graphite px-4 font-mono text-[12px] tracking-[0.18em] text-bone transition-colors hover:border-ash"
    >
      <span aria-hidden="true">{motion ? "❚❚" : "▶"}</span>
      {motion ? "MOTION ON" : "MOTION OFF"}
    </button>
  );
}
