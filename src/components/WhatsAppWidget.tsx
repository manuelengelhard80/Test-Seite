import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show a gentle pulsing notification badge or open a preview after 4 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenWidget = () => {
    setIsOpen(true);
    setShowNotification(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return 'Guten Morgen,';
    } else if (hour >= 12 && hour < 18) {
      return 'Guten Tag,';
    } else {
      return 'Guten Abend,';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans pointer-events-auto">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={handleOpenWidget}
          className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#0D9488] to-[#0284C7] text-white rounded-full shadow-lg hover:from-[#0D9488] hover:to-[#0284C7] hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-200 group"
          aria-label="WhatsApp Beratung öffnen"
          id="global-whatsapp-trigger"
        >
          <MessageCircle size={28} className="fill-white" />
          
          {/* Notification Badge */}
          {showNotification && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-[10px] font-bold text-white items-center justify-center shadow-sm">
                1
              </span>
            </span>
          )}

          {/* Tooltip on hover */}
          <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Persönliche Beratung
          </span>
        </button>
      )}

      {/* Expanded Consultation Card / Frame */}
      {isOpen && (
        <div 
          className="w-[320px] md:w-[350px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 text-slate-800"
          id="global-whatsapp-consultation-card"
        >
          {/* Header with Brand Gradient */}
          <div className="bg-gradient-to-r from-[#0D9488] to-[#0284C7] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/manuel-engelhard.jpg" 
                  alt="Manuel Engelhard" 
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#0D9488] rounded-full" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm leading-tight">Manuel Engelhard</h4>
                <p className="text-[11px] text-teal-100/90 mt-0.5">
                  Experte für KI-Implementierungen
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
              aria-label="Schließen"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-5 bg-slate-50/70 text-left space-y-4">
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-xs md:text-sm text-slate-700 leading-relaxed relative">
              <p>
                {getGreeting()} haben Sie Fragen zu unseren KI-Telefonassistenten oder wünschen Sie eine persönliche Praxis-Beratung?
              </p>
              <p className="mt-2 text-slate-600">
                Schreiben Sie mir einfach ganz unkompliziert. Ich helfe Ihnen gerne weiter! 💬
              </p>
            </div>

            {/* Direct WhatsApp Action Call Button */}
            <div className="space-y-2">
              <a
                href="https://wa.me/4915257344044"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-4 rounded-xl text-xs md:text-sm transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-200"
              >
                <MessageCircle size={18} className="fill-white" />
                <span>WhatsApp Beratung starten</span>
              </a>
              <p className="text-[10px] text-slate-400 text-center">
                Kostenfreie &amp; unverbindliche Erstberatung
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
