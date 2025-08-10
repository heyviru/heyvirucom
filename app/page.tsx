import { AppHeader } from '@/components/AppHeader';
import { Hero } from '@/components/Hero';
import { SelectedWork } from '@/components/SelectedWork';
import { Results } from '@/components/Results';
import { ServicesProcess } from '@/components/ServicesProcess';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';

export default function Page() {
  return (
    <main>
      <AppHeader />
      <Hero />
      <SelectedWork />
      <Results />
      <ServicesProcess />
      <About />
      <Contact />
      <footer className="mx-auto max-w-6xl px-4 py-12 text-white/60 text-sm">
        <div>one step at a time.</div>
        <div className="mt-1">© {new Date().getFullYear()} Virendra Sankpal</div>
      </footer>
    </main>
  );
}
