"use client";
import { useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react';
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

  // Ten similar fonts; we'll crossfade + width-normalize to feel like a morph
  const fontCycle = useMemo(
    () => [
      'ff-bebas',
      'ff-oswald',
      'ff-barlow',
      'ff-montserrat-alt',
      'ff-exo2',
      'ff-russo',
      'ff-staatliches',
      'ff-anton',
      'ff-display',
      'ff-recursive'
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [showNext, setShowNext] = useState(false);
  const [scaleNext, setScaleNext] = useState(1);
  const currentRef = useRef<HTMLSpanElement | null>(null);
  const nextRef = useRef<HTMLSpanElement | null>(null);

  // Tick every 200ms
  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => {
      setNextIndex((currentIndex + 1) % fontCycle.length);
      setShowNext(true);
    }, 200);
    return () => clearInterval(id);
  }, [prefersReduced, currentIndex, fontCycle.length]);

  // Measure and normalize widths just before we animate the next font in
  useLayoutEffect(() => {
    if (!showNext) return;
    const cur = currentRef.current;
    const nxt = nextRef.current;
    if (!cur || !nxt) return;
    // Ensure measurement after DOM applies font class
    const rAF = requestAnimationFrame(() => {
      const wCur = cur.getBoundingClientRect().width || 1;
      const wNxt = nxt.getBoundingClientRect().width || 1;
      setScaleNext(wCur / wNxt);
      // After we place and fade in, schedule swap
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setShowNext(false);
        setScaleNext(1);
      }, 200);
    });
    return () => cancelAnimationFrame(rAF);
  }, [showNext, currentIndex, nextIndex]);

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
        className="absolute inset-0 w-full h-full object-cover opacity-30 saturate-50"
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

      <div className="relative z-10 text-center px-6">
        <motion.h1
          className={`relative inline-block text-6xl sm:text-8xl md:text-9xl tracking-tight`}
          initial={prefersReduced ? false : { y: 20, opacity: 0 }}
          animate={prefersReduced ? {} : { y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* current font */}
          <span ref={currentRef} className={`neon-text block ${fontCycle[currentIndex]}`}>heyviru</span>
          {/* next font crossfading on top, width-normalized */}
          {showNext && (
            <span
              ref={nextRef}
              className={`neon-text block absolute inset-0 origin-left font-crossfade-in ${fontCycle[nextIndex]}`}
              style={{ transform: `scaleX(${scaleNext})` }}
            >
              heyviru
            </span>
          )}
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


