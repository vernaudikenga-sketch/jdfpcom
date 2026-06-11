'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS, COMPANY } from '@/lib/constants';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [iaOpen, setIaOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[hsl(220_16%_12%)] border-b border-[hsl(220_12%_20%)] shadow-[0_4px_30px_-8px_hsl(0_0%_0%_/0.5)]'
          : 'bg-[hsl(220_18%_8%)/80] backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo-jdfp.jpeg"
              alt="JDFP Logo"
              className="w-9 h-9 rounded-lg object-cover"
              loading="eager"
            />
            <div className="leading-none">
              <div className="font-display text-xl text-white tracking-wide">JDFP</div>
              <div className="text-[10px] text-[hsl(48_100%_50%)] font-semibold uppercase tracking-[0.15em]">Communication</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-sm rounded-lg transition-colors ${
                      pathname.startsWith('/ia') ? 'text-[hsl(48_100%_50%)]' : 'text-[hsl(220_8%_65%)] hover:text-white'
                    }`}
                    onMouseEnter={() => setIaOpen(true)}
                    onMouseLeave={() => setIaOpen(false)}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${iaOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                      iaOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                    onMouseEnter={() => setIaOpen(true)}
                    onMouseLeave={() => setIaOpen(false)}
                  >
                    <div className="bg-[hsl(220_16%_12%)] border border-[hsl(220_12%_20%)] rounded-xl shadow-elevated p-1.5 min-w-[180px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`flex items-center px-3 py-2.5 text-sm rounded-lg transition-colors ${
                            isActive(child.href)
                              ? 'text-[hsl(48_100%_50%)] bg-[hsl(48_100%_50%)/8%]'
                              : 'text-[hsl(220_8%_65%)] hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-[hsl(48_100%_50%)] bg-[hsl(48_100%_50%)/8%]'
                      : 'text-[hsl(220_8%_65%)] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm px-5 py-2 font-semibold"
            >
              Devis Gratuit
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-[hsl(220_8%_65%)] hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[hsl(220_16%_12%)] border-t border-[hsl(220_12%_20%)] px-4 py-4">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setIaOpen(!iaOpen)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-[hsl(220_8%_65%)] hover:text-white rounded-lg"
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${iaOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {iaOpen && (
                    <div className="pl-4 mt-1 space-y-1 border-l border-[hsl(48_100%_50%)/20%] ml-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-[hsl(220_8%_65%)] hover:text-[hsl(48_100%_50%)] rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 text-sm rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-[hsl(48_100%_50%)] bg-[hsl(48_100%_50%)/8%]'
                      : 'text-[hsl(220_8%_65%)] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-center mt-3 text-sm"
            >
              Devis Gratuit via WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
