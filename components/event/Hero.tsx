import Link from 'next/link'
import CountdownTimer from './CountdownTimer'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden bg-black">

      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        aria-hidden="true"
      >
        <source src="/video/highlights.mp4" type="video/mp4" />
      </video>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 35%, rgba(249,115,22,0.10) 0%, transparent 65%)',
        }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Eyebrow */}
        <p
          className="hero-enter hero-d0 text-[#f97316] text-[11px] font-semibold uppercase tracking-[0.25em] mb-8"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          May 24, 2026 &nbsp;·&nbsp; Noida, India
        </p>

        {/* H1 */}
        <h1
          className="font-bold text-white uppercase leading-[0.95] tracking-[-0.02em] mb-6"
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
          }}
        >
          <span className="hero-enter hero-d1 block">D2C Mafia</span>
          <span className="hero-enter hero-d2 block text-[#f97316]">by Delhi Angels</span>
        </h1>

        {/* Tagline */}
        <p className="hero-enter hero-d3 text-[#a1a1aa] text-[11px] sm:text-xs uppercase tracking-[0.2em] max-w-md mx-auto mb-12 leading-loose">
          Where India&apos;s top D2C founders meet capital
        </p>

        {/* CTAs */}
        <div className="hero-enter hero-d4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            href="/register"
            className="glow-pulse inline-flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea580c] active:scale-[0.97] text-white font-bold uppercase tracking-[0.12em] text-[11px] px-8 py-4 rounded-lg transition-all duration-200 w-full sm:w-auto"
          >
            Get Your Pass
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <a
            href="#about"
            className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-semibold uppercase tracking-[0.12em] text-[11px] px-8 py-4 rounded-lg transition-all duration-200 w-full sm:w-auto"
          >
            Learn More
          </a>
        </div>

        {/* Countdown */}
        <div className="hero-enter hero-d5 flex flex-col items-center gap-4">
          <p className="text-[#a1a1aa] text-[10px] uppercase tracking-[0.2em]">
            Event starts in
          </p>
          <CountdownTimer />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to bottom, transparent, #000000)',
        }}
      />
    </section>
  )
}
