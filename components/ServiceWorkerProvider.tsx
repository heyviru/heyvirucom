"use client";

import { useEffect } from 'react';

export function ServiceWorkerProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
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

