"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function CtaBanner() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const orbA = useTransform(scrollYProgress, [0, 1], [-50, 60]);
  const orbB = useTransform(scrollYProgress, [0, 1], [50, -60]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  return (
    <section ref={ref} className="px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 px-6 py-20 text-center shadow-[0_40px_120px_-40px_rgba(99,102,241,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-16 sm:py-28">
            <motion.div aria-hidden className="absolute inset-0" style={{ scale: backdropScale }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b14] via-[#131a33] to-[#0b0b14]" />
              <div className="absolute inset-0 bg-grid opacity-40" />
              <motion.div
                className="absolute -left-28 -top-28 h-[24rem] w-[24rem] rounded-full bg-[#6366f1]/30 blur-[130px]"
                style={{ y: orbA }}
              />
              <motion.div
                className="absolute -bottom-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#a855f7]/25 blur-[140px]"
                style={{ y: orbB }}
              />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a855f7]/70 to-transparent" />
            </motion.div>

            <div className="relative">
              <motion.span
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#6366f1]/25 sm:h-[32rem] sm:w-[32rem]"
              />

              <p className="relative mb-4 font-mono text-sm text-accent-soft">08 / collaborate</p>
              <h2 className="relative font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                Have a project in mind?
                <br />
                <span className="text-gradient">Let&apos;s build it together.</span>
              </h2>
              <p className="relative mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                From AI-powered platforms to immersive 3D experiences — I turn
                ideas into products that solve real problems.
              </p>

              <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-gradient group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_-15px_rgba(168,85,247,0.7)]"
                >
                  <Sparkles className="h-4 w-4 text-[#e9d5ff]" />
                  Work With Me
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={profile.resumeUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:border-[#a855f7]/50 hover:text-accent-soft"
                >
                  Download Resume
                </a>
              </div>

              <div className="relative mt-10 flex items-center justify-center gap-3 font-mono text-xs text-muted/70">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/20" />
                {profile.email}
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/20" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}