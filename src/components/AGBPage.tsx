import React from 'react';
import { ArrowLeft, Scale, FileText, ShieldCheck } from 'lucide-react';
import { CTASection } from './CTASection';

interface AGBPageProps {
  onBack: () => void;
}

export const AGBPage: React.FC<AGBPageProps> = ({ onBack }) => {
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
            <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-1.5 shadow-sm mb-6 border border-slate-200">
              <Scale size={14} className="text-slate-600" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Rechtliches</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Allgemeine <span className="text-gradient">Geschäftsbedingungen</span>
            </h1>
            <p className="text-lg text-slate-600 mb-0">
               Auxilium-Assist
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-10">
            
            <div className="prose prose-slate max-w-none">
              
              <div className="mb-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                 <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                   <ShieldCheck className="text-primary" size={20} />
                   Zusammenfassung
                 </h2>
                 <p className="text-slate-600 text-sm">
                   Diese AGB regeln die Zusammenarbeit zwischen Auxilium-Assist und seinen gewerblichen Kunden. 
                   Bitte beachten Sie, dass sich unser Angebot ausschließlich an Unternehmer richtet. 
                   Gegenstand ist die Einrichtung von KI-Kommunikationslösungen.
                 </p>
              </div>

              <div className="space-y-12">
                {/* 1. Geltungsbereich */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Geltungsbereich</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen
                  </p>
                  <p className="text-slate-700 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                    Auxilium-Assist<br />
                    Beeker Ring 7<br />
                    89423 Gundelfingen an der Donau<br />
                    Deutschland
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    – nachfolgend „Anbieter“ –
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    und ihren Kunden (nachfolgend „Kunde“) über die Implementierung KI-gestützter Kommunikationslösungen für medizinische Einrichtungen.
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-4 font-semibold text-slate-900">
                    Die Leistungen richten sich ausschließlich an Unternehmer im Sinne des § 14 BGB.
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    Abweichende Bedingungen des Kunden finden keine Anwendung, sofern ihnen nicht ausdrücklich schriftlich zugestimmt wurde.
                  </p>
                </section>

                {/* 2. Vertragsgegenstand */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Vertragsgegenstand</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Gegenstand des Vertrages ist die einmalige Implementierung und Einrichtung eines KI-gestützten Telefon- und Kommunikationssystems.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-2">Die Leistungen umfassen insbesondere:</p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>technische Einrichtung und Konfiguration</li>
                    <li>Anpassung an die Anforderungen der jeweiligen Praxis oder Einrichtung</li>
                    <li>Unterstützung bei der Inbetriebnahme</li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-4 italic">
                    Der laufende Betrieb des Systems ist nicht Bestandteil dieses Vertrages.
                  </p>
                </section>

                {/* 3. Leistungsstufen */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Leistungsstufen</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">Der Anbieter bietet folgende Implementierungsleistungen an:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="font-bold text-slate-900 mb-1">Auxilium Voice</div>
                      <div className="text-xs text-slate-500">Basis-Implementierung</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="font-bold text-slate-900 mb-1">Auxilium Assist</div>
                      <div className="text-xs text-slate-500">Erweiterte Prozessautomatisierung</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="font-bold text-slate-900 mb-1">Auxilium Pulse</div>
                      <div className="text-xs text-slate-500">Schnittstellen & Systemintegration</div>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Individuelle Lösungen („Enterprise“) werden gesondert vereinbart.
                  </p>
                </section>

                {/* 4. Preise und Zahlungsbedingungen */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Preise und Zahlungsbedingungen</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Alle Preise sind einmalige Einrichtungspreise zzgl. gesetzlicher Mehrwertsteuer.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Die Zahlung erfolgt im Voraus über den jeweiligen Zahlungsanbieter (z. B. Digistore24).
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Die Implementierung beginnt nach vollständigem Zahlungseingang.
                  </p>
                </section>

                {/* 5. Laufender Betrieb und externe Anbieter */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 text-primary-dark">5. Laufender Betrieb und externe Anbieter</h2>
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <p className="text-slate-800 leading-relaxed mb-4 font-medium">
                      Für den Betrieb des implementierten Systems (insbesondere KI-Verarbeitung, Telefoninfrastruktur und technische Bereitstellung) ist ein separater Vertrag mit einem externen Anbieter erforderlich.
                    </p>
                    <p className="text-slate-700 leading-relaxed mb-4 italic">
                      Dieser Vertrag wird ausschließlich zwischen dem Kunden und dem jeweiligen Anbieter geschlossen.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Der Kunde ist frei in der Wahl des Anbieters sowie der jeweiligen Vertragskonditionen. Ein Vertragsverhältnis mit einem externen Anbieter entsteht nicht automatisch durch den Erwerb der Implementierungsleistung des Anbieters.
                    </p>
                  </div>
                </section>

                {/* 6. Empfehlung und Implementierung externer Lösungen */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Empfehlung und Implementierung externer Lösungen</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Der Anbieter kann im Rahmen des Onboarding-Prozesses einen externen Anbieter für den Betrieb des Systems empfehlen.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Die Entscheidung zur Nutzung dieses oder eines anderen Anbieters liegt ausschließlich beim Kunden.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Sofern sich der Kunde für einen empfohlenen Anbieter entscheidet, kann der Kunde im Einzelfall von gesonderten Konditionen oder Vergünstigungen profitieren. Ein Anspruch auf bestimmte Preise oder Rabatte besteht nicht.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Der Anbieter unterstützt in diesem Fall die technische Implementierung und Einrichtung des Systems auf Basis der gewählten Infrastruktur. Der Anbieter wird dabei nicht Vertragspartner des externen Anbieters und handelt nicht als dessen Vertreter.
                  </p>
                </section>

                {/* 7. Mitwirkungspflichten des Kunden */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Mitwirkungspflichten des Kunden</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Der Kunde ist verpflichtet, alle zur Implementierung erforderlichen Informationen, Zugänge und technischen Voraussetzungen rechtzeitig bereitzustellen.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Verzögerungen aufgrund fehlender Mitwirkung gehen nicht zu Lasten des Anbieters.
                  </p>
                </section>

                {/* 8. Haftung */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Haftung</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Der Anbieter haftet nur für Vorsatz und grobe Fahrlässigkeit.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und begrenzt auf den vertragstypischen, vorhersehbaren Schaden.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">Eine Haftung für:</p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4">
                    <li>entgangenen Gewinn</li>
                    <li>Betriebsunterbrechungen</li>
                    <li>mittelbare Schäden</li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    ist ausgeschlossen, soweit gesetzlich zulässig. Für Leistungen externer Anbieter übernimmt der Anbieter keine Haftung.
                  </p>
                </section>

                {/* 9. Datenschutz */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Datenschutz</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Der Anbieter verarbeitet personenbezogene Daten ausschließlich im Rahmen der geltenden Datenschutzbestimmungen, insbesondere der Datenschutz-Grundverordnung (DSGVO).
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Sofern im Rahmen des Betriebs des Systems ein externer Anbieter eingebunden wird, erfolgt die Verarbeitung personenbezogener Daten durch diesen ebenfalls ausschließlich im Rahmen der geltenden Datenschutzbestimmungen, insbesondere der DSGVO.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Der jeweilige externe Anbieter ist für die eigenständige Einhaltung der datenschutzrechtlichen Vorgaben verantwortlich.
                  </p>
                </section>

                {/* 10. Widerruf / Rücktritt */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Widerruf / Rücktritt</h2>
                  <p className="text-slate-800 font-bold leading-relaxed">
                    Die angebotenen Leistungen richten sich ausschließlich an Unternehmer. Ein gesetzliches Widerrufsrecht besteht nicht.
                  </p>
                </section>

                {/* 11. Schlussbestimmungen */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Schlussbestimmungen</h2>
                  <p className="text-slate-600 leading-relaxed mb-2">
                    Es gilt das Recht der Bundesrepublik Deutschland.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-2">
                    Gerichtsstand ist, soweit zulässig, der Sitz des Anbieters.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                  </p>
                </section>

              </div>

            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
