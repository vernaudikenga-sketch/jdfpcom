'use client';

import Link from 'next/link';
import { Sparkles, BadgeCheck, ArrowRight } from 'lucide-react';

interface TickerAd {
  id: string;
  img: string;
  brand: string;
  tagline: string;
  aiLabel: string;
  badge: 'Partenaire' | 'Sponsorisé';
  href: string;
}

const ads: TickerAd[] = [
  {
    id: 'global-travel',
    img: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    brand: 'Global Travel Kin',
    tagline: 'Visa Schengen — facilitation express',
    aiLabel: "Campagne optimisée par l\u2019IA de JDFP-Communication",
    badge: 'Partenaire',
    href: '/visas',
  },
  {
    id: 'clinique-ngaliema',
    img: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    brand: 'Clinique Ngaliema',
    tagline: 'Diagnostic IA — radiographie en temps réel',
    aiLabel: "Campagne optimisée par l\u2019IA de JDFP-Communication",
    badge: 'Sponsorisé',
    href: '/ia/sante',
  },
  {
    id: 'kongopay',
    img: 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    brand: 'KongoPay',
    tagline: 'Mobile Money congolais — 0% commission',
    aiLabel: "Campagne optimisée par l\u2019IA de JDFP-Communication",
    badge: 'Partenaire',
    href: '/services-it',
  },
  {
    id: 'smart-signage',
    img: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    brand: 'Smart Signage Gombe',
    tagline: 'Affichage LED intelligent — audience IA',
    aiLabel: "Campagne optimisée par l\u2019IA de JDFP-Communication",
    badge: 'Sponsorisé',
    href: '/publicite',
  },
];

const allAds = [...ads, ...ads];

