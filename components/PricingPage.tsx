import React from 'react';
import { ArrowLeft, Tag, CheckCircle2, PhoneCall, CalendarCheck2, Activity, Info, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PricingPageProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();

  const usagePackages = [
    { 
      name: "Doc", 
      price: "99 €", 
      sub: "/ Monat",
      description: "Ideal für Einzelpraxen mit moderatem Aufkommen",
      quote: "Stellen Sie sicher, dass keine Anrufe mehr verloren gehen und Ihr Team spürbar entlastet wird.",
      icon: PhoneCall,
      included: [
        "1000 Minuten inklusive",
        "Jede weitere Minute €0,15",
        "Keine Parallelanrufe",
        "1 Telefonnr. (weitere €7/Monat)",
        "KI-Assistenten inklusive",
        "1 User inklusive"
      ],
      features: [
        "20+ Stimmen",
        "25+ Sprachen",
        "3-Wochen Intensivkurs"
      ]
    },
    { 
      name: "Praxis", 
      price: "299 €", 
      sub: "/ Monat",
      description: "Für wachsende Teams & Gemeinschaftspraxen",
      quote: "Automatisiert Terminprozesse und reduziert den täglichen Telefonaufwand erheblich.",
      icon: CalendarCheck2,
      highlight: true,
      badge: "beliebt",
      included: [
        "3000 Minuten inklusive",
        "Jede weitere Minute €0,12",
        "5 gleichzeitige Anrufe",
        "3 Telefonnr. (weitere €5/Monat)",
        "KI-Assistenten inklusive",
        "Unbegrenzte User"
      ],
      features: [
        "Alles in Auxilium Voice",
        "Eigener SIP Trunk",
        "Outbound Anrufe"
      ]
    },
    { 
      name: "Klinik", 
      price: "599 €", 
      sub: "/ Monat",
      description: "Die Komplettlösung für MVZs & hohes Volumen",
      quote: "Verbindet Kommunikation, Prozesse und Ihre Praxissoftware zu einem nahtlosen System.",
      icon: Activity,
      included: [
        "10.000 Minuten inklusive",
        "Jede weitere Minute €0,10",
        "10 gleichzeitige Anrufe",
        "5 Telefonnr. (weitere €5/Monat)",
        "KI-Assistenten inklusive",
        "Unbegrenzte User"
      ],
      features: [
        "Alles in Auxilium Assist",
        "Eigene Stimme (Voice Clone)",
        "SSO (Single Sign-On)",
        "Individueller SLA"
      ]
    }
  ];

  const handlePurchase = (name: string) => {
    let view = 'thankyou-voice';
    if (name.toLowerCase().includes('assist') || name.toLowerCase().includes('praxis')) {
      view = 'thankyou-assist';
    } else if (name.toLowerCase().includes('pulse') || name.toLowerCase().includes('klinik')) {
      view = 'thankyou-pulse';
    }

    if (onNavigate) {
      onNavigate(view);
    } else {
      const routeMap: Record<string, string> = {
        'thankyou-voice': '/danke-voice',
        'thankyou-assist': '/danke-assist',
        'thankyou-pulse': '/danke-pulse'
      };
      navigate(routeMap[view] || '/');
      window.scrollTo(0, 0);
    }
  };

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

      {/* Sektion: Tarifübersicht & Volumen-Pakete - Unten positioniert */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tarif-Header */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-light/50 rounded-full px-4 py-1.5 shadow-sm mb-6 border border-primary/20">
              <Tag size={14} className="text-primary-dark" />
              <span className="text-[10px] font-bold text-primary-dark uppercase tracking-[0.2em]">Tarifübersicht</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1] overflow-visible">
              Professionelle Tarife für <br/>
              <span className="text-gradient py-1">maximale Entlastung.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-medium">
              Transparent, fair und auf das Anrufaufkommen Ihrer Praxis zugeschnitten. Alle Preise verstehen sich zzgl. MwSt.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Volumen-Pakete</h2>
            <p className="text-slate-500 font-medium italic">Wählen Sie das passende Kontingent für Ihre monatlichen Gesprächsminuten</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
            {usagePackages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`w-full bg-white px-8 pb-8 rounded-3xl border transition-all duration-300 flex flex-col relative overflow-hidden group ${
                  pkg.highlight 
                    ? 'border-2 border-primary/20 shadow-xl pt-14 lg:scale-105 z-10' 
                    : 'border-slate-200 shadow-sm hover:shadow-glass hover:-translate-y-1 pt-10'
                }`}
              >
                {/* Visual Accent Bar */}
                {pkg.badge ? (
                  <div className="absolute top-0 left-0 w-full h-10 bg-gradient-medical flex items-center justify-center shadow-sm z-20">
                    <span className="text-white text-xs font-bold uppercase tracking-widest">{pkg.badge}</span>
                  </div>
                ) : (
                  <div className="absolute top-0 left-0 w-full h-6 bg-gradient-medical opacity-70 group-hover:opacity-100 transition-opacity z-20"></div>
                )}
                
                <div className="flex items-center justify-between gap-4 mb-4 relative z-10 w-full mt-1">
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight text-left">{pkg.name}</h3>
                  <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center shrink-0">
                    <pkg.icon className="text-primary-dark" size={24} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="text-slate-500 mb-6 text-sm leading-relaxed relative z-10">
                  <p>{pkg.description}</p>
                  <div className="mt-4 pl-4 py-2 border-l-2 border-primary bg-primary/5 rounded-r-lg text-slate-700 italic text-xs">
                    {pkg.quote}
                  </div>
                </div>

                <div className="space-y-6 flex-grow relative z-10 mb-8">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Inkludiert</p>
                    <ul className="space-y-3">
                      {pkg.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                          <span className="font-semibold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Features</p>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <Plus size={14} className="text-primary shrink-0 mt-0.5" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 relative z-10">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-left">Monatlicher Paketpreis</p>
                  <div className="flex items-start flex-row justify-between mb-4 w-full">
                    <span className="text-xs font-bold text-[#13a09e] bg-[#13a09e]/5 px-2.5 py-1 rounded-full border border-[#13a09e]/20 mt-1 whitespace-nowrap">
                      Flexible Minutennutzung
                    </span>
                    <div className="flex flex-col items-end text-right font-sans">
                      <span className="text-3xl font-bold text-[#13a09e] block leading-none">{pkg.price}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-[0.05em] font-bold block mt-1.5">{pkg.sub} zzgl. MwSt.</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3.5 bg-slate-50 border border-slate-150 rounded-xl text-center">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Die Tarife können erst während des Onboardingprozesses gebucht werden. Bitte buchen Sie zuerst das passende KI-Telefonassistenz-Paket.
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-8 mb-16 text-center">
            <p className="text-sm text-slate-400 font-medium tracking-wide">
              Powered by <a href="https://fonio.ai/de?ac=ICTDD9L82N" target="_blank" rel="noopener noreferrer" className="text-[#13a09e] hover:underline font-bold transition-all">fonio.ai</a>
            </p>
          </div>

          <div className="mt-16 bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-start gap-4 text-blue-800 max-w-3xl mx-auto shadow-sm">
            <Info size={24} className="shrink-0 mt-0.5" />
            <div className="text-sm leading-relaxed font-medium">
              <p className="font-bold mb-2">Preisinformation:</p>
              <p>Alle hier aufgeführten Preise dienen der Orientierung. Die tatsächliche Abrechnung erfolgt basierend auf Ihrem realen Nutzungsvolumen. Alle Preise verstehen sich netto zzgl. gesetzlicher MwSt.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
