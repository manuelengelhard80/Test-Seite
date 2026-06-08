
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 relative overflow-hidden bg-white border-t border-slate-100">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-white to-secondary-light z-0 opacity-50"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Entlasten Sie Ihr Telefon noch heute.</h2>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          Kompatibel mit Ihrer bestehenden Telefonanlage, Integration in unter 2 Minuten.
        </p>
        <div className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => { navigate('/praxis-check'); window.scrollTo(0, 0); }}
            className="w-full bg-gradient-medical text-white px-8 py-5 rounded-xl font-bold transition-all text-center shadow-lg hover:shadow-glow hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            Jetzt zum 3-Minuten-Praxis-Check!
            <ArrowRight size={18} />
          </button>
        </div>
        <p className="mt-4 text-xs text-slate-400">Unverbindlich & kostenlos. Keine versteckten Kosten.</p>
      </div>
    </section>
  );
};
