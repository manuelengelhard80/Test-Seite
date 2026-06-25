import React from 'react';
import { ArrowLeft, Star, Quote, MessageSquare } from 'lucide-react';
import { CTASection } from './CTASection';

interface BewertungenPageProps {
  onBack: () => void;
}

export const BewertungenPage: React.FC<BewertungenPageProps> = ({ onBack }) => {
  const testimonials = [
    {
      text: "Endlich Ruhe an der Anmeldung. Meine Mitarbeiterinnen sind deutlich entspannter und können sich wieder voll auf die Patienten vor Ort konzentrieren. Hätte nicht gedacht, dass es so gut klappt.",
      author: "Dr. med. Johannes Völkl",
      role: "Facharzt für Urologie"
    },
    {
      text: "Die automatische Terminsynchronisation funktioniert tadellos. Eine riesige Entlastung für unser gesamtes Team, besonders zu Stoßzeiten am Montagmorgen.",
      author: "Dr. med. Corinna Arndt",
      role: "Fachärztin für Gynäkologie"
    },
    {
      text: "Wir konnten unsere telefonische Erreichbarkeit auf nahezu 100% steigern. Ein echter Gamechanger für unser MVZ.",
      author: "Stefan Berner",
      role: "Praxismanager MVZ"
    },
    {
      text: "Super einfach eingerichtet. Ich bin kein Technik-Experte, aber das lief in 15 Minuten. Der Support war auch top.",
      author: "Dr. med. Tobias Kühn",
      role: "Facharzt für Orthopädie"
    },
    {
      text: "Unsere Patienten finden es super, dass sie nicht mehr in der Warteschleife hängen. Die Akzeptanz ist viel höher als erwartet.",
      author: "Bettina Ruge",
      role: "Leitende MFA"
    },
    {
      text: "Endlich keine Unterbrechungen mehr während der Behandlungen. Die KI filtert Notfälle zuverlässig raus.",
      author: "Dr. med. dent. Katja Ehlers",
      role: "Zahnärztin"
    },
    {
      text: "Das Rezept-Modul spart uns bestimmt eine Stunde Arbeit jeden Tag. Keine Zettelwirtschaft mehr.",
      author: "Dr. med. Silke Herrmann",
      role: "Fachärztin für Dermatologie"
    },
    {
      text: "Wir nutzen Auxilium jetzt seit 3 Monaten. Läuft stabil, versteht auch Dialekt erstaunlich gut.",
      author: "Dr. med. Philipp Jost",
      role: "Facharzt für Innere Medizin"
    },
    {
      text: "Für eine psychotherapeutische Praxis ist Diskretion wichtig. Das System regelt die Terminabsagen sehr sensibel.",
      author: "Dipl.-Psych. Anja Wiegand",
      role: "Psychologische Psychotherapeutin"
    },
    {
      text: "Preis-Leistung ist unschlagbar wenn man bedenkt, was eine zusätzliche Halbtagskraft kosten würde.",
      author: "Dr. med. Alexander Seitz",
      role: "Facharzt für Kardiologie"
    }
  ];

  const getInitial = (name: string) => {
    const cleanName = name.replace(/Dr\.|med\.|dent\.|Dipl\.-Psych\.|Prof\./g, '').trim();
    const parts = cleanName.split(' ').filter(p => p.length > 0);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    return cleanName.charAt(0).toUpperCase();
  };

  const avatarColors = [
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-orange-100 text-orange-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-cyan-100 text-cyan-700",
    "bg-indigo-100 text-indigo-700",
    "bg-rose-100 text-rose-700",
    "bg-teal-100 text-teal-700",
    "bg-amber-100 text-amber-700"
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* Header Section */}
      <section className="bg-white pb-16 pt-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-8 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Zurück zur Übersicht
          </button>
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-teal-50 rounded-full px-4 py-1.5 shadow-sm mb-6 border border-teal-100">
              <MessageSquare size={14} className="text-teal-600" />
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">Erfahrungsberichte</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Von Ärzten <span className="text-gradient">empfohlen.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
              Vertrauen ist gut, Erfahrung ist besser. Sehen Sie, wie Kolleginnen und Kollegen ihre Praxis mit Auxilium AI transformiert haben und den Alltag spürbar entlasten.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm relative group hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-auto flex flex-col"
              >
                <Quote className="absolute top-6 right-6 text-slate-100 group-hover:text-teal-600/10 transition-colors" size={32} />
                
                <div className="flex gap-1 text-amber-400 mb-5">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic flex-grow">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                    {getInitial(t.author)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
