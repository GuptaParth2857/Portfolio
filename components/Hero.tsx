"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Move3d } from "lucide-react";
import { profile, roles, socials, terminalLines } from "@/lib/data";
import { SocialIcon } from "@/components/icons";
import { scrollToId } from "@/lib/scroll";

const Robot3D = dynamic(() => import("@/components/Robot3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-14 w-14 animate-spin rounded-full border-2 border-white/10 border-t-[#a855f7] shadow-[0_0_30px_-6px_rgba(168,85,247,0.6)]" />
    </div>
  ),
});

function useTypewriter(words: string[], typeMs = 70, deleteMs = 40, holdMs = 1600) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];

    if (!deleting && text === word) {
      const timeout = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(timeout);
    }

    if (deleting && text === "") {
      const timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, deleteMs);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
      deleting ? deleteMs : typeMs
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs]);

  return text;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const typed = useTypewriter(roles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pb-24 pt-28 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(99,102,241,0.14), transparent 70%)" }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
      >
        <div>
          <motion.div variants={item} className="mb-7">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              </span>
              Open to internships &amp; collaborations
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="mb-4 font-mono text-sm text-accent-soft sm:text-base"
          >
            &lt;hello_world /&gt; — I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
          >
            Parth
            <br />
            <span className="text-gradient">Gupta.</span>
          </motion.h1>

          <motion.div variants={item} className="mt-6 flex items-center gap-3 font-mono text-lg text-muted sm:text-2xl">
            <span className="text-emerald-400">$</span>
            <span>{typed}</span>
            <span className="cursor-blink -mt-0.5 inline-block h-6 w-[2px] bg-gradient-to-b from-[#a5b4fc] to-[#e879f9] sm:h-7" />
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.subtitle} — building AI-powered platforms, 3D web
            experiences, and production-ready full-stack apps from{" "}
            {profile.location}.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToId("#projects")}
              className="btn-gradient group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white"
            >
              View My Work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:border-[#a855f7]/50 hover:text-accent-soft hover:shadow-[0_10px_35px_-12px_rgba(168,85,247,0.5)]"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#a855f7]/60 hover:text-accent-soft hover:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.6)]"
              >
                <SocialIcon name={social.icon} className="h-[18px] w-[18px]" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden h-[520px] lg:block lg:h-[600px]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-8 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.28), rgba(168,85,247,0.18) 45%, transparent 70%)" }}
          />
          <div className="absolute inset-0">
            <Robot3D />
          </div>
          <div className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0a10]/70 px-4 py-2 font-mono text-xs text-muted backdrop-blur-md">
              <Move3d className="h-3.5 w-3.5 text-[#a855f7]" />
              Drag to spin · 360°
            </span>
            <span className="font-mono text-[10px] text-muted/50">
              Cybernetic Warrior · Get3DModels · CC-BY
            </span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative mx-auto mt-16 w-full max-w-6xl"
      >
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#6366f1]/40 via-[#a855f7]/30 to-[#22d3ee]/40 opacity-60 blur-sm" />
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a10]/80 font-mono text-sm backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(99,102,241,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27ca3f]" />
            <span className="ml-3 text-muted">parth@portfolio ~ %</span>
          </div>
          <div className="relative grid gap-1.5 p-5 sm:grid-cols-2 sm:gap-x-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-sweep bg-gradient-to-r from-transparent via-[#a855f7]/70 to-transparent" />
            {terminalLines.map((line, i) => (
              <p key={i} className="whitespace-pre-wrap text-foreground/80">
                <span className="mr-2 text-emerald-400">{line.prompt}</span>
                <span className="text-accent-soft">{line.cmd}</span>
              </p>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={() => scrollToId("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent-soft md:block"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </motion.button>
    </section>
  );
}