import React, { useState, useRef } from 'react';
import { Sparkles, Play, Pause, Volume2, Calendar, Pill, AlertCircle } from 'lucide-react';

export const LiveDemo: React.FC = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  
  // Use the same sample URL for all for now, as no distinct URLs were provided
  const sampleUrl = "https://cdn.shopify.com/s/files/1/0915/3334/5117/files/Voicetest.mp3?v=1763726844";

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
    // Stop currently playing if different
    if (playingIndex !== null && playingIndex !== index && audioRefs.current[playingIndex]) {
      audioRefs.current[playingIndex]?.pause();
      if (audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex]!.currentTime = 0;
      }
    }

    const currentAudio = audioRefs.current[index];
    if (currentAudio) {
      if (playingIndex === index) {
        currentAudio.pause();
        setPlayingIndex(null);
      } else {
        currentAudio.play();
        setPlayingIndex(index);
      }
    }
  };

  const handleEnded = (index: number) => {
    setPlayingIndex(null);
  };

  return (
    <section id="demo" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary-dark font-semibold bg-primary-light px-3 py-1 rounded-full text-sm mb-6">
            <Volume2 size={14} />
            <span>Audio Beispiele</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
            Hörproben: <span className="text-gradient">So klingt Auxilium.</span>
          </h2>
          <p className="text-lg text-slate-500">
            Erleben Sie die natürliche Stimme und intelligente Gesprächsführung in verschiedenen Szenarien.
          </p>
        </div>

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

              <div className="bg-white rounded-xl p-4 border border-slate-100 flex items-center gap-4">
                <button 
                  onClick={() => togglePlay(idx)}
                  className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white shadow-md transition-all ${playingIndex === idx ? 'bg-[#298cc4] scale-105' : 'bg-[#3ba2d8] hover:bg-[#2c8fc7] hover:scale-105'}`}
                >
                  {playingIndex === idx ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
                
                {/* Waveform Visualization styled like the user's uploaded image with precise colors and heights */}
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
                    return heights.map((height, i) => {
                      const ratio = i / (heights.length - 1 || 1);
                      const r = Math.round(59 - 40 * ratio);
                      const g = Math.round(162 - 2 * ratio);
                      const b = Math.round(216 - 58 * ratio);
                      return (
                        <div 
                          key={i} 
                          className={`flex-1 rounded-full transition-all duration-300 ${playingIndex === idx ? 'animate-wave-bar' : ''}`}
                          style={{ 
                            height: `${height}%`,
                            backgroundColor: `rgb(${r}, ${g}, ${b})`,
                            animationDelay: `${i * 0.06}s` 
                          }} 
                        ></div>
                      );
                    });
                  })()}
                </div>

                <audio 
                  ref={el => audioRefs.current[idx] = el}
                  src={sampleUrl}
                  onEnded={() => handleEnded(idx)}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};