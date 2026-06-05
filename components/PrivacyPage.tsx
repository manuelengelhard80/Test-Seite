import React from 'react';
import { ArrowLeft, Shield, Lock, FileText, UserCheck } from 'lucide-react';
import { CTASection } from './CTASection';

interface PrivacyPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
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
              <Shield size={14} className="text-slate-600" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Rechtliches</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Datenschutz<span className="text-gradient">erklärung</span>
            </h1>
            <p className="text-lg text-slate-600 mb-0">
               Auxilium – ein Angebot der 2Bmedia & Marketing GbR
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
                   <Lock className="text-primary" size={20} />
                   Datenschutz-Priorität
                 </h2>
                 <p className="text-slate-600 text-sm">
                   Der Schutz personenbezogener Daten hat für uns höchste Priorität. Wir verarbeiten personenbezogene Daten ausschließlich im Rahmen der geltenden Datenschutzgesetze, insbesondere der DSGVO.
                 </p>
              </div>

              <div className="space-y-12">
                {/* 1. Verantwortlicher */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Verantwortlicher</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                  </p>
                  <p className="text-slate-700 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                    Auxilium ist ein Angebot der 2Bmedia & Marketing GbR<br />
                    Beeker Ring 7<br />
                    89423 Gundelfingen an der Donau<br />
                    Deutschland<br /><br />
                    Vertreten durch den geschäftsführenden Gesellschafter<br />
                    Manuel Engelhard<br /><br />
                    E-Mail: <a href="mailto:info@auxiliumassist.ai" className="text-primary hover:underline font-semibold">info@auxiliumassist.ai</a>
                  </p>
                </section>

                {/* 2. Allgemeine Hinweise */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Allgemeine Hinweise zur Datenverarbeitung</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Der Schutz personenbezogener Daten hat für uns höchste Priorität. Wir verarbeiten personenbezogene Daten ausschließlich im Rahmen der geltenden Datenschutzgesetze, insbesondere der DSGVO.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Die Verarbeitung erfolgt nur, soweit dies zur Bereitstellung unserer Leistungen, zur Vertragsdurchführung oder aufgrund gesetzlicher Verpflichtungen erforderlich ist.
                  </p>
                </section>

                {/* 3. Zweck der Verarbeitung */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Zweck der Verarbeitung</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Im Rahmen der Implementierung und Bereitstellung der KI-gestützten Kommunikationslösung („Auxilium“) verarbeiten wir insbesondere:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4">
                    <li>Kontaktdaten von Patienten (z. B. Name, Telefonnummer, Anliegen)</li>
                    <li>Kommunikationsinhalte aus Telefonaten oder Anfragen</li>
                    <li>Termininformationen</li>
                    <li>praxisbezogene Organisationsdaten</li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed">
                    Diese Verarbeitung erfolgt ausschließlich zur Bereitstellung und Durchführung der vereinbarten technischen Lösung für die jeweilige medizinische Einrichtung.
                  </p>
                </section>

                {/* 4. Rechtsgrundlagen */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Rechtsgrundlagen der Verarbeitung</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">Die Verarbeitung erfolgt auf Grundlage von:</p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
                    <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kommunikation)</li>
                    <li>sofern erforderlich: Art. 9 Abs. 2 lit. h DSGVO (Gesundheitsdaten im medizinischen Kontext durch Leistungserbringer im Gesundheitswesen)</li>
                  </ul>
                </section>

                {/* 5. Einbindung externer Anbieter */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Einbindung externer Anbieter</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Zur technischen Bereitstellung und zum Betrieb der KI-Systeme können externe Dienstleister eingesetzt werden.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Diese verarbeiten personenbezogene Daten ausschließlich im Rahmen einer Auftragsverarbeitung gemäß Art. 28 DSGVO.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Der jeweilige externe Anbieter ist datenschutzrechtlich eigenständig für die Einhaltung der DSGVO verantwortlich.
                  </p>
                </section>

                {/* 6. Auftragsverarbeitung */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Auftragsverarbeitung</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Sofern externe Anbieter eingesetzt werden, erfolgt die Datenverarbeitung auf Grundlage eines Auftragsverarbeitungsvertrags (AVV) zwischen der jeweiligen medizinischen Einrichtung und dem externen Anbieter.
                  </p>
                  <p className="text-slate-800 font-medium leading-relaxed italic">
                    Wir selbst schließen keinen AVV im Namen des Kunden mit externen Anbietern ab.
                  </p>
                </section>

                {/* 7. Speicherdauer */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Speicherdauer</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Personenbezogene Daten werden nur so lange gespeichert, wie dies für die Erfüllung der jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
                  </p>
                </section>

                {/* 8. Weitergabe von Daten */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Weitergabe von Daten</h2>
                  <p className="text-slate-600 leading-relaxed mb-2">Eine Weitergabe personenbezogener Daten an Dritte erfolgt ausschließlich:</p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>zur Erfüllung der vertraglichen Leistungen</li>
                    <li>an externe technische Dienstleister im Rahmen der Auftragsverarbeitung</li>
                    <li>wenn eine gesetzliche Verpflichtung besteht</li>
                  </ul>
                </section>

                {/* 9. Datenverarbeitung im medizinischen Kontext */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Datenverarbeitung im medizinischen Kontext</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Es kann nicht ausgeschlossen werden, dass im Rahmen der Nutzung gesundheitsbezogene Daten im Sinne des Art. 9 DSGVO verarbeitet werden.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Diese Verarbeitung erfolgt ausschließlich im Auftrag der jeweiligen medizinischen Einrichtung und dient der Organisation und Verbesserung der Patientenkommunikation.
                  </p>
                </section>

                {/* 10. Betroffenenrechte */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Betroffenenrechte</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">Betroffene Personen haben jederzeit das Recht auf:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                      <li>Auskunft über gespeicherte Daten (Art. 15 DSGVO)</li>
                      <li>Berichtigung (Art. 16 DSGVO)</li>
                      <li>Löschung (Art. 17 DSGVO)</li>
                    </ul>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                      <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                      <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                      <li>Widerspruch gegen Verarbeitung (Art. 21 DSGVO)</li>
                    </ul>
                  </div>
                </section>

                {/* 11. Sicherheit */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Sicherheit der Verarbeitung</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Wir setzen geeignete technische und organisatorische Maßnahmen ein, um personenbezogene Daten vor Verlust, Missbrauch oder unbefugtem Zugriff zu schützen.
                  </p>
                </section>

                {/* 12. Änderungen */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Änderungen dieser Datenschutzerklärung</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte rechtliche oder technische Anforderungen anzupassen.
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
