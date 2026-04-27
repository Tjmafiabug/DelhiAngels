"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PHOTOS = [
  "/highlights/highlight-1.jpg",
  "/highlights/highlight-2.jpg",
  "/highlights/highlight-3.jpg",
  "/highlights/highlight-4.jpg",
];

export default function HighlightsSlideshow() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((i) => (i + 1) % PHOTOS.length);
        setFading(false);
      }, 400);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-sm bg-[#111]">
      {PHOTOS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Event highlight ${i + 1}`}
          fill
          className="object-cover transition-opacity duration-400"
          style={{ opacity: i === current ? (fading ? 0 : 1) : 0 }}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={i === 0}
        />
      ))}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="h-0.5 rounded-full transition-all duration-300"
            style={{
              width: i === current ? "20px" : "6px",
              backgroundColor: i === current ? "#f97316" : "rgba(255,255,255,0.4)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
