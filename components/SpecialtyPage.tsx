import React from 'react';
import { CheckCircle2, ArrowLeft, Phone, Clock, Shield, Users } from 'lucide-react';
import { CTASection } from './CTASection';

interface SpecialtyData {
  title: string;
  intro: string;
  painPoints: string[];
  solution: string;
  benefits: string[];
  seoText: string;
}

const specialtyContent: Record<string, SpecialtyData> = {
  allgemeinmedizin: {
    title: "KI-Telefonassistent für die Hausarztpraxis",
    intro: "Entlastung für die primäre Versorgung: Wie Sie dem hohen Patientenaufkommen in der Allgemeinmedizin mit KI begegnen.",
    painPoints: [
      "Überlastete Telefonleitungen besonders am Montagmorgen",
      "Ständige Unterbrechungen durch Rezeptwünsche",
      "Hoher Verwaltungsaufwand bei Überweisungen",
      "Personalmangel am Empfang"
    ],
    solution: "Der Auxilium KI-Assistent übernimmt Routineanfragen wie Rezeptbestellungen und Terminvereinbarungen für Akutsprechstunden vollständig autonom. Er erkennt Dringlichkeiten und filtert Notfälle heraus.",
    benefits: [
      "Automatische Rezeptaufnahme (PZN-genau)",
      "Intelligente Triage für Akut-Termine",
      "Entlastung bei Krankmeldungs-Anfragen",
      "Mehr Zeit für komplexe Patientengespräche"
    ],
    seoText: "In der Allgemeinmedizin ist das Telefon oft der größte Stressfaktor. Ein KI-Telefonassistent für Hausärzte revolutioniert den Praxisablauf, indem er als erster Ansprechpartner fungiert. Er nimmt Rezeptwünsche strukturiert auf, prüft Verfügbarkeiten für die Sprechstunde und entlastet Ihre MFA spürbar. So bleibt Ihre Praxis erreichbar, auch wenn das Wartezimmer voll ist."
  },
  zahnmedizin: {
    title: "KI-Lösungen für Zahnarztpraxen & Kieferorthopädie",
    intro: "Kein Bohren im Terminkalender: Optimieren Sie Ihr Terminmanagement und den Recall-Service.",
    painPoints: [
      "Terminausfälle und Lücken im Kalender",
      "Zeitaufwendige Recall-Telefonate",
      "Schmerzpatienten, die nicht durchkommen",
      "Erklärungsbedarf bei Prophylaxe-Terminen"
    ],
    solution: "Auxilium füllt Lücken im Kalender proaktiv und managt Schmerzpatienten durch gezielte Abfragen. Der Assistent erinnert an PZR-Termine und managt Verschiebungen autonom.",
    benefits: [
      "Lückenlose Kalender-Auslastung",
      "Automatischer Recall für Prophylaxe",
      "Spezifische Schmerz-Anamnese am Telefon",
      "24/7 Erreichbarkeit für Angstpatienten"
    ],
    seoText: "Für Zahnärzte ist ein voller, gut getakteter Terminkalender essenziell. Ein KI-Telefonassistent für Zahnmedizin übernimmt nicht nur die Terminvergabe, sondern fungiert als intelligentes Recall-System. Patienten können rund um die Uhr Termine für die Professionelle Zahnreinigung (PZR) oder Kontrollen vereinbaren, ohne den Behandlungsablauf am Stuhl zu stören."
  },
  dermatologie: {
    title: "Digitale Assistenz für Dermatologen",
    intro: "Hautnah am Patienten statt am Hörer: Effizientes Management von Screening-Terminen und Akutfällen.",
    painPoints: [
      "Extrem hohes Anrufaufkommen für Termine",
      "Lange Vorlaufzeiten führen zu Frust",
      "Unnötige Anrufe für reine Befundabfragen",
      "Differenzierung kosmetisch vs. medizinisch"
    ],
    solution: "Die KI unterscheidet vorab zwischen Hautkrebsscreening, OP-Terminen und Akutfällen. Sie kann Patienten gezielt auf Online-Services oder offene Sprechstunden hinweisen.",
    benefits: [
      "Vorab-Qualifizierung des Besuchsgrunds",
      "Hinweis auf IGeL-Leistungen bei Wartezeit",
      "Befundauskunft nach Authentifizierung",
      "Management der Warteliste"
    ],
    seoText: "Dermatologische Praxen kämpfen oft mit einer Flut an Terminanfragen. Der KI-Telefonassistent für Hautärzte schafft Abhilfe, indem er Anrufe kategorisiert. Er kann Dringlichkeiten einschätzen und Patienten mit langfristigen Anliegen wie Hautscreenings direkt in die passenden Kalenderslots buchen, während Akutpatienten gesondert behandelt werden."
  },
  orthopaedie: {
    title: "KI-Support für Orthopädie & Unfallchirurgie",
    intro: "Rückenwind für Ihr Praxisteam: MRT-Befunde, OP-Termine und Schmerzpatienten effizient steuern.",
    painPoints: [
      "Komplexe Terminkoordination (Röntgen/MRT)",
      "Viele Rückfragen zu Befunden",
      "Hohes Aufkommen von Schmerzpatienten",
      "Abstimmung von OP-Vorbereitungen"
    ],
    solution: "Auxilium hilft bei der Steuerung von Schmerzpatienten und koordiniert Folgetermine zur Befundbesprechung. Die KI kann Patienten an das Mitbringen von Vorbefunden erinnern.",
    benefits: [
      "Checklisten-Abfrage (Bilder/Befunde)",
      "Priorisierung von Unfall-Patienten",
      "Automatische Terminerinnerung",
      "Weniger Unterbrechungen im Behandlungszimmer"
    ],
    seoText: "In der Orthopädie ist die Vorbereitung des Termins entscheidend. Ein KI-Telefonassistent fragt gezielt nach vorhandenen MRT- oder Röntgenbildern und stellt sicher, dass der Patient alles Nötige zum Termin mitbringt. Dies verkürzt Leerläufe und optimiert die Taktung in Ihrer orthopädischen Praxis."
  },
  gynaekologie: {
    title: "Smarte Telefonie für Frauenärzte",
    intro: "Sensibles Management für Ihre Gynäkologie-Praxis: Von der Vorsorge bis zur Schwangerschaftsbetreuung.",
    painPoints: [
      "Planungsunsicherheit bei Akutfällen",
      "Häufige Rezeptwünsche (Pille, etc.)",
      "Beratungsintensive Terminvereinbarung",
      "Hohe emotionale Erwartungshaltung"
    ],
    solution: "Die KI geht diskret und einfühlsam auf Anruferinnen ein. Sie managt Vorsorgetermine langfristig und schafft kurzfristig Raum für Notfälle oder Schwangerschaftsbeschwerden.",
    benefits: [
      "Diskretion und Einfühlsamkeit",
      "Schnelle Rezeptbestellung",
      "Schwangerschafts-Terminplanung",
      "Erinnerung an Krebsvorsorge"
    ],
    seoText: "Der KI-Telefonassistent für Gynäkologen ist auf Sensibilität trainiert. Er ermöglicht Patientinnen, diskret Folgerezeptwünsche zu äußern oder Termine zur Vorsorge zu vereinbaren, ohne im Wartezimmer Details nennen zu müssen. Für das Praxisteam bedeutet dies eine enorme Entlastung und mehr Ruhe für die Betreuung schwangerer Patientinnen vor Ort."
  },
  kinderheilkunde: {
    title: "KI-Entlastung für Kinder- und Jugendärzte",
    intro: "Mehr Zeit für die Kleinen: Management von Infektwellen, U-Untersuchungen und Impfterminen.",
    painPoints: [
      "Saisonale Anrufwellen (Infekte)",
      "Komplexe Planung der U-Untersuchungen",
      "Besorgte Eltern am Telefon",
      "Attest-Anfragen für Schulen/Kitas"
    ],
    solution: "Auxilium fängt Stoßzeiten während Infektwellen ab, nimmt Attest-Wünsche auf und plant U-Untersuchungen unter Berücksichtigung der Fristen.",
    benefits: [
      "Abfangen von Anrufspitzen",
      "Management von U-Untersuchungen",
      "Automatische Attest-Aufnahme",
      "Triage bei Fieber/Notfällen"
    ],
    seoText: "Pädiater kennen das Chaos während der Grippesaison. Ein KI-Telefonassistent für Kinderärzte ist der Fels in der Brandung. Er nimmt hunderte Anrufe gleichzeitig entgegen, beruhigt Eltern und filtert echte Notfälle heraus. Routineaufgaben wie Impftermine oder Schulbescheinigungen werden vollautomatisch abgewickelt."
  },
  augenheilkunde: {
    title: "Klare Sicht am Empfang: KI für Augenärzte",
    intro: "Fokus auf Diagnostik statt Telefonie: Sehschulen, Kontrollen und Notfälle effizient trennen.",
    painPoints: [
      "Lange Wartezeiten am Telefon",
      "Unterscheidung Notfall vs. Routine",
      "Terminierung von Tropf-Untersuchungen",
      "Koordination mit Sehschule"
    ],
    solution: "Die KI fragt gezielt Symptome ab (Blitze, Schatten, Rötung) um die Dringlichkeit zu bestimmen und plant Routinekontrollen effizient in den Kalender ein.",
    benefits: [
      "Symptom-basierte Triage",
      "Terminierung der Sehschule",
      "Hinweis auf Fahruntüchtigkeit (Tropfen)",
      "Reduktion der Warteschleife"
    ],
    seoText: "In der Ophthalmologie ist die Triage entscheidend. Der KI-Telefonassistent für Augenärzte erkennt anhand von Schlüsselwörtern wie 'Blitze sehen' oder 'plötzlicher Sehverlust' Notfälle und leitet diese priorisiert weiter. Routine-Sehtests werden hingegen vollautomatisch im Kalender platziert."
  },
  neurologie: {
    title: "KI-Assistenz für Neurologie & Psychiatrie",
    intro: "Ruhe bewahren und Struktur schaffen: Management komplexer Terminvergaben und Medikamente.",
    painPoints: [
      "Sehr lange Wartezeiten auf Termine",
      "Kommunikativ anspruchsvolle Patienten",
      "Komplexe medikamentöse Einstellungen",
      "Häufige Befundanfragen"
    ],
    solution: "Auxilium bietet eine ruhige, strukturierte Gesprächsführung. Es managt Wartelisten effizient und nimmt Rezeptwünsche für Dauermedikation präzise auf.",
    benefits: [
      "Management der Warteliste",
      "Ruhige Gesprächsführung",
      "Präzise Medikamenten-Erfassung",
      "Entlastung bei Befundrückfragen"
    ],
    seoText: "Neurologische Praxen profitieren besonders von der 24/7 Erreichbarkeit. Ein KI-Telefonassistent nimmt den Druck von der Leitung, indem er Patienten ermöglicht, Rezeptwünsche oder Terminabsagen jederzeit zu hinterlassen. Die KI sorgt für eine strukturierte Vorbereitung des Arzt-Patienten-Kontakts."
  },
  hno: {
    title: "KI für Hals-Nasen-Ohren-Heilkunde",
    intro: "Hörbar besser organisiert: Infektsprechstunden und Hörtests optimal takten.",
    painPoints: [
      "Saisonale Spitzen (Allergie/Grippe)",
      "Terminierung von Hörtests (Raumbelegung)",
      "Akute Schmerzpatienten",
      "Hyposensibilisierungs-Termine"
    ],
    solution: "Die KI koordiniert Raumbelegungen für Audiometrie und plant Allergie-Behandlungen in Serie. Akute Schmerzen werden priorisiert.",
    benefits: [
      "Koordination Audiometrie-Räume",
      "Planung von Allergie-Serien",
      "Triage bei akuten Schmerzen",
      "Effizientes Infektmanagement"
    ],
    seoText: "Der HNO-Arzt benötigt eine präzise Taktung. Der KI-Telefonassistent plant Termine so, dass Ressourcen wie Hörkabinen optimal ausgelastet sind. Bei Allergie-Patienten bucht die KI selbstständig Folgetermine für Hyposensibilisierungen, ohne dass das Personal eingreifen muss."
  },
  kardiologie: {
    title: "Herzstück der Praxisorganisation: KI für Kardiologen",
    intro: "Taktung statt Stress: LZ-EKG, Belastungs-Untersuchungen und Kontrollen smart verwalten.",
    painPoints: [
      "Geräte-Abhängigkeit bei Terminen",
      "Ängstliche Patienten mit Herzbeschwerden",
      "Aufwendige Vorbereitungs-Infos",
      "Überweisungs-Management"
    ],
    solution: "Auxilium prüft bei der Terminvergabe die Verfügbarkeit von Geräten (Echo, EKG) und gibt Patienten wichtige Vorab-Infos (Nüchternheit, Kleidung).",
    benefits: [
      "Geräte-basierte Terminplanung",
      "Beruhigende Ansprache",
      "Info-Weitergabe an Patienten",
      "Recall für Herzschrittmacher-Kontrolle"
    ],
    seoText: "Kardiologische Praxen sind stark geräteabhängig. Ein KI-Telefonassistent berücksichtigt bei der Buchung nicht nur die Zeit des Arztes, sondern auch die Verfügbarkeit von Funktionsräumen. Zudem erkennt die KI Warnsignale bei Anrufern und kann im Zweifel direkt an den Notruf oder die Akut-Nummer verweisen."
  },
  psychotherapie: {
    title: "Diskretion & Erreichbarkeit für Psychotherapeuten",
    intro: "Der sichere Anrufbeantworter war gestern: Intelligentes Management für Ihre Praxis.",
    painPoints: [
      "Keine Erreichbarkeit während Sitzungen",
      "Hemmschwelle der Patienten",
      "Koordination von Erstgesprächen",
      "Wartelisten-Verwaltung"
    ],
    solution: "Die KI nimmt Anrufe entgegen, wenn Sie in der Sitzung sind. Sie klärt den Status (Bestandspatient vs. Neupatient) und managt die Warteliste für Erstgespräche.",
    benefits: [
      "100% Erreichbarkeit ohne Störung",
      "Niedrigschwelliger Zugang",
      "Wartelisten-Management",
      "Datenschutzkonforme Kommunikation"
    ],
    seoText: "Für Psychotherapeuten ist die persönliche Erreichbarkeit oft unmöglich. Ein KI-Telefonassistent ersetzt den klassischen Anrufbeantworter durch Dialog. Er kann klären, ob es sich um eine Krise handelt, Termine bestätigen oder Patienten auf die Warteliste setzen – alles unter strengster Einhaltung der Schweigepflicht."
  },
  urologie: {
    title: "KI-Lösungen für die Urologie",
    intro: "Effizienz mit Fingerspitzengefühl: Vorsorge, Akutfälle und Labortermine optimal planen.",
    painPoints: [
      "Scham behaftete Themen",
      "Hohes Aufkommen an Vorsorge-Terminen",
      "Notfälle (Nierenkolik)",
      "Labor-Koordination"
    ],
    solution: "Auxilium ermöglicht eine schamfreie Kommunikation. Männer können Vorsorgetermine einfach per Sprachbefehl buchen. Notfälle wie Koliken werden sofort erkannt.",
    benefits: [
      "Neutrale, diskrete Kommunikation",
      "Priorisierung von Schmerzfällen",
      "Recall für Krebsvorsorge",
      "Labor-Terminierung"
    ],
    seoText: "In der Urologie senkt ein KI-Telefonassistent die Hemmschwelle zur Kontaktaufnahme. Patienten können Termine für die Vasektomie-Beratung oder Krebsvorsorge vereinbaren, ohne dies am Empfangstresen diskutieren zu müssen. Das System sorgt für Diskretion und eine optimale Auslastung der Sprechstunde."
  }
};

