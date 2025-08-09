"use client";
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

type FormData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  assetLink: string;
  message: string;
};

const STORAGE_KEY = 'heyviru_contact_draft_v1';
const QUEUE_KEY = 'heyviru_submit_queue_v1';

export function Contact() {
  const [data, setData] = useState<FormData>({ name: '', email: '', projectType: '', budget: '', assetLink: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'queued' | 'error'>('idle');
  const controllerRef = useRef<AbortController | null>(null);

  // Load draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Persist draft
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {
      // ignore
    }
  }, [data]);

  // Attempt to flush queued submissions when online
  useEffect(() => {
    const flush = async () => {
      try {
        const raw = localStorage.getItem(QUEUE_KEY);
        if (!raw) return;
        const queue: FormData[] = JSON.parse(raw);
        if (queue.length === 0) return;
        const [next, ...rest] = queue;
        const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(next) });
        if (res.ok) {
          localStorage.setItem(QUEUE_KEY, JSON.stringify(rest));
        }
      } catch {
        // ignore
      }
    };
    const onOnline = () => flush();
    window.addEventListener('online', onOnline);
    flush();
    return () => window.removeEventListener('online', onOnline);
  }, []);

  const disabled = useMemo(() => status === 'submitting', [status]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal });
      if (res.ok) {
        setStatus('submitted');
        localStorage.removeItem(STORAGE_KEY);
      } else {
        throw new Error('Failed');
      }
    } catch {
      // Offline or error: queue it
      try {
        const raw = localStorage.getItem(QUEUE_KEY);
        const queue: FormData[] = raw ? JSON.parse(raw) : [];
        queue.push(data);
        localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
        setStatus('queued');
      } catch {
        setStatus('error');
      }
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-2xl px-4 py-16">
      <h2 className="font-display text-2xl">Contact</h2>
      <p className="mt-2 text-white/80 text-sm">Replies within 24–48hrs.</p>
      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <div className="grid gap-1">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required value={data.name} onChange={onChange} className="rounded bg-white/5 border border-white/10 px-3 py-2" />
        </div>
        <div className="grid gap-1">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required value={data.email} onChange={onChange} className="rounded bg-white/5 border border-white/10 px-3 py-2" />
        </div>
        <div className="grid gap-1">
          <label htmlFor="projectType">Project type</label>
          <select id="projectType" name="projectType" value={data.projectType} onChange={onChange} className="rounded bg-white/5 border border-white/10 px-3 py-2">
            <option value="">Select</option>
            <option>Short-form</option>
            <option>Event/Aftermovie</option>
            <option>Brand Spots</option>
            <option>UGC</option>
            <option>Narrative</option>
          </select>
        </div>
        <div className="grid gap-1">
          <label htmlFor="budget">Budget</label>
          <input id="budget" name="budget" placeholder="e.g., ₹30k–₹60k" value={data.budget} onChange={onChange} className="rounded bg-white/5 border border-white/10 px-3 py-2" />
        </div>
        <div className="grid gap-1">
          <label htmlFor="assetLink">Asset link</label>
          <input id="assetLink" name="assetLink" placeholder="Drive/Dropbox link" value={data.assetLink} onChange={onChange} className="rounded bg-white/5 border border-white/10 px-3 py-2" />
        </div>
        <div className="grid gap-1">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={4} value={data.message} onChange={onChange} className="rounded bg-white/5 border border-white/10 px-3 py-2" />
        </div>
        <div className="flex items-center gap-3">
          <button disabled={disabled} className="rounded-full px-5 py-2 bg-[var(--neon-cyan)] text-black font-semibold disabled:opacity-50">Send</button>
          <span className="text-sm text-white/70">
            {status === 'submitted' && 'Submitted!'}
            {status === 'queued' && 'Saved offline. Will send when back online.'}
            {status === 'error' && 'Could not queue. Please try again later.'}
          </span>
        </div>
      </form>
      <a href="#contact" className="fixed sm:hidden bottom-4 right-4 rounded-full px-5 py-3 bg-[var(--neon-cyan)] text-black font-semibold shadow-lg">Book an edit</a>
    </section>
  );
}

