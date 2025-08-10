"use client";
import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReduced = useReducedMotion();
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section id="hero" className="relative min-h-[80svh] grid place-items-center overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        autoPlay
        playsInline
        loop
        muted
        preload="metadata"
        poster="/hero-poster.jpg"
        aria-label="Showreel hero background"
      >
        <source src="/media/hero.webm" type="video/webm" />
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 text-center px-6">
        <motion.h1
          className="font-display text-4xl sm:text-6xl md:text-7xl tracking-tight"
          initial={prefersReduced ? false : { y: 20, opacity: 0 }}
          animate={prefersReduced ? {} : { y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Virendra Sankpal — Video Editor
        </motion.h1>
        <motion.p
          className="mt-4 text-white/80"
          initial={prefersReduced ? false : { y: 20, opacity: 0 }}
          animate={prefersReduced ? {} : { y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Chaotic cuts. Organized stories.
        </motion.p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#contact" className="rounded-full px-5 py-3 bg-[var(--neon-cyan)] text-black font-semibold">Book an edit</a>
          <a href="#work" className="rounded-full px-5 py-3 border border-white/20">Watch showreel</a>
          <button onClick={toggleMute} className="rounded-full px-3 py-3 border border-white/20" aria-pressed={!muted} aria-label="Toggle sound">
            {muted ? 'Unmute' : 'Mute'}
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-white/70">
          <a href="https://instagram.com/heyviru" target="_blank" rel="noopener noreferrer">Instagram @heyviru</a>
          <span>•</span>
          <a href="https://x.com/heyviru" target="_blank" rel="noopener noreferrer">X @heyviru</a>
        </div>
        <p className="mt-2 text-xs text-white/50">one step at a time.</p>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </section>
  );
}


