'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export default function WhatsAppButton() {
  const [showCard, setShowCard] = useState(false);

  const href = `https://wa.me/${COMPANY.whatsapp}?text=Bonjour%20JDFP-Communication%2C%20je%20souhaite%20obtenir%20des%20informations%20sur%20vos%20services.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {showCard && (
        <div
          className="rounded-2xl shadow-elevated p-4 w-[240px] animate-fade-up"
          style={{ backgroundColor: 'hsl(220 16% 12%)', border: '1px solid hsl(220 12% 20%)' }}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                <img
                  src="https://build-my-site-now-890.lovable.app/assets/logo-jdfp-QVc2ccJJ.jpeg"
                  alt="JDFP"
                  className="w-9 h-9 rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-bold text-xs">{COMPANY.name}</p>
                <p className="text-emerald-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  En ligne
                </p>
              </div>
            </div>
            <button onClick={() => setShowCard(false)} style={{ color: 'hsl(220 8% 55%)' }} className="hover:text-white transition-colors mt-0.5">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="rounded-xl p-3 mb-3 text-xs" style={{ backgroundColor: 'hsl(220 18% 8%)' }}>
            <p style={{ color: 'hsl(220 8% 65%)' }}>Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?</p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-4 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded-xl hover:bg-[#1fb35a] transition-colors"
          >
            Démarrer la conversation
          </a>
        </div>
      )}

      <button
        onClick={() => setShowCard(!showCard)}
        className="relative w-14 h-14 rounded-full shadow-elevated flex items-center justify-center hover:scale-110 transition-transform animate-glow-pulse"
        style={{ backgroundColor: '#25D366', boxShadow: '0 4px 30px -4px rgba(37, 211, 102, 0.5)' }}
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">1</span>
      </button>
    </div>
  );
}
