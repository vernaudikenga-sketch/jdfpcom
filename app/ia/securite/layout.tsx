import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IA Vérification Documentaire',
  description:
    "Démonstration de vérification biométrique et d'authentification de documents d'identité par intelligence artificielle. Analyse MRZ en temps réel. Service de présentation.",
  keywords: ['IA sécurité', 'vérification document IA', 'biométrie', 'passeport', 'Kinshasa'],
  openGraph: {
    title: 'IA Vérification Documentaire — JDFP Communication',
    description: "Vérification biométrique de documents par IA — démonstration technologique.",
    url: 'https://jdfp-communication.com/ia/securite',
  },
};

export default function IASecuriteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
