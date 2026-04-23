import { LogoCloud } from "@/components/ui/logo-cloud";

const logos = [
  { src: "/partners/hub71.png",         alt: "Hub71" },
  { src: "/partners/in5.png",           alt: "in5" },
  { src: "/partners/dic.png",           alt: "Dubai Internet City" },
  { src: "/partners/dubai-chamber.png", alt: "Dubai Chamber" },
  { src: "/partners/atlassian.png",     alt: "Atlassian" },
  { src: "/partners/zest.png",          alt: "Zest Equity" },
  { src: "/partners/mms.png",           alt: "MMS" },
  { src: "/partners/genspark.png",      alt: "Genspark.ai" },
  { src: "/partners/carta.png",         alt: "Carta" },
];

export default function Sponsors() {
  return (
    <section id="partners" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#f97316] text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Sponsors &amp; Partners
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-none mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Backed by<br />the Best
          </h2>
          <p className="text-[#a1a1aa] text-sm uppercase tracking-[0.15em]">
            Trusted by the region&apos;s leading funds &amp; platforms
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)] mb-8" />

        {/* Marquee */}
        <LogoCloud logos={logos} />

        {/* Divider */}
        <div className="h-px bg-white/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)] mt-8" />

      </div>
    </section>
  );
}
