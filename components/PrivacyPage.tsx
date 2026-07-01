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
                    Telefon: +49 1525 73440044<br />
                    E-Mail: <a href="mailto:info@auxilium-assist.de" className="text-primary hover:underline font-semibold">info@auxilium-assist.de</a>
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

                {/* 13. Cookies, Affiliate-Links und Retargeting-Technologien */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Cookies, Affiliate-Links und Retargeting-Technologien</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Unsere Website nutzt verschiedene Arten von Cookies und ähnlichen Tracking-Technologien, um Kernfunktionen bereitzustellen, die Nutzung statistisch auszuwerten, Affiliate-Partnerzuordnungen vorzunehmen und gezieltes Marketing zu ermöglichen.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">a) Notwendige &amp; Essenzielle Cookies</h3>
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                    Diese Cookies sind für den Betrieb der Website zwingend erforderlich (z. B. Speicherung der Cookie-Präferenzen, Funktion des Praxis-Checks, temporäre Sitzungsspeicherungen). Sie können nicht deaktiviert werden. Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am reibungslosen Betrieb der Website).
                  </p>

                  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">b) Analyse- und Statistik-Cookies</h3>
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                    Wir nutzen anonymisierte Messverfahren, um das Verhalten der Nutzer auf unserer Website besser zu verstehen (z. B. welche Abschnitte des Praxis-Checks am häufigsten genutzt werden). Dies hilft uns, die Struktur und Inhalte kontinuierlich zu optimieren. Die Speicherung erfolgt nur nach Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
                  </p>

                  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">c) Affiliate-Cookies (Partner-Tracking)</h3>
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                    Auf unserer Website befinden sich Links zu unserem Partner <strong className="text-slate-800">fonio.ai</strong> (z. B. der Link mit dem Tracking-Parameter <code className="bg-slate-100 px-1 py-0.5 rounded text-xs text-primary font-mono">ac=ICTDD9L82N</code>). Wenn Sie diesen Links folgen und dort eine Bestellung oder ein Onboarding starten, wird ein sogenanntes <strong>Affiliate-Cookie</strong> gesetzt. 
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                    Dieses Cookie dient ausschließlich dazu, festzustellen, dass Sie über unsere Empfehlung zu fonio.ai gelangt sind, um eine etwaige Vermittlungsprovision (Affiliate-Zuordnung) korrekt abrechnen zu können. Es werden keine sensiblen persönlichen Daten verarbeitet oder Profile über Ihr Surfverhalten erstellt. Die Rechtsgrundlage für den Einsatz dieses Cookies ist Ihre Einwilligung bzw. unser berechtigtes Interesse an der kommerziellen Abwicklung von Affiliate-Partnerschaften (Art. 6 Abs. 1 lit. f bzw. lit. a DSGVO).
                  </p>

                  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">d) Retargeting- und Marketing-Cookies</h3>
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                    Wir setzen Retargeting-Technologien (wie Werbepixel oder Remarketing-Dienste) ein. Diese ermöglichen es, Besucher unserer Website auf Plattformen von Drittanbietern (z. B. Google, Meta) mit personalisierten Werbeanzeigen anzusprechen. 
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                    Dadurch wird sichergestellt, dass Ihnen Angebote angezeigt werden, die Ihren tatsächlichen Interessen entsprechen (z. B. spezifische Telefonassistenz-Tarife, die Sie sich zuvor angesehen haben). Die Datenverarbeitung erfolgt ausschließlich auf Grundlage Ihrer freiwilligen Einwilligung über das Cookie-Consent-Banner (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
                  </p>

                  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">e) Widerruf und Cookie-Einstellungen</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Sie können Ihre Cookie-Einstellungen jederzeit über das Cookie-Consent-Banner am unteren Bildschirmrand anpassen oder verändern sowie die gesetzten Cookies in den Systemeinstellungen Ihres Browsers löschen.
                  </p>
                </section>

                {/* 14. WhatsApp Kommunikation */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Kommunikation via WhatsApp (WhatsApp Business)</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Wir bieten Ihnen die Möglichkeit, schnell und unkompliziert per WhatsApp mit uns in Kontakt zu treten. Hierfür nutzen wir die Business-Version von WhatsApp. Anbieter des Dienstes ist die WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland (Muttergesellschaft: Meta Platforms Inc., USA).
                  </p>
                  
                  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">a) Zweck und Rechtsgrundlage der Datenverarbeitung</h3>
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                    Wenn Sie uns eine Anfrage per WhatsApp senden, verarbeiten wir Ihre Mobilfunknummer, Ihren WhatsApp-Benutzernamen (sofern angegeben) sowie den Inhalt Ihrer Nachricht und etwaige übermittelte Medien ausschließlich zur Beantwortung Ihrer Anfrage bzw. zur persönlichen Beratung.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                    Die Rechtsgrundlage für diese Datenverarbeitung ist Ihre ausdrückliche Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO, die Sie uns durch die aktive Kontaktaufnahme übermitteln, sowie Art. 6 Abs. 1 lit. b DSGVO zur Durchführung vorvertraglicher Maßnahmen oder zur Beantwortung vertraglicher Anfragen.
                  </p>

                  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">b) Ende-zu-Ende-Verschlüsselung und Drittlandstransfer</h3>
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                    WhatsApp verwendet eine Ende-zu-Ende-Verschlüsselung. Das bedeutet, dass die Inhalte der Nachrichten für WhatsApp selbst oder sonstige Dritte nicht einsehbar sind. Allerdings erfasst WhatsApp sogenannte Metadaten (z. B. IP-Adresse, Informationen über das verwendete Gerät, Absender- und Empfängernummer, Uhrzeit des Versands), die an Server von Meta Platforms Inc. in den USA übertragen werden können.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                    Die Datenübertragung in die USA wird durch Standardvertragsklauseln der EU-Kommission sowie das EU-US Data Privacy Framework abgesichert, für das Meta zertifiziert ist, um ein angemessenes Datenschutzniveau zu garantieren.
                  </p>

                  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">c) Speicherdauer und Widerruf</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Wir löschen Ihre WhatsApp-Nachrichten und die damit verbundenen Daten, sobald Ihre Anfrage abschließend geklärt ist und keine gesetzlichen Aufbewahrungspflichten (z. B. aus dem Handels- oder Steuerrecht) einer Löschung entgegenstehen. Sie können Ihre erteilte Einwilligung zur Datenverarbeitung jederzeit mit Wirkung für die Zukunft per formloser Nachricht (z. B. via E-Mail an info@auxilium-assist.de oder direkt im Chat) widerrufen.
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
