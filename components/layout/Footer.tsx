import Link from 'next/link';
import { MapPin, Phone, Mail, Building2, Shield } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'hsl(220 16% 10%)', borderTop: '1px solid hsl(220 12% 18%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/logo-jdfp.jpeg"
                alt="JDFP Logo"
                className="w-10 h-10 rounded-xl object-cover"
                loading="lazy"
              />
              <div className="leading-none">
                <div className="font-display text-xl text-white">JDFP</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: 'hsl(48 100% 50%)' }}>Communication</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'hsl(220 8% 55%)' }}>{COMPANY.tagline}</p>
            <div className="flex items-start gap-2 text-sm" style={{ color: 'hsl(220 8% 55%)' }}>
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'hsl(48 100% 50%)' }} />
              <span>{COMPANY.address}</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Nos Services</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Services IT & ERP', href: '/services-it' },
                { label: 'IA Médicale', href: '/ia/sante' },
                { label: 'IA Juridique', href: '/ia/droit' },
                { label: 'IA Sécurité', href: '/ia/securite' },
                { label: 'Régie Publicitaire', href: '/publicite' },
                { label: 'Visas & Voyage', href: '/visas' },
                { label: 'Location Véhicules', href: '/vehicules' },
                { label: 'Domaines & Hosting', href: '/domaines' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: 'hsl(220 8% 55%)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2.5 text-sm" style={{ color: 'hsl(220 8% 55%)' }}>
                <Phone className="w-4 h-4 shrink-0" style={{ color: 'hsl(48 100% 50%)' }} />
                <span>{COMPANY.phone}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm" style={{ color: 'hsl(220 8% 55%)' }}>
                <Mail className="w-4 h-4 shrink-0" style={{ color: 'hsl(48 100% 50%)' }} />
                <span>{COMPANY.email}</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">Paiements</h4>
            <div className="space-y-2">
              {[COMPANY.banks.tmb, COMPANY.banks.equity].map((bank) => (
                <div key={bank.name} className="rounded-xl p-3" style={{ backgroundColor: 'hsl(220 14% 16%)', border: '1px solid hsl(220 12% 20%)' }}>
                  <p className="text-xs font-semibold" style={{ color: 'hsl(48 100% 50%)' }}>{bank.name}</p>
                  <p className="text-xs font-mono mt-0.5 text-white/70">{bank.account}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Mentions Légales</h4>
            <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: 'hsl(220 14% 16%)', border: '1px solid hsl(220 12% 20%)' }}>
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'hsl(48 100% 50%)' }} />
                <div>
                  <p className="text-xs" style={{ color: 'hsl(220 8% 55%)' }}>Raison Sociale</p>
                  <p className="text-sm text-white font-bold">{COMPANY.name}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: 'RCCM', value: COMPANY.rccm },
                  { label: 'ID National', value: COMPANY.idNational },
                  { label: 'NIF', value: COMPANY.nif },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl px-3 py-2" style={{ backgroundColor: 'hsl(220 18% 8%)' }}>
                    <p className="text-xs" style={{ color: 'hsl(220 8% 45%)' }}>{item.label}</p>
                    <p className="text-xs font-mono font-medium mt-0.5 text-white/80">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <p className="text-xs text-emerald-400">Conforme Loi Numérique RDC 2023</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid hsl(220 12% 18%)' }}>
          <p className="text-xs text-center sm:text-left" style={{ color: 'hsl(220 8% 40%)' }}>
            © {new Date().getFullYear()} {COMPANY.name} — Tous droits réservés
          </p>
          <p className="text-xs font-mono" style={{ color: 'hsl(220 8% 35%)' }}>
            RCCM {COMPANY.rccm} · NIF {COMPANY.nif}
          </p>
        </div>
      </div>
    </footer>
  );
}
