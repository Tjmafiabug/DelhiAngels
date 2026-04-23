# Delhi Angels Event Website — Step-Inspired Redesign Plan

## Goal
Apply the Step Dubai conference design language to all event-facing components, using
Delhi Angels brand colors (orange, red, blue) on a pure-black Step-style base.

## Design Reference
Source file: `../Step page source.html` (dubai.stepconference.com)

## Color System

```
Backgrounds (Step black):
  --bg-base:     #000000   (pure black — primary bg)
  --bg-surface:  #0a0a0a   (near-black — alternating sections)
  --bg-elevated: #111111   (cards, elevated surfaces)

Brand accents (from Delhi Angels logo):
  --orange:  #f97316   (primary CTA, hero title highlight)
  --red:     #e03131   (secondary accent — section markers, badges)
  --blue:    #3b82f6   (tertiary accent — agenda tags, links)

Text:
  --white:   #ffffff
  --muted:   #a1a1aa
  --subtle:  rgba(255,255,255,0.08)  (borders)
```

## Typography (Step language)
- Section headings: ALL CAPS, `font-weight: 700-800`, wide `letter-spacing`
- Small eyebrow labels: ALL CAPS, 11-12px, `tracking-[0.2em]`
- Body: normal case, muted color
- Countdown/stats numbers: large, tabular, bold

## Design Patterns to Apply (from Step)

### 1. Stats Bar
- 4 columns, each: thin top line separator → large number → label below
- No rounded cards. Raw horizontal columns, dark bg.
- Numbers: orange / red / blue / white alternating

### 2. Speaker Grid (og-grid style)
- Full-bleed portrait photo cards
- Dark gradient overlay at bottom always visible
- Name + company in bottom banner
- Hover: dark overlay + white "+" icon appears
- Placeholder state: charcoal grey boxes with "TBA"

### 3. Partners (tiered, skewed double-border)
- Each tier gets its own labeled section: "PRESENTED BY", "GOLD PARTNER", "PARTNERS"
- Logos in a `double-border skewed` container (CSS transform + nested border)
- Dark section background (#0a0a0a)

### 4. Navbar
- Transparent → black/blur on scroll
- Nav links: uppercase, letter-spaced, muted → white on hover
- CTA: uppercase, orange bg, rectangular (rounded-lg max)

### 5. Hero
- Full-screen dark bg (no video needed — subtle radial glow OK)
- H1: giant uppercase event name, two lines
- Theme tagline: small caps, letter-spaced, orange or red
- Date + Venue: stacked below in muted, lighter weight
- Countdown: Days / Hrs / Mins (no seconds, matching Step)
- CTA: "GET YOUR PASS" (orange, rectangular) + "LEARN MORE" (border)

### 6. "What Goes On" / About Section
- Two-column: story text left, stats bar right (or stats as full-width strip above)
- Step uses story text + YouTube embed two-col; we skip video, use stats grid instead

### 7. Agenda
- Keep vertical timeline format
- Restyle headers to uppercase bold
- Type tags: orange=keynote, red=pitch, blue=panel, muted=break/networking

### 8. Register CTA
- Full-width black section
- Bold uppercase H2
- Orange primary button + blue/muted secondary

### 9. Footer
- Social icons in circular "dot" buttons (Step style: `border-radius:50%`, icon inside)
- Email prominently listed
- Footer nav in two columns

---

## Session Breakdown

### SESSION 1 — Foundation + Hero + Navbar
Files to edit:
- `app/globals.css` → update CSS vars to new color system
- `components/event/Navbar.tsx` → Step nav style
- `components/event/Hero.tsx` → full rebuild, Step hero
- `components/event/CountdownTimer.tsx` → remove seconds, larger Step style

### SESSION 2 — About + Speakers
Files to edit:
- `components/event/About.tsx` → story text + raw stats bar
- `components/event/Speakers.tsx` → full-bleed photo cards, hover overlay

### SESSION 3 — Agenda + Sponsors + RegisterCTA
Files to edit:
- `components/event/Agenda.tsx` → uppercase headers, updated tag colors
- `components/event/Sponsors.tsx` → tiered with skewed double-border
- `components/event/RegisterCTA.tsx` → bold full-width CTA

### SESSION 4 — Footer + Polish
Files to edit:
- `components/event/Footer.tsx` → circular dot socials, Step layout
- `app/globals.css` → any remaining custom CSS utilities
- Cross-section polish: spacing, section transitions, responsive checks

---

## Implementation Notes

### Next.js 16.2.4 specifics
- Use `next/image` with explicit `width` + `height` OR `fill` prop (not both)
- `onLoadingComplete` is deprecated — use `onLoad` instead
- App Router, all components default server unless `"use client"` needed
- Tailwind v4 via `@import "tailwindcss"` (no config file needed)

### CSS for skewed double-border (Sponsors)
```css
.double-border {
  position: relative;
  border: 1px solid rgba(255,255,255,0.15);
  padding: 2rem;
}
.double-border::after {
  content: '';
  position: absolute;
  inset: -5px;
  border: 1px solid rgba(255,255,255,0.05);
  transform: skewX(-1.5deg);
  pointer-events: none;
}
```

### Speaker card hover (pure Tailwind)
```tsx
<div className="group relative overflow-hidden">
  <img className="w-full h-full object-cover" />
  {/* overlay */}
  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
    <span className="text-white text-4xl font-light">+</span>
  </div>
  {/* bottom banner */}
  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3">
    <p className="text-white font-semibold text-sm">{name}</p>
    <p className="text-[#a1a1aa] text-xs">{company}</p>
  </div>
</div>
```

### Stats bar line separator
```tsx
<div className="flex flex-col items-center">
  <div className="w-full h-px bg-orange mb-4" />
  <h2 className="text-5xl font-bold text-white">200+</h2>
  <p className="text-muted text-sm uppercase tracking-widest mt-1">Attendees</p>
</div>
```

---

## Status Tracker

| Session | Status |
|---------|--------|
| SESSION 1 — Foundation + Hero + Navbar | ✅ Complete |
| SESSION 2 — About + Speakers | ✅ Complete |
| SESSION 3 — Agenda + Sponsors + RegisterCTA | ✅ Complete |
| SESSION 4 — Footer + Polish | ✅ Complete |
