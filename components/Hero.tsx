"use client";
import { useRef, useState, useMemo } from 'react';
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

  // Title animation removed as requested; keep static brand heading

  const videos = useMemo(() => [
    '/media/previews/sf1.webm',
    '/media/previews/event1.webm',
    '/media/previews/brand1.webm'
  ], []);
  const chosen = useMemo(() => videos[Math.floor(Math.random() * videos.length)], [videos]);

  return (
    <section id="hero" className="relative min-h-[80svh] grid place-items-center overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
        autoPlay
        playsInline
        loop
        muted
        preload="metadata"
        poster="/hero-poster.jpg"
        aria-label="Showreel hero background"
      >
        <source src={chosen} type="video/webm" />
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 text-center px-6 section-tight">
        <motion.h1
          className={`relative inline-block text-6xl sm:text-8xl md:text-9xl tracking-tight`}
          initial={prefersReduced ? false : { y: 20, opacity: 0 }}
          animate={prefersReduced ? {} : { y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="neon-text inline-block font-display">heyviru</span>
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
          <a href="#contact" className="btn-primary">Book an edit</a>
          <a href="#work" className="btn-outline">Watch showreel</a>
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


