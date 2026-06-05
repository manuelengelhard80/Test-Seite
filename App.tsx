
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureFocus } from './components/FeatureFocus';
import { AllFeatures } from './components/AllFeatures';
import { Products } from './components/Products';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { SpecialtyPage } from './components/SpecialtyPage';
import { AudioSamplesPage } from './components/AudioSamplesPage';
import { SecurityPage } from './components/SecurityPage';
import { PricingPage } from './components/PricingPage';
import { CTASection } from './components/CTASection';
import { ImpressumPage } from './components/ImpressumPage';
import { TestPage } from './components/TestPage';
import { FeaturesPage } from './components/FeaturesPage';
import { LoginPage } from './components/LoginPage';
import { DashboardPage } from './components/DashboardPage';
import { AGBPage } from './components/AGBPage';
import { PrivacyPage } from './components/PrivacyPage';
import { ThankYouPage } from './components/ThankYouPage';

const App: React.FC = () => {
  // Simple state-based routing
  const [currentView, setCurrentView] = useState<string>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    handleNavigate('home');
  };

  // Special full-screen views (no navbar/footer)
  if (currentView === 'login') {
    return <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentView === 'dashboard') {
    // In a real app, check authentication here
    return <DashboardPage onLogout={handleLogout} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero />
            <FeatureFocus />
            {/* "Drei starke Module" bleiben auf der Startseite als Produktvorstellung */}
            <Products onNavigate={handleNavigate} />
            <Testimonials />
            
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

            <AllFeatures preview={true} onNavigate={handleNavigate} />
            
            {/* Reused CTA Section */}
            <CTASection />
          </>
        );
      case 'test':
        return <TestPage />;
      case 'features':
        return <FeaturesPage onBack={() => handleNavigate('home')} />;
      case 'audio':
        return <AudioSamplesPage onBack={() => handleNavigate('home')} />;
      case 'security':
        return <SecurityPage onBack={() => handleNavigate('home')} />;
      case 'pricing':
        return <PricingPage onBack={() => handleNavigate('home')} />;
      case 'impressum':
        return <ImpressumPage onBack={() => handleNavigate('home')} />;
      case 'agb':
        return <AGBPage onBack={() => handleNavigate('home')} />;
      case 'privacy':
        return <PrivacyPage onBack={() => handleNavigate('home')} />;
      case 'thankyou-voice':
        return <ThankYouPage productType="voice" onBack={() => handleNavigate('home')} onNavigateHome={() => handleNavigate('home')} />;
      case 'thankyou-assist':
        return <ThankYouPage productType="assist" onBack={() => handleNavigate('home')} onNavigateHome={() => handleNavigate('home')} />;
      case 'thankyou-pulse':
        return <ThankYouPage productType="pulse" onBack={() => handleNavigate('home')} onNavigateHome={() => handleNavigate('home')} />;
      default:
        // Assume anything else is a specialty page ID
        return <SpecialtyPage specialtyId={currentView} onBack={() => handleNavigate('home')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-light selection:text-primary-dark">
      <Navbar onNavigate={handleNavigate} />
      
      <main>
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