function TickerRow() {
  return (
    <div className="overflow-hidden relative h-10">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-6 z-10"
        style={{ background: 'linear-gradient(to right, hsl(220 16% 10%), transparent)' }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-6 z-10"
        style={{ background: 'linear-gradient(to left, hsl(220 16% 10%), transparent)' }} />

      <div className="ticker-track flex items-center gap-0 h-full">
        {allAds.map((ad, i) => (
          <Link
            key={`${ad.id}-${i}`}
            href={ad.href}
            className="flex-none flex items-center gap-2 px-4 h-full border-r border-[hsl(220_12%_16%)] hover:bg-[hsl(48_100%_50%_/0.04)] transition-colors group"
          >
            <div className="flex-none w-6 h-6 rounded-md overflow-hidden border border-[hsl(220_12%_22%)]">
              <img
                src={ad.img}
                alt={ad.brand}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white text-[11px] font-semibold whitespace-nowrap">{ad.brand}</span>
              <span className="text-[hsl(220_8%_45%)] text-[10px] whitespace-nowrap hidden sm:inline">
                — {ad.tagline}
              </span>
              <span
                className="hidden md:flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                style={{
                  background: 'hsl(48 100% 50% / 0.08)',
                  color: 'hsl(48 80% 60%)',
                  border: '1px solid hsl(48 100% 50% / 0.15)',
                }}
              >
                <Sparkles className="w-3 h-3" />
                {ad.aiLabel}
              </span>
              <span
                className="flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full whitespace-nowrap"
                style={
                  ad.badge === 'Partenaire'
                    ? { background: 'hsl(48 100% 50% / 0.1)', color: 'hsl(48 100% 58%)', border: '1px solid hsl(48 100% 50% / 0.25)' }
                    : { background: 'hsl(220 8% 55% / 0.1)', color: 'hsl(220 8% 70%)', border: '1px solid hsl(220 8% 55% / 0.2)' }
                }
              >
                <BadgeCheck className="w-2.5 h-2.5" />
                {ad.badge}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function PartnerTicker() {
  return (
    <div
      className="w-full border-b border-[hsl(220_12%_18%)]"
      style={{ background: 'hsl(220 16% 10%)' }}
    >
      {/* Mobile layout: stacked */}
      <div className="flex flex-col sm:hidden">
        <div className="flex items-center justify-between px-3 border-b border-[hsl(220_12%_18%)]" style={{ height: '2.25rem' }}>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[hsl(48_100%_50%)] flex-none" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[hsl(48_100%_50%)] whitespace-nowrap">
              Partenaires
            </span>
          </div>
          <Link
            href="/publicite"
            className="flex items-center gap-1 hover:bg-[hsl(48_100%_50%_/0.06)] transition-colors group px-2 py-1 rounded"
          >
            <span className="text-[10px] font-bold text-[hsl(48_100%_50%)] uppercase tracking-wider whitespace-nowrap">
              Mettez votre pub ici
            </span>
            <ArrowRight className="w-3 h-3 text-[hsl(48_100%_50%)] group-hover:translate-x-0.5 transition-transform flex-none" />
          </Link>
        </div>
        <TickerRow />
      </div>

      {/* Desktop layout: single row */}
      <div className="hidden sm:flex items-stretch" style={{ height: '3.5rem' }}>
        <div
          className="flex-none flex items-center gap-1.5 px-3 border-r border-[hsl(220_12%_18%)] z-10"
          style={{ background: 'hsl(220 16% 10%)', width: 'max-content' }}
        >
          <Sparkles className="w-3 h-3 text-[hsl(48_100%_50%)] flex-none" />
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[hsl(48_100%_50%)] whitespace-nowrap">
            Partenaires
          </span>
        </div>

        <div className="overflow-hidden relative" style={{ flex: '1 1 0', minWidth: 0 }}>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 z-10"
            style={{ background: 'linear-gradient(to right, hsl(220 16% 10%), transparent)' }} />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 z-10"
            style={{ background: 'linear-gradient(to left, hsl(220 16% 10%), transparent)' }} />

          <div className="ticker-track flex items-center gap-0 h-full">
            {allAds.map((ad, i) => (
              <Link
                key={`${ad.id}-${i}`}
                href={ad.href}
                className="flex-none flex items-center gap-2 px-4 h-full border-r border-[hsl(220_12%_16%)] hover:bg-[hsl(48_100%_50%_/0.04)] transition-colors group"
              >
                <div className="flex-none w-7 h-7 rounded-md overflow-hidden border border-[hsl(220_12%_22%)]">
                  <img
                    src={ad.img}
                    alt={ad.brand}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-[11px] font-semibold whitespace-nowrap">{ad.brand}</span>
                  <span className="text-[hsl(220_8%_45%)] text-[10px] whitespace-nowrap hidden sm:inline">
                    — {ad.tagline}
                  </span>
                  <span
                    className="hidden md:flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{
                      background: 'hsl(48 100% 50% / 0.08)',
                      color: 'hsl(48 80% 60%)',
                      border: '1px solid hsl(48 100% 50% / 0.15)',
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    {ad.aiLabel}
                  </span>
                  <span
                    className="flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full whitespace-nowrap"
                    style={
                      ad.badge === 'Partenaire'
                        ? { background: 'hsl(48 100% 50% / 0.1)', color: 'hsl(48 100% 58%)', border: '1px solid hsl(48 100% 50% / 0.25)' }
                        : { background: 'hsl(220 8% 55% / 0.1)', color: 'hsl(220 8% 70%)', border: '1px solid hsl(220 8% 55% / 0.2)' }
                    }
                  >
                    <BadgeCheck className="w-2.5 h-2.5" />
                    {ad.badge}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/publicite"
          className="flex-none flex items-center gap-1.5 px-3 border-l border-[hsl(220_12%_18%)] hover:bg-[hsl(48_100%_50%_/0.06)] transition-colors group"
          style={{ width: 'max-content' }}
        >
          <span className="text-[10px] font-bold text-[hsl(48_100%_50%)] uppercase tracking-wider whitespace-nowrap">
            Afficher votre pub ici
          </span>
          <ArrowRight className="w-3 h-3 text-[hsl(48_100%_50%)] group-hover:translate-x-0.5 transition-transform flex-none" />
        </Link>
      </div>
    </div>
  );
}
