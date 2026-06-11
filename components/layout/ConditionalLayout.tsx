'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import PartnerTicker from './PartnerTicker';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="sticky top-16 z-40">
          <PartnerTicker />
        </div>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
