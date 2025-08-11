"use client";

import { useEffect, useMemo, useState } from 'react';

export function ScribbleCanvas() {
  // A small set of decorative scribbles placed around the viewport.
  // Low-opacity, pointer-events disabled, and blended for a graphite feel.
  const [scribbles, setScribbles] = useState<{ src: string; style: React.CSSProperties; depth: number }[]>([]);

  // Generate a dense field of doodles once per mount
  useEffect(() => {
    const sprites = [
      '/scribbles/loop.svg',
      '/scribbles/star.svg',
      '/scribbles/wave.svg',
      '/scribbles/underline.svg',
      '/scribbles/circle.svg',
      '/scribbles/zigzag.svg',
      '/scribbles/arrow.svg',
      '/scribbles/heart.svg',
      '/scribbles/cloud.svg',
      '/scribbles/bolt.svg',
      '/scribbles/note.svg',
      '/scribbles/cam.svg',
      '/scribbles/clap.svg',
      '/scribbles/bubble.svg',
      '/scribbles/cross.svg',
      '/scribbles/squiggle.svg'
    ];
    const items: { src: string; style: React.CSSProperties; depth: number }[] = [];
    const count = 48; // dense field
    for (let i = 0; i < count; i++) {
      const src = sprites[Math.floor(Math.random() * sprites.length)];
      const top = Math.floor(Math.random() * 90) + 2; // 2% - 92%
      const left = Math.floor(Math.random() * 90) + 2;
      const width = Math.floor(60 + Math.random() * 220); // 60-280px
      const rotate = Math.floor(Math.random() * 360);
      const base = 0.06 + Math.random() * 0.08;
      const opacity = (base * 0.5).toFixed(2); // lighten ~50%
      const depth = 8 + Math.floor(Math.random() * 20);
      items.push({
        src,
        style: {
          top: `${top}%`,
          left: `${left}%`,
          width,
          transform: `rotate(${rotate}deg)` as unknown as string,
          opacity: Number(opacity),
          animationDelay: `${(Math.random() * 2).toFixed(2)}s`,
          animationDuration: `${(0.8 + Math.random() * 0.8).toFixed(2)}s`
        },
        depth
      });
    }
    setScribbles(items);
  }, []);

  // simple parallax on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let lastY = window.scrollY || 0;
    let vy = 0; // vertical scroll velocity proxy
    let mx = 0, my = 0; // mouse position (0..1)
    const onScroll = () => {
      const y = window.scrollY || 0;
      vy = y - lastY;
      lastY = y;
      const els = document.querySelectorAll('[data-scribble]');
      els.forEach((el) => {
        const d = Number((el as HTMLElement).dataset.depth || 12);
        const swayX = ((mx - 0.5) * 14) / d; // mouse sway
        const swayY = ((my - 0.5) * 10) / d;
        const inertial = (vy / (d * 1.5));
        (el as HTMLElement).style.transform = `translate(${(y / d + inertial + swayX).toFixed(2)}px, ${(y / d + swayY).toFixed(2)}px)`;
      });
    };
    const onMouse = (ev: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      mx = ev.clientX / w;
      my = ev.clientY / h;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {scribbles.map((s, i) => (
        <img
          key={i}
          data-scribble
          src={s.src}
          alt=""
          className="scribble-draw"
          style={{ position: 'absolute', mixBlendMode: 'multiply', willChange: 'transform', transition: 'transform 0.2s linear', ...s.style }}
          data-depth={s.depth}
        />)
      )}
    </div>
  );
}


