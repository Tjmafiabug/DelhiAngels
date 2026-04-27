const ROWS = [
  { names: ["boAt", "Mamaearth", "Lenskart", "Nykaa", "mCaffeine", "Minimalist", "Noise", "Bewakoof", "Sugar", "Wakefit", "Plum"], size: "text-2xl", opacity: 0.15, reverse: false, speed: "32s" },
  { names: ["Plum", "The Man Company", "Clovia", "Wow", "Purplle", "Ustraa", "Beardo", "Pilgrim", "Bombay Shaving Co.", "Biotique"], size: "text-lg", opacity: 0.12, reverse: true, speed: "28s" },
  { names: ["Paper Boat", "Epigamia", "Vahdam", "Sleepy Owl", "Rage Coffee", "The Whole Truth", "Happilo", "Country Bean", "Bella Vita"], size: "text-3xl", opacity: 0.13, reverse: false, speed: "40s" },
  { names: ["Bombay Shaving Co.", "Blue Tea", "Slurrp Farm", "Raw Pressery", "Mensa Brands", "Heads Up For Tails", "Third Wave Coffee"], size: "text-xl", opacity: 0.14, reverse: true, speed: "25s" },
  { names: ["boAt", "Mamaearth", "Lenskart", "Nykaa", "mCaffeine", "Minimalist", "Noise", "Bewakoof", "Sugar", "Wakefit"], size: "text-2xl", opacity: 0.11, reverse: false, speed: "35s" },
  { names: ["Plum", "Wakefit", "The Man Company", "Clovia", "Wow", "Purplle", "Ustraa", "Beardo", "Meesho", "Pee Safe"], size: "text-lg", opacity: 0.13, reverse: true, speed: "30s" },
  { names: ["Vahdam", "Sleepy Owl", "Rage Coffee", "Paper Boat", "Epigamia", "The Whole Truth", "Happilo", "Bella Vita"], size: "text-xl", opacity: 0.12, reverse: false, speed: "38s" },
  { names: ["Sugar", "Noise", "Lenskart", "Mamaearth", "boAt", "Nykaa", "mCaffeine", "Minimalist", "Bewakoof", "Wakefit"], size: "text-2xl", opacity: 0.10, reverse: true, speed: "33s" },
  { names: ["Beardo", "Biotique", "Clovia", "Pilgrim", "Purplle", "The Man Company", "Ustraa", "Wow", "Bombay Shaving Co."], size: "text-lg", opacity: 0.13, reverse: false, speed: "27s" },
  { names: ["Country Bean", "Bella Vita", "Slurrp Farm", "Mensa Brands", "Third Wave Coffee", "Raw Pressery", "Heads Up For Tails"], size: "text-3xl", opacity: 0.11, reverse: true, speed: "42s" },
];

export default function BrandNameWall() {
  return (
    <>
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div
        className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 20%, black 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 20%, black 70%)",
        }}
      >
        {ROWS.map((row, i) => (
          <div key={i} className="flex overflow-hidden" style={{ opacity: row.opacity }}>
            <div
              className="flex items-center gap-8 shrink-0 whitespace-nowrap"
              style={{
                animation: `${row.reverse ? "marquee-right" : "marquee-left"} ${row.speed} linear infinite`,
              }}
            >
              {[...row.names, ...row.names, ...row.names].map((name, j) => (
                <span
                  key={j}
                  className={`${row.size} font-bold uppercase tracking-tight text-white shrink-0`}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {name}
                  <span className="text-[#f97316] mx-3 text-xs">·</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
