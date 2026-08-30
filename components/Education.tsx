"use client";

import { MapPin, CalendarDays, Check } from "lucide-react";
import { education } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="mb-3 font-mono text-sm text-accent-soft">05 / education</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Where I&apos;m <span className="text-gradient">learning</span>
        </h2>
      </Reveal>

      <Reveal delay={0.05} className="mt-12">
        <div className="glass-card card-hover flex flex-col gap-8 rounded-3xl p-7 sm:p-10 lg:flex-row">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-2 shadow-[0_10px_35px_-10px_rgba(139,92,246,0.7)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={education.logo} alt="" className="h-full w-full object-contain" />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3 className="font-display text-2xl font-semibold">{education.school}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-muted">
                <CalendarDays className="h-3.5 w-3.5" /> {education.duration}
              </span>
            </div>
            <p className="mt-1 text-accent-soft">{education.degree}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-4 w-4" /> {education.location}
            </p>

            <ul className="mt-6 space-y-2.5">
              {education.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-muted">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-3 w-3" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}