"use client";

import { useState } from "react";
import { ArrowUpRight, ExternalLink, Boxes } from "lucide-react";
import { projects, type ProjectTag } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { GithubIcon } from "@/components/icons";

const FILTERS: Array<"All" | ProjectTag> = ["All", "AI", "Full-Stack", "3D", "Hackathon", "Python"];

const badgeStyles: Record<ProjectTag, string> = {
  AI: "bg-accent/15 text-accent-soft border-accent/30",
  "Full-Stack": "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  "3D": "bg-sky-500/10 text-sky-300 border-sky-500/30",
  Hackathon: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  Python: "bg-[#4B8BBE]/15 text-[#A9CBE5] border-[#4B8BBE]/30",
};

export default function Projects() {
  const [filter, setFilter] = useState<"All" | ProjectTag>("All");

  const visible = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="mb-3 font-mono text-sm text-accent-soft">04 / projects</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Things I&apos;ve <span className="text-gradient">built</span>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.05} className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === f
                ? "btn-gradient text-white"
                : "border border-white/10 bg-white/[0.02] text-muted hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <Reveal key={project.name} delay={(i % 3) * 0.08} className="h-full">
            <article className="glass-card card-hover group flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10">
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#6366f1]/25 via-[#8b5cf6]/20 to-[#22d3ee]/20">
                    <Boxes className="h-10 w-10 text-white/30" />
                  </div>
                )}
                <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-md ${badgeStyles[tag]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 pt-5">
                <h3 className="font-display text-xl font-semibold text-foreground">{project.name}</h3>
                <p className="mt-0.5 text-sm text-accent-soft">{project.blurb}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[11px] text-muted/80">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-gradient inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white"
                    >
                      Live Demo <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                      project.liveUrl
                        ? "border-white/10 bg-white/[0.02] text-muted hover:border-[#a855f7]/50 hover:text-accent-soft"
                        : "btn-gradient text-white"
                    }`}
                  >
                    <GithubIcon className="h-3.5 w-3.5" /> Source Code
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10 flex justify-center">
        <a
          href="https://github.com/GuptaParth2857?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent-soft"
        >
          <GithubIcon className="h-4 w-4" />
          View all repos on GitHub
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </section>
  );
}