interface SpecialtyPageProps {
  specialtyId: string;
  onBack: () => void;
}

export const SpecialtyPage: React.FC<SpecialtyPageProps> = ({ specialtyId, onBack }) => {
  const data = specialtyContent[specialtyId] || specialtyContent['allgemeinmedizin'];

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-white pb-20 pt-10 border-b border-slate-100">
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
              <span className="text-xs font-bold text-primary-dark uppercase tracking-wide">Branchenlösung</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {data.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
              {data.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Pain Points & Solution */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <Phone size={18} />
                </span>
                Herausforderungen im Alltag
              </h2>
              <ul className="space-y-4 mb-12">
                {data.painPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                    <span className="text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary-light text-primary-dark flex items-center justify-center">
                  <Shield size={18} />
                </span>
                Die Auxilium Lösung
              </h2>
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-glass">
                <p className="text-lg text-slate-600 leading-relaxed">
                  {data.solution}
                </p>
              </div>
            </div>

            {/* Right: Benefits & SEO Text */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 size={18} />
                  </span>
                  Ihre Vorteile
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span className="text-sm font-semibold text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO Content Block */}
              <div className="bg-slate-100 p-8 rounded-3xl">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users size={20} className="text-slate-400" />
                  Warum KI in der {data.title.split('für ')[1] || 'Praxis'}?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {data.seoText}
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-4 mb-2">
                   <Clock className="text-blue-500" size={24} />
                   <h4 className="font-bold text-blue-900">24/7 Erreichbarkeit</h4>
                </div>
                <p className="text-sm text-blue-700">
                  Ihre Patienten können jederzeit anrufen – auch am Wochenende oder nachts. Der Assistent nimmt Anliegen entgegen und bereitet sie für den nächsten Arbeitstag vor.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Reused CTA Section */}
      <CTASection />
    </div>
  );
};
