"use client";

import { focusAreas, stats } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="mb-3 font-mono text-sm text-accent-soft">01 / about</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Turning ideas into <span className="text-gradient">working software</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-8">
          <Reveal delay={0.05} className="relative w-full max-w-md">
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-r from-[#6366f1]/40 via-[#a855f7]/30 to-[#22d3ee]/40 opacity-60 blur-2xl animate-pulse-glow" />
            <div className="relative rounded-3xl bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#22d3ee] p-[2px] shadow-[0_25px_70px_-25px_rgba(99,102,241,0.6)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photo.jpg"
                alt={`Portrait of ${"Parth Gupta"}`}
                className="aspect-[4/3] w-full object-cover rounded-[calc(1.5rem-2px)]"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              I&apos;m a computer science student at J.C. Bose University of Science
              &amp; Technology, YMCA, who writes code that actually solves
              problems. What began with C and Python has grown into a full-stack
              web practice — I&apos;ve built and shipped AI-powered healthcare
              platforms, 3D carbon-tracking experiences, multimodal web apps, and
              hackathon projects.
            </p>
            <p>
              I care about clean architecture, performance, and products that
              make it to production. Right now I&apos;m going deeper into full-stack
              development and machine learning tooling while sharpening my
              data-structures-and-algorithms fundamentals through consistent
              daily practice.
            </p>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <p className="mb-3 text-sm font-semibold text-foreground">Currently focusing on</p>
            <div className="flex flex-wrap gap-2.5">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-muted transition-colors hover:border-accent/50 hover:text-accent-soft"
                >
                  {area}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card card-hover rounded-2xl p-5 text-center"
              >
                <p className="font-display text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}