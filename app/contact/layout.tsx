import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contactez-nous',
  description:
    'Contactez JDFP Communication à Kinshasa — Av. Tombalbaye n° A19, Gombe. Formulaire de contact, WhatsApp, email et plan d\'accès.',
  openGraph: {
    title: 'Contactez JDFP Communication — Kinshasa/Gombe',
    description: 'Adresse, téléphone, formulaire de contact et plan d\'accès à nos bureaux de Kinshasa.',
    url: 'https://jdfp-communication.com/contact',
    images: [{ url: '/api/og?title=Contactez-nous&sub=Av.+Tombalbaye+%C2%B0A19%2C+Kinshasa%2FGombe', width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
