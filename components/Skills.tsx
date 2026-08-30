"use client";

import { Code2, LayoutGrid, Wrench } from "lucide-react";
import { skillGroups } from "@/lib/data";
import Reveal from "@/components/Reveal";

const icons = {
  code: Code2,
  layout: LayoutGrid,
  wrench: Wrench,
} as const;

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="mb-3 font-mono text-sm text-accent-soft">02 / skills</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          My <span className="text-gradient">tech stack</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, gi) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.title} delay={gi * 0.08}>
              <div className="glass-card card-hover flex h-full flex-col rounded-2xl p-6">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.7)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent-soft"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}