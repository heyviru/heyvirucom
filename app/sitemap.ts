import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://heyviru.example/', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://heyviru.example/offline', changeFrequency: 'yearly', priority: 0.2 }
  ];
}


