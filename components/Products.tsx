
import React, { useRef, useState } from 'react';
import { CheckCircle2, PhoneCall, CalendarCheck2, Activity, ChevronLeft, ChevronRight, Mail, Globe, Plus } from 'lucide-react';

interface ZoomableImageProps {
  src: string;
  alt: string;
  onError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  containerClassName?: string;
  objectPosition?: string;
  hoverSrc?: string;
  onHoverError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  disableZoom?: boolean;
  hoverObjectPosition?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ 
  src, 
  alt, 
  onError, 
  containerClassName = "",
  objectPosition = "center top",
  hoverSrc,
  onHoverError,
  disableZoom = false,
  hoverObjectPosition = "center center"
}) => {
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transform: 'scale(1)',
    transformOrigin: 'center top'
  });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    setIsHovered(true);
    if (disableZoom) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setZoomStyle({
      transform: 'scale(2)',
      transformOrigin: `${xPercent}% ${yPercent}%`,
    });
  };

  const handlePointerReset = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    setIsHovered(false);
    if (disableZoom) return;
    setZoomStyle({
      transform: 'scale(1)',
      transformOrigin: 'center top',
    });
  };

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchMove = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  return (
    <div 
      ref={containerRef}
      onPointerEnter={handlePointerMove}
      onPointerDown={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerReset}
      onPointerUp={handlePointerReset}
      onPointerCancel={handlePointerReset}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onContextMenu={(e) => e.preventDefault()}
      style={{ WebkitTouchCallout: 'none' }}
      className={`relative overflow-hidden aspect-[1.618] bg-slate-50 z-10 border-b border-slate-100 ${disableZoom ? 'cursor-pointer' : 'cursor-zoom-in'} select-none ${containerClassName}`}
    >
      <img 
        src={src} 
        alt={alt} 
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        style={{ ...zoomStyle, objectPosition }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isHovered && hoverSrc ? 'opacity-0' : 'opacity-100'}`}
        referrerPolicy="no-referrer"
        onError={onError}
      />
      {hoverSrc && (
        <img 
          src={hoverSrc} 
          alt={`${alt} Hover`} 
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          style={{ ...zoomStyle, objectPosition: hoverObjectPosition }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          referrerPolicy="no-referrer"
          onError={onHoverError}
        />
      )}
    </div>
  );
};

interface ProductsProps {
  onNavigate?: (view: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onNavigate }) => {
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

  // Helper for separators - darker color for better visibility
  const Separator = () => (
    <li className="h-px bg-slate-200 my-2 w-full"></li>
  );

  return (
    <section id="features" className="py-16 bg-slate-50 overflow-hidden group/section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Drei starke Module für Ihre Praxis.</h2>
          <p className="text-lg text-slate-500">
            Unser System integriert sich nahtlos in Ihren Alltag und übernimmt die zeitintensivsten Aufgaben am Telefon.
          </p>
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
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 [&::-webkit-scrollbar]:hidden scroll-smooth items-stretch"
          >
            
            {/* 1. Auxilium Voice */}
            <div className="w-full min-w-full md:min-w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_3rem)/3)] lg:min-w-[calc((100%_-_3rem)/3)] lg:max-w-none shrink-0 snap-center bg-white px-8 pb-8 pt-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-glass hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-6 bg-gradient-medical opacity-70 group-hover:opacity-100 transition-opacity z-20"></div>
              
              <div className="flex items-center justify-between gap-4 mb-4 relative z-10 w-full mt-1">
                <h3 className="text-2xl font-bold text-slate-900 leading-tight text-left">Auxilium Voice</h3>
                <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center shrink-0">
                  <PhoneCall className="text-primary-dark" size={24} strokeWidth={1.5} />
                </div>
              </div>

              {/* Product Image with Hover Image Swap */}
              <ZoomableImage 
                src="https://images.weserv.nl/?url=http://2bmedia-marketing.de/bilder/auxilium-voice.png"
                alt="Auxilium Voice"
                containerClassName="mb-5 -mx-8 w-[calc(100%+4rem)] -mt-4 shadow-inner"
                objectPosition="center -10px"
                disableZoom={true}
                hoverSrc="https://images.weserv.nl/?url=http://2bmedia-marketing.de/bilder/auxilium-voice2.png"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.includes('weserv.nl')) {
                    img.src = 'http://2bmedia-marketing.de/bilder/auxilium-voice.png';
                  }
                }}
                onHoverError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.includes('weserv.nl')) {
                    img.src = 'http://2bmedia-marketing.de/bilder/auxilium-voice2.png';
                  }
                }}
              />
              

              <div className="text-slate-500 mb-6 text-sm leading-relaxed relative z-10">
                <p>Der intelligente KI-Telefonassistent für maximale Erreichbarkeit in Ihrer Praxis.</p>
                <div className="mt-4 pl-4 py-2 border-l-2 border-primary bg-primary/5 rounded-r-lg text-slate-700 italic">
                  Stellen Sie sicher, dass keine Anrufe mehr verloren gehen und Ihr Team spürbar entlastet wird.
                </div>
              </div>

              <h4 className="text-sm font-semibold text-slate-500 mb-4 relative z-10">
                Smarter KI-Telefonassistent mit natürlicher Stimme
              </h4>

              <ul className="space-y-3 mb-8 relative z-10 flex-grow">
                {/* Active Features */}
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Keine verpassten Anrufe mehr (24/7 Erreichbarkeit)</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Empathische Patientenkommunikation</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Notfall- & Dringlichkeitserkennung</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Rezept- & Überweisungsannahme</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Automatische E-Mail-Weiterleitung</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Beantwortung häufiger Praxisfragen (FAQ)</span>
                </li>
              </ul>

              <div className="mt-auto pt-6 border-t border-slate-100 relative z-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-left">Exklusiver Einrichtungspreis</p>
                <div className="flex items-start flex-row justify-between mb-4 w-full items-start">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 mt-1 whitespace-nowrap">
                    -20% • 202 € gespart
                  </span>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-sm text-slate-400 line-through decoration-slate-400/50 block leading-none mb-1">999 €</span>
                    <span className="text-3xl font-bold text-emerald-600 block leading-none">797 €</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium block mt-1">zzgl. MwSt.</span>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate?.('thankyou-voice')}
                  className="w-full bg-gradient-medical text-white font-bold py-3 rounded-xl hover:shadow-glow hover:-translate-y-0.5 transition-all shadow-md"
                >
                  Jetzt bestellen
                </button>
              </div>
            </div>

                        {/* 2. Auxilium Assist (Bestseller) */}
            <div className="w-full min-w-full md:min-w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_3rem)/3)] lg:min-w-[calc((100%_-_3rem)/3)] lg:max-w-none shrink-0 snap-center bg-white px-8 pb-8 pt-14 rounded-3xl border-2 border-primary/20 shadow-xl hover:shadow-glass hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden z-10 group">
               <div className="absolute top-0 left-0 w-full h-10 bg-gradient-medical flex items-center justify-center shadow-sm z-20">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Bestseller</span>
               </div>
              
              <div className="flex items-center justify-between gap-4 mb-4 relative z-10 w-full mt-2">
                <h3 className="text-2xl font-bold text-slate-900 leading-tight text-left">Auxilium Assist</h3>
                <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center shrink-0">
                  <CalendarCheck2 className="text-primary-dark" size={24} strokeWidth={1.5} />
                </div>
              </div>

              {/* Product Image with Hover Image Swap */}
              <ZoomableImage 
                src="https://images.weserv.nl/?url=http://2bmedia-marketing.de/bilder/auxilium-assist.png"
                alt="Auxilium Assist"
                containerClassName="mb-5 -mx-8 w-[calc(100%+4rem)] -mt-4 shadow-inner"
                objectPosition="center -10px"
                disableZoom={true}
                hoverSrc="https://images.weserv.nl/?url=http://2bmedia-marketing.de/bilder/auxilium-assist2.png"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.includes('weserv.nl')) {
                    img.src = 'http://2bmedia-marketing.de/bilder/auxilium-assist.png';
                  }
                }}
                onHoverError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.includes('weserv.nl')) {
                    img.src = 'http://2bmedia-marketing.de/bilder/auxilium-assist2.png';
                  }
                }}
              />

              <div className="text-slate-500 mb-6 text-sm leading-relaxed relative z-10">
                <p>Der KI-Telefonassistent mit intelligenter Terminorganisation für spürbare Praxisentlastung.</p>
                <div className="mt-4 pl-4 py-2 border-l-2 border-primary bg-primary/5 rounded-r-lg text-slate-700 italic">
                  Automatisiert Terminprozesse und reduziert den täglichen Telefonaufwand erheblich.
                </div>
              </div>

              <h4 className="text-sm font-semibold text-slate-500 mb-4 relative z-10">
                Smarter KI-Telefonassistent mit natürlicher Stimme
              </h4>
              
              <ul className="space-y-3 mb-8 relative z-10 flex-grow">
                <li className="flex items-start gap-3 text-slate-600">
                  <Plus size={16} className="text-slate-900 shrink-0 mt-0.5" />
                  <span className="font-medium">Alles aus Voice</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Vollautomatische Terminvergabe</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Intelligente Lückensuche in Ihrer Praxissoftware</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Automatische Terminabsagen & Freigabe</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>SMS-Terminbestätigung</span>
                </li>
              </ul>

              <div className="mt-auto pt-6 border-t border-slate-100 relative z-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-left">Exklusiver Einrichtungspreis</p>
                <div className="flex items-start flex-row justify-between mb-4 w-full items-start">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 mt-1 whitespace-nowrap">
                    -25% • 502 € gespart
                  </span>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-sm text-slate-400 line-through decoration-slate-400/50 block leading-none mb-1">1.999 €</span>
                    <span className="text-3xl font-bold text-emerald-600 block leading-none">1.497 €</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium block mt-1">zzgl. MwSt.</span>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate?.('thankyou-assist')}
                  className="w-full bg-gradient-medical text-white font-bold py-3 rounded-xl hover:shadow-glow hover:-translate-y-0.5 transition-all shadow-md"
                >
                  Jetzt bestellen
                </button>
              </div>
            </div>

            {/* 3. Auxilium Pulse */}
            <div className="w-full min-w-full md:min-w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_3rem)/3)] lg:min-w-[calc((100%_-_3rem)/3)] lg:max-w-none shrink-0 snap-center bg-white px-8 pb-8 pt-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-glass hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-6 bg-gradient-medical opacity-70 group-hover:opacity-100 transition-opacity z-20"></div>
 
              <div className="flex items-center justify-between gap-4 mb-4 relative z-10 w-full mt-1">
                <h3 className="text-2xl font-bold text-slate-900 leading-tight text-left">Auxilium Pulse</h3>
                <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center shrink-0">
                  <Activity className="text-primary-dark animate-pulse" size={24} strokeWidth={1.5} />
                </div>
              </div>

              {/* Product Image with Hover Image Swap */}
              <ZoomableImage 
                src="https://images.weserv.nl/?url=http://2bmedia-marketing.de/bilder/auxilium-pulse.png?v=2"
                alt="Auxilium Pulse"
                containerClassName="mb-5 -mx-8 w-[calc(100%+4rem)] -mt-4 shadow-inner"
                objectPosition="center -10px"
                disableZoom={true}
                hoverSrc="https://images.weserv.nl/?url=http://2bmedia-marketing.de/bilder/auxilium-pulse2.png"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.includes('weserv.nl')) {
                    img.src = 'http://2bmedia-marketing.de/bilder/auxilium-pulse.png?v=2';
                  }
                }}
                onHoverError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.includes('weserv.nl')) {
                    img.src = 'http://2bmedia-marketing.de/bilder/auxilium-pulse2.png';
                  }
                }}
              />

              <div className="text-slate-500 mb-6 text-sm leading-relaxed relative z-10">
                <p>Der digitale Herzschlag Ihrer Praxis – für vollständige Integration und automatisierte Abläufe im Hintergrund.</p>
                <div className="mt-4 pl-4 py-2 border-l-2 border-primary bg-primary/5 rounded-r-lg text-slate-700 italic">
                  Verbindet Kommunikation, Prozesse und Ihre Praxissoftware zu einem nahtlosen System.
                </div>
              </div>

              <h4 className="text-sm font-semibold text-slate-500 mb-4 relative z-10">
                Smarter KI-Telefonassistent mit natürlicher Stimme
              </h4>
              
              <ul className="space-y-3 mb-8 relative z-10 flex-grow">
                <li className="flex items-start gap-3 text-slate-600">
                  <Plus size={16} className="text-slate-900 shrink-0 mt-0.5" />
                  <span className="font-medium">Alles aus Assist</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Direkte Integration in Ihre Praxissoftware</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>API-Anbindung für individuelle Systeme</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Automatischer Recall-Service</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Vollständige Prozessautomatisierung</span>
                </li>
              </ul>

              <div className="mt-auto pt-6 border-t border-slate-100 relative z-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-left">Exklusiver Einrichtungspreis</p>
                <div className="flex items-start flex-row justify-between mb-4 w-full items-start">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 mt-1 whitespace-nowrap">
                    -33% • 1.002 € gespart
                  </span>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-sm text-slate-400 line-through decoration-slate-400/50 block leading-none mb-1">2.999 €</span>
                    <span className="text-3xl font-bold text-emerald-600 block leading-none">1.997 €</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium block mt-1">zzgl. MwSt.</span>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate?.('thankyou-pulse')}
                  className="w-full bg-gradient-medical text-white font-bold py-3 rounded-xl hover:shadow-glow hover:-translate-y-0.5 transition-all shadow-md"
                >
                  Jetzt bestellen
                </button>
              </div>
            </div>

            {/* 4. Enterprise (Price on request) */}
            <div className="w-full min-w-full md:min-w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_3rem)/3)] lg:min-w-[calc((100%_-_3rem)/3)] lg:max-w-none shrink-0 snap-center bg-slate-50 px-8 pb-8 pt-10 rounded-3xl border border-slate-200/60 shadow-none hover:shadow-sm transition-all duration-300 flex flex-col relative overflow-hidden group">
              {/* No top gradient strip for subtle look */}
              
              <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center mb-4 mt-1 relative z-10">
                <Globe className="text-slate-600" size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-4 relative z-10">Enterprise</h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed relative z-10 min-h-[40px]">
                Maßgeschneiderte Lösungen für Kliniken, MVZs und Großpraxen.
              </p>
              
              <ul className="space-y-3 mb-8 relative z-10 flex-grow">
                <li className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 size={18} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>Individuelle API-Integration</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 size={18} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>Dedizierter Account Manager</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 size={18} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>White-Label Option</span>
                </li>
                 <li className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 size={18} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>On-Premise Deployment</span>
                </li>
              </ul>

              <div className="mt-auto pt-6 border-t border-slate-200 relative z-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-left">Individuelles Angebot</p>
                <div className="flex items-center justify-between mb-4 w-full h-[54px]">
                  <span className="text-xl font-medium text-slate-700">Preis auf Anfrage</span>
                </div>
                <button className="w-full bg-white text-slate-700 border border-slate-300 font-bold py-3 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm flex items-center justify-center gap-2">
                  <Mail size={18} />
                  Kontakt aufnehmen
                </button>
              </div>
            </div>

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

      </div>
    </section>
  );
}
