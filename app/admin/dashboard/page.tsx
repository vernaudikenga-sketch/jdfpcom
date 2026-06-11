'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Car, Globe, MonitorPlay, ArrowRight } from 'lucide-react';

interface Counts {
  visa_requests: number;
  vehicle_reservations: number;
  domain_orders: number;
  advertising_bookings: number;
}

const cards = [
  {
    table: 'visa_requests',
    label: 'Demandes de visa',
    icon: FileText,
    href: '/admin/visas',
    colorIcon: 'text-blue-400',
    colorBg: 'bg-blue-500/10',
    colorBorder: 'border-blue-500/30',
  },
  {
    table: 'vehicle_reservations',
    label: 'Réservations véhicule',
    icon: Car,
    href: '/admin/vehicules',
    colorIcon: 'text-emerald-400',
    colorBg: 'bg-emerald-500/10',
    colorBorder: 'border-emerald-500/30',
  },
  {
    table: 'domain_orders',
    label: 'Commandes domaine',
    icon: Globe,
    href: '/admin/domaines',
    colorIcon: 'text-purple-400',
    colorBg: 'bg-purple-500/10',
    colorBorder: 'border-purple-500/30',
  },
  {
    table: 'advertising_bookings',
    label: 'Réservations pub',
    icon: MonitorPlay,
    href: '/admin/publicites',
    colorIcon: 'text-amber-400',
    colorBg: 'bg-amber-500/10',
    colorBorder: 'border-amber-500/30',
  },
];

export default function DashboardPage() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    Promise.all(
      cards.map((c) =>
        fetch(`/api/admin/${c.table}`)
          .then((r) => r.json())
          .then((d) => [c.table, Array.isArray(d) ? d.length : 0] as [string, number])
      )
    ).then((entries) => setCounts(Object.fromEntries(entries) as Counts));
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl text-white mb-1">Tableau de bord</h1>
      <p className="text-[hsl(220_8%_55%)] text-sm mb-8">Vue d&apos;ensemble des demandes et réservations</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map(({ table, label, icon: Icon, href, colorIcon, colorBg, colorBorder }) => (
          <Link
            key={table}
            href={href}
            className="bg-[hsl(220_16%_12%)] border border-[hsl(220_12%_20%)] rounded-2xl p-6 hover:border-amber-500/30 transition-colors group flex flex-col gap-4"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorBg} ${colorBorder}`}>
              <Icon className={`w-6 h-6 ${colorIcon}`} />
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-0.5">
                {counts ? counts[table as keyof Counts] : '—'}
              </div>
              <div className="text-sm text-[hsl(220_8%_55%)]">{label}</div>
            </div>
            <div className="flex items-center gap-1 text-xs text-[hsl(220_8%_40%)] group-hover:text-amber-400 transition-colors mt-auto">
              Voir tout <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
