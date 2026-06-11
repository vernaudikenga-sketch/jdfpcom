'use client';

import { useEffect, useState } from 'react';
import { Car, Loader2 } from 'lucide-react';
import { StatusSelect } from '../_components/StatusSelect';

interface Reservation {
  id: string;
  created_at: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  pickup_date: string;
  return_date: string;
  pickup_location: string;
  dropoff_location: string;
  flight_number: string;
  airport_pickup: boolean;
  notes: string;
  status: string;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

export default function VehiculesAdminPage() {
  const [rows, setRows] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/vehicle_reservations')
      .then((r) => r.json())
      .then((d) => { setRows(d); setLoading(false); });
  }, []);

  function updateStatus(id: string, status: string) {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <Car className="w-6 h-6 text-emerald-400" />
        <h1 className="font-display text-2xl text-white">Réservations véhicule</h1>
        <span className="ml-auto text-[hsl(220_8%_55%)] text-sm">{rows.length} entrée{rows.length > 1 ? 's' : ''}</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-[hsl(220_8%_55%)]">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Chargement…
        </div>
      ) : rows.length === 0 ? (
        <p className="text-center py-20 text-[hsl(220_8%_55%)]">Aucune réservation pour l&apos;instant.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[hsl(220_12%_20%)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[hsl(220_16%_12%)] text-[hsl(220_8%_55%)]">
                {['Date', 'Client', 'Email', 'Tél.', 'Départ', 'Retour', 'Lieu départ', 'Lieu retour', 'Vol', 'Aéroport', 'Statut'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} className={`border-t border-[hsl(220_12%_20%)] ${i % 2 === 0 ? 'bg-[hsl(220_18%_8%)]' : 'bg-[hsl(220_16%_10%)]'}`}>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_55%)]">{fmt(r.created_at)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-white font-medium">{r.client_name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_70%)]">{r.client_email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_70%)]">{r.client_phone}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_70%)]">{r.pickup_date ? fmt(r.pickup_date) : '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_70%)]">{r.return_date ? fmt(r.return_date) : '—'}</td>
                  <td className="px-4 py-3 text-[hsl(220_8%_70%)] max-w-[120px] truncate">{r.pickup_location}</td>
                  <td className="px-4 py-3 text-[hsl(220_8%_70%)] max-w-[120px] truncate">{r.dropoff_location}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_70%)]">{r.flight_number || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_70%)]">{r.airport_pickup ? 'Oui' : 'Non'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusSelect table="vehicle_reservations" id={r.id} status={r.status ?? 'pending'} onChange={updateStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
