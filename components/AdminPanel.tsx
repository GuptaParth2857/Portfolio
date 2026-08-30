"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Inbox, Lock, LogOut, Mail, Trash2, Check } from "lucide-react";
import type { ContactMessage } from "@/lib/contacts";

type Props = {
  authed: boolean;
  messages: ContactMessage[];
  showSetupNote: boolean;
};

export default function AdminPanel({ authed, messages, showSetupNote }: Props) {
  if (!authed) return <Login showSetupNote={showSetupNote} />;
  return <MessagingRoom initial={messages} />;
}

function Login({ showSetupNote }: { showSetupNote: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) {
      window.location.reload();
    } else {
      setError("Galat password — dobara try karo.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-accent-soft">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
        <div className="glass-card rounded-3xl p-8">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.7)]">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-semibold">Admin Login</h1>
          <p className="mt-1 text-sm text-muted">Portfolio feedback panel</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent/60"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={busy} className="btn-gradient w-full rounded-full px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">
              {busy ? "Checking..." : "Log in"}
            </button>
          </form>

          {showSetupNote && (
            <p className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-3 text-xs leading-relaxed text-amber-200/80">
              Default password chala raha hai. Production me <code className="text-amber-100">ADMIN_PASSWORD</code> env set karna zaroori hai.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

function MessagingRoom({ initial }: { initial: ContactMessage[] }) {
  const [messages, setMessages] = useState(initial);
  const [busyId, setBusyId] = useState<string | null>(null);

  const unread = messages.filter((m) => !m.read).length;

  const toggleRead = async (m: ContactMessage) => {
    setBusyId(m.id);
    const res = await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: m.id, read: !m.read }),
    });
    setBusyId(null);
    if (res.ok) {
      setMessages((prev) =>
        prev.map((x) => (x.id === m.id ? { ...x, read: !x.read } : x))
      );
    }
  };

  const remove = async (m: ContactMessage) => {
    setBusyId(m.id);
    const res = await fetch("/api/contact", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: m.id }),
    });
    setBusyId(null);
    if (res.ok) {
      setMessages((prev) => prev.filter((x) => x.id !== m.id));
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent-soft">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-red-400/40 hover:text-red-300">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>

      <div className="mb-8">
        <p className="font-mono text-sm text-accent-soft">admin / inbox</p>
        <h1 className="mt-1 flex items-center gap-3 font-display text-3xl font-bold sm:text-4xl">
          <Inbox className="h-8 w-8 text-[#a855f7]" />
          Messages
          <span className="rounded-full border border-[#a855f7]/40 bg-[#a855f7]/10 px-3 py-1 font-mono text-sm text-accent-soft">
            {unread} unread
          </span>
        </h1>
      </div>

      {messages.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center text-muted">
          <Mail className="mx-auto mb-4 h-10 w-10 opacity-50" />
          <p className="font-display text-lg">Koi message nahi</p>
          <p className="mt-1 text-sm">Jaise hi koi feedback bhejega, yahan dikhega.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <article
              key={m.id}
              className={`glass-card rounded-2xl p-5 transition-opacity sm:p-6 ${m.read ? "opacity-60" : ""}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold">
                    {m.name}
                    {!m.read && (
                      <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[#22d3ee] align-middle" />
                    )}
                  </p>
                  <p className="text-sm text-accent-soft">{m.email}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted/70">
                    {new Date(m.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleRead(m)}
                    disabled={busyId === m.id}
                    title={m.read ? "Mark unread" : "Mark read"}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-emerald-400/40 hover:text-emerald-300 disabled:opacity-50"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => remove(m)}
                    disabled={busyId === m.id}
                    title="Delete"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-red-400/40 hover:text-red-300 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted">
                {m.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}