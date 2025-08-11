import services from '@/data/services.json';

export function ServicesProcess() {
  return (
    <section id="services" className="section-tight">
      <h2 className="font-display text-2xl ink-stroke">Services & Process</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-4 paper-card">
          <h3 className="font-medium">Services</h3>
          <ul className="mt-3 list-disc pl-5 text-black/80">
            {services.services.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg p-4 paper-card">
          <h3 className="font-medium">Process</h3>
          <ol className="mt-3 list-decimal pl-5 text-black/80">
            {services.process.map(step => (
              <li key={step} className="mt-1">{step}</li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {services.tools.map(t => (
              <span key={t} className="px-2 py-1 rounded border border-black/30 bg-black/5">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


