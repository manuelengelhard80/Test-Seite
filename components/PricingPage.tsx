
import React from 'react';
import { ArrowLeft, Tag, CheckCircle2, Rocket, Zap, Hospital, Star, Info } from 'lucide-react';

interface PricingPageProps {
  onBack: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onBack }) => {
  const usagePackages = [
    { 
      name: "Auxilium Voice", 
      price: "99 €", 
      sub: "/ Monat",
      description: "Ideal für Einzelpraxen mit moderatem Aufkommen",
      icon: Rocket,
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
      name: "Auxilium Assist", 
      price: "299 €", 
      sub: "/ Monat",
      description: "Für wachsende Teams & Gemeinschaftspraxen",
      icon: Zap,
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
      name: "Auxilium Pulse", 
      price: "599 €", 
      sub: "/ Monat",
      description: "Die Komplettlösung für MVZs & hohes Volumen",
      icon: Hospital,
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {usagePackages.map((pkg, idx) => (
              <div key={idx} className={`w-full bg-white px-8 pb-8 pt-16 rounded-3xl border transition-all duration-300 flex flex-col relative overflow-hidden group ${pkg.highlight ? 'border-primary ring-4 ring-primary-light shadow-2xl scale-105 z-10' : 'border-slate-200 shadow-sm hover:shadow-glass hover:-translate-y-1'}`}>
                {/* Visual Accent Bar */}
                {pkg.badge ? (
                  <div className="absolute top-0 left-0 w-full h-10 bg-gradient-medical flex items-center justify-center shadow-sm z-20">
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">{pkg.badge}</span>
                  </div>
                ) : (
                  <div className="absolute top-0 left-0 w-full h-6 bg-gradient-medical opacity-70 group-hover:opacity-100 transition-opacity"></div>
                )}
                
                <div className="mb-8">
                  {/* Icon Box */}
                  <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mb-6 mt-2 relative z-10">
                    <pkg.icon className="text-primary-dark" size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1 relative z-10">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 font-medium relative z-10">{pkg.description}</p>
                </div>

                <div className="mb-8 relative z-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">{pkg.price}</span>
                    <span className="text-slate-400 font-bold text-sm">{pkg.sub}</span>
                  </div>
                </div>

                <div className="space-y-6 flex-grow relative z-10">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Inkludiert</p>
                    <ul className="space-y-3">
                      {pkg.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
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
                          <Star size={12} className="text-slate-300 shrink-0 mt-0.5" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
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
