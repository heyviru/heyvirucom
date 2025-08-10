import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="#hero" className="font-display tracking-wide text-lg neon-text">@heyviru</Link>
        <nav className="hidden sm:flex gap-6 text-sm text-white/80">
          <a href="#work" className="hover:text-white">Work</a>
          <a href="#results" className="hover:text-white">Results</a>
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <a href="#contact" className="sm:hidden btn-primary">Book an edit</a>
      </div>
    </header>
  );
}

