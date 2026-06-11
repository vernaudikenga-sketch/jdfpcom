'use client';

import { useEffect, useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { StatusSelect } from '../_components/StatusSelect';

interface VisaRequest {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  nationality: string;
  visa_type: string;
  destination_country: string;
  travel_date: string;
  passport_number: string;
  notes: string;
  status: string;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

export default function VisasAdminPage() {
  const [rows, setRows] = useState<VisaRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/visa_requests')
      .then((r) => r.json())
      .then((d) => { setRows(d); setLoading(false); });
  }, []);

  function updateStatus(id: string, status: string) {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-blue-400" />
        <h1 className="font-display text-2xl text-white">Demandes de visa</h1>
        <span className="ml-auto text-[hsl(220_8%_55%)] text-sm">{rows.length} entrée{rows.length > 1 ? 's' : ''}</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-[hsl(220_8%_55%)]">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Chargement…
        </div>
      ) : rows.length === 0 ? (
        <p className="text-center py-20 text-[hsl(220_8%_55%)]">Aucune demande pour l&apos;instant.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[hsl(220_12%_20%)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[hsl(220_16%_12%)] text-[hsl(220_8%_55%)]">
                {['Date', 'Nom', 'Email', 'Tél.', 'Visa', 'Destination', 'Voyage', 'Passeport', 'Statut'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap first:rounded-tl-2xl last:rounded-tr-2xl">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} className={`border-t border-[hsl(220_12%_20%)] ${i % 2 === 0 ? 'bg-[hsl(220_18%_8%)]' : 'bg-[hsl(220_16%_10%)]'}`}>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_55%)]">{fmt(r.created_at)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-white font-medium">{r.full_name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_70%)]">{r.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_70%)]">{r.phone}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_70%)]">{r.visa_type}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_70%)]">{r.destination_country}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[hsl(220_8%_70%)]">{r.travel_date ? fmt(r.travel_date) : '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-[hsl(220_8%_70%)]">{r.passport_number}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusSelect table="visa_requests" id={r.id} status={r.status ?? 'pending'} onChange={updateStatus} />
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
