"use client";

import { useEffect } from 'react';

export function DoodleRails() {
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const l = document.querySelector('[data-rail="left"]') as HTMLElement | null;
      const r = document.querySelector('[data-rail="right"]') as HTMLElement | null;
      if (l) l.style.transform = `translateY(${(y / 8).toFixed(2)}px)`;
      if (r) r.style.transform = `translateY(${(y / 10).toFixed(2)}px)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const Item = ({ src, w }: { src: string; w: number }) => (
    <img src={src} alt="" style={{ width: w }} className="opacity-20 mix-blend-multiply" />
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 z-[2] hidden md:block">
      <div data-rail="left" className="absolute left-2 top-10 flex flex-col gap-6">
        <Item src="/scribbles/pencil.svg" w={36} />
        <Item src="/scribbles/brush.svg" w={40} />
        <Item src="/scribbles/palette.svg" w={42} />
        <Item src="/scribbles/film.svg" w={44} />
        <Item src="/scribbles/web.svg" w={48} />
        <Item src="/scribbles/bubble.svg" w={50} />
      </div>
      <div data-rail="right" className="absolute right-2 top-20 flex flex-col gap-6 items-end">
        <Item src="/scribbles/note.svg" w={40} />
        <Item src="/scribbles/cam.svg" w={44} />
        <Item src="/scribbles/clap.svg" w={46} />
        <Item src="/scribbles/skull.svg" w={38} />
        <Item src="/scribbles/mask.svg" w={40} />
        <Item src="/scribbles/cross.svg" w={32} />
      </div>
    </div>
  );
}


