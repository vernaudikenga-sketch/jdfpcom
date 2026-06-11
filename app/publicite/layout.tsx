import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Régie Publicitaire — Kinshasa & Brazzaville',
  description:
    "Espaces publicitaires premium à Kinshasa et Brazzaville : billboards, écrans digitaux, sucettes. Atteignez des millions de personnes dans les deux capitales du Grand-Congo.",
  keywords: [
    'publicité Kinshasa', 'billboard Congo', 'affichage extérieur RDC',
    'publicité Brazzaville', 'régie pub Grand-Congo', 'écran digital Kinshasa',
  ],
  openGraph: {
    title: 'Régie Publicitaire Kinshasa & Brazzaville — JDFP Communication',
    description:
      "Billboards, sucettes et écrans digitaux dans les deux capitales du Grand-Congo.",
    url: 'https://jdfp-communication.com/publicite',
    images: [{ url: '/api/og?title=R%C3%A9gie+Publicitaire+Grand-Congo&sub=Kinshasa+%26+Brazzaville', width: 1200, height: 630 }],
  },
};

export default function PubliciteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
