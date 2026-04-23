"use client";

import { useReveal } from "@/hooks/useReveal";
import { useCounter } from "@/hooks/useCounter";

const stats = [
  { value: 200, suffix: "+", label: "Attendees",      color: "text-[#f97316]", line: "bg-[#f97316]" },
  { value: 50,  suffix: "+", label: "Startups",       color: "text-[#e03131]", line: "bg-[#e03131]" },
  { value: 30,  suffix: "+", label: "Investors",      color: "text-[#3b82f6]", line: "bg-[#3b82f6]" },
  { value: 1,   suffix: "",  label: "Day of Density", color: "text-white",     line: "bg-white" },
];

function StatItem({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) {
  const count = useCounter(stat.value, inView);
  return (
    <div className="flex flex-col py-6 pr-4 sm:py-8 sm:pr-8 lg:pr-10">
      <div
        className={`w-full h-px mb-5 ${stat.line} ${inView ? "line-grow" : "scale-x-0 origin-left"}`}
        style={{ transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
      <div
        className={`text-4xl sm:text-5xl lg:text-6xl font-bold tabular-nums mb-2 ${stat.color}`}
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {count}{stat.suffix}
      </div>
      <p className="text-[#a1a1aa] text-[11px] font-semibold uppercase tracking-[0.18em]">
        {stat.label}
      </p>
    </div>
  );
}

export default function About() {
  const { ref: copyRef, inView: copyInView } = useReveal<HTMLDivElement>();
  const { ref: statsRef, inView: statsInView } = useReveal<HTMLDivElement>(0.25);

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: story copy */}
          <div ref={copyRef} className={`reveal ${copyInView ? "in-view" : ""}`}>
            <span className="inline-block text-[#f97316] text-[11px] font-semibold uppercase tracking-[0.2em] mb-5">
              About the Event
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white mb-8 leading-[1.05]"
              style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.01em" }}
            >
              Where D2C Builders
              <br />
              <span className="text-[#f97316]">Meet Capital</span>
            </h2>
            <p className="text-[#a1a1aa] text-base leading-relaxed mb-5">
              D2C Mafia × Delhi Angels brings together the best direct-to-consumer founders,
              growth operators, and angel investors in one room for a full day of high-signal
              conversations, candid pitches, and genuine connections.
            </p>
            <p className="text-[#a1a1aa] text-base leading-relaxed">
              Whether you are building your first brand, scaling to ₹100Cr, or writing your
              first cheque — this is the room you need to be in. Held in Noida on May 24,
              2026, the summit is capped to keep conversations real.
            </p>
          </div>

          {/* Right: stats + video */}
          <div className="flex flex-col gap-10">
            <div ref={statsRef} className="grid grid-cols-2">
              {stats.map((stat) => (
                <StatItem key={stat.label} stat={stat} inView={statsInView} />
              ))}
            </div>

            {/* Highlights video */}
            <div className={`reveal reveal-delay-3 ${statsInView ? "in-view" : ""} relative w-full aspect-video`}>
              <iframe
                src="https://www.youtube.com/embed/wsHsVrWMZ1o?si=g7u7LbRjmuiNN9RE"
                title="Event Highlights"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
