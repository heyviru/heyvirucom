export function SEOJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Virendra Sankpal',
    url: 'https://heyviru.example',
    sameAs: [
      'https://instagram.com/heyviru',
      'https://x.com/heyviru'
    ],
    jobTitle: 'Video Editor',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'
    }
  };
  return (
    <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}


