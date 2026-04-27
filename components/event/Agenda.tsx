type SessionType = "keynote" | "panel" | "networking" | "break" | "pitch";

type Session = {
  time: string;
  title: string;
  type: SessionType;
  speaker?: string;
  description?: string;
};

const sessions: Session[] = [
  { time: "09:00", title: "Registration & Networking Breakfast", type: "networking" },
  {
    time: "10:00",
    title: "Opening Keynote",
    type: "keynote",
    speaker: "TBA",
    description: "Setting the stage for D2C in 2026 and beyond.",
  },
  {
    time: "11:00",
    title: "Panel: Cracking D2C Growth in India",
    type: "panel",
    speaker: "Founder Panel",
    description: "How top brands crossed ₹50Cr ARR and what actually worked.",
  },
  {
    time: "12:00",
    title: "Fireside Chat: Angel Investing in D2C",
    type: "keynote",
    speaker: "Delhi Angels",
    description: "What investors look for and how to get their attention.",
  },
  {
    time: "13:00",
    title: "Networking Lunch",
    type: "break",
    description: "Build your network over a curated lunch.",
  },
  {
    time: "14:00",
    title: "Panel: Brand Building vs Performance Marketing",
    type: "panel",
    speaker: "Growth Panel",
  },
  {
    time: "15:00",
    title: "Startup Pitch Showcase",
    type: "pitch",
    description: "Selected D2C startups pitch live to a panel of investors.",
  },
  {
    time: "16:30",
    title: "Investor–Founder Roundtables",
    type: "networking",
    description: "Structured small-group sessions for direct conversations.",
  },
  {
    time: "17:30",
    title: "Closing Remarks & Open Networking",
    type: "networking",
  },
];

const typeConfig: Record<SessionType, { label: string; color: string; dot: string }> = {
  keynote:    { label: "KEYNOTE",    color: "bg-[#f97316]/10 text-[#f97316] border-[#f97316]/30",  dot: "bg-[#f97316]" },
  panel:      { label: "PANEL",      color: "bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/30",  dot: "bg-[#3b82f6]" },
  pitch:      { label: "PITCH",      color: "bg-[#e03131]/10 text-[#e03131] border-[#e03131]/30",  dot: "bg-[#e03131]" },
  networking: { label: "NETWORKING", color: "bg-white/6 text-[#a1a1aa] border-white/10",            dot: "bg-[#a1a1aa]" },
  break:      { label: "BREAK",      color: "bg-white/6 text-[#a1a1aa] border-white/10",            dot: "bg-[#a1a1aa]" },
};

export default function Agenda() {
  return (
    <section id="agenda" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">

        {/* Section header — Step style */}
        <div className="mb-10 sm:mb-16">
          <p className="text-[#f97316] text-xs font-bold uppercase tracking-[0.25em] mb-5">
            Programme
          </p>
          <div className="w-full h-px bg-white/10 mb-8" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-none">
              Coming Soon
            </h2>
            <p className="text-[#a1a1aa] text-sm uppercase tracking-[0.15em] sm:text-right">
              Gurugram · Full-Day Summit
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[88px] sm:left-[104px] top-0 bottom-0 w-px bg-white/8 hidden sm:block" />

          <div className="flex flex-col gap-3">
            {sessions.map((session, i) => {
              const cfg = typeConfig[session.type];
              const isMuted = session.type === "break" || session.type === "networking";
              return (
                <div key={i} className="flex gap-4 sm:gap-6 group">
                  {/* Time */}
                  <div className="flex-shrink-0 w-[72px] sm:w-[88px] text-right pt-4">
                    <span className="text-sm font-bold tabular-nums text-[#a1a1aa] group-hover:text-white transition-colors duration-150">
                      {session.time}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="flex-shrink-0 hidden sm:flex items-start pt-[22px] relative z-10">
                    <div className={`w-2 h-2 rounded-full ring-2 ring-[#0a0a0a] ${cfg.dot}`} />
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 border rounded-none p-4 sm:p-5 transition-all duration-200 mb-1 ${
                      isMuted
                        ? "bg-transparent border-white/6 hover:border-white/10"
                        : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/16"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {/* Type badge — square, uppercase */}
                      <span
                        className={`inline-block text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 border flex-shrink-0 ${cfg.color}`}
                      >
                        {cfg.label}
                      </span>
                    </div>

                    <h3 className={`font-bold text-sm sm:text-base leading-snug mb-1 ${isMuted ? "text-[#a1a1aa]" : "text-white"}`}>
                      {session.title}
                    </h3>

                    {session.speaker && (
                      <p className="text-[#a1a1aa] text-xs uppercase tracking-widest mb-1">
                        {session.speaker}
                      </p>
                    )}
                    {session.description && (
                      <p className="text-[#a1a1aa] text-sm leading-relaxed">
                        {session.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
