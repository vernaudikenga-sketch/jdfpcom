import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IA Analyse de Contrats',
  description:
    "Démonstration d'analyse automatisée de contrats juridiques par intelligence artificielle. Identification des clauses à risque et recommandations. Service de présentation.",
  keywords: ['IA juridique', 'analyse contrat IA', 'intelligence artificielle droit', 'Kinshasa'],
  openGraph: {
    title: 'IA Analyse de Contrats — JDFP Communication',
    description: "Analyse de contrats PDF par IA — démonstration technologique.",
    url: 'https://jdfp-communication.com/ia/droit',
  },
};

export default function IADroitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
