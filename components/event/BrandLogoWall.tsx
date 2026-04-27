"use client";

import Image from "next/image";

const ROW1 = [
  { name: "boAt", file: "boat.png" },
  { name: "Mamaearth", file: "mamaearth.jpg" },
  { name: "Lenskart", file: "lenskart.png" },
  { name: "Nykaa", file: "nykaa.png" },
  { name: "Noise", file: "noise.png" },
  { name: "mCaffeine", file: "mcaffeine.png" },
  { name: "Minimalist", file: "minimalist.png" },
];

const ROW2 = [
  { name: "Bewakoof", file: "bewakoof.png" },
  { name: "Sugar", file: "sugar.jpg" },
  { name: "Wow", file: "wow.png" },
  { name: "Plum", file: "plum.png" },
  { name: "Bombay Shaving Co.", file: "bombay-shaving.png" },
  { name: "Clovia", file: "clovia.png" },
  { name: "The Man Company", file: "the-man-company.png" },
];

function LogoStrip({ brands, reverse }: { brands: typeof ROW1; reverse?: boolean }) {
  const doubled = [...brands, ...brands];
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex gap-8 shrink-0"
        style={{
          animation: `marquee${reverse ? "-reverse" : ""} 30s linear infinite`,
        }}
      >
        {doubled.map((b, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-24 h-12 shrink-0 grayscale"
          >
            <Image
              src={`/brands/${b.file}`}
              alt={b.name}
              width={80}
              height={40}
              className="object-contain max-h-10 w-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BrandLogoWall() {
  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div className="absolute inset-0 flex flex-col justify-center gap-6 pointer-events-none select-none opacity-[0.07]" aria-hidden="true">
        <LogoStrip brands={ROW1} />
        <LogoStrip brands={ROW2} reverse />
        <LogoStrip brands={ROW1} />
        <LogoStrip brands={ROW2} reverse />
      </div>
    </>
  );
}
