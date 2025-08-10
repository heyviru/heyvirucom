"use client";

import { useEffect } from 'react';

export function ServiceWorkerProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
    // Do not use service worker in development; unregister any existing ones
    if (process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker.getRegistrations?.().then((regs) => {
        regs.forEach((r) => r.unregister());
      });
      return;
    }
    const controller = new AbortController();
    const _signal = controller.signal;

    const register = async () => {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch {
        // ignore
      }
    };

    register();
    return () => controller.abort();
  }, []);
  return null;
}

