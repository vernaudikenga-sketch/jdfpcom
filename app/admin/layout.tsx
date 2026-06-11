'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FileText, Car, Globe, MonitorPlay, LogOut, ChevronRight } from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/visas', label: 'Demandes de visa', icon: FileText },
  { href: '/admin/vehicules', label: 'Réservations', icon: Car },
  { href: '/admin/domaines', label: 'Commandes domaine', icon: Globe },
  { href: '/admin/publicites', label: 'Publicités', icon: MonitorPlay },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin') return <>{children}</>;

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  return (
    <div className="min-h-screen bg-[hsl(220_18%_8%)] flex">
      <aside className="w-60 shrink-0 bg-[hsl(220_16%_12%)] border-r border-[hsl(220_12%_20%)] flex flex-col">
        <div className="p-5 border-b border-[hsl(220_12%_20%)]">
          <span className="font-display text-lg text-white tracking-widest block">JDFP</span>
          <span className="text-xs text-amber-400 font-bold tracking-widest uppercase">Administration</span>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'text-[hsl(220_8%_55%)] hover:text-white hover:bg-[hsl(220_12%_18%)]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[hsl(220_12%_20%)]">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[hsl(220_8%_55%)] hover:text-white hover:bg-[hsl(220_12%_18%)] transition-colors mb-0.5"
          >
            Voir le site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-[hsl(220_8%_55%)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
