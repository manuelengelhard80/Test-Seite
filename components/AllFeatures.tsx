import React from 'react';
import { Calendar, Pill, AlertTriangle, Clock, Globe, XCircle, Mail, MessageSquare, Link2, ShieldCheck, HelpCircle, RotateCw, ArrowRight, Mic2 } from 'lucide-react';

interface AllFeaturesProps {
  preview?: boolean;
  onNavigate?: (page: string) => void;
}

export const AllFeatures: React.FC<AllFeaturesProps> = ({ preview = false, onNavigate }) => {
  const features = [
    {
      icon: Mic2,
      title: "Natürliche Sprach-KI",
      benefit: "Smarter Telefonassistent mit natürlicher Stimme für empathische Patientenbetreuung."
    },
    {
      icon: Clock,
      title: "24/7 Erreichbarkeit",
      benefit: "Nimmt alle Anrufe entgegen – rund um die Uhr und in 25 Sprachen."
    },
    {
      icon: AlertTriangle,
      title: "Notfall-Triage",
      benefit: "Erkennt Dringlichkeiten sofort und leitet Notfälle gezielt weiter."
    },
    {
      icon: Pill,
      title: "Rezept & Überweisung",
      benefit: "Nimmt Rezeptwünsche und Überweisungsanfragen strukturiert auf."
    },
    {
      icon: Mail,
      title: "E-Mail-Weiterleitung",
      benefit: "Leitet Anliegen inklusive Transkript direkt an den richtigen Ansprechpartner."
    },
    {
      icon: HelpCircle,
      title: "Praxis-FAQ",
      benefit: "Beantwortet häufige Fragen zu Öffnungszeiten, Parkplätzen oder Leistungen automatisch."
    },
    {
      icon: Calendar,
      title: "Smarte Terminvergabe",
      benefit: "Findet intelligent Lücken im Kalender und bucht Termine direkt ein."
    },
    {
      icon: XCircle,
      title: "Absage-Management",
      benefit: "Nimmt Absagen entgegen und gibt den Terminzeitraum sofort wieder frei."
    },
    {
      icon: MessageSquare,
      title: "SMS-Bestätigung",
      benefit: "Sendet automatische Terminbestätigungen direkt auf das Handy des Patienten."
    },
    {
      icon: Link2,
      title: "API-Schnittstelle",
      benefit: "Direkte, tiefe Integration in Ihren Praxiskalender über API."
    },
    {
      icon: RotateCw,
      title: "Recall-Service",
      benefit: "Erinnert Patienten automatisch an Vorsorge- oder Folgetermine."
    },
    {
      icon: ShieldCheck,
      title: "DSGVO & Sicherheit",
      benefit: "100% Datenschutzkonform, Serverstandort Deutschland, AVV inklusive."
    }
  ];

  const displayedFeatures = preview ? features.slice(0, 6) : features;

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ein Assistent. <span className="text-gradient">Alle Funktionen.</span>
          </h2>
          <p className="text-lg text-slate-500">
            Auxilium AI deckt den kompletten telefonischen Workflow Ihrer Praxis ab – passend zu Ihrem gewählten Paket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedFeatures.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex gap-5 items-start group">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <feature.icon size={24} className="text-primary-dark" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>

        {preview && onNavigate && (
          <div className="mt-12 text-center">
            <button 
              onClick={() => onNavigate('features')}
              className="inline-flex items-center gap-2 text-primary-dark font-bold hover:text-primary transition-colors text-lg group"
            >
              Alle Funktionen ansehen <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};