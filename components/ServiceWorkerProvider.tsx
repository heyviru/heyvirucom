"use client";

import { useEffect } from 'react';

export function ServiceWorkerProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
    const isLocalhost = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
    const swEnabled = process.env.NEXT_PUBLIC_ENABLE_SW === 'true';

    // Always unregister on localhost to prevent stale caches
    if (isLocalhost || process.env.NODE_ENV !== 'production' || !swEnabled) {
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

