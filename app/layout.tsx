import './globals.css';
import type { Metadata } from 'next';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import { COMPANY } from '@/lib/constants';

const BASE_URL = 'https://jdfp-communication.com';
const DEFAULT_TITLE = 'JDFP Communication — Transformation Numérique Grand-Congo';
const DEFAULT_DESC = "Agence premium de communication digitale, facilitation de visas, location de véhicules VIP, régie publicitaire et services IT à Kinshasa, RDC.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: DEFAULT_TITLE, template: '%s | JDFP Communication' },
  description: DEFAULT_DESC,
  keywords: [
    'JDFP Communication', 'Kinshasa', 'RDC', 'Congo',
    'agence communication', 'services IT', 'intelligence artificielle',
    'publicité extérieure', 'visas RDC', 'location véhicule Kinshasa',
    'domaine .cd', 'transformation numérique',
  ],
  authors: [{ name: 'JDFP Communication', url: BASE_URL }],
  creator: 'JDFP Communication',
  publisher: 'JDFP Communication',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'fr_CD',
    url: BASE_URL,
    siteName: 'JDFP Communication',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'JDFP Communication' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: ['/api/og'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: COMPANY.name,
  description: DEFAULT_DESC,
  url: BASE_URL,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Tombalbaye n° A19 local 03',
    addressLocality: 'Kinshasa',
    addressRegion: 'Gombe',
    addressCountry: 'CD',
  },
  geo: { '@type': 'GeoCoordinates', latitude: '-4.3076', longitude: '15.3124' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  currenciesAccepted: 'USD, CDF',
  priceRange: '$$',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
