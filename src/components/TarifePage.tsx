import React, { useState, useRef } from 'react';
import { ArrowLeft, Tag, CheckCircle2, PhoneCall, CalendarCheck2, Activity, Info, Plus, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CTASection } from './CTASection';

interface TarifePageProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

export const TarifePage: React.FC<TarifePageProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth : 0;
      const gap = 24; // gap-6 is 1.5rem = 24px
      container.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth : 0;
      const gap = 24; // gap-6 is 1.5rem = 24px
      container.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.firstElementChild as HTMLElement;
      if (!card) return;
      
      const cardWidth = card.offsetWidth;
      const gap = 24; // gap-6
      const scrollPos = container.scrollLeft;
      
      // Calculate current index
      const index = Math.round(scrollPos / (cardWidth + gap));
      setActiveIndex(index);
    }
  };

  const usagePackages = [
    { 
      name: "Doc", 
      priceMonthly: "99 €",
      priceAnnual: "85 €",
      sub: "/ Monat",
      description: "Ideal für Einzelpraxen mit moderatem Aufkommen",
      quote: "Stellen Sie sicher, dass keine Anrufe mehr verloren gehen und Ihr Team spürbar entlastet wird.",
      icon: PhoneCall,
      included: [
        { text: "1000 Minuten inklusive" },
        { text: "Jede weitere Minute €0,15" },
        { text: "Keine Parallelanrufe", isGray: true },
        { text: "1 Telefonnummer" },
        { text: "KI-Assistenten inklusive" },
        { text: "20+ Stimmen" },
        { text: "25+ Sprachen" }
      ],
      features: [] as string[]
    },
    { 
      name: "Praxis", 
      priceMonthly: "299 €",
      priceAnnual: "255 €",
      sub: "/ Monat",
      description: "Für wachsende Teams & Gemeinschaftspraxen",
      quote: "Automatisiert Terminprozesse und reduziert den täglichen Telefonaufwand erheblich.",
      icon: CalendarCheck2,
      highlight: true,
      badge: "beliebt",
      included: [
        { text: "3000 Minuten inklusive" },
        { text: "Jede weitere Minute €0,12" },
        { text: "3 gleichzeitige Anrufe" },
        { text: "3 Telefonnummern" },
        { text: "KI-Assistenten inklusive" },
        { text: "20+ Stimmen" },
        { text: "25+ Sprachen" },
        { text: "Eigener SIP Trunk" },
        { text: "Outbound Anrufe" }
      ],
      features: [] as string[]
    },
    { 
      name: "Klinik", 
      priceMonthly: "499 €",
      priceAnnual: "445 €",
      sub: "/ Monat",
      description: "Die Komplettlösung für MVZs & hohes Volumen",
      quote: "Verbindet Kommunikation, Prozesse und Ihre Praxissoftware zu einem nahtlosen System.",
      icon: Activity,
      included: [
        { text: "Ab 5.000 Minuten" },
        { text: "Ab €0,08 die Minute" },
        { text: "Individuelle gleichzeitige Anrufe" },
        { text: "Individuelle Telefonnummern" },
        { text: "KI-Assistenten inklusive" },
        { text: "20+ Stimmen" },
        { text: "25+ Sprachen" },
        { text: "Eigene Stimme (Voice Clone)" },
        { text: "Individueller SLA" }
      ],
      features: [] as string[]
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* Minimaler Header für Navigation */}
      <section className="bg-white pt-10 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-[#13a09e] text-sm font-semibold transition-all"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Zurück zur Übersicht
          </button>
        </div>
      </section>

      {/* Sektion: Tarifübersicht & Volumen-Pakete */}
      <section className="bg-slate-50 py-16 md:py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tarif-Header */}
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 bg-[#13a09e]/10 rounded-full px-4 py-1.5 shadow-sm mb-6 border border-[#13a09e]/20">
              <Tag size={14} className="text-[#13a09e]" />
              <span className="text-[10px] font-bold text-[#13a09e] uppercase tracking-[0.2em]">Tarifübersicht</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1] overflow-visible">
              Transparente Tarife für <br/>
              <span className="text-gradient py-1">maximale Entlastung.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-medium">
              Transparent, fair und auf das Anrufaufkommen Ihrer Praxis zugeschnitten. Alle Preise verstehen sich zzgl. MwSt.
            </p>
          </div>

          {/* Title and Subtitle for Packages */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Volumen-Pakete</h2>
            <p className="text-slate-500 font-medium italic">Wählen Sie das passende Kontingent für Ihre monatlichen Gesprächsminuten</p>
          </div>

          {/* Option-Leiste: 30 Tage Geld-zurück-Garantie & Intervall-Wechsler */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            {/* 30 Tage Geld-zurück-Garantie */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 size={24} className="stroke-[2.5]" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 text-base">30 Tage Geld-zurück-Garantie</h4>
                <p className="text-xs text-slate-500 font-medium leading-normal">Völlig risikofrei testen • Unkomplizierte Stornierung &amp; Erstattung</p>
              </div>
            </div>

            {/* Intervall-Wechsler Toggle */}
            <div className="flex items-center gap-3 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200 shrink-0">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  !isAnnual 
                    ? 'bg-white text-[#13a09e]' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Monatlich
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isAnnual 
                    ? 'bg-gradient-medical text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Jährlich</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                  isAnnual ? 'bg-white text-[#13a09e]' : 'bg-[#13a09e]/10 text-[#13a09e]'
                }`}>
                  -15%
                </span>
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Desktop Left Arrow (Visible on LG+) */}
            <button 
              onClick={scrollLeft}
              className="hidden lg:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg border border-slate-100 items-center justify-center text-slate-600 hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label="Previous product"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Carousel Container */}
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pt-6 pb-8 px-4 -mx-4 md:px-6 md:-mx-6 lg:px-4 lg:-mx-4 [&::-webkit-scrollbar]:hidden scroll-smooth items-stretch"
            >
              {usagePackages.map((pkg, idx) => (
                <div 
                  key={idx} 
                  className={`w-full min-w-full md:min-w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_3rem)/3)] lg:min-w-[calc((100%_-_3rem)/3)] lg:max-w-none shrink-0 snap-center bg-white px-8 pb-8 rounded-3xl border transition-all duration-300 flex flex-col relative overflow-hidden group ${
                    pkg.highlight 
                      ? 'border-2 border-teal-500/30 shadow-xl pt-14 lg:scale-105 z-10' 
                      : 'border-slate-200/80 shadow-sm hover:shadow-glass lg:hover:-translate-y-1 pt-10'
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
                    <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
                      <pkg.icon className="text-[#13a09e]" size={24} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="text-slate-500 mb-6 text-sm leading-relaxed relative z-10">
                    <p>{pkg.description}</p>
                    <div className="mt-4 pl-4 py-2 border-l-2 border-teal-500 bg-teal-50/30 rounded-r-lg text-slate-700 italic text-xs">
                      {pkg.quote}
                    </div>
                  </div>

                  <div className="space-y-6 flex-grow relative z-10 mb-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Inkludiert</p>
                      <ul className="space-y-3">
                        {pkg.included.map((item, i) => (
                          <li key={i} className={`flex items-start gap-2.5 text-xs ${item.isGray ? 'text-slate-400 font-medium' : 'text-slate-700 font-semibold'}`}>
                            <CheckCircle2 size={16} className={`${item.isGray ? 'text-slate-300' : 'text-[#13a09e]'} shrink-0 mt-0.5`} />
                            <span>
                              {item.text}
                              {item.graySuffix && (
                                <span className="text-slate-400 font-normal">{item.graySuffix}</span>
                              )}
                            </span>
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
                        {isAnnual ? (
                          <>
                            <div className="flex items-center gap-1.5 leading-none">
                              <span className="text-sm text-slate-400 line-through font-medium">{pkg.priceMonthly}</span>
                              <span className="text-3xl font-bold text-[#13a09e]">{pkg.priceAnnual}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 uppercase tracking-[0.05em] font-bold block mt-1.5">{pkg.sub} zzgl. MwSt.</span>
                          </>
                        ) : (
                          <>
                            <span className="text-3xl font-bold text-[#13a09e] block leading-none">{pkg.priceMonthly}</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-[0.05em] font-bold block mt-1.5">{pkg.sub} zzgl. MwSt.</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3.5 bg-slate-50 border border-slate-150 rounded-xl flex items-start gap-2.5 text-left">
                      <Info className="text-slate-400 shrink-0 mt-0.5" size={16} />
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Die Tarife können erst während des Onboardingprozesses gebucht werden. Bitte buchen Sie zuerst das passende KI-Telefonassistenz-Paket.
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Desktop Right Arrow (Visible on LG+) */}
            <button 
              onClick={scrollRight}
              className="hidden lg:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg border border-slate-100 items-center justify-center text-slate-600 hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label="Next product"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Mobile/Tablet Controls: Arrows Only (Visible below LG) */}
          <div className="flex justify-center gap-6 lg:hidden mt-6">
             <button 
              onClick={scrollLeft}
              className="w-12 h-12 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-slate-600 active:scale-95 hover:scale-110 hover:text-primary hover:border-primary/30 transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-slate-600 active:scale-95 hover:scale-110 hover:text-primary hover:border-primary/30 transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="mt-12 mb-16 text-center flex flex-col items-center gap-2">
            <p className="text-sm text-slate-400 font-medium tracking-wide">
              Powered by <a href="https://fonio.ai/de?ac=ICTDD9L82N" target="_blank" rel="noopener noreferrer" className="text-[#13a09e] hover:underline font-bold transition-all">fonio.ai</a>
            </p>
            <p className="text-xs text-slate-400 italic">
              KI-Anrufe, die sich menschlich anfühlen.
            </p>
            <button 
              onClick={() => {
                navigate('/dsgvo');
                window.scrollTo(0, 0);
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition-all shadow-sm cursor-pointer"
            >
              <ShieldCheck size={13} className="stroke-[2.5]" />
              <span>DSGVO-konform</span>
            </button>
          </div>

        </div>
      </section>

      <CTASection />
    </div>
  );
};
