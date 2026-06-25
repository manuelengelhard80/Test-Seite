
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Stethoscope, Heart, Baby, Eye, Activity, Brain, Smile, Bone, Check, Ear, HeartPulse, BrainCircuit, Mic2, TestTube, LogIn, Shield, Lock } from 'lucide-react';


interface NavbarProps {
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const doctorSpecialties = [
    { name: "Allgemeinmedizin", id: "allgemeinmedizin", icon: Stethoscope },
    { name: "Zahnmedizin", id: "zahnmedizin", icon: Smile },
    { name: "Dermatologie", id: "dermatologie", icon: Activity },
    { name: "Orthopädie", id: "orthopaedie", icon: Bone },
    { name: "Gynäkologie", id: "gynaekologie", icon: Heart },
    { name: "Kinderheilkunde", id: "kinderheilkunde", icon: Baby },
    { name: "Augenheilkunde", id: "augenheilkunde", icon: Eye },
    { name: "Neurologie", id: "neurologie", icon: Brain },
    { name: "HNO", id: "hno", icon: Ear },
    { name: "Kardiologie", id: "kardiologie", icon: HeartPulse },
    { name: "Psychotherapie", id: "psychotherapie", icon: BrainCircuit },
    { name: "Urologie", id: "urologie", icon: TestTube },
  ];

