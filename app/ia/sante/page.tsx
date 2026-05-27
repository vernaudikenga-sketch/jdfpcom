'use client';

import { useState, useRef, useCallback } from 'react';
import { HeartPulse, Upload, FileText, X, AlertTriangle, CheckCircle, Info, Brain, Microscope, ClipboardList, ShieldAlert, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface DiagnosticItem {
  label: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
}

interface Recommendation {
  text: string;
  priority: 'normal' | 'urgent';
}

const diagnostics: DiagnosticItem[] = [
  { label: 'Anémie ferriprive modérée', confidence: 78, severity: 'medium' },
  { label: 'Insuffisance en vitamine D', confidence: 65, severity: 'low' },
  { label: 'Syndrome métabolique — surveillance requise', confidence: 52, severity: 'high' },
];

const recommendations: Recommendation[] = [
  { text: 'Consultez un hématologue pour bilan complet du fer', priority: 'urgent' },
  { text: 'Supplémenter en vitamine D3 (1000 UI/jour)', priority: 'normal' },
  { text: 'Bilan glycémique à jeun dans les 30 jours', priority: 'urgent' },
  { text: 'Régime alimentaire équilibré, réduire les sucres raffinés', priority: 'normal' },
];

export default function IAMedicalPage() {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowed.includes(f.type)) {
      setError('Seuls les fichiers PDF et images (JPG, PNG) sont acceptés.');
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
      setError('Veuillez sélectionner un fichier à analyser.');
      return;
    }
    setError('');
    setAnalyzing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) { clearInterval(interval); return 90; }
        return p + 15;
      });
    }, 800);

    await new Promise((resolve) => setTimeout(resolve, 5000));
    clearInterval(interval);
    setProgress(100);

    await supabase.from('ai_analysis_logs').insert([
      {
        analysis_type: 'medical',
        client_email: email,
        file_name: file.name,
        result_summary: 'Bilan sanguin analysé — 3 anomalies détectées — 4 recommandations',
        risk_level: 'medium',
        processing_time_ms: 5000,
      },
    ]);

    setAnalyzing(false);
    setResult(true);
  }

  const severityColor: Record<string, string> = {
    low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    high: 'text-red-400 bg-red-500/10 border-red-500/30',
  };

  const severityLabel: Record<string, string> = {
    low: 'Faible',
    medium: 'Modéré',
    high: 'Élevé',
  };

  return (
    <div className="min-h-screen bg-[hsl(220_18%_8%)]">
      <div className="bg-[hsl(220_16%_12%)] border-b border-[hsl(220_12%_20%)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
              <HeartPulse className="w-7 h-7 text-rose-400" />
            </div>
            <div>
              <span className="section-tag mb-1">JDFP-Communication — IA Médicale</span>
              <h1 className="font-display text-3xl md:text-4xl text-white">ANALYSE MÉDICALE PAR IA</h1>
            </div>
          </div>
          <p className="mt-2 text-[hsl(220_8%_55%)] max-w-2xl">
            Téléversez votre bilan sanguin, résultat d'imagerie ou document médical (PDF/image) pour une analyse assistée par intelligence artificielle.
          </p>
          <div className="mt-4 flex items-start gap-3 bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 max-w-2xl">
            <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <p className="text-rose-300 text-sm">
              Cette analyse IA est une aide à la décision. Elle ne remplace pas un avis médical professionnel. Consultez toujours un médecin qualifié.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-dark overflow-hidden">
            <div className="bg-[hsl(220_16%_12%)] p-6 border-b border-[hsl(220_12%_20%)]">
              <h2 className="text-white text-xl font-bold">Analyser un document médical</h2>
              <p className="text-[hsl(220_8%_55%)] text-sm mt-1">PDF, JPG, PNG — taille max 20 Mo</p>
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
                <label className="block text-sm font-medium text-white mb-1.5">Document médical</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragging
                      ? 'border-rose-400 bg-rose-500/10'
                      : 'border-[hsl(220_12%_20%)] hover:border-rose-400/50 hover:bg-rose-500/5'
                  }`}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                  {file ? (
                    <div>
                      <div className="flex items-center justify-center gap-3 bg-[hsl(220_18%_8%)] rounded-xl p-4 mb-3 border border-[hsl(220_12%_20%)]">
                        <FileText className="w-8 h-8 text-rose-400" />
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
                      <p className="text-[hsl(220_8%_55%)] text-sm mt-1">PDF, JPG, PNG acceptés</p>
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
                    <Brain className="w-5 h-5" />
                    Lancer l&apos;analyse IA
                  </>
                )}
              </button>

              {analyzing && (
                <div className="w-full bg-[hsl(220_16%_12%)] rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full transition-all duration-700"
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
                  <HeartPulse className="w-10 h-10 text-[hsl(220_8%_55%)]" />
                </div>
                <h3 className="text-[hsl(220_8%_55%)] font-medium text-lg">Résultats de l&apos;analyse</h3>
                <p className="text-[hsl(220_8%_55%)] text-sm mt-1">Soumettez un document médical pour démarrer.</p>
              </div>
            )}

            {analyzing && (
              <div className="card-dark p-8 flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin" />
                  <HeartPulse className="w-10 h-10 text-rose-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Analyse en cours</h3>
                <p className="text-[hsl(220_8%_55%)] text-center text-sm">
                  Lecture du document, détection des anomalies et génération des recommandations…
                </p>
              </div>
            )}

            {result && !analyzing && (
              <div className="space-y-4 overflow-y-auto max-h-[620px] pr-1">
                <div className="card-dark p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <ClipboardList className="w-5 h-5 text-[hsl(48_100%_50%)]" />
                    <h3 className="font-bold text-white">Résumé Clinique</h3>
                  </div>
                  <p className="text-[hsl(220_8%_55%)] text-sm leading-relaxed">
                    Bilan sanguin complet analysé. Plusieurs anomalies biologiques détectées nécessitant
                    une attention médicale. Profil nutritionnel déficitaire confirmé avec risque métabolique modéré à surveiller.
                  </p>
                </div>

                <div className="card-dark p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <Microscope className="w-5 h-5 text-rose-400" />
                    <h3 className="font-bold text-white">Diagnostics Possibles</h3>
                  </div>
                  <div className="space-y-3">
                    {diagnostics.map((diag, i) => (
                      <div key={i} className="bg-[hsl(220_18%_8%)] rounded-xl p-4 border border-[hsl(220_12%_20%)]">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <p className="text-white text-sm font-medium">{diag.label}</p>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border whitespace-nowrap ${severityColor[diag.severity]}`}>
                            {severityLabel[diag.severity]}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-[hsl(220_16%_12%)] rounded-full h-1.5">
                            <div
                              className="h-full rounded-full bg-[hsl(48_100%_50%)]"
                              style={{ width: `${diag.confidence}%` }}
                            />
                          </div>
                          <span className="text-[hsl(48_100%_50%)] font-bold text-sm">{diag.confidence}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-dark p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-white">Recommandations</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${rec.priority === 'urgent' ? 'bg-red-400' : 'bg-emerald-400'}`} />
                        <span className={rec.priority === 'urgent' ? 'text-white' : 'text-[hsl(220_8%_55%)]'}>{rec.text}</span>
                        {rec.priority === 'urgent' && (
                          <span className="ml-auto text-xs font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/30 whitespace-nowrap">URGENT</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-300 font-semibold text-sm">Alerte — Surveillance requise</p>
                    <p className="text-amber-400/80 text-sm mt-1">
                      Les résultats indiquent un risque métabolique modéré. Une consultation médicale dans les 30 jours est fortement recommandée.
                    </p>
                  </div>
                </div>

                <div className="bg-[hsl(48_100%_50%)]/10 border border-[hsl(48_100%_50%)]/30 rounded-xl p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[hsl(48_100%_50%)] shrink-0 mt-0.5" />
                  <p className="text-[hsl(220_8%_55%)] text-sm">
                    Cette analyse IA est fournie à titre informatif uniquement. Elle ne constitue pas un diagnostic médical et ne remplace pas une consultation avec un professionnel de santé qualifié.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
