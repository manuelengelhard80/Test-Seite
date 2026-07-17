import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CTASection } from './CTASection';
import { Products } from './Products';

interface PreLaunchPricingPageProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

export const PreLaunchPricingPage: React.FC<PreLaunchPricingPageProps> = ({ onBack, onNavigate }) => {
  useEffect(() => {
    // Add meta robots noindex, nofollow to exclude from Google index
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* Minimaler Header für Navigation */}
      <section className="bg-white pt-10 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-[#0D9488] text-sm font-semibold transition-all"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Zurück zur Übersicht
          </button>
        </div>
      </section>

      {/* Die Produkte im Pre-Launch-Modus */}
      <Products onNavigate={onNavigate} preLaunchMode={true} />

      <CTASection />
    </div>
  );
};
