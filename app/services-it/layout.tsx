import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services IT & Transformation Numérique',
  description:
    "Développement web, cybersécurité, infrastructure réseau et transformation numérique pour les entreprises en RDC. Solutions IT clés en main à Kinshasa.",
  keywords: [
    'services IT Kinshasa', 'développement web RDC', 'cybersécurité Congo',
    'transformation numérique', 'infrastructure réseau', 'consulting IT',
  ],
  openGraph: {
    title: 'Services IT & Transformation Numérique — JDFP Communication',
    description:
      "Solutions informatiques professionnelles pour les entreprises en RDC : web, sécurité, réseau, IA.",
    url: 'https://jdfp-communication.com/services-it',
  },
};

export default function ServicesITLayout({ children }: { children: React.ReactNode }) {
  return children;
}
