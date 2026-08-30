"use client";

import { CalendarDays, Check, Sparkles } from "lucide-react";
import { experience } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="mb-3 font-mono text-sm text-accent-soft">03 / experience</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Where I ship <span className="text-gradient">real products</span>
        </h2>
      </Reveal>

      <div className="relative mt-12 space-y-10">
        <div
          aria-hidden
          className="absolute left-8 top-4 bottom-4 hidden w-px bg-gradient-to-b from-[#6366f1]/60 via-[#a855f7]/40 to-transparent lg:block"
        />
        {experience.map((exp, ei) => (
          <Reveal key={exp.company} delay={ei * 0.08} className="relative lg:pl-24">
            <div className="glass-card card-hover rounded-3xl p-7 sm:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                <div
                  className={`hidden h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-[0_10px_35px_-10px_rgba(139,92,246,0.7)] lg:flex ${
                    exp.logo ? "bg-white/[0.06] p-2" : "bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] p-0"
                  }`}
                  aria-hidden
                >
                  {exp.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={exp.logo} alt="" className="h-full w-full object-contain" />
                  ) : (
                    <span className="font-display text-xl font-bold text-white">
                      {exp.company.slice(0, 1)}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="font-display text-2xl font-semibold">{exp.company}</h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-muted">
                      <CalendarDays className="h-3.5 w-3.5" /> {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-accent-soft">{exp.role}</p>
                  <p className="mt-4 text-base leading-relaxed text-muted">{exp.summary}</p>

                  <ul className="mt-6 space-y-2.5">
                    {exp.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Check className="h-3 w-3" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {exp.projects && (
                    <div className="mt-7 space-y-4">
                      {exp.projects.map((project) => (
                        <div
                          key={project.name}
                          className="rounded-2xl border border-line bg-white/[0.02] p-5 sm:p-6"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-accent">
                              <Sparkles className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="font-display text-base font-semibold">{project.name}</p>
                              <p className="text-xs text-muted">{project.tagline}</p>
                            </div>
                          </div>
                          <ul className="mt-4 space-y-2">
                            {project.bullets.map((b) => (
                              <li key={b} className="flex items-start gap-2 text-sm text-muted">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#a855f7]" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent-soft"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}