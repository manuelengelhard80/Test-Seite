
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, Pause, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  const toggleAudio = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    } else {
      setIsPlaying(true);
      const audioUrl = "https://assets.anytourl.com/uploads/1dcb8360b74ce7620a4ba03440c56d9a.mp3"; // Direkter HTTPS-Link
      
      const tryPlay = (url: string, fallbacks: string[]) => {
        console.log(`Hero attempting to play audio: ${url}`);
        const audio = new Audio(url);
        audio.preload = "auto";
        audioRef.current = audio;

        const handleEnded = () => {
          setIsPlaying(false);
        };

        const handleError = (e: any) => {
          console.warn(`Hero warning loading/playing audio from ${url}:`, e);
          cleanup();
          if (fallbacks.length > 0) {
            const nextUrl = fallbacks[0];
            const remainingFallbacks = fallbacks.slice(1);
            console.log(`Hero falling back to: ${nextUrl}`);
            tryPlay(nextUrl, remainingFallbacks);
          } else {
            setIsPlaying(false);
          }
        };

        const cleanup = () => {
          audio.removeEventListener('ended', handleEnded);
          audio.removeEventListener('error', handleError);
          audio.pause();
          if (audioRef.current === audio) {
            audioRef.current = null;
          }
        };

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        audio.play().catch(err => {
          console.warn(`Hero play promise rejected for ${url}:`, err);
          if (audioRef.current === audio) {
            handleError(err);
          }
        });
      };

      tryPlay(audioUrl, ["/termin.mp3?v=3", "/termin.wav?v=3"]);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

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
          <span className="text-xs font-bold text-primary-dark uppercase tracking-wide">Die Zukunft der Praxistelefonie</span>
        </div>

        {/* Headline */}
        <h1 className="font-extrabold tracking-tight text-slate-900 mb-6 max-w-6xl mx-auto leading-[1.25]">
          <span className="block text-3xl md:text-4xl mb-2 text-slate-900 font-extrabold">Endlich Ruhe am Telefon...</span>
          <span className="text-gradient text-3xl md:text-4xl font-extrabold">und mehr Zeit für Ihre Patienten.</span>
        </h1>

        {/* Subheadline/Body Copy */}
        <div className="text-base sm:text-lg text-slate-500 mb-10 max-w-3xl mx-auto leading-relaxed">
          <p className="mb-4 font-medium text-slate-700">
            Das Telefon klingelt ununterbrochen, das Wartezimmer platzt aus allen Nähten<br />
            und Ihr Team arbeitet längst am Limit?
          </p>
          <p className="mb-4">
            Stoppen Sie die ständigen Unterbrechungen und entlasten Sie jetzt Ihr Praxispersonal.<br />
            Mit Ihrem smarten KI-Telefonassistenten, speziell entwickelt für die moderne Arztpraxis, verpassen Sie kein Anliegen Ihrer Patienten mehr – und Ihr Team bleibt dabei gelassen und entspannt.
          </p>
          <p>
            Ihr neuer KI-Telefonassistent ist 24/7 erreichbar, nimmt alle Anrufe entgegen, vereinbart automatisch Termine, kümmert sich um Rezept- und Überweisungsanfragen – damit Ihr Team endlich wieder durchatmen kann.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button 
            onClick={toggleAudio}
            className="w-full sm:w-auto bg-white border border-slate-200 pr-6 pl-2 py-2 rounded-full hover:shadow-md hover:border-slate-300 transition-all flex items-center gap-3 group h-[64px] justify-center min-w-[260px]"
          >
            <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-md ${isPlaying ? 'bg-[#298cc4] scale-105' : 'bg-[#13a09e] group-hover:bg-[#0f8280]'}`}>
              {isPlaying ? (
                <Pause size={20} fill="currentColor" />
              ) : (
                <Play size={20} fill="currentColor" className="ml-1" />
              )}
            </div>
            
            <div className="flex flex-col items-start text-left min-w-[140px]">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:text-[#3ba2d8] transition-colors">Beispiel-Anruf hören</span>
              {/* Waveform Visualization styled like the user's uploaded image with precise colors and heights */}
              <div className="flex items-center gap-[3px] h-7 w-full">
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes hoverWave {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(0.35); }
                  }
                  .animate-wave-bar {
                    animation: hoverWave 1.2s ease-in-out infinite;
                    transform-origin: center;
                  }
                `}} />
                {[15, 38, 58, 82, 54, 42, 90, 100, 75, 48, 60, 40, 72, 58, 45, 42, 80, 38, 28, 15].map((height, i, arr) => {
                  const ratio = i / (arr.length - 1 || 1);
                  const r = Math.round(59 - 40 * ratio);
                  const g = Math.round(162 - 2 * ratio);
                  const b = Math.round(216 - 58 * ratio);
                  return (
                    <div 
                      key={i} 
                      className={`w-[4px] rounded-full transition-all duration-300 ${isPlaying ? 'animate-wave-bar' : ''}`}
                      style={{ 
                        height: `${height}%`,
                        backgroundColor: `rgb(${r}, ${g}, ${b})`,
                        animationDelay: isPlaying ? `${i * 0.05}s` : undefined
                      }} 
                    ></div>
                  );
                })}
              </div>
            </div>
          </button>

          <button 
            onClick={() => { 
              const isPreLaunchUser = sessionStorage.getItem('is_pre_launch_user') === 'true';
              navigate(isPreLaunchUser ? '/pre-launch-check' : '/praxis-check'); 
              window.scrollTo(0, 0); 
            }}
            className="w-full sm:w-auto bg-gradient-medical text-white px-8 py-4 rounded-full font-bold hover:shadow-glow transition-all hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 h-[64px]"
          >
            Jetzt zum 3-Minuten-Praxis-Check!
            <ArrowRight size={18} />
          </button>
        </div>

        {/* DSGVO / Trust Banner */}
        <div className="flex flex-col items-center gap-3 mt-4 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-5 bg-white px-8 py-3 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
            <ShieldCheck size={32} className="text-[#0D9488]" />
            <div className="flex flex-col items-start justify-center text-left">
              <span className="text-sm font-bold text-slate-900 leading-none mb-1.5">100% DSGVO-konform</span>
              <div className="w-full h-[4px] bg-[linear-gradient(90deg,black_33%,#DD0000_33%,#DD0000_66%,#FFCE00_66%)] rounded-full"></div>
              <span className="text-sm font-bold text-slate-900 leading-none mt-1.5">Serverstandort Deutschland</span>
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed max-w-lg">
            <span className="text-[#0D9488] font-bold">Ärztliche Schweigepflicht (§ 203 StGB):</span> Das System erfüllt lückenlos alle rechtlichen Vorgaben des Patientengeheimnisses. Patientendaten sind zu jedem Zeitpunkt absolut sicher und verschlüsselt.
          </p>
        </div>

      </div>
    </section>
  );
};
