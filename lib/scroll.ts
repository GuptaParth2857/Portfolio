"use client";

export function scrollToId(id: string) {
  const target = document.querySelector(id);
  if (!target) return;

  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: { offset?: number }) => void } }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: -76 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: { offset?: number }) => void } }).__lenis;
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}