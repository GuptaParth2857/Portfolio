"use client";

import { useState, useEffect } from "react";

const THEME = {
  orb1: "bg-violet-500/10",
  orb2: "bg-indigo-500/8",
  orb3: "bg-fuchsia-500/8",
  orb4: "bg-purple-500/6",
  grad1: "rgba(139,92,246,0.12)",
  grad2: "rgba(99,102,241,0.1)",
};

export default function AnimatedBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const orbAnim = reducedMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] };
  const orbAnim2 = reducedMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] };
  const orbAnim3 = reducedMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] };
  const orbAnim4 = reducedMotion ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] };

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 80% 0%, ${THEME.grad1} 0%, transparent 60%),
            radial-gradient(ellipse at 20% 80%, ${THEME.grad2} 0%, transparent 60%),
            radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 50%)
          `,
        }}
      />

      {[
        { cls: "top-[15%] left-[5%] w-[500px] h-[500px] " + THEME.orb1, anim: orbAnim, dur: 6, del: 0 },
        { cls: "bottom-[10%] right-[5%] w-[600px] h-[600px] " + THEME.orb2, anim: orbAnim2, dur: 8, del: 1 },
        { cls: "top-[40%] right-[20%] w-[400px] h-[400px] " + THEME.orb3, anim: orbAnim3, dur: 7, del: 2 },
        { cls: "top-[60%] left-[30%] w-[350px] h-[350px] " + THEME.orb4, anim: orbAnim4, dur: 5, del: 0.5 },
      ].map((o, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-[120px] ${o.cls}`}
          style={{
            animation: reducedMotion
              ? undefined
              : `orbPulse ${o.dur}s ease-in-out ${o.del}s infinite`,
          }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <style>{`
        @keyframes orbPulse {
          0%,100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}