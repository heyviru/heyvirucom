"use client";
import { useMemo, useState } from 'react';
import work from '@/data/work.json';
import { motion, useReducedMotion } from 'framer-motion';

type WorkItem = {
  id: string;
  title: string;
  category: 'Short-form' | 'Event/Aftermovie' | 'Brand Spots' | 'UGC' | 'Narrative';
  role: string;
  poster: string;
  preview: string;
  caseVideo: string;
  tools: string[];
  impact: string;
};

const FILTERS = ['Short-form', 'Event/Aftermovie', 'Brand Spots', 'UGC', 'Narrative'] as const;

export function SelectedWork() {
  const [active, setActive] = useState<(typeof FILTERS)[number] | 'All'>('All');
  const [openId, setOpenId] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const items = work as WorkItem[];
  const filtered = useMemo(() => (active === 'All' ? items : items.filter(i => i.category === active)), [active, items]);

  return (
    <section id="work" className="section-tight">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl ink-stroke">Selected Work</h2>
        <div className="hidden sm:flex gap-2">
          <button onClick={() => setActive('All')} className={`chip ${active === 'All' ? 'chip--active' : ''}`}>All</button>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)} className={`chip ${active === f ? 'chip--active' : ''}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="sm:hidden mt-4 flex gap-2 overflow-x-auto">
        <button onClick={() => setActive('All')} className={`chip ${active === 'All' ? 'chip--active' : ''}`}>All</button>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setActive(f)} className={`chip ${active === f ? 'chip--active' : ''}`}>{f}</button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <motion.button
            key={item.id}
            onClick={() => setOpenId(item.id)}
            className="group text-left rounded-xl overflow-hidden paper-card focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 transition"
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="aspect-video relative">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                preload="metadata"
                playsInline
                muted
                loop
                poster={item.poster}
                onMouseEnter={e => e.currentTarget.play()}
                onMouseLeave={e => e.currentTarget.pause()}
              >
                <source src={item.preview} />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="p-4">
              <div className="font-medium">{item.title}</div>
              <div className="text-sm text-black/70">{item.impact}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {openId && <CaseModal id={openId} onClose={() => setOpenId(null)} />}
    </section>
  );
}

function CaseModal({ id, onClose }: { id: string; onClose: () => void }) {
  const item = (work as WorkItem[]).find(i => i.id === id)!;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 max-w-4xl w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d0f12]">
        <div className="aspect-video bg-black">
          <video className="w-full h-full" controls preload="metadata" poster={item.poster}>
            <source src={item.caseVideo} />
          </video>
        </div>
        <div className="p-4 sm:p-6">
          <h3 className="font-display text-xl">{item.title}</h3>
          <p className="mt-2 text-white/80">{item.impact}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {item.tools.map(t => (
              <span key={t} className="px-2 py-1 rounded border border-white/10">{t}</span>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="rounded px-4 py-2 border border-white/20">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// utility chip styles
// tailwind via globals: we'll define classes with @apply using arbitrary variants is excessive; use inline classes here


