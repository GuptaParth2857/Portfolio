import { marqueeItems } from "@/lib/data";

const doubled = [...marqueeItems, ...marqueeItems];

export default function Marquee() {
  return (
    <section className="marquee-mask relative overflow-hidden border-y border-white/[0.07] bg-white/[0.015] py-5 backdrop-blur-md [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {doubled.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center whitespace-nowrap font-mono text-sm uppercase tracking-widest text-muted/90"
              >
                <span className="px-8">{item}</span>
                <span className="bg-gradient-to-r from-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
                  ◆
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}