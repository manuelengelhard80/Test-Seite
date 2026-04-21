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
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transition-all ${playingIndex === idx ? 'bg-secondary' : 'bg-primary hover:bg-primary-hover hover:scale-105'}`}
                >
                  {playingIndex === idx ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
                
                {/* Fake Waveform */}
                <div className="flex-1 h-8 flex items-center gap-0.5 opacity-50">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1 rounded-full bg-slate-800 transition-all duration-300 ${playingIndex === idx ? 'animate-pulse' : ''}`}
                      style={{ 
                        height: `${Math.max(20, Math.random() * 100)}%`,
                        animationDelay: `${i * 0.1}s` 
                      }} 
                    ></div>
                  ))}
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