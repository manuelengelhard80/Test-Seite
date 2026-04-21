
import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-white border-t border-slate-100">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-white to-secondary-light z-0 opacity-50"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Entlasten Sie Ihr Telefon noch heute.</h2>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          Kompatibel mit Ihrer bestehenden Telefonanlage, Integration in unter 2 Minuten.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Ihre Praxis-E-Mail" 
            className="px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none w-full shadow-sm"
          />
          <button className="bg-gradient-medical text-white px-8 py-4 rounded-xl font-semibold transition-all whitespace-nowrap shadow-lg hover:shadow-glow hover:-translate-y-0.5">
            Jetzt kostenlos beraten lassen!
          </button>
        </form>
        <p className="mt-4 text-xs text-slate-400">Unverbindlich & kostenlos. Keine versteckten Kosten.</p>
      </div>
    </section>
  );
};
