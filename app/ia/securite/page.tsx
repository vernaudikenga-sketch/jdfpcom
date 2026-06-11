'use client';

import { useState, useRef, useCallback } from 'react';
import { ShieldCheck, Upload, X, AlertTriangle, CheckCircle, AlertCircle, Info, Eye, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type CheckStatus = 'pass' | 'warn' | 'fail';

interface CheckItem {
  label: string;
  status: CheckStatus;
}

const checkItems: CheckItem[] = [
  { label: 'Cohérence visuelle', status: 'pass' },
  { label: 'Hologramme de sécurité', status: 'pass' },
  { label: 'Photo du titulaire', status: 'pass' },
  { label: 'Zone MRZ valide', status: 'pass' },
  { label: "Date d'expiration", status: 'warn' },
  { label: 'Concordance des données', status: 'pass' },
];

const mrzData = [
  { label: 'Type de document', value: 'Passeport (P)' },
  { label: 'Pays émetteur', value: 'COD (RDC)' },
  { label: 'Nom', value: '*** ***' },
  { label: 'Numéro', value: '****1234' },
  { label: 'Nationalité', value: 'Congolaise (RDC)' },
  { label: 'Date de naissance', value: '** / ** / ****' },
  { label: "Date d'expiration", value: '** / ** / 2024' },
  { label: 'Sexe', value: '***' },
];

const statusConfig: Record<CheckStatus, { icon: React.ElementType; iconClass: string; badgeClass: string; label: string }> = {
  pass: { icon: CheckCircle, iconClass: 'text-emerald-400', badgeClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30', label: 'Validé' },
  warn: { icon: AlertCircle, iconClass: 'text-amber-400', badgeClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/30', label: 'Avertissement' },
  fail: { icon: AlertTriangle, iconClass: 'text-red-400', badgeClass: 'bg-red-500/10 text-red-400 border border-red-500/30', label: 'Échec' },
};

const score = 87;

function CircleProgress({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="136" height="136" className="-rotate-90">
        <circle cx="68" cy="68" r={radius} stroke="hsl(220 12% 20%)" strokeWidth="10" fill="none" />
        <circle
          cx="68"
          cy="68"
          r={radius}
          stroke="#22c55e"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-extrabold text-white">{score}</span>
        <span className="text-xs text-[hsl(220_8%_55%)] font-medium">/100</span>
      </div>
    </div>
  );
}

export default function IASecuritePage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    setFile(f);
    if (f.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError('Veuillez sélectionner un document à vérifier.');
      return;
    }
    setError('');
    setAnalyzing(true);

    await new Promise((resolve) => setTimeout(resolve, 4000));

    await supabase.from('ai_analysis_logs').insert([
      {
        analysis_type: 'security',
        client_email: email,
        file_name: file.name,
        result_summary: 'Passeport biométrique RDC — Score 87/100 — Authentique',
        risk_level: 'low',
        processing_time_ms: 4000,
      },
    ]);

    setAnalyzing(false);
    setResult(true);
  }

  return (
    <div className="min-h-screen bg-[hsl(220_18%_8%)]">
      <div className="bg-[hsl(220_16%_12%)] border-b border-[hsl(220_12%_20%)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <span className="section-tag mb-1">JDFP-Communication — IA Sécurité</span>
              <h1 className="font-display text-3xl md:text-4xl text-white">VÉRIFICATION DOCUMENTAIRE</h1>
            </div>
          </div>
          <p className="mt-2 text-[hsl(220_8%_55%)] max-w-2xl">
            Pre-check IA pour l&apos;authenticité des passeports et pièces d&apos;identité — Analyse biométrique et MRZ en temps réel.
          </p>
        </div>
      </div>

      <div className="bg-amber-500/10 border-b border-amber-500/30 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="bg-amber-400 text-black text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">Démonstration</span>
          <p className="text-amber-300 text-sm">Les résultats affichés sont simulés à des fins de démonstration et ne constituent pas une vérification documentaire réelle.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-dark overflow-hidden">
            <div className="bg-[hsl(220_16%_12%)] p-6 border-b border-[hsl(220_12%_20%)]">
              <h2 className="text-white text-xl font-bold">Scanner un document</h2>
              <p className="text-[hsl(220_8%_55%)] text-sm mt-1">Passeport ou pièce d&apos;identité (image)</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Adresse email</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-dark w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Scan du document</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragging
                      ? 'border-emerald-400 bg-emerald-500/10'
                      : 'border-[hsl(220_12%_20%)] hover:border-emerald-400/50 hover:bg-emerald-500/5'
                  }`}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                  {file ? (
                    <div>
                      {preview && (
                        <img src={preview} alt="document" className="w-full h-44 object-cover rounded-xl mb-3" />
                      )}
                      <div className="flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4 text-[hsl(220_8%_55%)]" />
                        <p className="text-sm text-white font-medium truncate max-w-[180px]">{file.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 mx-auto mt-2"
                      >
                        <X className="w-3 h-3" /> Supprimer
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-[hsl(220_12%_20%)] mx-auto mb-3" />
                      <p className="text-white font-medium">Glisser-déposer ou cliquer</p>
                      <p className="text-[hsl(220_8%_55%)] text-sm mt-1">PNG, JPG — scan du passeport</p>
                    </>
                  )}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-xl text-sm">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={analyzing}
                className="btn-gold w-full inline-flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Vérification en cours…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Vérifier le document
                  </>
                )}
              </button>
            </form>
          </div>

          <div>
            {!analyzing && !result && (
              <div className="card-dark p-8 flex flex-col items-center justify-center h-full min-h-[420px] text-center">
                <div className="inline-flex p-4 rounded-full bg-[hsl(220_16%_12%)] mb-4 border border-[hsl(220_12%_20%)]">
                  <ShieldCheck className="w-10 h-10 text-[hsl(220_8%_55%)]" />
                </div>
                <h3 className="text-[hsl(220_8%_55%)] font-medium text-lg">Résultats de vérification</h3>
                <p className="text-[hsl(220_8%_55%)] text-sm mt-1">Soumettez un document pour l&apos;analyser.</p>
              </div>
            )}

            {analyzing && (
              <div className="card-dark p-8 flex flex-col items-center justify-center h-full min-h-[420px]">
                <div className="relative mb-6">
                  <div className="w-28 h-28 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
                  <ShieldCheck className="w-12 h-12 text-emerald-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Analyse sécurité</h3>
                <p className="text-[hsl(220_8%_55%)] text-center text-sm">Vérification biométrique et lecture MRZ…</p>
                <div className="mt-6 w-full max-w-xs space-y-2">
                  {['Analyse visuelle', 'Lecture MRZ', 'Vérification hologramme'].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[hsl(220_18%_8%)] rounded-lg px-4 py-2 border border-[hsl(220_12%_20%)]">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-sm text-[hsl(220_8%_55%)]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result && !analyzing && (
              <div className="space-y-4">
                <div className="card-dark p-6">
                  <div className="flex items-center gap-6">
                    <CircleProgress score={score} />
                    <div>
                      <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-full mb-2">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-bold">Document Authentique</span>
                      </div>
                      <p className="text-white text-sm font-medium">Passeport biométrique — RDC</p>
                      <p className="text-[hsl(220_8%_55%)] text-xs mt-1">Confiance : Très élevée</p>
                    </div>
                  </div>
                </div>

                <div className="card-dark p-5">
                  <h3 className="font-bold text-white mb-4">Points de contrôle</h3>
                  <div className="space-y-2.5">
                    {checkItems.map((item, i) => {
                      const cfg = statusConfig[item.status];
                      const Icon = cfg.icon;
                      return (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-[hsl(220_12%_20%)] last:border-0">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-5 h-5 ${cfg.iconClass}`} />
                            <span className="text-sm text-white">{item.label}</span>
                          </div>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${cfg.badgeClass}`}>{cfg.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {result && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-dark p-6">
              <h3 className="font-bold text-white mb-4">Données MRZ extraites</h3>
              <div className="space-y-2.5">
                {mrzData.map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-[hsl(220_12%_20%)] last:border-0">
                    <span className="text-[hsl(220_8%_55%)] text-sm">{row.label}</span>
                    <span className="font-mono text-sm font-semibold text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-300 font-semibold text-sm">Avertissement détecté</p>
                  <p className="text-amber-400/80 text-sm mt-1">La date d&apos;expiration est inférieure à 6 mois. Un renouvellement est recommandé.</p>
                </div>
              </div>

              <div className="bg-[hsl(220_18%_8%)] border border-[hsl(220_12%_20%)] rounded-2xl p-5">
                <p className="text-sm font-mono text-[hsl(48_100%_50%)] leading-relaxed break-all font-semibold">
                  P&lt;COD***&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                  <br />
                  ****1234&lt;6COD******&lt;&lt;&lt;&lt;&lt;M2401**&lt;&lt;&lt;&lt;&lt;&lt;**
                </p>
              </div>

              <div className="bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 rounded-2xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-[hsl(48_100%_50%)] shrink-0 mt-0.5" />
                <p className="text-[hsl(220_8%_55%)] text-sm">
                  Ce résultat est un pre-check IA. Une vérification officielle par les autorités compétentes reste obligatoire.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
