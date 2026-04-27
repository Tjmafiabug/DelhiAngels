"use client";

const ACCENT_COLORS = ["#f97316", "#e03131", "#3b82f6"];

export default function CountdownTimer() {
  return (
    <div className="flex items-start gap-6 sm:gap-12 lg:gap-20">
      {ACCENT_COLORS.map((color, i) => (
        <div key={i} className="flex flex-col items-center min-w-[44px] sm:min-w-[56px] lg:min-w-[72px]">
          <div className="w-full h-px mb-3 sm:mb-4" style={{ backgroundColor: color }} />
          <span
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-none"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            —
          </span>
          <span className="text-[9px] sm:text-[11px] text-[#a1a1aa] uppercase tracking-[0.2em] mt-2 sm:mt-3">
            {["Days", "Hours", "Mins"][i]}
          </span>
        </div>
      ))}
    </div>
  );
}