  const handleNavClick = (pageId: string) => {
    if (onNavigate) {
      onNavigate(pageId);
    } else {
      const routeMap: Record<string, string> = {
        'home': '/',
        'test': '/test',
        'features': '/funktionen',
        'audio': '/hörproben',
        'security': '/dsgvo',
        'paragraph-203': '/paragraph-203',
        'pricing': '/preise',
        'tarife': '/tarife',
        'bewertungen': '/bewertungen',
        'bewertung': '/bewertungen',
        'impressum': '/impressum',
        'agb': '/agb',
        'privacy': '/datenschutz',
        'kontakt': '/kontakt',
        'contact': '/kontakt',
        'thankyou-voice': '/danke-voice',
        'thankyou-assist': '/danke-assist',
        'thankyou-pulse': '/danke-pulse',
      };
      
      const targetPath = routeMap[pageId] || (pageId.startsWith('/') ? pageId : `/${pageId}`);
      window.location.href = targetPath;
    }
    setMobileOpen(false);
    setMobileSolutionsOpen(false);
    window.scrollTo(0,0);
  };

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b
        ${scrolled ? 'bg-white border-slate-200 py-1.5 shadow-sm' : 'bg-white border-transparent py-4 lg:py-5'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:items-center justify-center relative min-h-[4rem] lg:py-1.5 select-none">
            
            {/* Mobile Menu Toggle (Right aligned on mobile) */}
            <div className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20">
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-600 p-2 hover:text-slate-900 transition-colors">
                {mobileOpen ? <X size={22} className="stroke-[2.5]" /> : <Menu size={22} className="stroke-[2.5]" />}
              </button>
            </div>

            {/* Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:relative lg:left-0 lg:top-0 lg:transform-none lg:translate-x-0 lg:translate-y-0 flex flex-col items-center z-10 cursor-pointer justify-center text-center" onClick={() => handleNavClick('home')}>
              <div className="flex items-center gap-1.5 justify-center">
                <span className="relative flex h-2.5 w-2.5 mt-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#0D9488]"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0D9488] shadow-sm"></span>
                </span>
                <span className="font-extrabold text-gradient leading-none text-xl lg:text-2xl self-center">Auxilium Assist</span>
              </div>
              <span className="text-[8.5px] min-[375px]:text-[10px] sm:text-[11.5px] md:text-[12.5px] text-slate-500 mt-1.5 leading-none tracking-wide font-semibold text-center whitespace-nowrap">Der smarte KI-Telefonassistent für die Arztpraxis</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center justify-center lg:gap-0.5 xl:gap-1.5 w-full z-10 mt-3.5 pb-0.5 flex-wrap xl:flex-nowrap">
              
              {/* Start Link */}
              <button onClick={() => handleNavClick('home')} className="h-8 px-2 xl:px-4 rounded-full text-[13px] xl:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all inline-flex items-center">
                Start
              </button>
 
               {/* Hörproben Link */}
              <button onClick={() => handleNavClick('audio')} className="h-8 px-2 xl:px-4 rounded-full text-[13px] xl:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all inline-flex items-center">
                Hörproben
              </button>
 
               {/* Dropdown Menu for Lösungen */}
              <div className="relative group h-full flex items-center">
                <button className="flex items-center gap-1 px-2 xl:px-4 h-8 text-[13px] xl:text-sm font-medium text-slate-600 group-hover:text-teal-600 transition-colors focus:outline-none">
                  Lösungen <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                
                {/* Dropdown Content */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[760px] max-w-[90vw] hidden group-hover:block transition-all opacity-0 group-hover:opacity-100 animate-in fade-in slide-in-from-top-2">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 relative max-h-[80vh] overflow-y-auto">
                    {/* Little Triangle Pointer */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {doctorSpecialties.map((doc, idx) => (
                        <button key={idx} onClick={() => handleNavClick(doc.id)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item text-left w-full">
                          <div className="w-10 h-10 shrink-0 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 group-hover/item:bg-teal-500 group-hover/item:text-white transition-colors">
                            <doc.icon size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{doc.name}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">Für {doc.name}-Praxen</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
 
               {/* Funktionen Link */}
              <button onClick={() => handleNavClick('features')} className="h-8 px-2 xl:px-4 rounded-full text-[13px] xl:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all inline-flex items-center">
                Funktionen
              </button>
 
               <button onClick={() => handleNavClick('pricing')} className="h-8 px-2 xl:px-4 rounded-full text-[13px] xl:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all inline-flex items-center">
                Preise
              </button>
 
              <button onClick={() => handleNavClick('tarife')} className="h-8 px-2 xl:px-4 rounded-full text-[13px] xl:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all inline-flex items-center">
                Tarife
              </button>
 
              <button onClick={() => handleNavClick('bewertungen')} className="h-8 px-2 xl:px-4 rounded-full text-[13px] xl:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all inline-flex items-center">
                Bewertungen
              </button>
              
              <button onClick={() => handleNavClick('security')} className="h-8 px-2 xl:px-4 rounded-full text-[13px] xl:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-1 whitespace-nowrap inline-flex items-center">
                <Check size={16} className="text-emerald-500 shrink-0" strokeWidth={3} />
                <span>DSGVO-konform</span>
              </button>
 
               <button onClick={() => handleNavClick('paragraph-203')} className="h-8 px-2 xl:px-4 rounded-full text-[13px] xl:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-1 whitespace-nowrap inline-flex items-center">
                <Check size={16} className="text-emerald-500 shrink-0" strokeWidth={3} />
                <span>§ 203-konform</span>
              </button>
 
               <button 
                onClick={() => handleNavClick('praxis-check')} 
                className="ml-1 xl:ml-2 font-bold underline decoration-[#0D9488] underline-offset-4 hover:opacity-80 transition-opacity whitespace-nowrap text-[13px] xl:text-sm inline-flex items-center"
              >
                <span className="text-gradient">3-Minuten-Praxis-Check</span>
              </button>
            </div>

            {/* Empty spacer for mobile */}
            <div className="lg:hidden w-8"></div> 
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 animate-in fade-in slide-in-from-top-5 duration-200 overflow-y-auto pb-10">
          <div className="flex flex-col max-w-sm mx-auto pt-4 pb-10 text-left gap-1">
            
            {/* HAUPTMENÜ SECTION */}
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 mt-4">Hauptmenü</h4>
            
            <button 
              onClick={() => handleNavClick('home')} 
              className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 border-b border-slate-100 flex items-center justify-between w-full"
            >
              <span>Start</span>
            </button>
            
            <button 
              onClick={() => handleNavClick('audio')} 
              className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 border-b border-slate-100 flex items-center justify-between w-full"
            >
              <span>Hörproben</span>
            </button>
 
            {/* Collapsible Lösungen structure showing the complete specialties list */}
            <div className="border-b border-slate-100">
              <button 
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)} 
                className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 w-full flex items-center justify-between outline-none"
              >
                <span>Lösungen</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-250 shrink-0 ${mobileSolutionsOpen ? 'rotate-180 text-teal-600' : ''}`} />
              </button>
              
              {mobileSolutionsOpen && (
                <div className="pl-2 pr-1 pb-4 pt-2 grid grid-cols-2 gap-x-4 gap-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  {doctorSpecialties.map((doc, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleNavClick(doc.id)} 
                      className="flex items-center gap-2 text-slate-400 hover:text-teal-600 font-medium text-left w-full text-xs py-0.5 transition-colors"
                    >
                      <doc.icon size={13} className="text-teal-500 shrink-0 opacity-80" />
                      <span className="truncate">{doc.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
 
            <button 
              onClick={() => handleNavClick('features')} 
              className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 border-b border-slate-100 flex items-center justify-between w-full"
            >
              <span>Funktionen</span>
            </button>
            
            <button 
              onClick={() => handleNavClick('pricing')} 
              className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 border-b border-slate-100 flex items-center justify-between w-full"
            >
              <span>Preise</span>
            </button>
 
            <button 
              onClick={() => handleNavClick('tarife')} 
              className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 border-b border-slate-100 flex items-center justify-between w-full"
            >
              <span>Tarife</span>
            </button>
 
            <button 
              onClick={() => handleNavClick('bewertungen')} 
              className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 border-b border-slate-100 flex items-center justify-between w-full"
            >
              <span>Bewertungen</span>
            </button>
 
            <button 
              onClick={() => handleNavClick('security')} 
              className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 border-b border-slate-100 flex items-center gap-1.5 w-full"
            >
              <Check size={15} className="text-emerald-500 shrink-0" strokeWidth={3} />
              <span>DSGVO-konform</span>
            </button>

            <button 
              onClick={() => handleNavClick('paragraph-203')} 
              className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 border-b border-slate-100 flex items-center gap-1.5 w-full"
            >
              <Check size={15} className="text-emerald-500 shrink-0" strokeWidth={3} />
              <span>§ 203-konform</span>
            </button>
 
            <div className="py-3 border-b border-slate-100 w-full text-left">
              <button 
                onClick={() => handleNavClick('praxis-check')} 
                className="font-bold underline decoration-[#0D9488] underline-offset-4 hover:opacity-80 transition-opacity text-left text-sm"
              >
                <span className="text-gradient">3-Minuten-Praxis-Check</span>
              </button>
            </div>

            {/* RECHTLICHES SECTION */}
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 mt-8">Rechtliches</h4>
            
            <button 
              onClick={() => handleNavClick('impressum')} 
              className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 border-b border-slate-100 w-full"
            >
              Impressum
            </button>
            
            <button 
              onClick={() => handleNavClick('privacy')} 
              className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 border-b border-slate-100 w-full"
            >
              Datenschutz
            </button>

            <button 
              onClick={() => handleNavClick('agb')} 
              className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 border-b border-slate-100 w-full"
            >
              AGB
            </button>

            <button 
              onClick={() => handleNavClick('kontakt')} 
              className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors text-left py-3 w-full"
            >
              Kontakt
            </button>
          </div>
        </div>
      )}
    </>
  );
};
