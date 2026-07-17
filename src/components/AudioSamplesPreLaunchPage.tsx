import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Volume2, Play, Pause, Calendar, Pill, AlertCircle } from 'lucide-react';
import { CTASection } from './CTASection';

interface AudioSamplesPreLaunchPageProps {
  onBack: () => void;
}

export const AudioSamplesPreLaunchPage: React.FC<AudioSamplesPreLaunchPageProps> = ({ onBack }) => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const timeoutRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Mark user as pre-launch visitor in this session
    sessionStorage.setItem('is_pre_launch_user', 'true');
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  
  const samples = [
    {
      id: 0,
      title: "Terminvereinbarung",
      desc: "Patient möchte einen Termin für die Akutsprechstunde.",
      duration: "0:45",
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      id: 1,
      title: "Rezeptbestellung",
      desc: "Anforderung eines Folgerezepts für Blutdruckmittel.",
      duration: "0:30",
      icon: Pill,
      color: "text-emerald-600",
      bg: "bg-emerald-100"
    },
    {
      id: 2,
      title: "Notfall-Triage",
      desc: "Erkennung von Dringlichkeiten bei akuten Schmerzen.",
      duration: "0:25",
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-100"
    }
  ];

  const togglePlay = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (playingIndex === index) {
      setPlayingIndex(null);
    } else {
      setPlayingIndex(index);
      
      if (index === 0) {
        if (!audioRef.current) {
          const audio = new Audio('/termin.mp3');
          audio.preload = "auto";
          
          audio.addEventListener('ended', () => {
            setPlayingIndex(null);
          });
          
          audio.addEventListener('error', (e) => {
            console.error("Audio loading failed or file is corrupted:", e);
            setPlayingIndex(null);
          });

          audioRef.current = audio;
        }
        
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => {
          console.error("Audio play failed:", err);
          setPlayingIndex(null);
        });
      } else {
        timeoutRef.current = setTimeout(() => {
          setPlayingIndex(null);
        }, 4000);
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* Header Section */}
      <section className="bg-white pb-16 pt-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-500 hover:text-primary mb-8 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Zurück zur Übersicht
          </button>
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-primary-light rounded-full px-4 py-1.5 shadow-sm mb-6 border border-primary/20">
              <Volume2 size={14} className="text-primary-dark" />
              <span className="text-xs font-bold text-primary-dark uppercase tracking-wide">Live Demo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Hörproben: <span className="text-gradient">So klingt Auxilium.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
              Erleben Sie die natürliche Stimme und intelligente Gesprächsführung in verschiedenen Szenarien. Überzeugen Sie sich selbst von der Qualität.
            </p>
          </div>
        </div>
      </section>

      {/* Samples Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {samples.map((sample, idx) => (
              <div key={idx} className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:shadow-lg transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${sample.bg} flex items-center justify-center ${sample.color}`}>
                    <sample.icon size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100">
                    {sample.duration}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{sample.title}</h3>
                <p className="text-slate-500 text-sm mb-6 min-h-[40px]">{sample.desc}</p>

                <div className="bg-white rounded-xl p-4 border border-slate-100 flex items-center gap-4 min-h-[80px]">
                  <button 
                    onClick={() => togglePlay(idx)}
                    className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white shadow-md transition-all ${playingIndex === idx ? 'bg-[#298cc4] scale-105' : 'bg-[#13a09e] hover:bg-[#0f8280] hover:scale-105'}`}
                  >
                    {playingIndex === idx ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                  </button>
                  
                  {(playingIndex === idx && idx !== 0) ? (
                    <div className="flex-1 text-xs font-semibold text-[#0D9488] animate-pulse text-left leading-relaxed">
                      Die Hörbeispiele folgen in Kürze...
                    </div>
                  ) : (
                    /* Waveform Visualization styled like the user's uploaded image with precise colors and heights */
                    <div className="flex-1 h-9 flex items-center gap-[3px]">
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
                      {(() => {
                        const presets = [
                          [10, 42, 60, 82, 50, 38, 85, 96, 68, 48, 56, 32, 68, 52, 45, 38, 74, 30], // Terminvereinbarung
                          [15, 28, 45, 70, 88, 55, 35, 78, 92, 60, 42, 50, 38, 62, 48, 30, 45, 20], // Rezeptbestellung
                          [10, 32, 50, 68, 45, 78, 95, 82, 52, 60, 40, 52, 70, 48, 35, 58, 42, 22]  // Notfall-Triage
                        ];
                        const heights = presets[idx % presets.length];
                        const isCurrentlyPlaying = playingIndex === idx;
                        return heights.map((height, i) => {
                          const ratio = i / (heights.length - 1 || 1);
                          const r = Math.round(59 - 40 * ratio);
                          const g = Math.round(162 - 2 * ratio);
                          const b = Math.round(216 - 58 * ratio);
                          return (
                            <div 
                              key={i} 
                              className={`flex-1 rounded-full transition-all duration-300 ${isCurrentlyPlaying ? 'animate-wave-bar' : ''}`}
                              style={{ 
                                height: `${height}%`,
                                backgroundColor: `rgb(${r}, ${g}, ${b})`,
                                animationDelay: isCurrentlyPlaying ? `${i * 0.05}s` : undefined
                              }} 
                            ></div>
                          );
                        });
                      })()}
                    </div>
                  )}
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
