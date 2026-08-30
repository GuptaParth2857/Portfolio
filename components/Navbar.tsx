"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { scrollToId, scrollToTop } from "@/lib/scroll";

const SECTION_IDS = ["home", "about", "skills", "projects", "education", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    scrollToId(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#22d3ee]"
        style={{ scaleX: progress }}
      />
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 transition-all duration-300 ${
          scrolled
            ? "mt-3 rounded-2xl border border-white/10 bg-[#0a0a10]/75 py-3 backdrop-blur-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)]"
            : "mt-0 border border-transparent bg-transparent py-5"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="group font-display text-lg font-bold tracking-tight"
          aria-label="Scroll to top"
        >
          <span className="text-foreground transition-colors group-hover:text-accent-soft">
            {profile.initials}
          </span>
          <span className="text-gradient">.</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => go(link.href)}
              className={`relative text-sm font-medium transition-colors ${
                active === link.href.slice(1)
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
              {active === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] shadow-[0_0_10px_rgba(139,92,246,0.9)]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.resumeUrl}
            className="btn-gradient hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" /> Resume
          </a>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-4 mt-2 rounded-2xl border border-white/10 bg-[#0a0a10]/95 p-4 backdrop-blur-2xl md:hidden"
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className="rounded-lg px-3 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-white/5 hover:text-accent-soft"
              >
                {link.label}
              </button>
            ))}
            <a
              href={profile.resumeUrl}
              className="btn-gradient mt-2 inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}