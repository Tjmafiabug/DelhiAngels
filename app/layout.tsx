import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'D2C Mafia × Delhi Angels — D2C Summit, Noida · May 24, 2026',
  description:
    'Join 200+ founders, investors, and operators at D2C Mafia × Delhi Angels — the premier D2C Summit in Noida. May 24, 2026.',
  openGraph: {
    title: 'D2C Mafia × Delhi Angels — D2C Summit, Noida · May 24, 2026',
    description:
      'Join 200+ founders, investors, and operators at D2C Mafia × Delhi Angels. May 24, 2026.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="bg-black text-white antialiased min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  )
}
