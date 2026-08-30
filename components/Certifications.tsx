"use client";

import { BadgeCheck, Clock } from "lucide-react";
import { certifications } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="mb-3 font-mono text-sm text-accent-soft">06 / certifications</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Continuous <span className="text-gradient">learning</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} delay={i * 0.08} className="h-full">
            <div className="glass-card card-hover flex h-full flex-col rounded-2xl p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#22d3ee] text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.7)]">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                  <Clock className="h-3 w-3" /> {cert.year}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold">{cert.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{cert.issuer}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}