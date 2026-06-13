import React from 'react';
import { CheckCircle2, MessageSquareHeart, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FeatureFocus: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-16 pb-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section: Headline & Intro Centered */}
        <div className="max-w-3xl mx-auto text-center mb-16">
           <div className="inline-flex items-center gap-2 text-primary-dark font-semibold bg-primary-light px-3 py-1 rounded-full text-sm mb-6">
              <Sparkles size={14} className="text-primary-dark" strokeWidth={2.5} />
              <span>Praxis-Transformation mit Auxilium AI</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Verwandeln Sie Ihr Telefon vom <br/>
              <span className="text-gradient">Stressfaktor zum Erfolgstreiber.</span>
            </h2>
            
            <div className="text-lg text-slate-500 leading-relaxed space-y-4">
              <p>
                <span className="font-bold">Stellen Sie sich vor:</span> Jeder Anruf wird sofort beantwortet, jede Anfrage automatisch bearbeitet, jeder Termin direkt vergeben und Sie sind immer erreichbar – für maximale Patientenzufriedenheit, höchste Effizienz und eine optimale Praxisauslastung.
              </p>
              <p className="font-bold text-slate-700">
                Das ist keine Wunschvorstellung, das ist Ihr neuer Standard!
              </p>
            </div>
        </div>

        {/* Stacked Layout: Image Top, Bullets Bottom */}
        <div className="flex flex-col items-center gap-12 mx-auto max-w-4xl">
          
          {/* Image Section - Top */}
          <div className="relative w-full flex justify-center">
            {/* Decorative background blob */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-medical opacity-10 blur-3xl rounded-full -z-10"></div>
            
            <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-100 group w-full transition-all duration-500">
              <img 
                src="https://cdn.shopify.com/s/files/1/0915/3334/5117/files/Design_ohne_Titel_26_5f61db45-d5c6-4aa5-991c-5adaadae2170.png?v=1763989210" 
                alt="Auxilium Dashboard im Überblick" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Badge (Restored) */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-white/50 p-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <MessageSquareHeart size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium leading-none mb-0.5">Zufriedenheit</p>
                    <p className="text-sm font-bold text-slate-900 leading-none">+ 42%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bullets Section - Bottom */}
          <div className="w-full">
            <ul className="flex flex-col gap-8 w-full">
              <li className="flex items-start gap-5 group w-full">
                <div className="mt-1 w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={20} className="text-primary-dark" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary transition-colors">Kein unnötiges Telefonklingeln am Empfang</h4>
                  <p className="text-slate-500 leading-relaxed">Eine ruhige Atmosphäre im Wartebereich ohne ständige Unterbrechungen schafft Vertrauen und Professionalität.</p>
                </div>
              </li>
              <li className="flex items-start gap-5 group w-full">
                <div className="mt-1 w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={20} className="text-primary-dark" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary transition-colors">Fokus auf Beratung</h4>
                  <p className="text-slate-500 leading-relaxed">Ihr Team gewinnt wertvolle Zeit für persönliche Gespräche, komplexe Anliegen und die direkte Betreuung der Patienten vor Ort.</p>
                </div>
              </li>
              <li className="flex items-start gap-5 group w-full">
                <div className="mt-1 w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={20} className="text-primary-dark" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary transition-colors">Entspanntes Praxispersonal</h4>
                  <p className="text-slate-500 leading-relaxed">Reduzierung der psychischen Belastung durch Multitasking und ständige Erreichbarkeit am Tresen.</p>
                </div>
              </li>
              <li className="flex items-start gap-5 group w-full">
                <div className="mt-1 w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={20} className="text-primary-dark" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary transition-colors">Zeit- und Kostenersparnis</h4>
                  <p className="text-slate-500 leading-relaxed">Weniger Überstunden und effizientere Abläufe senken Ihre Personalkosten spürbar, während die Terminauslastung optimiert wird.</p>
                </div>
              </li>
            </ul>

            {/* Smart Sentence & CTA */}
            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
              <p className="text-xl font-medium text-slate-800 mb-4 max-w-2xl mx-auto">
                "Mehr Zeit für das, was wirklich zählt: Ihre Patienten."
              </p>
              <button 
                onClick={() => { navigate('/praxis-check'); window.scrollTo(0, 0); }}
                className="text-primary-dark font-bold text-lg hover:text-primary transition-colors inline-flex items-center gap-2 group cursor-pointer"
              >
                Jetzt zum 3-Minuten-Praxis-Check! <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};