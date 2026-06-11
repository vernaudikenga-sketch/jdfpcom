import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Location de Véhicules Premium & Transferts VIP',
  description:
    'Location de véhicules de standing et transferts VIP à Kinshasa. SUV, berlines de luxe, service chauffeur et transfert aéroport disponibles 24h/24.',
  keywords: [
    'location voiture Kinshasa', 'transfert VIP', 'chauffeur Kinshasa',
    'SUV location RDC', 'transfert aéroport', 'véhicule premium Congo',
  ],
  openGraph: {
    title: 'Location de Véhicules Premium & Transferts VIP — JDFP Communication',
    description:
      'Véhicules de standing avec chauffeur à Kinshasa. Transferts aéroport, événements, déplacements professionnels.',
    url: 'https://jdfp-communication.com/vehicules',
    images: [{ url: '/api/og?title=Location+V%C3%A9hicules+Premium+%26+Transferts+VIP&sub=Service+cha+uffeur+24h%2F24+%C3%A0+Kinshasa', width: 1200, height: 630 }],
  },
};

export default function VehiculesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
