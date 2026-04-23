"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

type Speaker = {
  name: string;
  title: string;
  company: string;
  photo?: string;
};

const speakers: Speaker[] = [
  {
    name: "Timothy Draper",
    title: "Founder",
    company: "Draper Associates",
    photo: "/speakers/tim-draper.png",
  },
  {
    name: "Fadi Ghandour",
    title: "Executive Chairman",
    company: "Wamda Capital",
    photo: "/speakers/fadi-ghandour.jpeg",
  },
  {
    name: "Noor Sweid",
    title: "Founder & Managing Partner",
    company: "Global Ventures",
    photo: "/speakers/noor-sweid.png",
  },
  {
    name: "Alain Bejjani",
    title: "Business Leader & Investor",
    company: "Independent",
    photo: "/speakers/alain-bejjani.jpeg",
  },
  {
    name: "Rania Masri",
    title: "CEO",
    company: "The Giving Movement",
    photo: "/speakers/rania-masri.png",
  },
  {
    name: "Armineh Baghoomian",
    title: "Managing Director",
    company: "Partners for Growth",
    photo: "/speakers/armineh-baghoomian.jpg",
  },
  {
    name: "Mahmoud Ward",
    title: "Director of Investment",
    company: "Dubai Future District Fund",
    photo: "/speakers/mahmoud-ward.jpg",
  },
  {
    name: "Prashant K. (PK) Gulati",
    title: "Founder",
    company: "The Smart Start Fund · TiE Dubai",
    photo: "/speakers/pk-gulati.png",
  },
  {
    name: "HE. Mothanna Gharaibeh",
    title: "CEO",
    company: "The Fifth",
    photo: "/speakers/mothanna-gharaibeh.jpg",
  },
];

const PLACEHOLDER_COUNT = 6;

function SpeakerCard({ speaker, delay, inView }: { speaker?: Speaker; delay: number; inView: boolean }) {
  const isTBA = !speaker;

  return (
    <div
      className={`reveal group relative overflow-hidden aspect-[3/4] bg-[#1a1a1a] cursor-default ${inView ? "in-view" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Photo or charcoal placeholder */}
      {speaker?.photo ? (
        <Image
          src={speaker.photo}
          alt={speaker.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-[#1c1c1c]" />
      )}

      {/* TBA label */}
      {isTBA && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#333333] text-xs font-bold uppercase tracking-[0.35em] select-none">
            TBA
          </span>
        </div>
      )}

      {/* Always-visible gradient */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* Name/company — slides up slightly on hover */}
      <div className="absolute bottom-0 inset-x-0 px-4 pb-4 z-10 translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
        <p
          className="text-white font-semibold text-sm leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {speaker?.name ?? "Speaker"}
        </p>
        <p className="text-[#a1a1aa] text-xs mt-0.5 leading-tight">
          {speaker
            ? `${speaker.title} · ${speaker.company}`
            : "Announcement coming soon"}
        </p>
      </div>

      {/* Hover overlay — orange accent border + glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, rgba(249,115,22,0.06) 0%, transparent 50%)",
          boxShadow: "inset 0 0 0 1px rgba(249,115,22,0.35)",
        }}
      />
    </div>
  );
}

export default function Speakers() {
  const { ref: headerRef, inView: headerInView } = useReveal<HTMLDivElement>();
  const { ref: gridRef, inView: gridInView } = useReveal<HTMLDivElement>(0.08);

  const items =
    speakers.length > 0 ? speakers : (Array(PLACEHOLDER_COUNT).fill(undefined) as undefined[]);

  return (
    <section id="speakers" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div ref={headerRef} className={`reveal mb-12 ${headerInView ? "in-view" : ""}`}>
          <span className="inline-block text-[#f97316] text-[11px] font-semibold uppercase tracking-[0.2em] mb-5">
            Speakers
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white leading-[1.05]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Hear From
            <br />
            <span className="text-[#f97316]">The Best</span>
          </h2>
          {speakers.length === 0 && (
            <p className="text-[#a1a1aa] text-[11px] font-semibold uppercase tracking-[0.18em] mt-4">
              Speaker announcements coming soon
            </p>
          )}
        </div>

        {/* Full-bleed portrait grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {items.map((speaker, i) => (
            <SpeakerCard
              key={(speaker as Speaker | undefined)?.name ?? i}
              speaker={speaker as Speaker | undefined}
              delay={i * 60}
              inView={gridInView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
