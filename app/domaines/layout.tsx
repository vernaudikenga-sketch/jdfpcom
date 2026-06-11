import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domaines & Hébergement Web',
  description:
    "Enregistrement de noms de domaine .cd, .com, .net et hébergement web professionnel. Disponibilité en temps réel. Idéal pour les entreprises en RDC.",
  keywords: [
    'domaine .cd', 'hébergement web RDC', 'nom de domaine Congo',
    'hosting Kinshasa', 'site web', 'domaine internet',
  ],
  openGraph: {
    title: 'Domaines & Hébergement Web — JDFP Communication',
    description:
      "Réservez votre nom de domaine .cd ou international et lancez votre présence en ligne depuis la RDC.",
    url: 'https://jdfp-communication.com/domaines',
  },
};

export default function DomainesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
