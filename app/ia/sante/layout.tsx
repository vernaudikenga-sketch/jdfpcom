import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IA Analyse Médicale',
  description:
    "Démonstration d'analyse d'imagerie médicale assistée par intelligence artificielle. Détection de pathologies sur radiographies et IRM. Service de présentation.",
  keywords: ['IA santé', 'analyse médicale IA', 'intelligence artificielle médecine', 'Kinshasa'],
  openGraph: {
    title: 'IA Analyse Médicale — JDFP Communication',
    description: "Analyse d'imagerie médicale par IA — démonstration technologique.",
    url: 'https://jdfp-communication.com/ia/sante',
  },
};

export default function IASanteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
