'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, BadgeCheck, Sparkles } from 'lucide-react';

interface AdCard {
  id: string;
  badge: 'Partenaire' | 'Sponsorisé';
  brand: string;
  tagline: string;
  description: string;
  cta: string;
  href: string;
  img: string;
  certifiedBadge?: string;
  accentColor: string;
}

const adCards: AdCard[] = [
  {
    id: 'global-travel',
    badge: 'Partenaire',
    brand: 'Global Travel Kin',
    tagline: 'Visa Schengen facilité',
    description: 'Obtenez votre visa en toute sérénité grâce à la plateforme de suivi de dossiers JDFP. Accompagnement 100% personnalisé.',
    cta: 'Démarrer ma demande',
    href: '/visas',
    img: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=600',
    certifiedBadge: 'Certifié JDFP',
    accentColor: 'from-sky-500/20 to-transparent',
  },
  {
    id: 'clinique-ngaliema',
    badge: 'Sponsorisé',
    brand: 'Clinique Ngaliema',
    tagline: 'IA Diagnostic Médical',
    description: "Notre IA analyse vos radiographies en temps réel. Partenaire de la Clinique Ngaliema pour un diagnostic plus rapide et fiable.",
    cta: 'Découvrir l\'IA Santé',
    href: '/ia/sante',
    img: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=600',
    certifiedBadge: 'Powered by JDFP AI',
    accentColor: 'from-rose-500/20 to-transparent',
  },
  {
    id: 'kongopay',
    badge: 'Partenaire',
    brand: 'KongoPay',
    tagline: 'Fintech développée par JDFP',
    description: 'Envoyez et recevez de l\'argent mobile en quelques secondes. KongoPay, l\'application de paiement 100% congolaise.',
    cta: 'En savoir plus',
    href: '/services-it',
    img: 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=600',
    certifiedBadge: 'Built by JDFP IT',
    accentColor: 'from-emerald-500/20 to-transparent',
  },
  {
    id: 'smart-signage',
    badge: 'Sponsorisé',
    brand: 'Smart Signage Gombe',
    tagline: 'Panneaux LED IA — Kinshasa',
    description: 'Diffusez votre marque sur nos écrans Smart Signage à la Gombe. Audience ciblée par IA, statistiques en temps réel.',
    cta: 'Réserver un espace pub',
    href: '/publicite',
    img: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=600',
    certifiedBadge: 'JDFP Smart Media',
    accentColor: 'from-amber-500/20 to-transparent',
  },
];

export default function PartnerShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scroll(dir: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / adCards.length;
    const next = dir === 'right'
      ? Math.min(activeIndex + 1, adCards.length - 1)
      : Math.max(activeIndex - 1, 0);
    el.scrollTo({ left: cardWidth * next, behavior: 'smooth' });
    setActiveIndex(next);
  }

  return (
    <section className="py-20 bg-[hsl(220_18%_8%)] border-t border-[hsl(220_12%_20%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <span className="section-tag mb-3 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Espace Partenaires
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none mt-2">
              ILS NOUS FONT <span style={{ color: 'hsl(48 100% 50%)' }}>CONFIANCE</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={activeIndex === 0}
              className="w-11 h-11 rounded-xl border border-[hsl(220_12%_22%)] flex items-center justify-center text-[hsl(220_8%_55%)] hover:text-white hover:border-[hsl(48_100%_50%_/0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={activeIndex === adCards.length - 1}
              className="w-11 h-11 rounded-xl border border-[hsl(220_12%_22%)] flex items-center justify-center text-[hsl(220_8%_55%)] hover:text-white hover:border-[hsl(48_100%_50%_/0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-3 scroll-smooth"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {adCards.map((card) => {
            return (
              <Link
                key={card.id}
                href={card.href}
                className="group relative flex-none w-[360px] sm:w-[420px] rounded-2xl overflow-hidden border border-[hsl(220_12%_20%)] hover:border-[hsl(48_100%_50%_/0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_hsl(48_100%_50%_/0.25)]"
                style={{ scrollSnapAlign: 'start', background: 'hsl(220 16% 11%)' }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.brand}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${card.accentColor} to-[hsl(220_16%_11%)]`} />

                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm"
                    style={{
                      background: card.badge === 'Partenaire' ? 'hsl(48 100% 50% / 0.15)' : 'hsl(220 8% 55% / 0.15)',
                      border: card.badge === 'Partenaire' ? '1px solid hsl(48 100% 50% / 0.4)' : '1px solid hsl(220 8% 55% / 0.3)',
                      color: card.badge === 'Partenaire' ? 'hsl(48 100% 60%)' : 'hsl(220 8% 75%)',
                    }}
                  >
                    <BadgeCheck className="w-3.5 h-3.5" />
                    {card.badge}
                  </div>

                  {card.certifiedBadge && (
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
                      style={{ background: 'hsl(220 18% 8% / 0.85)', border: '1px solid hsl(48 100% 50% / 0.3)', color: 'hsl(48 100% 60%)' }}
                    >
                      {card.certifiedBadge}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl overflow-hidden flex-none border border-[hsl(220_12%_22%)]">
                      <img
                        src={card.img}
                        alt={card.brand}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-bold text-base leading-tight">{card.brand}</p>
                      <p className="text-[hsl(48_100%_55%)] text-[11px] font-semibold mt-0.5">{card.tagline}</p>
                    </div>
                  </div>

                  <p className="text-[hsl(220_8%_55%)] text-sm leading-relaxed mb-5 line-clamp-3">
                    {card.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[hsl(48_100%_50%)] text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      {card.cta}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mt-5">
          {adCards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const cardWidth = el.scrollWidth / adCards.length;
                el.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
                setActiveIndex(i);
              }}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: activeIndex === i ? '24px' : '6px',
                background: activeIndex === i ? 'hsl(48 100% 50%)' : 'hsl(220 12% 25%)',
              }}
            />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between p-4 rounded-2xl border border-[hsl(220_12%_18%)]" style={{ background: 'hsl(48 100% 50% / 0.03)' }}>
          <p className="text-[hsl(220_8%_50%)] text-xs">
            Vous souhaitez figurer dans notre vitrine partenaires ?
          </p>
          <Link
            href="/publicite"
            className="text-[hsl(48_100%_50%)] text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap"
          >
            Devenir partenaire
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
