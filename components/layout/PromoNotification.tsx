'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Globe, Shield, Rocket } from 'lucide-react';

export default function PromoNotification() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('promo-cd-dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('promo-cd-dismissed', '1');
    }, 300);
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-[340px] transition-all duration-300 ${
        closing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
      style={{ animation: closing ? undefined : 'slideUp 0.4s ease-out' }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1528 50%, #0d1220 100%)',
          border: '1px solid rgba(245,158,11,0.4)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Gold top bar */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)' }} />

        {/* Close button */}
        <button
          onClick={dismiss}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#9ca3af',
            transition: 'all 0.2s',
            zIndex: 10,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)';
            (e.currentTarget as HTMLButtonElement).style.color = '#fff';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
            (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af';
          }}
        >
          <X size={14} />
        </button>

        <div style={{ padding: '20px 20px 0' }}>
          {/* Logo + badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              background: 'rgba(245,158,11,0.12)',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: '10px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Globe size={20} color="#f59e0b" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                JDFP Communication
              </div>
              <div style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '1px' }}>
                Présence Digitale
              </div>
            </div>
          </div>

          {/* Headline */}
          <div style={{ marginBottom: '12px' }}>
            <h3 style={{
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 800,
              lineHeight: 1.2,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
            }}>
              Avoir une présence digitale
              sérieuse{' '}
              <span style={{ color: '#f59e0b' }}>commence par un domaine .cd</span>
            </h3>
          </div>

          {/* Info row */}
          <div style={{
            background: 'rgba(245,158,11,0.06)',
            border: '1px solid rgba(245,158,11,0.15)',
            borderRadius: '10px',
            padding: '10px 12px',
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            marginBottom: '16px',
          }}>
            <Shield size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '1px' }} />
            <p style={{ color: '#d1d5db', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
              Nous enregistrons votre domaine <strong style={{ color: '#fff' }}>.cd</strong> et hébergeons votre site avec{' '}
              <strong style={{ color: '#fff' }}>haute disponibilité</strong> et sécurité optimale.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ padding: '0 20px 20px' }}>
          <Link
            href="/domaines-hosting"
            onClick={dismiss}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
              color: '#0f1117',
              fontWeight: 700,
              fontSize: '13px',
              borderRadius: '10px',
              textDecoration: 'none',
              letterSpacing: '0.5px',
              transition: 'all 0.2s',
              boxShadow: '0 4px 15px rgba(245,158,11,0.3)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 20px rgba(245,158,11,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 15px rgba(245,158,11,0.3)';
            }}
          >
            <Rocket size={15} />
            Découvrir nos offres domaines
          </Link>

          {/* Contact */}
          <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '11px', margin: '10px 0 0' }}>
            📞 +243 898 108 447 · jdfp-communication.com
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
