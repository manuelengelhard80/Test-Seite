import React from 'react';
import { HeroTest } from './HeroTest';
import { FeatureFocusTest } from './FeatureFocusTest';
import { AllFeatures } from './AllFeatures';
import { Products } from './Products';
import { Testimonials } from './Testimonials';
import { LiveDemo } from './LiveDemo';
import { CTASection } from './CTASection';

export const TestPage: React.FC = () => {
  return (
    <>
      <HeroTest />
      <FeatureFocusTest />
      <AllFeatures />
      <Products />
      <Testimonials />
      <LiveDemo />
      
      {/* Trust Section / Stats */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="p-4">
              <div className="text-4xl font-bold text-gradient mb-2">100%</div>
              <div className="text-slate-600 font-medium">Erreichbarkeit</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-gradient mb-2">-30%</div>
              <div className="text-slate-600 font-medium">Weniger Verwaltungsaufwand</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-gradient mb-2">24/7</div>
              <div className="text-slate-600 font-medium">Terminvergabe aktiv</div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};