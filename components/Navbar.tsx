
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Stethoscope, Heart, Baby, Eye, Activity, Brain, Smile, Bone, Check, Ear, HeartPulse, BrainCircuit, Mic2, TestTube, LogIn } from 'lucide-react';


interface NavbarProps {
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        'pricing': '/preise',
        'impressum': '/impressum',
        'agb': '/agb',
        'privacy': '/datenschutz',
        'thankyou-voice': '/danke-voice',
        'thankyou-assist': '/danke-assist',
        'thankyou-pulse': '/danke-pulse',
      };
      
      const targetPath = routeMap[pageId] || (pageId.startsWith('/') ? pageId : `/${pageId}`);
      window.location.href = targetPath;
    }
    setMobileOpen(false);
    window.scrollTo(0,0);
  };

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b
        ${scrolled ? 'bg-white border-slate-200 py-3 shadow-sm' : 'bg-white border-transparent py-5'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between relative h-10">
            
            {/* Mobile Menu Toggle (Left aligned on mobile) */}
            <div className="lg:hidden flex-shrink-0 z-20">
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-600 p-1">
                {mobileOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:relative lg:left-0 lg:top-0 lg:transform-none lg:translate-x-0 lg:translate-y-0 flex items-center gap-1 z-10 cursor-pointer" onClick={() => handleNavClick('home')}>
              <span className="relative flex h-1.5 w-1.5 mt-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#0D9488]"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0D9488] shadow-sm"></span>
              </span>
              <span className="font-bold text-gradient leading-none text-lg self-center">Auxilium Assist</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2 h-full">
              
              {/* Start Link */}
              <button onClick={() => handleNavClick('home')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
                Start
              </button>

              {/* Hörproben Link */}
              <button onClick={() => handleNavClick('audio')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
                Hörproben
              </button>

              {/* Dropdown Menu for Lösungen */}
              <div className="relative group h-full flex items-center">
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 group-hover:text-teal-600 transition-colors focus:outline-none">
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
              <button onClick={() => handleNavClick('features')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
                Funktionen
              </button>

              <button onClick={() => handleNavClick('pricing')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
                Preise
              </button>
              
              <button onClick={() => handleNavClick('security')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-1 whitespace-nowrap">
                <Check size={16} className="text-emerald-500 shrink-0" strokeWidth={3} />
                <span>DSGVO konform</span>
              </button>
            </div>

            {/* Desktop CTA removed */}
            <div className="hidden lg:block w-10"></div>

            {/* Empty spacer for mobile */}
            <div className="lg:hidden w-8"></div> 
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 animate-in fade-in slide-in-from-top-5 duration-200 overflow-y-auto pb-10">
          <div className="flex flex-col gap-6 text-center pb-10">
            <button onClick={() => handleNavClick('home')} className="text-2xl font-semibold text-slate-800">Start</button>
            <button onClick={() => handleNavClick('audio')} className="text-2xl font-semibold text-slate-800">Hörproben</button>
            <button onClick={() => handleNavClick('features')} className="text-2xl font-semibold text-slate-800">Funktionen</button>
            
            <div className="text-left bg-slate-50 p-6 rounded-2xl">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Lösungen für</span>
              <div className="grid grid-cols-1 gap-3">
                 {doctorSpecialties.map((doc, idx) => (
                    <button key={idx} onClick={() => handleNavClick(doc.id)} className="flex items-center gap-3 text-slate-700 font-medium text-left w-full">
                      <doc.icon size={16} className="text-teal-500 shrink-0" /> {doc.name}
                    </button>
                 ))}
              </div>
            </div>

            <button onClick={() => handleNavClick('pricing')} className="text-2xl font-semibold text-slate-800">Preise</button>

            <button onClick={() => handleNavClick('security')} className="text-2xl font-semibold text-slate-800 flex items-center justify-center gap-1.5 whitespace-nowrap">
              <Check size={28} className="text-emerald-500 shrink-0" strokeWidth={3} />
              DSGVO konform
            </button>

          </div>
        </div>
      )}
    </>
  );
};
