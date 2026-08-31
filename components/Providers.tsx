"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });

    (window as unknown as { __lenis?: typeof lenis }).__lenis = lenis;

    const loop = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      (window as unknown as { __lenis?: typeof lenis }).__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}