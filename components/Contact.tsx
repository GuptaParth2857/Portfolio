"use client";

import { useState, type FormEvent } from "react";
import { Mail, Send, MapPin } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { SocialIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="mb-3 font-mono text-sm text-accent-soft">07 / contact</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s build something <span className="text-gradient">together</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Reveal delay={0.05}>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m always open to internships, interesting projects, and
            conversations about tech — drop a message and I&apos;ll get back to
            you soon.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-white/[0.02] p-4 transition-all hover:border-accent/50"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted">Email</p>
                <p className="text-sm font-medium text-foreground group-hover:text-accent-soft">
                  {profile.email}
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-line bg-white/[0.02] p-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted">Location</p>
                <p className="text-sm font-medium text-foreground">{profile.location}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted transition-all hover:-translate-y-1 hover:border-accent/60 hover:text-accent-soft"
              >
                <SocialIcon name={social.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="glass-card space-y-4 rounded-3xl p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent/60"
              />
              <input
                type="email"
                required
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent/60"
              />
            </div>
            <textarea
              required
              rows={5}
              placeholder="Your message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent/60"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-gradient group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            {status === "sent" && (
              <p className="text-sm text-emerald-400">
                Thank you! Your message has been sent — I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again, or email me directly.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}