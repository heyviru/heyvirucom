export const metadata = { title: 'Offline — Virendra Sankpal' };

export default function Offline() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl">You’re offline</h1>
      <p className="mt-3 text-white/80">Some media may be unavailable. Try again when you’re back online.</p>
      <a href="/" className="mt-6 inline-block rounded border border-white/20 px-4 py-2">Back to Home</a>
    </main>
  );
}


