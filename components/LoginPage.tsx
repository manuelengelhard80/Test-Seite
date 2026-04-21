
import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, Stethoscope, Info } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <button 
        onClick={() => onNavigate('home')}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium"
      >
        <ArrowLeft size={20} /> Zurück zur Startseite
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-8 text-center border-b border-slate-100 bg-slate-50/50">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-[3px]">
              <span className="relative flex h-2 w-2 mt-[3px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#0D9488]"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488] shadow-sm"></span>
              </span>
              <span className="font-bold text-gradient text-2xl leading-none ml-1">auxilium.ai</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Praxis-Login</h2>
          <p className="text-slate-500 mt-2">Melden Sie sich an, um Ihren Kalender zu verwalten.</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 block">Praxis-E-Mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="praxis@beispiel.de"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 block">Passwort</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-3 items-start">
            <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Demo-Modus:</strong> Geben Sie beliebige Daten ein oder klicken Sie einfach auf den Button, um das Dashboard zu testen.
            </p>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-medical text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Laden...
              </>
            ) : (
              'Zum Kalender'
            )}
          </button>

          <div className="text-center pt-4">
            <a href="#" className="text-sm text-slate-400 hover:text-primary transition-colors">Passwort vergessen?</a>
          </div>
        </form>
        
        <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
          <p className="text-sm text-slate-600">
            Noch keinen Account? <button onClick={() => onNavigate('pricing')} className="text-primary font-bold hover:underline">Jetzt registrieren</button>
          </p>
        </div>
      </div>
    </div>
  );
};
