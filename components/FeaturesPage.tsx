import React from 'react';
import { ArrowLeft, Sparkles, Calendar, Pill, AlertTriangle, Clock, Globe, XCircle, Mail, MessageSquare, Link2, ShieldCheck, HelpCircle, RotateCw, Mic2 } from 'lucide-react';
import { CTASection } from './CTASection';

interface FeaturesPageProps {
  onBack: () => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onBack }) => {
  const features = [
    {
      icon: Mic2,
      title: "Natürliche Sprach-KI",
      benefit: "Smarter Telefonassistent mit natürlicher Stimme für empathische Patientenbetreuung.",
      detail: "Unsere KI klingt nicht wie ein Roboter, sondern führt natürliche Dialoge. Sie erkennt Nuancen, lässt Patienten ausreden und sorgt für ein angenehmes Gesprächserlebnis (Starter)."
    },
    {
      icon: Clock,
      title: "24/7 Erreichbarkeit",
      benefit: "Nimmt alle Anrufe entgegen – rund um die Uhr und in 25 Sprachen.",
      detail: "Egal ob nachts, am Wochenende oder bei hohem Aufkommen: Kein Anruf geht verloren. Die Mehrsprachigkeit baut Barrieren ab und versorgt alle Patientengruppen optimal (Starter)."
    },
    {
      icon: AlertTriangle,
      title: "Notfall-Triage",
      benefit: "Erkennt Dringlichkeiten sofort und leitet Notfälle gezielt weiter.",
      detail: "Anhand von Schlüsselwörtern (z.B. 'Atemnot', 'Brustschmerz') filtert das System kritische Fälle heraus und leitet sie sofort an eine Notfallnummer durch oder gibt Handlungsanweisungen (Starter)."
    },
    {
      icon: Pill,
      title: "Rezept & Überweisung",
      benefit: "Nimmt Rezeptwünsche und Überweisungsanfragen strukturiert auf.",
      detail: "Patienten sprechen ihre Wünsche einfach auf. Die KI extrahiert Name, Medikament und Dosierung und stellt Ihnen eine strukturierte Liste zur Verfügung (Starter)."
    },
    {
      icon: Mail,
      title: "E-Mail-Weiterleitung",
      benefit: "Leitet Anliegen inklusive Transkript direkt an den richtigen Ansprechpartner.",
      detail: "Jedes Gespräch wird transkribiert und zusammen mit der Audio-Datei kategorisiert per E-Mail an das Praxispostfach oder den zuständigen Arzt gesendet (Starter)."
    },
    {
      icon: HelpCircle,
      title: "Praxis-FAQ",
      benefit: "Beantwortet häufige Fragen zu Öffnungszeiten, Parkplätzen oder Leistungen automatisch.",
      detail: "Entlasten Sie Ihr Team von Standardfragen. Die KI gibt Auskunft zu Sprechzeiten, Anfahrt, IGeL-Leistungen oder Urlaubsvertretungen (Starter)."
    },
    {
      icon: Calendar,
      title: "Smarte Terminvergabe",
      benefit: "Findet intelligent Lücken im Kalender und bucht Termine direkt ein.",
      detail: "Die KI prüft Ihre Verfügbarkeiten in Echtzeit, schlägt dem Patienten passende Slots vor und bucht den Termin fest ein – unter Berücksichtigung Ihrer Pufferzeiten (Professional)."
    },
    {
      icon: XCircle,
      title: "Absage-Management",
      benefit: "Nimmt Absagen entgegen und gibt den Terminzeitraum sofort wieder frei.",
      detail: "Sagt ein Patient ab, wird der Slot sofort wieder im System verfügbar gemacht. So minimieren Sie Leerlaufzeiten und optimieren die Auslastung (Professional)."
    },
    {
      icon: MessageSquare,
      title: "SMS-Bestätigung",
      benefit: "Sendet automatische Terminbestätigungen direkt auf das Handy des Patienten.",
      detail: "Nach erfolgreicher Buchung erhält der Patient eine Bestätigung per SMS. Dies reduziert die No-Show-Rate signifikant (Professional)."
    },
    {
      icon: Link2,
      title: "API-Schnittstelle",
      benefit: "Direkte, tiefe Integration in Ihren Praxiskalender über API.",
      detail: "Für maximale Automatisierung: Volle Lese- und Schreibrechte direkt in Ihrem PVS-Kalender für eine nahtlose Synchronisation ohne manuelle Überträge (Klinik)."
    },
    {
      icon: RotateCw,
      title: "Recall-Service",
      benefit: "Erinnert Patienten automatisch an Vorsorge- oder Folgetermine.",
      detail: "Die KI kontaktiert Patienten proaktiv, um an jährliche Kontrollen oder Impfungen zu erinnern und direkt einen Termin zu vereinbaren (Klinik)."
    },
    {
      icon: ShieldCheck,
      title: "DSGVO & Sicherheit",
      benefit: "100% Datenschutzkonform, Serverstandort Deutschland, AVV inklusive.",
      detail: "Sicherheit ist unser Fundament. Wir erfüllen alle strengen Vorgaben der DSGVO und des § 203 StGB. Ihre Daten bleiben in Deutschland (Alle Pakete)."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* Header Section */}
      <section className="bg-white pb-10 pt-10 border-b border-slate-100">
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
              <Sparkles size={14} className="text-primary-dark" />
              <span className="text-xs font-bold text-primary-dark uppercase tracking-wide">Funktionsumfang</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Leistungsstark & <br/>
              <span className="text-gradient">Intelligent.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
              Entdecken Sie alle Möglichkeiten, wie Auxilium AI Ihre Praxis entlastet – detailliert aufgeschlüsselt nach unseren Paketen.
            </p>
          </div>
        </div>
      </section>

      {/* Full Feature Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <feature.icon size={28} className="text-primary-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 font-medium mb-3 leading-relaxed">
                    {feature.benefit}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.detail}
                  </p>
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