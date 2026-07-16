import React from 'react';
import { ArrowLeft, Shield, Scale, FileText, CheckCircle2, UserCheck, Key, EyeOff, Lock, Server } from 'lucide-react';
import { CTASection } from './CTASection';

interface Paragraph203PageProps {
  onBack: () => void;
}

export const Paragraph203Page: React.FC<Paragraph203PageProps> = ({ onBack }) => {
  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* Header Section */}
      <section className="bg-white pb-16 pt-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-8 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Zurück zur Übersicht
          </button>
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-1.5 shadow-sm mb-6 border border-emerald-100">
              <Scale size={14} className="text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Strafgesetzbuch (StGB)</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Einhaltung der ärztlichen Schweigepflicht nach <br/>
              <span className="text-gradient">§ 203 StGB.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
              Als Arzt, Zahnarzt oder Therapeut unterliegen Sie der strengen strafrechtlichen Schweigepflicht. Wir sorgen dafür, dass Sie externe Dienstleistungen wie Auxilium Assist absolut rechtssicher und konform mit § 203 StGB nutzen können.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Legal Background Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="text-teal-600" size={24} />
                  Die gesetzliche Neuregelung des § 203 StGB
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm md:text-base">
                  Lange Zeit war die Einbindung externer Dienstleister für schweigepflichtige Berufsgruppen mit erheblichen rechtlichen Risiken behaftet. Mit der **Gesetzesänderung des § 203 StGB im Jahr 2017** hat der Gesetzgeber endlich Rechtssicherheit geschaffen:
                </p>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base">
                  Berufsgeheimnisträger dürfen nun ausdrücklich Dienstleister (wie Auxilium Assist) in ihre Tätigkeit einbinden und ihnen im erforderlichen Umfang sensible Patientendaten offenbaren. Voraussetzung dafür ist der Abschluss einer rechtskonformen **Verpflichtungsvereinbarung zur Wahrung von Dienstleistungsgeheimnissen**.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Ausdrückliche gesetzliche Erlaubnis</h4>
                      <p className="text-slate-500 text-xs mt-0.5">Die Weitergabe von Daten an weisungsgebundene Dienstleister ist straffrei, wenn diese ordnungsgemäß vertraglich verpflichtet wurden.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Strafbewehrte Pflicht zur Geheimhaltung</h4>
                      <p className="text-slate-500 text-xs mt-0.5">Unsere Mitarbeiter und etwaige Subunternehmer werden unter Strafandrohung direkt zur strengsten Verschwiegenheit verpflichtet.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-5 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Gesetzestext (Auszug)</span>
                <h3 className="text-lg font-bold text-slate-900 mb-4">§ 203 Abs. 3 Satz 2 StGB</h3>
                <blockquote className="text-slate-600 text-sm italic border-l-2 border-teal-500 pl-4 py-1 leading-relaxed mb-4">
                  „Die in den Absätzen 1 und 2 Genannten dürfen fremde Geheimnisse den Personen offenbaren, die an ihrer beruflichen oder dienstlichen Tätigkeit mitwirken, soweit dies für die Inanspruchnahme der Tätigkeit der mitwirkenden Personen erforderlich ist; [...]“
                </blockquote>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Damit schafft der Gesetzgeber die rechtliche Basis für die moderne, digitale Praxisorganisation und die Auslagerung von Kommunikationsprozessen an intelligente Assistenten.
                </p>
              </div>
            </div>
          </div>

          {/* Three Pillars Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Unsere Compliance-Säulen für Ihre Praxis</h2>
            <p className="text-slate-500 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
              Um Ihnen maximale Rechtssicherheit zu garantieren, kombinieren wir vertragliche, rechtliche und hochmoderne technische Schutzmaßnahmen zu einem unüberwindbaren Sicherheitsnetz.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Pillar 1 */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-md transition-all flex flex-col h-full">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. AV-Vertrag (DSGVO)</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Wir schließen mit Ihrer Praxis einen vollwertigen Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO ab. Dieser regelt lückenlos die Rechte und Pflichten bei der Verarbeitung personenbezogener Gesundheitsdaten.
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <CheckCircle2 size={14} className="stroke-[2.5]" />
                  <span>Automatisch bei Anmeldung</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-md transition-all flex flex-col h-full border-teal-500/40 ring-1 ring-teal-500/20 shadow-inner">
                <div className="w-12 h-12 bg-teal-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Scale size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. § 203 StGB Vereinbarung</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Als integraler Bestandteil des Onboardings erhalten Sie eine spezielle schriftliche Verpflichtungsvereinbarung nach § 203 StGB. Damit binden wir uns, unsere Erfüllungsgehilfen und Subunternehmer rechtlich an das Berufsgeheimnis.
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <CheckCircle2 size={14} className="stroke-[2.5]" />
                  <span>Zusätzliche strafrechtliche Haftung</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-md transition-all flex flex-col h-full">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <UserCheck size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Mitarbeiterverpflichtung</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Jeder einzelne Mitarbeiter unseres Hauses, der mit der Bereitstellung der Software oder des Service in Berührung kommen könnte, wird gesondert, schriftlich und persönlich auf die Einhaltung des § 203 StGB verpflichtet.
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <CheckCircle2 size={14} className="stroke-[2.5]" />
                  <span>Regelmäßige Audits & Schulungen</span>
                </div>
              </div>

            </div>
          </div>

          {/* Technical protection TOMs for medical data */}
          <div className="bg-teal-950 text-white rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden shadow-xl">
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5">
              <Shield size={320} />
            </div>
            
            <div className="relative z-10 max-w-4xl">
              <span className="text-[10px] font-black text-teal-300 uppercase tracking-widest block mb-2">Datensicherheit auf Klinikniveau</span>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Wie wir die Vertraulichkeit Ihrer Patientendaten technisch absichern</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-teal-100">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-900/50 flex items-center justify-center text-teal-300 shrink-0">
                    <Key size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Ende-zu-Ende-Verschlüsselung</h4>
                    <p className="text-teal-200/80 text-xs">Sämtliche Datenströme, Transkripte und Anrufaufzeichnungen werden beim Transport mit modernstem TLS 1.3 und bei der Speicherung mit AES-256 verschlüsselt.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-900/50 flex items-center justify-center text-teal-300 shrink-0">
                    <Server size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Serverstandort Deutschland (Frankfurt)</h4>
                    <p className="text-teal-200/80 text-xs">Unsere gesamte Infrastruktur wird ausschließlich in hochmodernen, ISO 27001 zertifizierten Rechenzentren in Frankfurt am Main gehostet. Keine Speicherung außerhalb Deutschlands.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-900/50 flex items-center justify-center text-teal-300 shrink-0">
                    <EyeOff size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Automatische Anonymisierung</h4>
                    <p className="text-teal-200/80 text-xs">Metadaten und Audioaufnahmen können auf Wunsch nach der Verarbeitung automatisch gelöscht, maskiert oder pseudonymisiert werden, um Datensparsamkeit zu garantieren.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-900/50 flex items-center justify-center text-teal-300 shrink-0">
                    <Lock size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Striktes Zero-Knowledge-Prinzip</h4>
                    <p className="text-teal-200/80 text-xs">Mitarbeiter von Auxilium Assist haben im Regelbetrieb keinerlei Zugriff auf Ihre individuellen Anrufinhalte oder Patientendaten, es sei denn, Sie erteilen eine explizite Supportfreigabe.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal FAQ */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Häufig gestellte Fragen zu § 203 StGB</h2>
            
            <div className="space-y-6">
              
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2 text-base md:text-lg">Muss ich als Arzt eine schriftliche § 203 StGB Vereinbarung abschließen?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  **Ja.** Gemäß § 203 Abs. 3 StGB ist der Abschluss einer solchen schriftlichen Verpflichtung rechtlich zwingend erforderlich, wenn Sie externe Helfer oder technische Dienstleister einbinden. Ohne diese schriftliche Verpflichtung riskieren Sie einen Verstoß gegen die Schweigepflicht. Wir stellen Ihnen diese Vereinbarung unkompliziert und digital zur Verfügung.
                </p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2 text-base md:text-lg">Welche strafrechtlichen Folgen hat ein Verstoß gegen die Vereinbarung für den Dienstleister?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Durch den Abschluss der Vereinbarung unterliegen unsere Mitarbeiter und Subunternehmer derselben strafrechtlichen Verantwortung wie Sie selbst. Im Falle eines unbefugten Offenbarens droht eine Freiheitsstrafe von bis zu einem Jahr oder eine Geldstrafe. Dies garantiert Ihnen höchste Sorgfalt und Verantwortungsbewusstsein unsererseits.
                </p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2 text-base md:text-lg">Werden die Gespräche für KI-Training verwendet?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  **Nein.** Ihre Patientengespräche und Transkripte werden unter keinen Umständen für das Training öffentlicher KI-Modelle verwendet. Die Daten verbleiben in einer isolierten, geschützten Umgebung ausschließlich für die Nutzung und Terminverwaltung Ihrer eigenen Praxis.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      <CTASection />
    </div>
  );
};
