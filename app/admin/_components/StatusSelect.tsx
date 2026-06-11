'use client';

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending: { label: 'En attente', className: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  processing: { label: 'En traitement', className: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  completed: { label: 'Terminé', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  rejected: { label: 'Rejeté', className: 'bg-red-500/10 text-red-400 border-red-500/30' },
};

interface StatusSelectProps {
  table: string;
  id: string;
  status: string;
  onChange: (id: string, status: string) => void;
}

export function StatusSelect({ table, id, status, onChange }: StatusSelectProps) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    onChange(id, newStatus);
    await fetch(`/api/admin/${table}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });
  }

  return (
    <select
      value={status || 'pending'}
      onChange={handleChange}
      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer bg-transparent appearance-none ${cfg.className}`}
    >
      {Object.entries(STATUS_CONFIG).map(([val, { label }]) => (
        <option key={val} value={val} className="bg-[hsl(220_16%_12%)] text-white">
          {label}
        </option>
      ))}
    </select>
  );
}
