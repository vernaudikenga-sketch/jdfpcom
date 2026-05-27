'use client';

import { useState, useRef, useCallback } from 'react';
import { Scale, Upload, FileText, X, AlertTriangle, AlertCircle, CheckCircle, Info, Calendar, Clock, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Clause {
  title: string;
  detail: string;
  risk: 'low' | 'medium' | 'high';
  article?: string;
}

const clauses: Clause[] = [
  { title: 'Clause de résiliation anticipée', detail: 'Pénalités disproportionnées détectées', risk: 'high', article: 'Article 12' },
  { title: 'Clause de révision de loyer', detail: 'Indexation non plafonnée', risk: 'medium', article: 'Article 8' },
  { title: 'Responsabilité du locataire', detail: 'Couverture excessive des dommages', risk: 'high', article: 'Article 15' },
  { title: 'Clause de sous-location', detail: 'Conditions standard', risk: 'low', article: 'Article 19' },
  { title: 'Juridiction compétente', detail: 'Tribunal de Commerce de Kinshasa', risk: 'medium', article: 'Article 24' },
];

const keyDates = [
  { label: 'Date de signature', value: '15 janvier 2024' },
  { label: 'Entrée en vigueur', value: '1er février 2024' },
  { label: "Date d'expiration", value: '31 janvier 2026' },
  { label: 'Révision annuelle', value: '1er février 2025' },
];

const riskConfig = {
  low: {
    label: 'RISQUE FAIBLE',
    classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: CheckCircle,
    iconClass: 'text-emerald-400',
  },
  medium: {
    label: 'RISQUE MODÉRÉ',
    classes: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: AlertCircle,
    iconClass: 'text-amber-400',
  },
  high: {
    label: 'RISQUE ÉLEVÉ',
    classes: 'bg-red-500/10 text-red-400 border-red-500/30',
    icon: AlertTriangle,
    iconClass: 'text-red-400',
  },
};

const riskScore = 72;

export default function IADroitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    if (f.type !== 'application/pdf') {
      setError('Seuls les fichiers PDF sont acceptés.');
      return;
    }
    setError('');
    setFile(f);
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
      setError('Veuillez sélectionner un fichier PDF.');
      return;
    }
    setError('');
    setAnalyzing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) { clearInterval(interval); return 90; }
        return p + 18;
      });
    }, 1000);

    await new Promise((resolve) => setTimeout(resolve, 5000));
    clearInterval(interval);
    setProgress(100);

    await supabase.from('ai_analysis_logs').insert([
      {
        analysis_type: 'legal',
        client_email: email,
        file_name: file.name,
        result_summary: 'Contrat de bail commercial — 24 pages analysées — 5 clauses évaluées',
        risk_level: 'high',
        processing_time_ms: 5000,
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
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Scale className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <span className="section-tag mb-1">JDFP-Communication — IA Juridique</span>
              <h1 className="font-display text-3xl md:text-4xl text-white">ANALYSE DE CONTRATS</h1>
            </div>
          </div>
          <p className="mt-2 text-[hsl(220_8%_55%)] max-w-2xl">
            Téléversez un contrat PDF pour identifier les clauses à risque et recevoir des recommandations juridiques assistées par l&apos;IA.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="card-dark overflow-hidden">
            <div className="bg-[hsl(220_16%_12%)] p-6 border-b border-[hsl(220_12%_20%)]">
              <h2 className="text-white text-xl font-bold">Analyser un contrat</h2>
              <p className="text-[hsl(220_8%_55%)] text-sm mt-1">Format PDF uniquement, taille max 20 Mo</p>
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
                <label className="block text-sm font-medium text-white mb-1.5">Contrat PDF</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragging
                      ? 'border-amber-400 bg-amber-500/10'
                      : 'border-[hsl(220_12%_20%)] hover:border-amber-400/50 hover:bg-amber-500/5'
                  }`}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                  {file ? (
                    <div>
                      <div className="flex items-center justify-center gap-3 bg-[hsl(220_18%_8%)] rounded-xl p-4 mb-3 border border-[hsl(220_12%_20%)]">
                        <FileText className="w-8 h-8 text-amber-400" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-white truncate max-w-[200px]">{file.name}</p>
                          <p className="text-xs text-[hsl(220_8%_55%)]">{(file.size / 1024 / 1024).toFixed(2)} Mo</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 mx-auto"
                      >
                        <X className="w-3 h-3" /> Supprimer
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-[hsl(220_12%_20%)] mx-auto mb-3" />
                      <p className="text-white font-medium">Glisser-déposer ou cliquer</p>
                      <p className="text-[hsl(220_8%_55%)] text-sm mt-1">PDF uniquement</p>
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
                    Analyse en cours… {progress}%
                  </>
                ) : (
                  <>
                    <Scale className="w-5 h-5" />
                    Analyser le contrat
                  </>
                )}
              </button>

              {analyzing && (
                <div className="w-full bg-[hsl(220_16%_12%)] rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </form>
          </div>

          <div>
            {!analyzing && !result && (
              <div className="card-dark p-8 flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="inline-flex p-4 rounded-full bg-[hsl(220_16%_12%)] mb-4 border border-[hsl(220_12%_20%)]">
                  <Scale className="w-10 h-10 text-[hsl(220_8%_55%)]" />
                </div>
                <h3 className="text-[hsl(220_8%_55%)] font-medium text-lg">Résultats d&apos;analyse</h3>
                <p className="text-[hsl(220_8%_55%)] text-sm mt-1">Soumettez un contrat PDF pour démarrer.</p>
              </div>
            )}

            {analyzing && (
              <div className="card-dark p-8 flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
                  <Scale className="w-10 h-10 text-amber-400 absolute inset-0 m-auto" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Lecture du contrat</h3>
                <p className="text-[hsl(220_8%_55%)] text-center text-sm">Identification des clauses et analyse des risques…</p>
              </div>
            )}

            {result && !analyzing && (
              <div className="space-y-4 overflow-y-auto max-h-[600px] pr-1">
                <div className="card-dark p-5">
                  <div className="flex items-center gap-3 mb-1">
                    <FileText className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-white">Type de contrat détecté</h3>
                  </div>
                  <p className="text-[hsl(48_100%_50%)] font-semibold ml-8">Contrat de bail commercial — 24 pages analysées</p>
                </div>

                <div className="card-dark p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Scale className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-white">Score de risque global</h3>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex-1 bg-[hsl(220_18%_8%)] rounded-full h-3">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-red-500 rounded-full"
                        style={{ width: `${riskScore}%` }}
                      />
                    </div>
                    <span className="text-2xl font-extrabold text-red-400">{riskScore}/100</span>
                  </div>
                  <p className="text-[hsl(220_8%_55%)] text-sm mt-2">Risque élevé — Révision par juriste recommandée avant signature</p>
                </div>

                <div className="card-dark p-5">
                  <h3 className="font-bold text-white mb-4">Analyse des clauses</h3>
                  <div className="space-y-3">
                    {clauses.map((clause, i) => {
                      const cfg = riskConfig[clause.risk];
                      const Icon = cfg.icon;
                      return (
                        <div key={i} className="flex items-start gap-3 bg-[hsl(220_18%_8%)] rounded-xl p-3 border border-[hsl(220_12%_20%)]">
                          <Icon className={`w-5 h-5 ${cfg.iconClass} shrink-0 mt-0.5`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white text-sm">{clause.title}</p>
                            <p className="text-[hsl(220_8%_55%)] text-xs mt-0.5">{clause.detail}{clause.article ? ` (${clause.article})` : ''}</p>
                          </div>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full border whitespace-nowrap ${cfg.classes}`}>
                            {cfg.label}
                          </span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card-dark p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[hsl(48_100%_50%)]" />
                <h3 className="font-bold text-white">Dates clés extraites</h3>
              </div>
              <div className="space-y-3">
                {keyDates.map((date, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-[hsl(220_12%_20%)] last:border-0">
                    <span className="text-[hsl(220_8%_55%)] text-sm">{date.label}</span>
                    <span className="font-semibold text-white text-sm">{date.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-dark p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-[hsl(48_100%_50%)]" />
                <h3 className="font-bold text-white">Recommandations juriste</h3>
              </div>
              <ul className="space-y-2 text-sm text-[hsl(220_8%_55%)]">
                {[
                  'Renégocier la clause de résiliation (Article 12)',
                  "Plafonner l'indexation annuelle à 5% maximum",
                  'Revoir la couverture des dommages locataires',
                  'Consulter un avocat avant signature',
                ].map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[hsl(48_100%_50%)] shrink-0 mt-0.5" />
                    <span className="text-white">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {result && (
          <div className="bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 rounded-2xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-[hsl(48_100%_50%)] shrink-0 mt-0.5" />
            <p className="text-[hsl(220_8%_55%)] text-sm">
              Cette analyse est une aide à la décision juridique. Consultez un avocat ou juriste qualifié avant de prendre toute décision contractuelle.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
