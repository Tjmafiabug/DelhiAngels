"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Speakers", href: "#speakers" },
  { label: "Agenda", href: "#agenda" },
  { label: "Partners", href: "#partners" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (href: string) => {
    if (!href.startsWith("#")) return;
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="border border-white/20 rounded-md p-1 flex-shrink-0">
              <Image
                src="/delhi-angels-logo.jpeg"
                alt="Delhi Angels"
                width={40}
                height={40}
                className="rounded object-contain"
              />
            </div>
            <div className="hidden sm:block leading-tight font-heading">
              <span className="text-white font-bold text-sm uppercase tracking-[-0.01em] block">
                D2C Mafia by Delhi Angels
              </span>
              <span className="text-white/50 text-[10px] uppercase tracking-[0.15em] font-medium">
                D2C Summit · Noida · May 24, 2026
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleAnchor(link.href); }}
                className="h-14 px-5 flex items-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login" className="text-[11px] uppercase tracking-[0.12em]">
                Sign In
              </Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/register" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] font-bold">
                Register Now
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile sheet trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="p-0 flex flex-col">
              {/* Sheet header */}
              <div className="flex items-center gap-3 px-6 h-20 border-b border-white/10 flex-shrink-0">
                <div className="border border-white/20 rounded-md p-1">
                  <Image
                    src="/delhi-angels-logo.jpeg"
                    alt="Delhi Angels"
                    width={36}
                    height={36}
                    className="rounded object-contain"
                  />
                </div>
                <div className="leading-tight font-heading">
                  <span className="text-white font-bold text-sm uppercase tracking-[-0.01em] block">
                    D2C Mafia by Delhi Angels
                  </span>
                  <span className="text-white/50 text-[10px] uppercase tracking-[0.12em] font-medium">
                    May 24, 2026 · Noida
                  </span>
                </div>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="nav">
                    <AccordionTrigger className="text-[13px] uppercase tracking-[0.12em]">
                      Navigate
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-1 pt-1">
                        {navLinks.map((link) => (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              onClick={(e) => { e.preventDefault(); handleAnchor(link.href); }}
                              className="block py-3 px-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/60 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Sheet footer CTAs */}
              <div className="flex flex-col gap-3 px-6 pb-8 pt-4 border-t border-white/10 flex-shrink-0">
                <Button variant="outline" asChild className="w-full h-12">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-[11px] uppercase tracking-[0.12em] font-bold"
                  >
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full h-12">
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.12em] font-bold"
                  >
                    Register Now
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}
