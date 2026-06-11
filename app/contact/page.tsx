'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle, Loader2, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { COMPANY } from '@/lib/constants';

interface Form {
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INIT: Form = { full_name: '', email: '', phone: '', subject: '', message: '' };

const SUBJECTS = [
  'Services IT & Développement web',
  'Intelligence Artificielle',
  'Régie Publicitaire',
  'Facilitation de Visa',
  'Location de Véhicule',
  'Domaine & Hébergement',
  'Autre demande',
];

const infoCards = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: COMPANY.address,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: COMPANY.phone,
    href: `tel:${COMPANY.phone.replace(/\s/g, '')}`,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
  {
    icon: Mail,
    label: 'Email',
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lun–Ven  08h00 – 17h00',
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<Form>(INIT);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function set(field: keyof Form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const { error: dbError } = await supabase.from('contact_messages').insert([form]);
    if (dbError) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      setSubmitting(false);
      return;
    }

    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'contact', data: form }),
    });

    setSuccess(true);
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-[hsl(220_18%_8%)]">
      {/* Header */}
      <div className="bg-[hsl(220_16%_12%)] border-b border-[hsl(220_12%_20%)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <span className="section-tag mb-1">JDFP-Communication</span>
              <h1 className="font-display text-3xl md:text-4xl text-white">CONTACTEZ-NOUS</h1>
            </div>
          </div>
          <p className="mt-2 text-[hsl(220_8%_55%)] max-w-2xl">
            Notre équipe vous répond dans les <strong className="text-white">48 heures ouvrables</strong>. Pour une réponse immédiate, utilisez WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left — Info + Map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info cards */}
            <div className="space-y-3">
              {infoCards.map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="bg-[hsl(220_16%_12%)] border border-[hsl(220_12%_20%)] rounded-xl p-4 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[hsl(220_8%_40%)] font-medium uppercase tracking-wider mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-white text-sm hover:text-amber-400 transition-colors">{value}</a>
                    ) : (
                      <p className="text-white text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-semibold text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              Écrire sur WhatsApp
            </a>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-[hsl(220_12%_20%)] h-64">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=15.295%2C-4.325%2C15.335%2C-4.295&layer=mapnik&marker=-4.308%2C15.315"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                loading="lazy"
                title="Localisation JDFP Communication — Kinshasa/Gombe"
              />
            </div>
            <p className="text-xs text-center text-[hsl(220_8%_40%)]">
              Av. Tombalbaye n° A19 local 03 · Kinshasa/Gombe · RDC
            </p>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div className="bg-[hsl(220_16%_12%)] border border-[hsl(220_12%_20%)] rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-[hsl(220_12%_20%)]">
                <h2 className="text-white text-xl font-bold">Envoyez-nous un message</h2>
                <p className="text-[hsl(220_8%_55%)] text-sm mt-1">Remplissez le formulaire ci-dessous</p>
              </div>

              {success ? (
                <div className="p-8 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-bold mb-1">Message envoyé !</h3>
                    <p className="text-[hsl(220_8%_55%)] text-sm">
                      Nous avons bien reçu votre message et vous répondrons dans les 48 heures ouvrables.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSuccess(false); setForm(INIT); }}
                    className="btn-secondary mt-2"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Nom complet *</label>
                      <input
                        type="text"
                        value={form.full_name}
                        onChange={set('full_name')}
                        required
                        placeholder="Jean-Pierre Mbala"
                        className="input-dark w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        required
                        placeholder="votre@email.com"
                        className="input-dark w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Téléphone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="+243 xxx xxx xxx"
                        className="input-dark w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Sujet *</label>
                      <select
                        value={form.subject}
                        onChange={set('subject')}
                        required
                        className="input-dark w-full"
                      >
                        <option value="">Choisir un sujet…</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1.5">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={set('message')}
                      required
                      rows={5}
                      placeholder="Décrivez votre demande en détail…"
                      className="input-dark w-full resize-none"
                    />
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center flex items-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {submitting ? 'Envoi en cours…' : 'Envoyer le message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
