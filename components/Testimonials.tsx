import React, { useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Helper to extract first and last name initials
  const getInitial = (name: string) => {
    // Remove common titles
    const cleanName = name.replace(/Dr\.|med\.|dent\.|Dipl\.-Psych\.|Prof\./g, '').trim();
    const parts = cleanName.split(' ').filter(p => p.length > 0);
    
    if (parts.length >= 2) {
      // First letter of first name + First letter of last name
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    // Fallback if only one name
    return cleanName.charAt(0).toUpperCase();
  };

  // Palette for avatars
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

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.firstElementChild as HTMLElement;
      if (!card) return;
      
      const cardWidth = card.offsetWidth;
      // Note: cardWidth can be different on mobile vs desktop.
      // On mobile (w-full) we just divide by scrollWidth roughly or use snap logic.
      // But calculating active index correctly for variable widths needs center point check.
      
      const center = container.scrollLeft + container.offsetWidth / 2;
      let closest = 0;
      let minDiff = Infinity;
      
      Array.from(container.children).forEach((child, idx) => {
        const childCenter = (child as HTMLElement).offsetLeft + (child as HTMLElement).offsetWidth / 2;
        const diff = Math.abs(center - childCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closest = idx;
        }
      });
      
      setActiveIndex(closest);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth : 0;
      const gap = 24;
      container.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth : 0;
      const gap = 24;
      container.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white border-b border-slate-100 relative group/section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Von Ärzten <span className="text-gradient">empfohlen.</span>
          </h2>
          <p className="text-lg text-slate-500">
            Vertrauen ist gut, Erfahrung ist besser. Sehen Sie, wie Kollegen ihre Praxis mit Auxilium AI transformiert haben.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Left Arrow (LG screens and up) */}
          <button 
            onClick={scrollLeft}
            className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 items-center justify-center text-slate-600 hover:text-primary hover:scale-110 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Container: Horizontal Scroll (Swipe) for Mobile AND Desktop */}
          {/* Strict container logic: No negative margins, w-full */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 [&::-webkit-scrollbar]:hidden scroll-smooth items-stretch"
          >
            {testimonials.map((t, i) => (
              // Mobile: w-full min-w-full (1 visible). Desktop (LG): 3 visible.
              // Note: Using lg: breakpoint for 3 items as requested previously for consistent tablet/mobile behavior.
              <div key={i} className="w-full min-w-full lg:w-[calc((100%_-_3rem)/3)] lg:min-w-[calc((100%_-_3rem)/3)] lg:max-w-none snap-center bg-slate-50 p-6 rounded-2xl border border-slate-100 relative group hover:shadow-md transition-all duration-300 h-auto flex flex-col">
                <Quote className="absolute top-6 right-6 text-slate-200 group-hover:text-primary/20 transition-colors" size={24} />
                
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 relative z-10 italic flex-grow">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100/50">
                  {/* Initials Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm shrink-0 ${avatarColors[i % avatarColors.length]}`}>
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

          {/* Desktop Right Arrow (LG screens and up) */}
          <button 
            onClick={scrollRight}
            className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 items-center justify-center text-slate-600 hover:text-primary hover:scale-110 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile/Tablet Controls: Arrows Only (Visible below LG) */}
        <div className="flex justify-center gap-6 lg:hidden mt-4">
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

      </div>
    </section>
  );
};