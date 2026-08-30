export default function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div
        className="absolute -left-56 -top-48 h-[30rem] w-[30rem] rounded-full animate-drift-a"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.32), rgba(99,102,241,0.12) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-64 top-1/4 h-[28rem] w-[28rem] rounded-full animate-drift-b"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.28), rgba(168,85,247,0.1) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-60 left-1/4 h-[30rem] w-[30rem] rounded-full animate-drift-c"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.2), rgba(34,211,238,0.07) 45%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-transparent to-[#050507]" />
    </div>
  );
}