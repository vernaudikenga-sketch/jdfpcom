import './globals.css';
import type { Metadata } from 'next';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: { default: 'JDFP Communication — Transformation Numérique Grand-Congo', template: '%s | JDFP Communication' },
  description: 'Agence premium de communication, conciergerie, mobilité automobile, transferts VIP et facilitation administrative en RDC.',
  keywords: ['JDFP Communication', 'Kinshasa', 'RDC', 'Congo', 'IT', 'IA', 'Intelligence Artificielle', 'Publicité', 'Visas', 'Véhicules'],
  metadataBase: new URL('https://jdfp-communication.cd'),
  openGraph: {
    title: 'JDFP Communication — Transformation Numérique Grand-Congo',
    description: `${COMPANY.tagline}. RCCM ${COMPANY.rccm}`,
    type: 'website',
    locale: 'fr_CD',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
