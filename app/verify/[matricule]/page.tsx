'use client';

import { useEffect, useState } from 'react';
import { supabasePyramide as supabase } from '@/lib/supabase-pyramide';
import {
  AlertCircle,
  CheckCircle2,
  Lock,
  Shield,
  Phone,
  Clock,
  User,
  Briefcase,
  Building,
  Fingerprint
} from 'lucide-react';

interface Employee {
  id: string;
  matricule: string;
  full_name: string;
  position: string;
  pole: string;
  status: string;
  autorisations: string[];
}

interface VerifyPageProps {
  params: {
    matricule: string;
  };
}

export default function VerifyBadgePage({ params }: VerifyPageProps) {
  const { matricule } = params;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        setError(false);

        // Use secure RPC function instead of direct table access
        const { data: empData, error: empError } = await supabase
          .rpc('verify_employee_badge', { p_matricule: matricule });

        if (empError || !empData || empData.length === 0) {
          setError(true);
          setLoading(false);
          return;
        }

        // The function returns an array, take the first result
        const employeeData = empData[0];

        // Map the RPC result to our Employee interface
        setEmployee({
          id: employeeData.employee_id,
          matricule: employeeData.employee_matricule,
          full_name: employeeData.employee_full_name,
          position: employeeData.employee_position,
          pole: employeeData.employee_pole,
          status: employeeData.employee_status,
          autorisations: employeeData.employee_autorisations || []
        });

        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [matricule]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 animate-ping opacity-20">
              <Shield className="w-16 h-16 text-emerald-500 mx-auto" />
            </div>
            <Shield className="w-16 h-16 text-emerald-500 mx-auto animate-pulse" />
          </div>
          <p className="text-slate-300 text-lg font-medium">Vérification sécurisée en cours...</p>
          <p className="text-slate-500 text-sm mt-2">Analyse des données biométriques</p>
        </div>
      </div>
    );
  }

  // Error State - Invalid Badge
  if (error || !employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md">
          {/* Header Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <Shield className="w-8 h-8 text-rose-500" />
              <h1 className="text-2xl font-bold text-slate-100 tracking-wider">JDFP COMMUNICATION</h1>
            </div>
            <p className="text-xs uppercase tracking-widest text-slate-500">Système de Sécurité</p>
          </div>

          {/* Alert Card */}
          <div className="bg-gradient-to-br from-rose-950/60 to-rose-900/40 backdrop-blur-xl border-2 border-rose-600/50 rounded-2xl overflow-hidden shadow-2xl shadow-rose-900/50">
            {/* Top Warning Bar */}
            <div className="h-1.5 bg-gradient-to-r from-rose-600 via-red-500 to-rose-600"></div>

            {/* Alert Content */}
            <div className="p-8 text-center">
              {/* Animated Warning Icon */}
              <div className="relative mb-6">
                <div className="absolute inset-0 animate-ping opacity-20">
                  <AlertCircle className="w-20 h-20 text-rose-500 mx-auto" />
                </div>
                <AlertCircle className="w-20 h-20 text-rose-500 mx-auto animate-pulse" />
              </div>

              {/* Alert Title */}
              <h2 className="text-3xl font-bold text-rose-200 mb-4 tracking-wide">
                ATTENTION
              </h2>

              {/* Alert Badge */}
              <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 rounded-full px-5 py-2.5 mb-6">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-rose-300 uppercase tracking-wider">
                  Badge Invalide ou Expiré
                </span>
              </div>

              {/* Alert Message */}
              <div className="bg-slate-900/60 rounded-lg p-5 mb-6">
                <p className="text-slate-300 text-sm leading-relaxed">
                  Ce profil n'est pas répertorié au sein de l'agence.
                  <br />
                  <span className="text-rose-400 font-medium">Tentative d'accès non autorisée détectée.</span>
                </p>
              </div>

              {/* Scanned Matricule */}
              <div className="pt-6 border-t border-rose-700/30">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                  Matricule scanné
                </p>
                <p className="font-mono text-base text-rose-400 bg-slate-900/80 rounded-lg px-4 py-3 inline-block border border-rose-700/30">
                  {matricule || 'NON DÉTECTÉ'}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-900/50 border-t border-rose-700/30 px-6 py-4">
              <p className="text-xs text-slate-500 text-center">
                Contactez immédiatement la sécurité en cas de doute
              </p>
            </div>
          </div>

          {/* Emergency Contact Button */}
          <button
            onClick={() => window.location.href = 'tel:+243898108447'}
            className="w-full mt-6 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-rose-900/50 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Phone className="w-5 h-5" />
            <span>Contacter la Direction / Urgence</span>
          </button>
        </div>
      </div>
    );
  }

  // Valid Badge Display
  const isActive = employee.status === 'active';
  const accentColor = isActive ? 'emerald' : 'rose';
  const accentColorClass = isActive ? 'text-emerald-500' : 'text-rose-500';
  const accentBgClass = isActive ? 'bg-emerald-500' : 'bg-rose-500';
  const accentBorderClass = isActive ? 'border-emerald-500' : 'border-rose-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-start p-4 md:p-6 pb-24">
      <div className="w-full max-w-md">
        {/* Header Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <Shield className={`w-8 h-8 ${accentColorClass}`} />
            <h1 className="text-xl md:text-2xl font-bold text-slate-100 tracking-wider">
              JDFP COMMUNICATION
            </h1>
          </div>
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Système de Vérification Officiel
          </p>
        </div>

        {/* Status Badge - Dynamic */}
        <div className="mb-6">
          <div className={`inline-flex items-center gap-2.5 bg-gradient-to-r ${isActive ? 'from-emerald-950/80 to-emerald-900/60' : 'from-rose-950/80 to-rose-900/60'} backdrop-blur-xl border ${isActive ? 'border-emerald-700' : 'border-rose-700'} rounded-full px-5 py-3 shadow-lg`}>
            <div className={`relative`}>
              <div className={`w-2.5 h-2.5 ${accentBgClass} rounded-full animate-ping opacity-75 absolute`}></div>
              <div className={`w-2.5 h-2.5 ${accentBgClass} rounded-full`}></div>
            </div>
            <span className={`text-sm font-bold ${accentColorClass} tracking-wider uppercase`}>
              {isActive ? 'Accès Autorisé - Badge Valide' : 'Accès Refusé - Badge Inactif'}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-slate-850 to-slate-900 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
          {/* Top Accent Bar */}
          <div className={`h-1.5 bg-gradient-to-r ${isActive ? 'from-emerald-600 via-emerald-500 to-teal-500' : 'from-rose-600 via-red-500 to-orange-500'}`}></div>

          {/* Card Content */}
          <div className="p-6 md:p-8">
            {/* Status Indicator */}
            <div className={`bg-gradient-to-r ${isActive ? 'from-emerald-950/60 to-emerald-900/40' : 'from-rose-950/60 to-rose-900/40'} border ${isActive ? 'border-emerald-700/50' : 'border-rose-700/50'} rounded-xl p-5 mb-8`}>
              <div className="flex items-center gap-4">
                {isActive ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-rose-500 flex-shrink-0" />
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Statut du Badge
                  </p>
                  <p className={`text-2xl font-bold ${isActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isActive ? 'Actif' : employee.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                  </p>
                </div>
              </div>
            </div>

            {/* Identity Section */}
            <div className="space-y-6 mb-8">
              {/* Matricule - Tech Code Style */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Fingerprint className="w-4 h-4 text-slate-500" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Matricule
                  </p>
                </div>
                <div className="bg-slate-900/80 border border-slate-700/50 rounded-lg px-5 py-3.5 shadow-inner">
                  <p className={`font-mono text-lg ${accentColorClass} tracking-wider`}>
                    {employee.matricule}
                  </p>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-slate-500" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Nom Complet
                  </p>
                </div>
                <p className="text-2xl font-bold text-slate-100 leading-tight">
                  {employee.full_name}
                </p>
              </div>

              {/* Position */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Poste
                  </p>
                </div>
                <p className="text-lg font-medium text-slate-200 leading-relaxed">
                  {employee.position}
                </p>
              </div>

              {/* Pole/Department */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Building className="w-4 h-4 text-slate-500" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Pôle / Département
                  </p>
                </div>
                <p className="text-base font-medium text-slate-300 leading-relaxed">
                  {employee.pole}
                </p>
              </div>
            </div>

            {/* Accreditation Section */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Lock className={`w-5 h-5 ${accentColorClass}`} />
                <p className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Niveau d'Accréditation
                </p>
              </div>

              {employee.autorisations && employee.autorisations.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {employee.autorisations.map((aut, index) => (
                    <div
                      key={index}
                      className={`inline-flex items-center gap-2 ${isActive ? 'bg-emerald-950/60 border border-emerald-700/50 text-emerald-300' : 'bg-slate-800 border border-slate-700/50 text-slate-400'} text-xs font-medium px-3.5 py-2 rounded-lg shadow-sm`}
                    >
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      <span>{aut}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">
                  Aucune accréditation enregistrée
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-900/50 border-t border-slate-700/30 px-6 py-5">
            <div className="flex items-center justify-center gap-2 text-slate-500 mb-3">
              <Clock className="w-4 h-4" />
              <p className="text-xs uppercase tracking-wider">
                Horodatage en temps réel
              </p>
            </div>
            <p className={`text-center font-mono text-sm ${accentColorClass}`}>
              {currentTime.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              {' à '}
              {currentTime.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </p>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-600 leading-relaxed">
            Système de vérification officiel JDFP.
            <br />
            Document sécurisé et horodaté.
          </p>
        </div>

        {/* Emergency Contact Button - Fixed at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent">
          <button
            onClick={() => window.location.href = 'tel:+243898108447'}
            className={`w-full max-w-md mx-auto block ${isActive ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700' : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700'} text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3`}
          >
            <Phone className="w-5 h-5" />
            <span>Contacter la Direction / Urgence</span>
          </button>
        </div>
      </div>
    </div>
  );
}
