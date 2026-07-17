import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CTASection } from './CTASection';
import { Products } from './Products';

interface PricingPageProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* Minimaler Header für Navigation */}
      <section className="bg-white pt-10 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-primary text-sm font-semibold transition-all"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Zurück zur Übersicht
          </button>
        </div>
      </section>

      {/* 1. Die Produkte der Startseite */}
      <Products onNavigate={onNavigate} />

      <CTASection />
    </div>
  );
};
