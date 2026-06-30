
import React, { useRef, useState } from 'react';
import { CheckCircle2, PhoneCall, CalendarCheck2, Activity, ChevronLeft, ChevronRight, Mail, Globe, Plus, Info } from 'lucide-react';

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
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pt-6 pb-8 px-4 -mx-4 md:px-6 md:-mx-6 lg:px-4 lg:-mx-4 [&::-webkit-scrollbar]:hidden scroll-smooth items-stretch"
          >
            
            {/* 1. Auxilium Voice */}
            <div className="w-full min-w-full md:min-w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_3rem)/3)] lg:min-w-[calc((100%_-_3rem)/3)] lg:max-w-none shrink-0 snap-center bg-white px-8 pb-8 rounded-3xl border transition-all duration-300 flex flex-col relative overflow-hidden group border-slate-200/80 shadow-sm hover:shadow-glass lg:hover:-translate-y-1 pt-10">
              <div className="absolute top-0 left-0 w-full h-6 bg-gradient-medical opacity-70 group-hover:opacity-100 transition-opacity z-20"></div>
              
              <div className="flex items-center justify-between gap-4 mb-4 relative z-10 w-full mt-1">
                <h3 className="text-2xl font-bold text-slate-900 leading-tight text-left">Auxilium Voice</h3>
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
                  <PhoneCall className="text-[#13a09e]" size={24} strokeWidth={1.5} />
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
              

              <div className="text-slate-500 mb-6 text-sm leading-relaxed relative z-10 text-center w-full mx-auto">
                <p className="text-center max-w-md mx-auto">Ihr KI-Telefonassistent beantwortet Patientenfragen rund um die Uhr und nimmt Rezeptwünsche strukturiert auf – ohne Besetztzeichen, auch am Wochenende.</p>
              </div>

              <h4 className="text-sm font-semibold text-slate-500 mb-4 relative z-10 text-left">
                Smarter KI-Telefonassistent mit natürlicher Stimme
              </h4>

              <ul className="space-y-3 mb-8 relative z-10 flex-grow text-left w-full flex flex-col items-start">
                {/* Active Features */}
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">Keine verpassten Anrufe mehr (24/7 Erreichbarkeit)</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Der Telefonassistent nimmt jeden Anruf zeitgleich und ohne Wartezeit rund um die Uhr entgegen, auch an Feiertagen und Wochenenden.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">Empathische & menschliche Patientenkommunikation</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Empathische und menschliche Patientenkommunikation mit natürlicher Stimme. Kein blechern klingender Voice Bot.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">Rezept- & Überweisungsanfragen</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Nimmt Rezept- & Überweisungsanfragen automatisiert an und informiert den Patienten darüber, wann er diese abholen kann.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">Beantwortung häufiger Praxisfragen (FAQ)</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Beantwortet wiederkehrende Fragen zu Sprechzeiten, Anfahrt, Parkmöglichkeiten oder Fragen zur Aufnahme neuer Patienten vollkommen selbstständig am Telefon.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">Spürbare & sofortige Entlastung für Ihr MFA-Team</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Durch die automatische Beantwortung von Routineanrufen wird Ihr MFA-Team spürbar entlastet und gewinnt wertvolle Zeit für die Betreuung vor Ort.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">Notfall- & Dringlichkeitserkennung</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Erkennt akute Anliegen sofort durch intelligente Keyword- und Stimmanalyse, weist Patienten im Ernstfall auf den Notruf hin – vollkommen DSGVO- & EU AI Act-konform.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">DSGVO & § 203 konforme E-Mail-Benachrichtigung zu jedem Anruf</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Sie erhalten nach jedem Anruf eine sichere E-Mail-Benachrichtigung. Alle sensiblen Patientendaten können aus Datenschutzgründen ausschließlich im verschlüsselten Dashboard eingesehen werden.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-auto pt-6 border-t border-slate-100 relative z-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-left">Praxis-Start-Vorteil</p>
                <div className="flex flex-col mb-4 w-full">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span>Einrichtungspreis</span>
                    <span className="line-through decoration-slate-400/50 text-sm">999 €</span>
                  </div>
                  <div className="flex items-end justify-between w-full">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 whitespace-nowrap">
                      -20% • 202 € gespart
                    </span>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-3xl font-bold text-emerald-600 block leading-none">797 €</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium block mt-1">zzgl. MwSt.</span>
                    </div>
                  </div>
                </div>
                <a 
                  href="https://www.digistore24.com/product/690597"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-medical text-white font-bold py-3 rounded-xl hover:shadow-glow hover:-translate-y-0.5 transition-all shadow-md text-center block"
                >
                  Jetzt bestellen
                </a>
              </div>
            </div>

                        {/* 2. Auxilium Assist (Beliebt) */}
            <div className="w-full min-w-full md:min-w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_3rem)/3)] lg:min-w-[calc((100%_-_3rem)/3)] lg:max-w-none shrink-0 snap-center bg-white px-8 pb-8 rounded-3xl border transition-all duration-300 flex flex-col relative overflow-hidden group border-2 border-teal-500/30 shadow-xl pt-14 lg:scale-105 z-10">
               <div className="absolute top-0 left-0 w-full h-10 bg-gradient-medical flex items-center justify-center shadow-sm z-20">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Beliebt</span>
               </div>
              
              <div className="flex items-center justify-between gap-4 mb-4 relative z-10 w-full mt-2">
                <h3 className="text-2xl font-bold text-slate-900 leading-tight text-left">Auxilium Assist</h3>
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
                  <CalendarCheck2 className="text-[#13a09e]" size={24} strokeWidth={1.5} />
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

              <div className="text-slate-500 mb-6 text-sm leading-relaxed relative z-10 text-center w-full mx-auto">
                <p className="text-center max-w-md mx-auto">Der KI-Telefonassistent mit intelligenter Terminorganisation für spürbare Praxisentlastung.</p>
              </div>

              <h4 className="text-sm font-semibold text-slate-500 mb-4 relative z-10 text-left">
                Smarter KI-Telefonassistent mit natürlicher Stimme
              </h4>
              
              <ul className="space-y-3 mb-8 relative z-10 flex-grow text-left w-full flex flex-col items-start">
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-600 text-xs w-full text-left">
                  <Plus size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-700 leading-tight text-left">Alles aus Voice</span>
                  <div className="w-[16px]"></div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">Vollautomatische, DSGVO & § 203-konforme Terminvergabe</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Buchen Sie freie Termine direkt und absolut datenschutzkonform in Ihren Google Workspace oder Microsoft 365 Kalender, basierend auf Ihren vordefinierten Regeln.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">Intelligente Lückensuche in Ihrem Terminkalender</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Findet ungenutzte Zeitfenster und optimiert die Auslastung Ihrer Sprechzeiten automatisch in Echtzeit.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">Storno-Schutz: Terminabsagen & Wiederfreigabe</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Patienten können Termine telefonisch stornieren. Die freigewordenen Zeiten stehen sofort wieder für andere Buchungen bereit.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">SMS-Terminbestätigung für den Patienten</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Versendet sofort nach der Buchung oder Stornierung eine SMS mit allen Details an den Patienten zur besseren Verbindlichkeit.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">Volle Unabhängigkeit von Ihrer Praxis-Software</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Das System läuft komplett autark im Hintergrund. Es ist kein Eingriff in Ihre lokale Praxissoftware (PVS) notwendig.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-auto pt-6 border-t border-slate-100 relative z-10">
                <div className="flex flex-col items-start mb-5 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs w-full transition-all duration-300 hover:shadow-md hover:border-slate-300 group/int">
                  <div className="flex items-center mb-2.5">
                    <span className="text-xs font-normal text-slate-600 tracking-tight">
                      Kompatibel mit Ihrem Microsoft 365 oder Google Workspace Kalender
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 pt-0.5 flex-wrap">
                    <img 
                      src="https://images.weserv.nl/?url=http://2bmedia-marketing.de/bilder/365.png" 
                      alt="Microsoft 365" 
                      className="h-8 w-auto object-contain bg-white px-2 py-0.5 rounded-lg border border-slate-100 shadow-xs hover:border-slate-200 transition-colors" 
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src="https://images.weserv.nl/?url=http://2bmedia-marketing.de/bilder/workespace.png" 
                      alt="Google Workspace" 
                      className="h-8 w-auto object-contain bg-white px-2 py-0.5 rounded-lg border border-slate-100 shadow-xs hover:border-slate-200 transition-colors" 
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[9px] font-bold text-[#13a09e] bg-[#13a09e]/5 border border-[#13a09e]/15 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-xs ml-1">
                      DSGVO & § 203-konform
                    </span>
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-left">Praxis-Start-Vorteil</p>
                <div className="flex flex-col mb-4 w-full">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span>Einrichtungspreis</span>
                    <span className="line-through decoration-slate-400/50 text-sm">1.999 €</span>
                  </div>
                  <div className="flex items-end justify-between w-full">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 whitespace-nowrap">
                      -25% • 502 € gespart
                    </span>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-3xl font-bold text-emerald-600 block leading-none">1.497 €</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium block mt-1">zzgl. MwSt.</span>
                    </div>
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
            <div className="w-full min-w-full md:min-w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_3rem)/3)] lg:min-w-[calc((100%_-_3rem)/3)] lg:max-w-none shrink-0 snap-center bg-white px-8 pb-8 rounded-3xl border transition-all duration-300 flex flex-col relative overflow-hidden group border-slate-200/80 shadow-sm hover:shadow-glass lg:hover:-translate-y-1 pt-10">
               <div className="absolute top-0 left-0 w-full h-6 bg-gradient-medical opacity-70 group-hover:opacity-100 transition-opacity z-20"></div>
 
              <div className="flex items-center justify-between gap-4 mb-4 relative z-10 w-full mt-1">
                <h3 className="text-2xl font-bold text-slate-900 leading-tight text-left">Auxilium Pulse</h3>
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Activity className="text-[#13a09e] animate-pulse" size={24} strokeWidth={1.5} />
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

              <div className="text-slate-500 mb-6 text-sm leading-relaxed relative z-10 text-center w-full mx-auto">
                <p className="text-center max-w-md mx-auto">Der digitale Herzschlag Ihrer Praxis – für vollständige Integration und automatisierte Abläufe im Hintergrund.</p>
              </div>

              <h4 className="text-sm font-semibold text-slate-500 mb-4 relative z-10 text-left">
                Smarter KI-Telefonassistent mit natürlicher Stimme
              </h4>
              
              <ul className="space-y-3 mb-8 relative z-10 flex-grow text-left w-full flex flex-col items-start">
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-600 text-xs w-full text-left">
                  <Plus size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-700 leading-tight text-left">Alles aus Assist</span>
                  <div className="w-[16px]"></div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">Direkte Integration in Ihren Praxiskalender über API-Schnittstelle</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Flexible Schnittstellen für maßgeschneiderte Workflows, hauseigene Softwarelösungen oder spezielle Datenbanken.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left">Maximale & sofortige Entlastung für Ihr MFA-Team</span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Durch die vollständige Integration aller Assistenzleistungen und automatisierten Abläufe wird Ihr MFA-Team maximal entlastet.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-600 text-xs w-full text-left pt-3 mt-1 border-t border-slate-100">
                  <Plus size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-700 leading-tight text-left">
                    Auxilium Care-Paket – Fortlaufende Optimierung Ihrer KI & Experten-Support (3 Monate kostenlos)
                  </span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Kontinuierliche Anpassung der KI an Ihre Praxisabläufe sowie prioritärer Experten-Support für Ihre Praxis (regulär 99 € im Monat).
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left text-slate-600">
                    Laufende KI-Feinabstimmung zur kontinuierlichen Optimierung
                  </span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Kontinuierliche Analyse und Optimierung der Sprach-Performance für fehlerfreies Patienten-Verständnis im Hintergrund.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
                <li className="grid grid-cols-[16px_1fr_16px] gap-3 items-start text-slate-700 text-xs w-full text-left">
                  <CheckCircle2 size={16} className="text-[#13a09e] shrink-0 mt-0.5" />
                  <span className="leading-tight text-left text-slate-600">
                    Persönlicher Experten-Support bei Fragen und Systemanpassungen
                  </span>
                  <div className="relative group/tooltip inline-flex items-center shrink-0 mt-0.5 justify-self-end">
                    <Info size={14} className="text-slate-400 hover:text-[#13a09e] cursor-pointer transition-colors" />
                    {/* Tooltip on hover - clean white design */}
                    <div className="absolute right-0 bottom-full mb-2.5 w-64 p-3 bg-white border border-slate-200 text-slate-600 text-[11px] leading-relaxed font-medium normal-case rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none text-center">
                      Ihr persönlicher Experten-Support für schnelle Updates, Systemanpassungen und lückenlose Erreichbarkeit.
                      <div className="absolute top-full right-1 border-4 border-transparent border-t-white"></div>
                      <div className="absolute top-full right-1 border-[5px] border-transparent border-t-slate-200/50 -z-10 mt-[1px]"></div>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-auto pt-6 border-t border-slate-100 relative z-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-left">Praxis-Start-Vorteil</p>
                <div className="flex flex-col mb-4 w-full">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span>Einrichtungspreis</span>
                    <span className="line-through decoration-slate-400/50 text-sm">2.999 €</span>
                  </div>
                  <div className="flex items-end justify-between w-full">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 whitespace-nowrap">
                      -33% • 1.002 € gespart
                    </span>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-3xl font-bold text-emerald-600 block leading-none">1.997 €</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium block mt-1">zzgl. MwSt.</span>
                    </div>
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
            <div className="w-full min-w-full md:min-w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_3rem)/3)] lg:min-w-[calc((100%_-_3rem)/3)] lg:max-w-none shrink-0 snap-center bg-slate-50 px-8 pb-8 rounded-3xl border transition-all duration-300 flex flex-col relative overflow-hidden group border-slate-200/60 shadow-none hover:shadow-sm pt-10">
              {/* No top gradient strip for subtle look */}
              
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-4 mt-1 relative z-10 shrink-0">
                <Globe className="text-[#13a09e]" size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-4 relative z-10">Enterprise</h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed relative z-10 min-h-[40px]">
                Maßgeschneiderte Lösungen für Kliniken, MVZs und Großpraxen.
              </p>
              
              <ul className="space-y-3 mb-8 relative z-10 flex-grow">
                <li className="flex items-start gap-3 text-slate-600 text-xs">
                  <CheckCircle2 size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>Individuelle API-Integration</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600 text-xs">
                  <CheckCircle2 size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>Dedizierter Account Manager</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600 text-xs">
                  <CheckCircle2 size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>White-Label Option</span>
                </li>
                 <li className="flex items-start gap-3 text-slate-600 text-xs">
                  <CheckCircle2 size={16} className="text-slate-400 shrink-0 mt-0.5" />
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
