import React, { useEffect } from 'react';
import { Hero } from './Hero';
import { FeatureFocus } from './FeatureFocus';
import { Products } from './Products';
import { AllFeatures } from './AllFeatures';
import { CTASection } from './CTASection';

interface PreLaunchPageProps {
  onNavigate: (view: string) => void;
}

export const PreLaunchPage: React.FC<PreLaunchPageProps> = ({ onNavigate }) => {
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
    <>
      <Hero />
      <FeatureFocus />
      
      {/* "Drei starke Module" bleiben auf der Startseite als Produktvorstellung */}
      <Products onNavigate={onNavigate} preLaunchMode={true} />
      
      {/* Trust Section / Stats */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="p-4">
              <div className="text-4xl font-bold text-gradient mb-2">100%</div>
              <div className="text-slate-600 font-medium leading-tight">
                Erreichbar
                <span className="block text-sm font-normal text-slate-400 mt-1">24/7 Terminvergabe</span>
              </div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-gradient mb-2">-80%</div>
              <div className="text-slate-600 font-medium leading-tight">
                Weniger Anrufe
                <span className="block text-sm font-normal text-slate-400 mt-1">Entlastung am Empfang</span>
              </div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-gradient mb-2">-30%</div>
              <div className="text-slate-600 font-medium leading-tight">
                Verwaltungsaufwand
                <span className="block text-sm font-normal text-slate-400 mt-1">Effizientere Prozesse</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AllFeatures preview={true} onNavigate={onNavigate} />
      
      {/* Reused CTA Section */}
      <CTASection />
    </>
  );
};
