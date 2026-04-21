import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, Pause, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroTest: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Audio Object
    const audioUrl = "https://cdn.shopify.com/s/files/1/0915/3334/5117/files/Voicetest.mp3?v=1763726844";
    audioRef.current = new Audio(audioUrl);
    
    // Reset state when audio finishes
    audioRef.current.onended = () => setIsPlaying(false);

    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-16 overflow-hidden bg-white border-b border-slate-100">
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-subtle -z-10"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-secondary-light/40 rounded-full blur-3xl -mr-32 -z-10"></div>
      <div className="absolute top-40 left-0 w-[300px] h-[300px] bg-primary-light/40 rounded-full blur-3xl -ml-32 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-light rounded-full px-4 py-1.5 shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 border border-primary/20">
          <Sparkles size={14} className="text-primary-dark" strokeWidth={2.5} />
          <span className="text-xs font-bold text-primary-dark uppercase tracking-wide">KI-Telefonassistent mit Natürlicher Sprache</span>
        </div>

        {/* Headline */}
        <h1 className="font-bold tracking-tight text-slate-900 mb-6 max-w-6xl mx-auto leading-[1.1]">
          <span className="block text-3xl md:text-4xl mb-2 text-slate-900 font-semibold">Entlasten Sie jetzt Ihr</span>
          <span className="text-gradient text-4xl md:text-6xl font-extrabold">Praxispersonal mit KI.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-slate-500 mb-8 max-w-3xl mx-auto leading-relaxed">
          Mit unserem smarten KI-Telefonassistenten für die Arztpraxis mit intelligenter Spracherkennung, 24/7 Patientenbetreuung, automatischer Terminvergabe, Rezeptanfragen und weniger administrativer Arbeit für Ihr Team.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button className="w-full sm:w-auto bg-gradient-medical text-white px-8 py-4 rounded-full font-bold hover:shadow-glow transition-all hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 h-[64px]">
            Jetzt kostenlos beraten lassen!
            <ArrowRight size={18} />
          </button>
          
          <button 
            onClick={toggleAudio}
            className="w-full sm:w-auto bg-white border border-slate-200 pr-8 pl-2 py-2 rounded-full hover:shadow-md hover:border-slate-300 transition-all flex items-center gap-4 group h-[64px]"
          >
            <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white transition-all duration-300 ${isPlaying ? 'bg-secondary scale-105 shadow-inner' : 'bg-primary group-hover:bg-primary-hover shadow-sm'}`}>
              {isPlaying ? (
                <Pause size={20} fill="currentColor" />
              ) : (
                <Play size={20} fill="currentColor" className="ml-1" />
              )}
            </div>
            
            <div className="flex flex-col items-start text-left min-w-[120px]">
              <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors uppercase tracking-wide">Beispiel-Anruf hören</span>
              <div className="flex items-center gap-0.5 h-6 mt-0.5">
                 {[...Array(16)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse bg-slate-900' : 'bg-slate-300 group-hover:bg-slate-400'}`}
                      style={{ 
                        height: `${Math.max(20, Math.random() * 100)}%`,
                        animationDelay: `${i * 0.05}s` 
                      }} 
                    ></div>
                 ))}
              </div>
            </div>
          </button>
        </div>

        {/* DSGVO / Trust Banner */}
        <div className="flex justify-center mb-0">
          <div className="inline-flex items-center gap-5 bg-white px-8 py-3 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
            <ShieldCheck size={32} className="text-[#0D9488]" />
            <div className="flex flex-col items-start justify-center">
              <span className="text-sm font-bold text-slate-900 leading-none mb-1.5">100% DSGVO konform</span>
              <div className="w-full h-[4px] bg-[linear-gradient(90deg,black_33%,#DD0000_33%,#DD0000_66%,#FFCE00_66%)] rounded-full"></div>
              <span className="text-sm font-bold text-slate-900 leading-none mt-1.5">Serverstandort Deutschland</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};