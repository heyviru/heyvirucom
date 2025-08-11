import testimonials from '@/data/testimonials.json';

export function Results() {
  return (
    <section id="results" className="section-tight">
      <h2 className="font-display text-2xl ink-stroke">Results & Social Proof</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-4 paper-card">
          <h3 className="font-medium">Highlights</h3>
          <ul className="mt-3 grid grid-cols-2 gap-3 text-sm text-black/80">
            <li><strong className="text-black">2.4M+</strong> views</li>
            <li><strong className="text-black">68%</strong> avg. retention</li>
            <li><strong className="text-black">48h</strong> typical turnaround</li>
            <li><strong className="text-black">95%</strong> client satisfaction</li>
          </ul>
        </div>
        <div className="rounded-lg p-4 paper-card">
          <h3 className="font-medium">Testimonials</h3>
          <div className="mt-3 space-y-4">
            {testimonials.slice(0, 4).map(t => (
              <blockquote key={t.author} className="border-l-2 border-black/30 pl-3">
                <p className="text-black/80">“{t.quote}”</p>
                <footer className="mt-1 text-sm text-black/60">— {t.author}, {t.role}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


