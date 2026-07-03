
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Outlet, useNavigate, useParams } from 'react-router-dom';
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
import { PraxisCheckPage } from './components/PraxisCheckPage';
import { FeaturesPage } from './components/FeaturesPage';
import { LoginPage } from './components/LoginPage';
import { DashboardPage } from './components/DashboardPage';
import { AGBPage } from './components/AGBPage';
import { PrivacyPage } from './components/PrivacyPage';
import { ThankYouPage } from './components/ThankYouPage';
import { CookieConsent } from './components/CookieConsent';
import { RechnerPage } from './components/RechnerPage';
import { ContactPage } from './components/ContactPage';
import { Paragraph203Page } from './components/Paragraph203Page';
import { BewertungenPage } from './components/BewertungenPage';
import { TarifePage } from './components/TarifePage';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { PreLaunchPage } from './components/PreLaunchPage';


const Layout: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-light selection:text-primary-dark overflow-x-hidden w-full relative">
      <Navbar onNavigate={onNavigate} />
      <main className="w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer onNavigate={onNavigate} />
      <WhatsAppWidget />
    </div>
  );
};

const HomePage: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  return (
    <>
      <Hero />
      <FeatureFocus />
      {/* "Drei starke Module" bleiben auf der Startseite als Produktvorstellung */}
      <Products onNavigate={onNavigate} />
      
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

const SpecialtyRouteWrapper: React.FC = () => {
  const { specialtyId } = useParams<{ specialtyId: string }>();
  const navigate = useNavigate();
  return <SpecialtyPage specialtyId={specialtyId || ''} onBack={() => navigate('/')} />;
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigate = (view: string) => {
    const routeMap: Record<string, string> = {
      'home': '/',
      'test': '/praxis-check',
      'praxis-check': '/praxis-check',
      'features': '/funktionen',
      'audio': '/hörproben',
      'security': '/dsgvo',
      'paragraph-203': '/paragraph-203',
      'pricing': '/preise',
      'tarife': '/tarife',
      'bewertungen': '/bewertungen',
      'bewertung': '/bewertungen',
      'rechner': '/rechner',
      'impressum': '/impressum',
      'agb': '/agb',
      'privacy': '/datenschutz',
      'kontakt': '/kontakt',
      'contact': '/kontakt',
      'thankyou-voice': '/danke-voice',
      'thankyou-assist': '/danke-assist',
      'thankyou-pulse': '/danke-pulse',
      'pre-launch': '/pre-launch',
      'prelaunch': '/pre-launch',
    };
    
    const targetPath = routeMap[view] || (view.startsWith('/') ? view : `/${view}`);
    navigate(targetPath);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <Routes>
      {/* Full-screen views (no navbar/footer) */}
      <Route 
        path="/login" 
        element={<LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />} 
      />
      <Route 
        path="/dashboard" 
        element={<DashboardPage onLogout={handleLogout} />} 
      />
      
      {/* Pages with standard Layout (navbar/footer) */}
      <Route element={<Layout onNavigate={handleNavigate} />}>
        <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/pre-launch" element={<PreLaunchPage onNavigate={handleNavigate} />} />
        <Route path="/prelaunch" element={<PreLaunchPage onNavigate={handleNavigate} />} />
        <Route path="/test" element={<PraxisCheckPage />} />
        <Route path="/praxis-check" element={<PraxisCheckPage />} />
        <Route path="/3-minuten-praxis-check" element={<PraxisCheckPage />} />
        
        {/* German and English routes aliases */}
        <Route path="/funktionen" element={<FeaturesPage onBack={() => handleNavigate('home')} />} />
        <Route path="/features" element={<FeaturesPage onBack={() => handleNavigate('home')} />} />
        
        <Route path="/hörproben" element={<AudioSamplesPage onBack={() => handleNavigate('home')} />} />
        <Route path="/hoerproben" element={<AudioSamplesPage onBack={() => handleNavigate('home')} />} />
        <Route path="/audio" element={<AudioSamplesPage onBack={() => handleNavigate('home')} />} />
        
        <Route path="/dsgvo" element={<SecurityPage onBack={() => handleNavigate('home')} />} />
        <Route path="/security" element={<SecurityPage onBack={() => handleNavigate('home')} />} />
        
        <Route path="/paragraph-203" element={<Paragraph203Page onBack={() => handleNavigate('home')} />} />
        
        <Route path="/preise" element={<PricingPage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />} />
        <Route path="/pricing" element={<PricingPage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />} />
        
        <Route path="/tarife" element={<TarifePage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />} />
        
        <Route path="/bewertungen" element={<BewertungenPage onBack={() => handleNavigate('home')} />} />
        <Route path="/bewertung" element={<BewertungenPage onBack={() => handleNavigate('home')} />} />
        
        <Route path="/rechner" element={<RechnerPage onBack={() => handleNavigate('home')} />} />
        
        <Route path="/impressum" element={<ImpressumPage onBack={() => handleNavigate('home')} />} />
        
        <Route path="/agb" element={<AGBPage onBack={() => handleNavigate('home')} />} />
        
        <Route path="/datenschutz" element={<PrivacyPage onBack={() => handleNavigate('home')} />} />
        <Route path="/privacy" element={<PrivacyPage onBack={() => handleNavigate('home')} />} />

        <Route path="/kontakt" element={<ContactPage onBack={() => handleNavigate('home')} />} />
        <Route path="/contact" element={<ContactPage onBack={() => handleNavigate('home')} />} />
        
        {/* Dankeseiten with German and Legacy routes */}
        <Route 
          path="/danke-voice" 
          element={<ThankYouPage productType="voice" onBack={() => handleNavigate('home')} onNavigateHome={() => handleNavigate('home')} />} 
        />
        <Route 
          path="/thankyou-voice" 
          element={<ThankYouPage productType="voice" onBack={() => handleNavigate('home')} onNavigateHome={() => handleNavigate('home')} />} 
        />
        
        <Route 
          path="/danke-assist" 
          element={<ThankYouPage productType="assist" onBack={() => handleNavigate('home')} onNavigateHome={() => handleNavigate('home')} />} 
        />
        <Route 
          path="/thankyou-assist" 
          element={<ThankYouPage productType="assist" onBack={() => handleNavigate('home')} onNavigateHome={() => handleNavigate('home')} />} 
        />
        
        <Route 
          path="/danke-pulse" 
          element={<ThankYouPage productType="pulse" onBack={() => handleNavigate('home')} onNavigateHome={() => handleNavigate('home')} />} 
        />
        <Route 
          path="/thankyou-pulse" 
          element={<ThankYouPage productType="pulse" onBack={() => handleNavigate('home')} onNavigateHome={() => handleNavigate('home')} />} 
        />
        
        {/* Specialty Route falling back to Catch-all: /allgemeinmedizin etc */}
        <Route path="/:specialtyId" element={<SpecialtyRouteWrapper />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
      <CookieConsent />
    </HashRouter>
  );
};

export default App;
