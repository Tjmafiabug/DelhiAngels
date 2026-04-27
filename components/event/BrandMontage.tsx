"use client";

import { useEffect, useState } from "react";

const BRANDS = [
  { name: "boAt", stat: "₹3,000 Cr revenue" },
  { name: "Mamaearth", stat: "Listed at ₹10,000 Cr valuation" },
  { name: "Lenskart", stat: "$4.5B valuation" },
  { name: "Sugar Cosmetics", stat: "₹500 Cr revenue" },
  { name: "Noise", stat: "#1 smartwatch brand in India" },
  { name: "Wakefit", stat: "$150M raised" },
  { name: "Bombay Shaving Co.", stat: "₹100 Cr ARR" },
  { name: "Wow Skin Science", stat: "$50M revenue" },
  { name: "Bewakoof", stat: "2M+ orders/month" },
  { name: "Plum", stat: "Bootstrapped to ₹200 Cr" },
];

const HOLD_MS = 1600;
const FADE_MS = 400;

export default function BrandMontage() {
  const [phase, setPhase] = useState<"brand" | "tagline">("brand");
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (phase === "tagline") return;

    const hold = setTimeout(() => {
      setVisible(false);
      const next = setTimeout(() => {
        if (index + 1 >= BRANDS.length) {
          setPhase("tagline");
          setVisible(true);
        } else {
          setIndex((i) => i + 1);
          setVisible(true);
        }
      }, FADE_MS);
      return () => clearTimeout(next);
    }, HOLD_MS);

    return () => clearTimeout(hold);
  }, [index, phase]);

  return (
    <div className="relative w-full aspect-video bg-[#050505] overflow-hidden flex items-center justify-center rounded-sm">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Orange glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249,115,22,0.07) 0%, transparent 70%)",
        }}
      />

      {phase === "brand" && (
        <div
          className="flex flex-col items-center gap-3 text-center px-8"
          style={{
            transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <span className="text-[10px] sm:text-xs text-[#f97316] uppercase tracking-[0.3em] font-semibold">
            Started as D2C
          </span>
          <h3
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-none"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {BRANDS[index].name}
          </h3>
          <p className="text-[#a1a1aa] text-sm sm:text-base tracking-wide">
            {BRANDS[index].stat}
          </p>
        </div>
      )}

      {phase === "tagline" && (
        <div
          className="flex flex-col items-center gap-4 text-center px-8"
          style={{
            transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <span className="text-[10px] sm:text-xs text-[#f97316] uppercase tracking-[0.3em] font-semibold">
            D2C Mafia × Delhi Angels
          </span>
          <h3
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-white">The next D2C Mafia</span>
            <br />
            <span className="text-[#f97316]">could be your brand.</span>
          </h3>
          <p className="text-[#a1a1aa] text-sm uppercase tracking-[0.2em] mt-2">
            Gurugram · Coming Soon 2026
          </p>
        </div>
      )}

      {/* Progress dots */}
      {phase === "brand" && (
        <div className="absolute bottom-4 flex gap-1.5">
          {BRANDS.map((_, i) => (
            <div
              key={i}
              className="h-0.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? "20px" : "6px",
                backgroundColor: i === index ? "#f97316" : "#333",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
