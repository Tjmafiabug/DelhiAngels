"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-05-24T09:00:00+05:30");

function getTimeLeft() {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const ACCENT_COLORS = ["#f97316", "#e03131", "#3b82f6"];

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null;

  const units = [
    { label: "Days",  value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins",  value: timeLeft.minutes },
  ];

  return (
    <div className="flex items-start gap-6 sm:gap-12 lg:gap-20">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex flex-col items-center min-w-[44px] sm:min-w-[56px] lg:min-w-[72px]">
          <div
            className="w-full h-px mb-3 sm:mb-4"
            style={{ backgroundColor: ACCENT_COLORS[i] }}
          />
          <span
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tabular-nums leading-none"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {pad(unit.value)}
          </span>
          <span className="text-[9px] sm:text-[11px] text-[#a1a1aa] uppercase tracking-[0.2em] mt-2 sm:mt-3">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
