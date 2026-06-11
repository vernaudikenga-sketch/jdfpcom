import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Facilitation de Visas & Voyages',
  description:
    'Service de facilitation de visas pour Schengen, USA, Chine et plus depuis Kinshasa. Assistance complète : dossier, rendez-vous consulaire, accompagnement sur mesure.',
  keywords: [
    'visa Kinshasa', 'visa Schengen', 'facilitation visa RDC', 'voyage Congo',
    'visa USA Kinshasa', 'demande visa', 'consulat Kinshasa',
  ],
  openGraph: {
    title: 'Facilitation de Visas & Voyages — JDFP Communication',
    description:
      'Facilitez vos démarches de visa depuis Kinshasa. Assistance complète pour tous types de visas.',
    url: 'https://jdfp-communication.com/visas',
    images: [{ url: '/api/og?title=Facilitation+de+Visas+%26+Voyages&sub=Schengen+%7C+USA+%7C+Chine+depuis+Kinshasa', width: 1200, height: 630 }],
  },
};

export default function VisasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
