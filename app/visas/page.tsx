'use client';

import React, { useState } from 'react';
import { Plane, Search, FileText, Clock, DollarSign, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type VisaStatus = 'pending' | 'in_review' | 'processing' | 'ready' | 'rejected';

interface VisaRequest {
  id: string;
  full_name: string;
  passport_number: string;
  email: string;
  phone: string;
  nationality: string;
  visa_type: string;
  destination_country: string;
  travel_date: string;
  status: VisaStatus;
  notes: string;
  created_at: string;
}

const statusConfig: Record<VisaStatus, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  pending: {
    label: 'En attente',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    icon: <Clock className="w-5 h-5 text-yellow-400" />,
  },
  in_review: {
    label: 'En révision',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: <Search className="w-5 h-5 text-blue-400" />,
  },
  processing: {
    label: 'En traitement',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    icon: <Loader2 className="w-5 h-5 text-orange-400" />,
  },
  ready: {
    label: 'Prêt à retirer',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
  },
  rejected: {
    label: 'Refusé',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: <AlertCircle className="w-5 h-5 text-red-400" />,
  },
};

const visaTypeLabels: Record<string, string> = {
  schengen: 'Visa Schengen',
  rdc_entry: 'Entrée RDC',
  rdc_exit: 'Sortie RDC',
  transit: 'Transit',
};

