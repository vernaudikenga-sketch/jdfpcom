'use client';

import { useState, useEffect } from 'react';
import { MonitorPlay, TrendingUp, LayoutGrid, MapPin, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { COMPANY } from '@/lib/constants';
import { supabase } from '@/lib/supabase';

const impressionsData = [
  { name: 'Billboard A', impressions: 85000 },
  { name: 'Billboard B', impressions: 62000 },
  { name: 'Écran Digital', impressions: 120000 },
  { name: 'Sucette', impressions: 45000 },
  { name: 'Taxi Mobile', impressions: 38000 },
  { name: 'Billboard C', impressions: 71000 },
  { name: 'Billboard D', impressions: 54000 },
];

const panelTypeLabels: Record<string, string> = {
  billboard_16m2: 'Billboard 16m²',
  billboard_12m2: 'Billboard 12m²',
  sucette: 'Sucette',
  digital_screen: 'Écran Digital',
  taxi_mobile: 'Taxi Mobile',
};

interface Panel {
  id: string;
  name: string;
  city: string;
  panel_type: string;
  dimensions: string;
  daily_impressions: number;
  monthly_price_usd: number;
  is_available: boolean;
}

interface BookingForm {
  client_name: string;
  client_email: string;
  client_phone: string;
  company_name: string;
  campaign_name: string;
  start_date: string;
  end_date: string;
  budget_usd: string;
}

export default function PublicitePage() {
  const [panels, setPanels] = useState<Panel[]>([]);
  const [loadingPanels, setLoadingPanels] = useState(true);
  const [cityFilter, setCityFilter] = useState<'Tous' | 'Kinshasa' | 'Brazzaville'>('Tous');
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    client_name: '',
    client_email: '',
    client_phone: '',
    company_name: '',
    campaign_name: '',
    start_date: '',
    end_date: '',
    budget_usd: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPanels() {
      const { data, error } = await supabase
        .from('advertising_panels')
        .select('*')
        .order('daily_impressions', { ascending: false });
      if (!error && data) setPanels(data as Panel[]);
      setLoadingPanels(false);
    }
    fetchPanels();
  }, []);

  const filteredPanels = cityFilter === 'Tous' ? panels : panels.filter((p) => p.city === cityFilter);

  async function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const { error: insertError } = await supabase.from('advertising_bookings').insert([
      {
        ...bookingForm,
        budget_usd: parseFloat(bookingForm.budget_usd),
        status: 'pending',
      },
    ]);
    if (insertError) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } else {
      setSuccess(true);
      setBookingForm({
        client_name: '',
        client_email: '',
        client_phone: '',
        company_name: '',
        campaign_name: '',
        start_date: '',
        end_date: '',
        budget_usd: '',
      });
    }
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-[hsl(220_18%_8%)]">
      <div className="relative overflow-hidden py-20 px-6">
        <img
          src="https://build-my-site-now-890.lovable.app/assets/jdfp-branding-UZL4Avtx.jpeg"
          alt="Publicité"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_18%_8%)]/80 to-[hsl(220_18%_8%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 flex items-center justify-center">
              <MonitorPlay className="w-7 h-7 text-[hsl(48_100%_50%)]" />
            </div>
            <div>
              <span className="section-tag mb-1">JDFP-Communication</span>
              <h1 className="font-display text-4xl md:text-5xl text-white">RÉGIE PUBLICITAIRE</h1>
            </div>
          </div>
          <p className="text-xl text-[hsl(48_100%_50%)] font-medium">Kinshasa &amp; Brazzaville</p>
          <p className="mt-2 text-[hsl(220_8%_55%)] max-w-2xl">
            Atteignez votre audience cible avec nos espaces publicitaires premium dans les deux capitales du Grand-Congo.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">Tableau de Bord Audience</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Impressions totales', value: '666 000/jour', icon: TrendingUp, color: 'text-[hsl(48_100%_50%)]' },
            { label: 'Panneaux actifs', value: '7', icon: LayoutGrid, color: 'text-blue-400' },
            { label: 'Couverture', value: '2 villes', icon: MapPin, color: 'text-emerald-400' },
            { label: 'CPM moyen', value: '$8.50', icon: DollarSign, color: 'text-violet-400' },
          ].map((stat) => (
            <div key={stat.label} className="card-dark p-6">
              <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-[hsl(220_8%_55%)] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="card-dark p-6 mb-12">
          <h3 className="text-lg font-semibold text-white mb-6">Impressions par panneau</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={impressionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 20%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(220 8% 55%)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(220 8% 55%)' }} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(220 16% 12%)', border: '1px solid hsl(220 12% 20%)', borderRadius: '8px', color: '#fff' }}
                formatter={(value: number) => [`${value.toLocaleString()} impressions`, '']}
              />
              <Bar dataKey="impressions" fill="hsl(48 100% 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Nos Espaces Publicitaires</h2>
              <p className="text-[hsl(220_8%_55%)]">Sélectionnez parmi nos panneaux disponibles dans les deux capitales.</p>
            </div>
            <div className="flex gap-2">
              {(['Tous', 'Kinshasa', 'Brazzaville'] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => setCityFilter(city)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    cityFilter === city
                      ? 'bg-[hsl(48_100%_50%)] text-[hsl(220_18%_8%)]'
                      : 'card-dark text-[hsl(220_8%_55%)] hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {loadingPanels ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-dark p-6 animate-pulse">
                  <div className="h-4 bg-[hsl(220_12%_20%)] rounded w-3/4 mb-3" />
                  <div className="h-3 bg-[hsl(220_12%_20%)] rounded w-1/2 mb-6" />
                  <div className="h-3 bg-[hsl(220_12%_20%)] rounded w-full mb-2" />
                  <div className="h-3 bg-[hsl(220_12%_20%)] rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredPanels.length === 0 ? (
            <div className="card-dark p-12 text-center">
              <MonitorPlay className="w-12 h-12 text-[hsl(220_8%_55%)] mx-auto mb-4" />
              <p className="text-[hsl(220_8%_55%)]">Aucun panneau disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPanels.map((panel) => (
                <div key={panel.id} className="card-dark transition-all overflow-hidden hover:border-[hsl(48_100%_50%)]/40 hover:-translate-y-1">
                  <div className="bg-[hsl(220_16%_12%)] p-4 flex items-start justify-between border-b border-[hsl(220_12%_20%)]">
                    <div>
                      <h3 className="text-white font-semibold text-sm">{panel.name}</h3>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${panel.city === 'Kinshasa' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                        {panel.city}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${panel.is_available ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {panel.is_available ? 'Disponible' : 'Occupé'}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-[hsl(220_8%_55%)]">Type</span>
                        <span className="font-medium text-white">{panelTypeLabels[panel.panel_type] || panel.panel_type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[hsl(220_8%_55%)]">Dimensions</span>
                        <span className="font-medium text-white">{panel.dimensions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[hsl(220_8%_55%)]">Impressions/jour</span>
                        <span className="font-medium text-white">{panel.daily_impressions?.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-[hsl(220_12%_20%)] flex justify-between items-center">
                        <span className="text-[hsl(220_8%_55%)] text-sm">Prix/mois</span>
                        <span className="text-xl font-bold text-[hsl(48_100%_50%)]">${panel.monthly_price_usd?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-dark overflow-hidden">
          <div className="bg-[hsl(220_16%_12%)] p-8 border-b border-[hsl(220_12%_20%)]">
            <h2 className="text-2xl font-bold text-white mb-1">Réserver un espace publicitaire</h2>
            <p className="text-[hsl(220_8%_55%)]">Remplissez le formulaire et notre équipe vous contactera sous 24h.</p>
          </div>

          <div className="p-8">
            {success ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Demande envoyée !</h3>
                <p className="text-[hsl(220_8%_55%)] mb-6">Votre demande de réservation a été reçue. Notre équipe vous contactera sous 24h.</p>
                <button onClick={() => setSuccess(false)} className="btn-gold">
                  Nouvelle demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'client_name', label: 'Nom complet', type: 'text', placeholder: 'Jean Dupont' },
                  { name: 'client_email', label: 'Email', type: 'email', placeholder: 'jean@exemple.com' },
                  { name: 'client_phone', label: 'Téléphone', type: 'tel', placeholder: '+243 8XX XXX XXX' },
                  { name: 'company_name', label: 'Entreprise', type: 'text', placeholder: 'Nom de votre société' },
                  { name: 'campaign_name', label: 'Nom de la campagne', type: 'text', placeholder: 'Lancement produit 2024' },
                  { name: 'budget_usd', label: 'Budget (USD)', type: 'number', placeholder: '500' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-white mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={bookingForm[field.name as keyof BookingForm]}
                      onChange={(e) => setBookingForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
                      required
                      className="input-dark w-full"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Date de début</label>
                  <input
                    type="date"
                    value={bookingForm.start_date}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, start_date: e.target.value }))}
                    required
                    className="input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Date de fin</label>
                  <input
                    type="date"
                    value={bookingForm.end_date}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, end_date: e.target.value }))}
                    required
                    className="input-dark w-full"
                  />
                </div>
                {error && (
                  <div className="md:col-span-2 flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
                    <XCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold w-full inline-flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Clock className="w-5 h-5 animate-spin" />
                        Envoi en cours…
                      </>
                    ) : (
                      'Envoyer la demande de réservation'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
