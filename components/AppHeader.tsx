import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[rgba(255,255,255,0.6)] backdrop-blur border-b border-black/20">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="#hero" className="font-display tracking-wide text-lg">@heyviru</Link>
        <nav className="hidden sm:flex gap-6 text-sm text-black/80">
          <a href="#work" className="hover:text-black">Work</a>
          <a href="#results" className="hover:text-black">Results</a>
          <a href="#services" className="hover:text-black">Services</a>
          <a href="#about" className="hover:text-black">About</a>
          <a href="#contact" className="hover:text-black">Contact</a>
        </nav>
        <a href="#contact" className="sm:hidden btn-primary">Book an edit</a>
      </div>
    </header>
  );
}