export default function VisasPage() {
  const [activeTab, setActiveTab] = useState<'suivi' | 'demande'>('suivi');

  const [passportNumber, setPassportNumber] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<VisaRequest[] | null>(null);
  const [searchError, setSearchError] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    passport_number: '',
    email: '',
    phone: '',
    nationality: '',
    visa_type: 'schengen',
    destination_country: '',
    travel_date: '',
    notes: '',
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passportNumber.trim()) return;
    setSearchLoading(true);
    setSearchError('');
    setSearchResults(null);
    const { data, error } = await supabase
      .from('visa_requests')
      .select('*')
      .eq('passport_number', passportNumber.trim().toUpperCase());
    setSearchLoading(false);
    if (error) {
      setSearchError('Une erreur est survenue. Veuillez réessayer.');
      return;
    }
    setSearchResults(data as VisaRequest[]);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError('');
    const { error } = await supabase.from('visa_requests').insert([
      {
        ...formData,
        passport_number: formData.passport_number.toUpperCase(),
        status: 'pending',
      },
    ]);
    setSubmitLoading(false);
    if (error) {
      setSubmitError('Une erreur est survenue. Veuillez réessayer.');
      return;
    }
    setSubmitSuccess(true);
    setFormData({
      full_name: '',
      passport_number: '',
      email: '',
      phone: '',
      nationality: '',
      visa_type: 'schengen',
      destination_country: '',
      travel_date: '',
      notes: '',
    });
  };

  return (
    <div className="w-full min-h-screen bg-[hsl(220_18%_8%)]">
      <div className="relative overflow-hidden bg-[hsl(220_18%_8%)] py-20 px-6">
        <img
          src="https://build-my-site-now-890.lovable.app/assets/illustr-jdfp-fjSowOuw.jpeg"
          alt="Visas"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_18%_8%)]/70 to-[hsl(220_18%_8%)]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-2xl bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 mb-6">
            <Plane className="w-10 h-10 text-[hsl(48_100%_50%)]" />
          </div>
          <span className="section-tag mb-4">Visas & Voyage</span>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4">
            VISAS & SUIVI DE DOSSIERS
          </h1>
          <div className="divider-gold mx-auto mb-6" />
          <p className="text-[hsl(220_8%_55%)] text-lg max-w-2xl mx-auto">
            Suivez l'avancement de votre dossier visa en temps réel ou déposez une nouvelle demande.
            Notre équipe vous accompagne à chaque étape de vos démarches.
          </p>
        </div>
      </div>

      <div className="bg-[hsl(220_16%_12%)] border-b border-[hsl(220_12%_20%)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('suivi')}
              className={`flex items-center gap-2 px-8 py-5 text-sm font-semibold border-b-2 transition-all duration-200 ${
                activeTab === 'suivi'
                  ? 'border-[hsl(48_100%_50%)] text-[hsl(48_100%_50%)]'
                  : 'border-transparent text-[hsl(220_8%_55%)] hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              Suivi de Dossier
            </button>
            <button
              onClick={() => setActiveTab('demande')}
              className={`flex items-center gap-2 px-8 py-5 text-sm font-semibold border-b-2 transition-all duration-200 ${
                activeTab === 'demande'
                  ? 'border-[hsl(48_100%_50%)] text-[hsl(48_100%_50%)]'
                  : 'border-transparent text-[hsl(220_8%_55%)] hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Nouvelle Demande
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[hsl(220_18%_8%)] min-h-[60vh] py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'suivi' && (
            <div>
              <div className="card-dark p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Rechercher votre dossier</h2>
                <p className="text-[hsl(220_8%_55%)] mb-6">Entrez votre numéro de passeport pour consulter l'état de votre demande.</p>
                <form onSubmit={handleSearch} className="flex gap-3">
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="Ex: AA1234567"
                    className="input-dark flex-1"
                    required
                  />
                  <button
                    type="submit"
                    disabled={searchLoading}
                    className="btn-gold inline-flex items-center gap-2"
                  >
                    {searchLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    Rechercher
                  </button>
                </form>
              </div>

              {searchError && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{searchError}</p>
                </div>
              )}

              {searchResults !== null && searchResults.length === 0 && (
                <div className="card-dark p-12 text-center">
                  <div className="inline-flex p-4 rounded-full bg-[hsl(220_16%_12%)] mb-4">
                    <Search className="w-8 h-8 text-[hsl(220_8%_55%)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Aucun dossier trouvé</h3>
                  <p className="text-[hsl(220_8%_55%)]">
                    Aucune demande de visa n'est associée au passeport <strong className="text-white">{passportNumber}</strong>.
                    Vérifiez le numéro ou déposez une nouvelle demande.
                  </p>
                </div>
              )}

              {searchResults && searchResults.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    {searchResults.length} dossier{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
                  </h3>
                  {searchResults.map((req) => {
                    const config = statusConfig[req.status] || statusConfig.pending;
                    return (
                      <div
                        key={req.id}
                        className={`card-dark p-6 border ${config.border}`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-bold text-white">{req.full_name}</h4>
                            <p className="text-[hsl(220_8%_55%)] text-sm mt-1">
                              Passeport : <span className="font-mono font-semibold text-white">{req.passport_number}</span>
                              {' · '}
                              {visaTypeLabels[req.visa_type] || req.visa_type}
                              {' · '}
                              Destination : {req.destination_country}
                            </p>
                            {req.travel_date && (
                              <p className="text-[hsl(220_8%_55%)] text-sm mt-1">
                                Voyage prévu : {new Date(req.travel_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </p>
                            )}
                          </div>
                          <div className={`inline-flex items-center gap-2 ${config.bg} ${config.border} border rounded-full px-4 py-2`}>
                            {config.icon}
                            <span className={`text-sm font-semibold ${config.color}`}>{config.label}</span>
                          </div>
                        </div>
                        {req.notes && (
                          <p className="mt-4 text-sm text-[hsl(220_8%_55%)] bg-[hsl(220_16%_12%)] rounded-lg p-3 border border-[hsl(220_12%_20%)]">
                            {req.notes}
                          </p>
                        )}
                        <p className="text-xs text-[hsl(220_8%_55%)] mt-3">
                          Dossier créé le {new Date(req.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'demande' && (
            <div>
              {submitSuccess ? (
                <div className="card-dark p-12 text-center border-emerald-500/30">
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/10 mb-4">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Demande soumise avec succès !</h3>
                  <p className="text-[hsl(220_8%_55%)] mb-6 max-w-md mx-auto">
                    Votre dossier a été enregistré. Notre équipe vous contactera dans les 24h pour la suite de la procédure.
                    Conservez votre numéro de passeport pour le suivi de dossier.
                  </p>
                  <button
                    onClick={() => { setSubmitSuccess(false); setActiveTab('suivi'); }}
                    className="btn-gold inline-flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Suivre mon dossier
                  </button>
                </div>
              ) : (
                <div className="card-dark p-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Nouvelle demande de visa</h2>
                  <p className="text-[hsl(220_8%_55%)] mb-8">Remplissez ce formulaire pour initier votre demande. Tous les champs sont obligatoires.</p>

                  {submitError && (
                    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-sm">{submitError}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">Nom complet</label>
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleFormChange}
                          required
                          placeholder="Prénom Nom"
                          className="input-dark w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">Numéro de passeport</label>
                        <input
                          type="text"
                          name="passport_number"
                          value={formData.passport_number}
                          onChange={handleFormChange}
                          required
                          placeholder="AA1234567"
                          className="input-dark w-full font-mono uppercase"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          placeholder="votre@email.com"
                          className="input-dark w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">Téléphone / WhatsApp</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          required
                          placeholder="+243 8XX XXX XXX"
                          className="input-dark w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">Nationalité</label>
                        <input
                          type="text"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleFormChange}
                          required
                          placeholder="Congolaise (RDC)"
                          className="input-dark w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">Type de visa</label>
                        <select
                          name="visa_type"
                          value={formData.visa_type}
                          onChange={handleFormChange}
                          required
                          className="input-dark w-full"
                        >
                          <option value="schengen">Visa Schengen</option>
                          <option value="rdc_entry">Entrée RDC</option>
                          <option value="rdc_exit">Sortie RDC</option>
                          <option value="transit">Transit</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">Pays de destination</label>
                        <input
                          type="text"
                          name="destination_country"
                          value={formData.destination_country}
                          onChange={handleFormChange}
                          required
                          placeholder="France, Belgique..."
                          className="input-dark w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">Date de voyage prévue</label>
                        <input
                          type="date"
                          name="travel_date"
                          value={formData.travel_date}
                          onChange={handleFormChange}
                          required
                          className="input-dark w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Notes et informations complémentaires</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleFormChange}
                        rows={4}
                        placeholder="Précisez l'objet du voyage, documents disponibles, etc."
                        className="input-dark w-full resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="btn-gold w-full inline-flex items-center justify-center gap-2"
                    >
                      {submitLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plane className="w-5 h-5" />}
                      {submitLoading ? 'Envoi en cours...' : 'Soumettre ma demande'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <section className="py-16 bg-[hsl(220_16%_12%)] border-t border-[hsl(220_12%_20%)]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-4xl text-white text-center mb-12">
            INFORMATIONS PRATIQUES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-dark p-6">
              <div className="inline-flex p-3 rounded-xl bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 mb-4">
                <FileText className="w-5 h-5 text-[hsl(48_100%_50%)]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Documents requis</h3>
              <ul className="space-y-2 text-[hsl(220_8%_55%)] text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Passeport valide (6 mois min.)</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Photos d'identité récentes (3×4)</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Justificatif de domicile</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Relevés bancaires (3 mois)</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Lettre d'invitation (si applicable)</li>
              </ul>
            </div>

            <div className="card-dark p-6">
              <div className="inline-flex p-3 rounded-xl bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 mb-4">
                <Clock className="w-5 h-5 text-[hsl(48_100%_50%)]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Délais de traitement</h3>
              <ul className="space-y-2 text-[hsl(220_8%_55%)] text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Schengen : 15 à 21 jours ouvrés</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Entrée RDC : 5 à 10 jours ouvrés</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Sortie RDC : 3 à 7 jours ouvrés</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Transit : 2 à 5 jours ouvrés</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Traitement express disponible</li>
              </ul>
            </div>

            <div className="card-dark p-6">
              <div className="inline-flex p-3 rounded-xl bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 mb-4">
                <DollarSign className="w-5 h-5 text-[hsl(48_100%_50%)]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Tarifs indicatifs</h3>
              <ul className="space-y-2 text-[hsl(220_8%_55%)] text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Schengen : à partir de 150 USD</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Entrée RDC : à partir de 80 USD</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Sortie RDC : à partir de 60 USD</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Transit : à partir de 40 USD</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />Devis personnalisé sur demande</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
