
import React from 'react';
import { Check, MapPin, Flag } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-6 cursor-pointer" onClick={(e) => handleNav(e, 'home')}>
                {/* Pulsing Dot Logo */}
                <span className="relative flex h-2 w-2 mt-[3px]">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#0D9488]"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488] shadow-sm"></span>
                </span>
                <span className="font-extrabold text-gradient text-xl leading-none">Auxilium Assist</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
                Der KI-Telefonassistent für die moderne Arztpraxis. Entlastung, Erreichbarkeit und Effizienz durch intelligente Automatisierung.
              </p>
            </div>
            <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-auto pb-3">
              Made in Germany
              <img 
                src="https://cdn.shopify.com/s/files/1/0915/3334/5117/files/51968274-the-german-flag-round-matte-icon-isolated-on-white-background.jpg?v=1764167249" 
                alt="Deutschland" 
                className="w-4 h-4 rounded-full shadow-sm object-cover"
              />
            </p>
          </div>
          
          {/* Hauptmenü Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Hauptmenü</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={(e) => handleNav(e, 'home')} className="hover:text-primary transition-colors text-left">Start</button></li>
              <li><button onClick={(e) => handleNav(e, 'audio')} className="hover:text-primary transition-colors text-left">Hörproben</button></li>
              <li><button onClick={(e) => handleNav(e, 'features')} className="hover:text-primary transition-colors text-left">Funktionen</button></li>
              <li><button onClick={(e) => handleNav(e, 'pricing')} className="hover:text-primary transition-colors text-left">Preise</button></li>
              <li>
                <button onClick={(e) => handleNav(e, 'security')} className="hover:text-primary transition-colors text-left flex items-center gap-1.5">
                  <Check size={14} className="text-emerald-500 shrink-0" strokeWidth={3} />
                  <span>DSGVO-konform</span>
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'security')} className="hover:text-primary transition-colors text-left flex items-center gap-1.5">
                  <Check size={14} className="text-emerald-500 shrink-0" strokeWidth={3} />
                  <span>§ 203-konform</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleNav(e, 'praxis-check')} 
                  className="font-bold underline decoration-[#0D9488] underline-offset-4 hover:opacity-80 transition-opacity text-left text-sm"
                >
                  <span className="text-gradient">3-Minuten-Praxis-Check</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Lösungen Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Lösungen</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={(e) => handleNav(e, 'allgemeinmedizin')} className="hover:text-primary transition-colors text-left">Allgemeinmedizin</button></li>
              <li><button onClick={(e) => handleNav(e, 'zahnmedizin')} className="hover:text-primary transition-colors text-left">Zahnmedizin</button></li>
              <li><button onClick={(e) => handleNav(e, 'dermatologie')} className="hover:text-primary transition-colors text-left">Dermatologie</button></li>
              <li><button onClick={(e) => handleNav(e, 'gynaekologie')} className="hover:text-primary transition-colors text-left">Gynäkologie</button></li>
              <li><button onClick={(e) => handleNav(e, 'kinderheilkunde')} className="hover:text-primary transition-colors text-left">Kinderheilkunde</button></li>
              <li><button onClick={(e) => handleNav(e, 'orthopaedie')} className="hover:text-primary transition-colors text-left">Orthopädie</button></li>
            </ul>
          </div>

          {/* Rechtliches Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Rechtliches</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={(e) => handleNav(e, 'impressum')} className="hover:text-primary transition-colors text-left">Impressum</button></li>
              <li><button onClick={(e) => handleNav(e, 'privacy')} className="hover:text-primary transition-colors text-left">Datenschutz</button></li>
              <li><button onClick={(e) => handleNav(e, 'agb')} className="hover:text-primary transition-colors text-left">AGB</button></li>
              <li><button onClick={(e) => handleNav(e, 'kontakt')} className="hover:text-primary transition-colors text-left">Kontakt</button></li>
            </ul>
          </div>

          {/* Sicherheit Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Sicherheit</h4>
            <div className="relative mt-1">
              <img 
                src="https://images.weserv.nl/?url=http%3A%2F%2F2bmedia-marketing.de%2Fbilder%2Fauxilium-dsgvo.png%3Fv%3Dfresh20260619_3&nocache=fresh20260619_3" 
                alt="DSGVO & Schweigepflicht" 
                className="h-[86px] md:h-[93px] lg:h-[99px] w-auto object-contain opacity-95 hover:opacity-100 transition-opacity" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Centered Footer Bottom Text */}
        <div className="border-t border-slate-100 pt-5 mt-6 text-center">
          <p className="text-xs text-slate-400">
            Auxilium Assist © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};
