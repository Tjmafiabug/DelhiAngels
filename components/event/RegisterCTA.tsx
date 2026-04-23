"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";

export default function RegisterCTA() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);

  return (
    <section className="relative overflow-hidden bg-[#000000] py-16 sm:py-24 lg:py-40 px-4 sm:px-6 lg:px-8">
      {/* Ambient radial — orange, subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(249,115,22,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Top separator line */}
      <div className="max-w-5xl mx-auto">
        <div className="w-full h-px bg-white/10 mb-16" />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        {/* Eyebrow */}
        <p className={`reveal ${inView ? "in-view" : ""} text-[#f97316] text-xs font-bold uppercase tracking-[0.3em] mb-8`}>
          Secure Your Spot
        </p>

        {/* Bold uppercase headline */}
        <h2
          className={`reveal reveal-delay-1 ${inView ? "in-view" : ""} text-4xl sm:text-6xl lg:text-8xl font-extrabold uppercase tracking-tight leading-none text-white mb-10`}
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Ready to be<br />
          <span className="text-[#f97316]">in the room?</span>
        </h2>

        <p className={`reveal reveal-delay-2 ${inView ? "in-view" : ""} text-[#a1a1aa] text-base sm:text-lg max-w-2xl mb-3 leading-relaxed`}>
          Seats are limited. Register now to secure your place at D2C Mafia × Delhi Angels —
          and get access to the exclusive attendee networking portal before the event.
        </p>
        <p className={`reveal reveal-delay-3 ${inView ? "in-view" : ""} text-[#a1a1aa]/60 text-sm mb-14 uppercase tracking-widest`}>
          Approved registrants receive a magic link to the attendee directory.
        </p>

        {/* CTA row */}
        <div className={`reveal reveal-delay-4 ${inView ? "in-view" : ""} flex flex-col sm:flex-row items-start gap-4`}>
          <Link
            href="/register"
            className="glow-pulse inline-flex items-center justify-center gap-3 bg-[#f97316] hover:bg-[#ea580c] active:scale-[0.97] text-white font-bold uppercase tracking-[0.12em] text-sm px-10 py-4 transition-all duration-150"
          >
            Get Your Pass
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 border border-[#3b82f6]/40 hover:border-[#3b82f6] hover:bg-[#3b82f6]/10 text-[#3b82f6] hover:text-white font-bold uppercase tracking-[0.12em] text-sm px-10 py-4 transition-all duration-150"
          >
            Already Registered
          </Link>
        </div>
      </div>
    </section>
  );
}
