'use client';

import React, { useState, useEffect } from 'react';
import { Car, Users, CheckCircle, Loader2, AlertCircle, Star, Phone, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { COMPANY } from '@/lib/constants';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  capacity: number;
  daily_rate_usd: number;
  category: 'suv' | 'luxury' | 'minivan';
  features: string[];
  description: string;
  is_available: boolean;
}

const vehicleImages: Record<string, string> = {
  suv: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600&q=75',
  luxury: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600&q=75',
  minivan: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600&q=75',
};

const categoryLabels: Record<string, string> = {
  suv: 'SUV',
  luxury: 'Luxe',
  minivan: 'Minivan',
};

export default function VehiculesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(true);
  const [vehiclesError, setVehiclesError] = useState('');

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    pickup_date: '',
    return_date: '',
    pickup_location: '',
    dropoff_location: '',
    flight_number: '',
    airport_pickup: false,
    notes: '',
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_available', true);
      setVehiclesLoading(false);
      if (error) {
        setVehiclesError('Impossible de charger les véhicules. Veuillez réessayer.');
        return;
      }
      setVehicles((data as Vehicle[]) || []);
    };
    fetchVehicles();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError('');
    const { error } = await supabase.from('vehicle_reservations').insert([
      {
        ...formData,
        vehicle_id: selectedVehicle?.id || null,
        vehicle_name: selectedVehicle ? `${selectedVehicle.brand} ${selectedVehicle.model}` : null,
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
      client_name: '',
      client_email: '',
      client_phone: '',
      pickup_date: '',
      return_date: '',
      pickup_location: '',
      dropoff_location: '',
      flight_number: '',
      airport_pickup: false,
      notes: '',
    });
  };

  return (
    <div className="w-full min-h-screen bg-[hsl(220_18%_8%)]">
      <div className="relative overflow-hidden py-20 px-6">
        <img
          src="https://build-my-site-now-890.lovable.app/assets/hero-car-BegUkEvH.jpg"
          alt="Fleet"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_18%_8%)]/80 to-[hsl(220_18%_8%)]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-2xl bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 mb-6">
            <Car className="w-10 h-10 text-[hsl(48_100%_50%)]" />
          </div>
          <span className="section-tag mb-4">Location & Conciergerie</span>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4">
            LOCATION DE VÉHICULES VIP
          </h1>
          <div className="divider-gold mx-auto mb-6" />
          <p className="text-[hsl(220_8%_55%)] text-lg max-w-2xl mx-auto">
            Flotte premium avec chauffeur professionnel, Meet & Greet à l'aéroport N'Djili et service conciergerie
            pour vos déplacements à Kinshasa et dans tout le Grand-Congo.
          </p>
        </div>
      </div>

      <section className="py-16 bg-[hsl(220_16%_12%)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-tag mb-4">Notre Flotte</span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              VÉHICULES DISPONIBLES
            </h2>
            <p className="text-[hsl(220_8%_55%)] max-w-xl mx-auto">
              Sélectionnez le véhicule qui correspond à vos besoins pour personnaliser votre réservation.
            </p>
          </div>

          {vehiclesLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-[hsl(48_100%_50%)] animate-spin" />
              <span className="ml-3 text-[hsl(220_8%_55%)]">Chargement de la flotte...</span>
            </div>
          )}

          {vehiclesError && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 max-w-xl mx-auto">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{vehiclesError}</p>
            </div>
          )}

          {!vehiclesLoading && !vehiclesError && vehicles.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex p-4 rounded-full bg-[hsl(220_18%_8%)] mb-4">
                <Car className="w-8 h-8 text-[hsl(220_8%_55%)]" />
              </div>
              <p className="text-[hsl(220_8%_55%)]">Aucun véhicule disponible pour le moment. Contactez-nous directement.</p>
            </div>
          )}

          {!vehiclesLoading && vehicles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(selectedVehicle?.id === vehicle.id ? null : vehicle)}
                  className={`card-dark transition-all cursor-pointer hover:-translate-y-1 overflow-hidden border-2 ${
                    selectedVehicle?.id === vehicle.id
                      ? 'border-[hsl(48_100%_50%)] shadow-[0_0_0_4px_hsl(48_100%_50%/0.15)]'
                      : 'border-transparent hover:border-[hsl(48_100%_50%)]/40'
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={vehicleImages[vehicle.category] || vehicleImages.suv}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_18%_8%)]/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[hsl(48_100%_50%)] text-[hsl(220_18%_8%)] text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {categoryLabels[vehicle.category] || vehicle.category}
                      </span>
                    </div>
                    {selectedVehicle?.id === vehicle.id && (
                      <div className="absolute top-3 right-3 bg-[hsl(48_100%_50%)] rounded-full p-1">
                        <CheckCircle className="w-5 h-5 text-[hsl(220_18%_8%)]" />
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white font-bold text-lg leading-tight">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      <p className="text-[hsl(220_8%_55%)] text-sm">{vehicle.year}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[hsl(220_8%_55%)] text-sm mb-4 leading-relaxed line-clamp-2">{vehicle.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5 text-[hsl(220_8%_55%)] text-sm">
                        <Users className="w-4 h-4" />
                        <span>{vehicle.capacity} places</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-[hsl(48_100%_50%)]">{vehicle.daily_rate_usd}</span>
                        <span className="text-[hsl(220_8%_55%)] text-sm"> USD/jour</span>
                      </div>
                    </div>
                    {vehicle.features && vehicle.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {vehicle.features.slice(0, 4).map((feature) => (
                          <span
                            key={feature}
                            className="bg-[hsl(220_18%_8%)] text-[hsl(220_8%_55%)] text-xs px-2.5 py-1 rounded-full border border-[hsl(220_12%_20%)]"
                          >
                            {feature}
                          </span>
                        ))}
                        {vehicle.features.length > 4 && (
                          <span className="bg-[hsl(48_100%_50%)]/10 text-[hsl(48_100%_50%)] text-xs px-2.5 py-1 rounded-full font-medium">
                            +{vehicle.features.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedVehicle && (
            <div className="bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 rounded-xl p-4 text-center mb-2">
              <p className="text-[hsl(48_100%_50%)] font-semibold">
                Véhicule sélectionné : <strong>{selectedVehicle.brand} {selectedVehicle.model} {selectedVehicle.year}</strong>
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[hsl(220_18%_8%)]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-tag mb-4">Réservation</span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              RÉSERVER UN VÉHICULE
            </h2>
            <p className="text-[hsl(220_8%_55%)]">
              Remplissez le formulaire ci-dessous. Notre équipe vous confirmera la disponibilité sous 2h.
            </p>
          </div>

          {submitSuccess ? (
            <div className="card-dark p-12 text-center border-emerald-500/30">
              <div className="inline-flex p-4 rounded-full bg-emerald-500/10 mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Réservation enregistrée !</h3>
              <p className="text-[hsl(220_8%_55%)] mb-8 max-w-md mx-auto">
                Votre demande a été reçue. Notre équipe vous contactera dans les 2h pour confirmation.
                Voici nos coordonnées bancaires pour le règlement :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-6">
                <div className="card-dark p-4 text-left">
                  <p className="text-[hsl(48_100%_50%)] text-xs font-bold uppercase tracking-wider mb-2">{COMPANY.banks.tmb.name}</p>
                  <p className="text-white font-mono text-sm">{COMPANY.banks.tmb.account}</p>
                </div>
                <div className="card-dark p-4 text-left">
                  <p className="text-[hsl(48_100%_50%)] text-xs font-bold uppercase tracking-wider mb-2">{COMPANY.banks.equity.name}</p>
                  <p className="text-white font-mono text-sm break-all">{COMPANY.banks.equity.account}</p>
                </div>
              </div>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="btn-gold"
              >
                Nouvelle réservation
              </button>
            </div>
          ) : (
            <div className="card-dark p-8">
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
                      name="client_name"
                      value={formData.client_name}
                      onChange={handleFormChange}
                      required
                      placeholder="Prénom Nom"
                      className="input-dark w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email</label>
                    <input
                      type="email"
                      name="client_email"
                      value={formData.client_email}
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
                      name="client_phone"
                      value={formData.client_phone}
                      onChange={handleFormChange}
                      required
                      placeholder="+243 8XX XXX XXX"
                      className="input-dark w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Date & heure de prise en charge</label>
                    <input
                      type="datetime-local"
                      name="pickup_date"
                      value={formData.pickup_date}
                      onChange={handleFormChange}
                      required
                      className="input-dark w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Date & heure de restitution</label>
                    <input
                      type="datetime-local"
                      name="return_date"
                      value={formData.return_date}
                      onChange={handleFormChange}
                      required
                      className="input-dark w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Lieu de prise en charge</label>
                    <input
                      type="text"
                      name="pickup_location"
                      value={formData.pickup_location}
                      onChange={handleFormChange}
                      required
                      placeholder="Aéroport N'Djili, Hôtel Fleuve Congo..."
                      className="input-dark w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Lieu de dépose</label>
                    <input
                      type="text"
                      name="dropoff_location"
                      value={formData.dropoff_location}
                      onChange={handleFormChange}
                      required
                      placeholder="Même lieu ou adresse différente"
                      className="input-dark w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Numéro de vol <span className="text-[hsl(220_8%_55%)] font-normal">(optionnel)</span>
                    </label>
                    <input
                      type="text"
                      name="flight_number"
                      value={formData.flight_number}
                      onChange={handleFormChange}
                      placeholder="Ex: AF 567, ET 312..."
                      className="input-dark w-full"
                    />
                  </div>
                </div>

                <div className="bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 rounded-xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        name="airport_pickup"
                        checked={formData.airport_pickup}
                        onChange={handleFormChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          formData.airport_pickup ? 'bg-[hsl(48_100%_50%)] border-[hsl(48_100%_50%)]' : 'border-[hsl(220_12%_20%)] bg-[hsl(220_18%_8%)]'
                        }`}
                      >
                        {formData.airport_pickup && <CheckCircle className="w-3.5 h-3.5 text-[hsl(220_18%_8%)]" />}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Meet & Greet Aéroport N'Djili</p>
                      <p className="text-[hsl(220_8%_55%)] text-sm mt-0.5">
                        Accueil personnalisé à l'arrivée avec pancarte nominative, assistance bagages et escorte jusqu'au véhicule.
                      </p>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Notes et demandes spéciales <span className="text-[hsl(220_8%_55%)] font-normal">(optionnel)</span>
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    rows={3}
                    placeholder="Précisez vos besoins spécifiques : siège enfant, itinéraire préféré, langue du chauffeur..."
                    className="input-dark w-full resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="btn-gold w-full inline-flex items-center justify-center gap-2"
                >
                  {submitLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Car className="w-5 h-5" />}
                  {submitLoading ? 'Envoi en cours...' : 'Confirmer ma réservation'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[hsl(220_16%_12%)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="card-dark overflow-hidden">
            <div className="relative h-48 md:h-auto md:absolute md:inset-0">
              <img
                src="https://build-my-site-now-890.lovable.app/assets/vip-lounge-BoMjrhhy.jpg"
                alt="VIP Lounge"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            <div className="relative p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="inline-flex p-4 rounded-2xl bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 flex-shrink-0">
                  <Star className="w-8 h-8 text-[hsl(48_100%_50%)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Service Meet & Greet — Aéroport N'Djili</h3>
                  <p className="text-[hsl(220_8%_55%)] mb-6">
                    Offrez-vous ou à vos invités une arrivée VIP à Kinshasa. Notre équipe vous accueille à la sortie des douanes
                    avec une pancarte nominative, vous assiste avec les bagages et vous escorte directement jusqu'à votre véhicule
                    climatisé et chauffeur attitré.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white text-sm font-semibold">Accueil nominatif</p>
                        <p className="text-[hsl(220_8%_55%)] text-xs">Pancarte à votre nom dès la sortie</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white text-sm font-semibold">Assistance bagages</p>
                        <p className="text-[hsl(220_8%_55%)] text-xs">Prise en charge complète de vos bagages</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[hsl(48_100%_50%)] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white text-sm font-semibold">Transfert direct</p>
                        <p className="text-[hsl(220_8%_55%)] text-xs">Escorte jusqu'au véhicule climatisé</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp}?text=Bonjour%2C%20je%20souhaite%20r%C3%A9server%20le%20service%20Meet%20%26%20Greet.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold inline-flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Réserver
                  </a>
                  <div className="flex items-center gap-2 text-[hsl(220_8%_55%)] text-xs">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    Aéroport International de Ndjili, Kinshasa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
