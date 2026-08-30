"use client";

import { ArrowUp } from "lucide-react";
import { navLinks, profile, socials } from "@/lib/data";
import { SocialIcon } from "@/components/icons";
import { scrollToId, scrollToTop } from "@/lib/scroll";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white/[0.015]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-bold">
            {profile.initials}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            {profile.subtitle} — {profile.location}.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-accent/60 hover:text-accent-soft"
              >
                <SocialIcon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToId(link.href)}
              className="text-sm text-muted transition-colors hover:text-accent-soft"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="md:text-right">
          <button
            onClick={scrollToTop}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-accent/60 hover:text-accent-soft"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <p className="mt-4 text-xs text-muted/70">
            © {new Date().getFullYear()} {profile.name} · Built with Next.js,
            Tailwind CSS &amp; TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}