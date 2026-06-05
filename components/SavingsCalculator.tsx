
import React, { useState, useEffect } from 'react';
import { Calculator, Clock, Euro, ArrowRight, Info, PhoneCall, Timer } from 'lucide-react';

export const SavingsCalculator: React.FC = () => {
  // Inputs
  const [callsPerDay, setCallsPerDay] = useState(25);
  const [avgDuration, setAvgDuration] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(28);
  const [selectedPackage, setSelectedPackage] = useState<'Voice' | 'Assist' | 'Pulse'>('Assist');
  
  // Results State
  const [results, setResults] = useState({
    timeSavedHours: 0,
    personnelCostOld: 0,
    aiCostService: 0,
    aiCostUsage: 0,
    totalAiCost: 0,
    monthlySavings: 0,
    roiPercent: 0
  });

  const WORKING_DAYS = 22;
  const EFFECTIVE_MFA_MINS_PER_HOUR = 35;

  useEffect(() => {
    // 1. Calculate Total Minutes
    const totalMinutes = callsPerDay * avgDuration * WORKING_DAYS;
    
    // 2. Calculate Status Quo (Personnel Costs)
    const paidHoursRequired = totalMinutes / EFFECTIVE_MFA_MINS_PER_HOUR;
    const personnelCostOld = paidHoursRequired * hourlyRate;
    
    // 3. Define Package Rates (Matching PricingPage.tsx)
    const configs = {
      Voice: { base: 99, included: 1000, rate: 0.15 },
      Assist: { base: 299, included: 3000, rate: 0.12 },
      Pulse: { base: 599, included: 10000, rate: 0.10 }
    };
    
    const config = configs[selectedPackage];
    const overageMinutes = Math.max(0, totalMinutes - config.included);
    const usageCost = overageMinutes * config.rate;
    const totalAiCost = config.base + usageCost;

    // 4. Calculate Savings & ROI
    const monthlySavings = Math.max(0, personnelCostOld - totalAiCost);
    const roi = totalAiCost > 0 ? (monthlySavings / totalAiCost) * 100 : 0;
    const timeSavedHours = totalMinutes / 60;

    setResults({
      timeSavedHours: Number(timeSavedHours.toFixed(1)),
      personnelCostOld: Math.round(personnelCostOld),
      aiCostService: config.base,
      aiCostUsage: Math.round(usageCost),
      totalAiCost: Math.round(totalAiCost),
      monthlySavings: Math.round(monthlySavings),
      roiPercent: Math.round(roi)
    });
  }, [callsPerDay, avgDuration, hourlyRate, selectedPackage]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_40%_20%,_var(--tw-gradient-from)_0%,_transparent_50%)] from-primary-light/30 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-primary-dark font-bold bg-primary-light/50 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] mb-6 border border-primary/20">
            <Calculator size={14} />
            <span>Wirtschaftlichkeits-Kalkulator</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1] overflow-visible">
            Ihr Entlastungs-Potential <br/>
            <span className="text-gradient py-1">in harten Zahlen.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
            Berechnen Sie Ihre Ersparnis basierend auf Ihrem monatlichen Telefonaufkommen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Input Side */}
          <div className="bg-slate-50 p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col h-full">
            <div className="space-y-10 flex-1">
              {/* Package Selector */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Gewählter Tarif</label>
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <button
                    onClick={() => setSelectedPackage('Voice')}
                    className={`py-3 rounded-xl text-[10px] font-bold transition-all ${selectedPackage === 'Voice' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    Voice
                  </button>
                  <button
                    onClick={() => setSelectedPackage('Assist')}
                    className={`py-3 rounded-xl text-[10px] font-bold transition-all ${selectedPackage === 'Assist' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    Assist
                  </button>
                  <button
                    onClick={() => setSelectedPackage('Pulse')}
                    className={`py-3 rounded-xl text-[10px] font-bold transition-all ${selectedPackage === 'Pulse' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    Pulse
                  </button>
                </div>
              </div>

              {/* Calls per Day Slider */}
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <label className="font-bold text-slate-800 text-base flex items-center gap-2 tracking-tight">
                    <PhoneCall size={18} className="text-primary" />
                    Anrufe pro Tag
                  </label>
                  <div className="text-3xl font-black text-primary-dark">{callsPerDay}</div>
                </div>
                <input 
                  type="range" min="5" max="150" step="5"
                  value={callsPerDay}
                  onChange={(e) => setCallsPerDay(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Duration Slider */}
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <label className="font-bold text-slate-800 text-base flex items-center gap-2 tracking-tight">
                    <Timer size={18} className="text-primary" />
                    Ø Gesprächsdauer (Min)
                  </label>
                  <div className="text-3xl font-black text-primary-dark">{avgDuration}</div>
                </div>
                <input 
                  type="range" min="1" max="10" step="0.5"
                  value={avgDuration}
                  onChange={(e) => setAvgDuration(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Hourly Rate Slider */}
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <label className="font-bold text-slate-800 text-base flex items-center gap-2 tracking-tight">
                    <Euro size={18} className="text-primary" />
                    Lohnkosten MFA (€/h)
                  </label>
                  <div className="text-3xl font-black text-primary-dark">{hourlyRate}</div>
                </div>
                <input 
                  type="range" min="18" max="65" step="1"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 mt-10">
               <div className="bg-white/60 p-6 rounded-2xl border border-slate-200/50 flex gap-4">
                  <Info className="text-primary shrink-0" size={20} />
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium italic">
                    Kalkulation: 22 Arbeitstage/Monat. Kostenbasis: {selectedPackage === 'Voice' ? '0,15 €' : selectedPackage === 'Assist' ? '0,12 €' : '0,10 €'} pro KI-Minute und 35 Min. effektive MFA-Telefonzeit pro bezahlter Stunde.
                  </p>
               </div>
            </div>
          </div>

          {/* Results Side */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl h-full flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
            
            <div className="relative z-10 flex-1 flex flex-col h-full">
              <div className="mb-12">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Monatliche Ersparnis</p>
                <div className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter overflow-visible">
                  <span className="text-gradient py-1">+{results.monthlySavings.toLocaleString('de-DE')}€</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Zeitgewinn ({selectedPackage})</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900">{results.timeSavedHours.toLocaleString('de-DE')}</span>
                    <span className="text-sm font-bold text-slate-500 uppercase">Std.</span>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">ROI-Faktor</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900">{results.roiPercent}</span>
                    <span className="text-sm font-bold text-slate-500 uppercase">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-bold text-slate-500">Status Quo: Personalkosten</span>
                  <span className="text-lg font-black text-slate-900">{results.personnelCostOld.toLocaleString('de-DE')} €</span>
                </div>
                <div className="flex flex-col gap-1 px-4 py-3 bg-primary-light/30 rounded-xl border border-primary/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-primary-dark">Investition Auxilium AI</span>
                    <span className="text-lg font-black text-primary-dark">-{results.totalAiCost.toLocaleString('de-DE')} €</span>
                  </div>
                  <p className="text-[10px] font-bold text-primary-dark/60 italic uppercase tracking-wider">
                    Service ({results.aiCostService} €) + Nutzung ({results.aiCostUsage} €).
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-4">
                <button className="w-full bg-gradient-medical text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:shadow-glow hover:-translate-y-1 transition-all flex items-center justify-center gap-4">
                  Potential prüfen
                  <ArrowRight size={24} />
                </button>
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">Kostenlose Erst-Konfiguration</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
