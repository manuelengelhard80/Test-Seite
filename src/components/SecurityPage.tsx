import React from 'react';
import { ArrowLeft, ShieldCheck, Server, Lock, FileText, CheckCircle2, Database, Key, EyeOff, Trash2, Layers, Globe, FileCheck } from 'lucide-react';
import { CTASection } from './CTASection';

interface SecurityPageProps {
  onBack: () => void;
}

export const SecurityPage: React.FC<SecurityPageProps> = ({ onBack }) => {
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
            <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-1.5 shadow-sm mb-6 border border-emerald-100">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Datenschutz & AVV</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Sicherheit nach <br/>
              <span className="text-gradient">höchsten medizinischen Standards.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
              Wir verarbeiten sensible Gesundheitsdaten. Deshalb gehen unsere Sicherheitsmaßnahmen weit über die gesetzlichen Anforderungen der DSGVO hinaus. Transparenz und Rechtssicherheit für Ihre Praxis stehen an erster Stelle.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* AVV Core Info */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-16">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                <FileCheck size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Der Auftragsverarbeitungsvertrag (AVV)</h2>
                <p className="text-slate-600">
                  Nach Art. 28 DSGVO sind wir Ihr weisungsgebundener Auftragsverarbeiter. Der AVV wird direkt bei Buchung digital geschlossen und regelt alle Rechte und Pflichten.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Database size={18} className="text-slate-400" /> Gegenstand & Dauer
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <span><strong>Gegenstand:</strong> Bereitstellung eines KI-basierten Telefonassistenten zur Anrufannahme und Terminverwaltung.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <span><strong>Dauer:</strong> Der Vertrag gilt für die Laufzeit des Hauptvertrages und endet automatisch mit dessen Kündigung.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layers size={18} className="text-slate-400" /> Art & Betroffene
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <span><strong>Datenarten:</strong> Audiodaten, Transkripte, Kontaktdaten, Termin-Metadaten, Gesundheitsdaten (Art. 9 DSGVO).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <span><strong>Betroffene:</strong> Patienten der Praxis, Anrufer, Mitarbeiter der Praxis.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* TOMs Grid (The "Points") */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Technische und Organisatorische Maßnahmen (TOMs)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Lock size={20} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-sm">Zutrittskontrolle</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Kein unbefugter physischer Zutritt. Hosting in ISO 27001 zertifizierten High-Security Rechenzentren in Frankfurt (Videoüberwachung, Biometrie).
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Key size={20} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-sm">Zugangskontrolle</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Keine unbefugte Systemnutzung. Strenge Passwort-Policies, 2-Faktor-Authentifizierung (2FA) für alle administrativen Zugriffe.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <EyeOff size={20} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-sm">Zugriffskontrolle</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Zugriff nur auf notwendige Daten. Rollenbasierte Berechtigungskonzepte (RBAC), Protokollierung aller Datenzugriffe.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText size={20} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-sm">Weitergabekontrolle</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Verschlüsselung bei Transport (TLS 1.3) und Speicherung (AES-256). Keine Weitergabe an Dritte ohne Weisung.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Server size={20} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-sm">Eingabekontrolle</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Lückenlose Nachvollziehbarkeit. Audit-Logs speichern wer wann welche Daten verändert oder eingesehen hat.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <FileCheck size={20} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-sm">Auftragskontrolle</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Strenge Auswahl von Subunternehmern. Regelmäßige Überprüfung auf Datenschutzniveau.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Database size={20} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-sm">Verfügbarkeitskontrolle</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Schutz gegen Zerstörung/Verlust. Tägliche verschlüsselte Backups, redundante Server-Infrastruktur.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Layers size={20} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-sm">Trennungsgebot</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Logische Trennung der Daten verschiedener Mandanten (Praxen). Getrennte Datenbanken/Schemas.
                </p>
              </div>

            </div>
          </div>

          {/* Infrastructure */}
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
             
             <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
               <div className="flex-1">
                 <div className="inline-flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1 mb-6 border border-slate-700">
                    <Globe size={14} className="text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wide text-emerald-400">Infrastruktur</span>
                 </div>
                 <h2 className="text-3xl font-bold mb-4">Datenstandort Deutschland</h2>
                 <p className="text-slate-300 leading-relaxed mb-6">
                   Wir hosten unsere Dienste ausschließlich in Frankfurt am Main (Hetzner Online GmbH / AWS Europe). Diese Rechenzentren sind nach ISO/IEC 27001 zertifiziert und unterliegen deutschem Recht. Es findet kein Datentransfer in unsichere Drittstaaten statt.
                 </p>
                 <div className="flex flex-wrap gap-4">
                   <div className="flex items-center gap-2 text-sm font-medium text-slate-200 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                     <CheckCircle2 size={16} className="text-primary" /> ISO 27001
                   </div>
                   <div className="flex items-center gap-2 text-sm font-medium text-slate-200 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                     <CheckCircle2 size={16} className="text-primary" /> DSGVO-konform
                   </div>
                   <div className="flex items-center gap-2 text-sm font-medium text-slate-200 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                     <CheckCircle2 size={16} className="text-primary" /> § 203 StGB konform
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white bg-[#13a09e]/15 px-4 py-2 rounded-lg border border-[#13a09e]/30">
                      EU AI Act konform
                   </div>
                 </div>
               </div>
               
               <div className="w-full lg:w-1/3 bg-slate-800 p-6 rounded-2xl border border-slate-700">
                 <h4 className="font-bold mb-4 flex items-center gap-2">
                   <Trash2 size={18} className="text-rose-400" /> Löschkonzept
                 </h4>
                 <ul className="space-y-3 text-sm text-slate-400">
                   <li className="flex items-start gap-2">
                     <span className="text-rose-400 font-bold">•</span>
                     <span>Audio-Rohdaten: Sofort nach Transkription löschbar.</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-rose-400 font-bold">•</span>
                     <span>Transkripte: Automatische Löschung nach Sync ins PVS (z.B. nach 24h).</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-rose-400 font-bold">•</span>
                     <span>Backups: Rotierende Löschung nach 14 Tagen.</span>
                   </li>
                 </ul>
               </div>
             </div>
          </div>

        </div>
      </section>

      <CTASection />
    </div>
  );
};