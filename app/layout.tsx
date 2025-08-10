import type React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { inter, archivoBlack } from '@/app/fonts';
import { ServiceWorkerProvider } from '@/components/ServiceWorkerProvider';
import { SEOJsonLd } from '@/components/SEOJsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://heyviru.example'),
  title: 'Virendra Sankpal — Video Editor',
  description: 'Chaotic cuts. Organized stories.',
  applicationName: 'Virendra Sankpal — Video Editor',
  authors: [{ name: 'Virendra Sankpal', url: 'https://instagram.com/heyviru' }],
  other: { 'format-detection': 'telephone=no' },
  openGraph: {
    title: 'Virendra Sankpal — Video Editor',
    description: 'Chaotic cuts. Organized stories.',
    url: '/',
    siteName: 'Virendra Sankpal',
    images: [
      { url: '/og.jpg', width: 1200, height: 630, alt: 'Showreel still' }
    ],
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@heyviru'
  },
  icons: {
    icon: [
      { url: '/icons/icon.svg', sizes: 'any' }
    ],
    apple: [
      { url: '/icons/icon.svg' }
    ]
  },
  alternates: {
    canonical: '/'
  }
};

export const viewport: Viewport = {
  themeColor: '#0c0c0f',
  colorScheme: 'dark',
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${archivoBlack.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="min-h-dvh antialiased">
        <ServiceWorkerProvider />
        <SEOJsonLd />
        {children}
      </body>
    </html>
  );
}
// Cleanup of duplicate template definitions completed
