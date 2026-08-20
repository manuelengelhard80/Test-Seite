import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  PhoneCall, 
  CalendarCheck2, 
  Activity, 
  Mail, 
  Calendar, 
  Clock, 
  HelpCircle, 
  Download, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  User, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import manuelPhoto from '../assets/manuel-engelhard.png';

interface ThankYouPageProps {
  productType: 'voice' | 'assist' | 'pulse';
  onBack: () => void;
  onNavigateHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ productType, onBack, onNavigateHome }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showPhoneNum, setShowPhoneNum] = useState(false);

  useEffect(() => {
    // Exclude thank-you pages from Google / Search Engine Indexing
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const productDetails = {
    voice: {
      name: 'Auxilium Voice',
      tagline: 'Ihr empathischer, intelligenter KI-Telefonassistent für 24/7 Erreichbarkeit.',
      icon: <PhoneCall className="text-[#0D9488]" size={36} strokeWidth={1.5} />,
      colorClass: 'text-emerald-600',
      price: '199 € / Monat',
      steps: [
        {
          title: 'E-Mail Bestätigung erhalten',
          desc: 'Ihr Lizenzschlüssel sowie Ihr Onboarding-Guide im PDF-Format wurden an Ihren Posteingang gesendet.'
        },
        {
          title: 'Einrichtungs-Gespräch (telefonisch)',
          desc: 'Unser Support kontaktiert Sie oder Sie buchen unten direkt Ihren Wunschtermin. Wir klären Praxis-FAQs und wählen die KI-Stimme (männlich/weiblich) aus.'
        },
        {
          title: 'Praxis-FAQ-Datenbank füllen',
          desc: 'Über ein intuitives Datenblatt hinterlegen Sie Antworten auf Standardfragen (z.B. Sprechzeiten, Parkplätze, Rezepte).'
        },
        {
          title: 'Testrufnummer & Live-Schaltung',
          desc: 'Sie erhalten eine Testnummer zur Freigabe. Nach Ihrer Freigabe leiten Sie einfach Ihre Überlauf-Anrufe auf Auxilium um.'
        }
      ],
      faqs: [
        {
          q: 'Wie richte ich die Rufumleitung ein?',
          a: 'Die Einrichtung ist denkbar einfach und dauert weniger als 2 Minuten. Sie erhalten von uns einen einfachen Aktivierungscode (z.B. **61*Testnummer# für Telekom-Anschlüsse**), den Sie auf Ihrem Praxistelefon eingeben. Schon leitet Ihre Telefonanlage überlaufende Anrufe weiter.'
        },
        {
          q: 'Können die KI-Stimmen angepasst werden?',
          a: 'Ja! Bei Auxilium Voice können wir zwischen verschiedenen stimmlichen Klangfarben (warm, empathisch, professionell-sachlich) und Geschlechtern wählen, damit die Stimme exakt zur Philosophie Ihrer Arztpraxis passt.'
        },
        {
          q: 'Besteht ein Einrichtungs-Support?',
          a: 'Selbstverständlich. In Ihrem Paket ist ein kostenloser, 30-minütiger Einrichtungs-Schritt-für-Schritt-Call mit einem unserer Techniker enthalten.'
        }
      ]
    },
    assist: {
      name: 'Auxilium Assist',
      tagline: 'Die vollautomatische Terminvergabe und Lückensuche direkt in Ihrer Praxissoftware.',
      icon: <CalendarCheck2 className="text-[#0D9488]" size={36} strokeWidth={1.5} />,
      colorClass: 'text-teal-600',
      price: '349 € / Monat',
      steps: [
        {
          title: 'API & Software-Prüfung',
          desc: 'In Kürze erhalten Sie die Bestätigung und den Zugangslink für unser Integrationsmodul passend zu Ihrer Praxissoftware.'
        },
        {
          title: 'Kalender-Anbindung',
          desc: 'Im gemeinsamen Setup-Call verbinden wir Ihren Praxiskalender mit Auxilium. Die KI lernt Ihre Terminarten (z.B. Erstvorstellung, Kontrolle, Akut) kennen.'
        },
        {
          title: 'SMS-Bestätigungen konfigurieren',
          desc: 'Wir passen die SMS-Terminbestätigungen an (z.B. Hinweis auf das Mitbringen der Versichertenkarte).'
        },
        {
          title: 'Aktivierung der Termin-KI',
          desc: 'Sobald kalibriert, vermittelt die KI am Telefon selbstständig freie Termine, sendet Absagen in Ihr System zurück und füllt Lücken im Rekordtempo.'
        }
      ],
      faqs: [
        {
          q: 'Welche Praxissoftware-Systeme werden unterstützt?',
          a: 'Auxilium Assist unterstützt alle führenden Praxis- und Kalendersysteme wie CGM (Albis, M1, Turbomed), medatixx, docly, terminland, doctolib, x.isynet und viele mehr. Im Setup-Call wählen wir Ihre spezifische Schnittstelle aus.'
        },
        {
          q: 'Wie funktioniert die Lückensuche?',
          a: 'Die KI scannt in Echtzeit Ihren Praxiskalender anhand strenger Vorgaben (z.B. max. 2 Neupatienten pro Vormittag) nach freien Zeiten. Bricht ein Patient telefonisch ab, wird die Lücke augenblicklich wieder freigegeben.'
        },
        {
          q: 'Erhalten Patienten Spam?',
          a: 'Nein, keineswegs! SMS-Nachrichten werden ausschließlich zur echten und sicheren Terminbestätigung oder bei wichtigen Absagen gesendet. Das schafft maximales Patientenvertrauen.'
        }
      ]
    },
    pulse: {
      name: 'Auxilium Pulse',
      tagline: 'Ihre medizinische Rundum-Prozessautomatisierung für maximale Entlastung und Recall-Abläufe.',
      icon: <Activity className="text-[#0D9488] animate-pulse" size={36} strokeWidth={1.5} />,
      colorClass: 'text-indigo-600',
      price: '499 € / Monat',
      steps: [
        {
          title: 'Systemanalyse & Kickoff-Meeting',
          desc: 'Wir prüfen Ihre individuellen Prozessabläufe (Recall-Zyklen, Befundübermittlungen) im Detail.'
        },
        {
          title: 'API-Maßschneiderung',
          desc: 'Unsere Entwickler stimmen die automatischen Schnittstellen ab, damit Datenströme zwischen Telefonie, E-Mail und Praxissoftware fehlerfrei synchronisiert werden.'
        },
        {
          title: 'Automatischer Recall-Service einrichten',
          desc: 'Die KI wird mit Ihren Recall-Listen gefüttert (z.B. Diabetiker-Vorsorge, Zahnreinigung) und ruft Patienten vollautomatisch, aber extrem charmant zur Terminvereinbarung an.'
        },
        {
          title: 'Schnittstellentests & Go-Live',
          desc: 'Nach ausgiebigen Simulationstests geht Ihre Pulse-Automatisierung live und sorgt für einen permanenten, volloptimierten Praxis-Ablauf im Hintergrund.'
        }
      ],
      faqs: [
        {
          q: 'Wie funktioniert der automatische Recall-Service?',
          a: 'Pulse generiert ausgehende Anrufe (Outbounding) basierend auf Ihren Praxisvorgaben. Der Assistent ruft Patienten an, deren Vorsorge ansteht, bespricht empathisch die Notwendigkeit und trägt den vereinbarten Termin direkt in Ihr System ein.'
        },
        {
          q: 'Ist diese tiefe Anbindung datenschutzkonform?',
          a: 'Absolut. Auxilium Pulse nutzt eine Ende-zu-Ende verschlüsselte Schnittstelle. Alle Patientendaten verbleiben lokal in Ihrem System oder auf DSGVO-konformen deutschen Servern. Es findet kein unautorisierter Abfluss statt.'
        },
        {
          q: 'Wie flexibel kann ich Prozesse ändern?',
          a: 'Sie haben einen persönlichen Key-Account-Manager an Ihrer Seite. Änderungen an Ihren Automatisierungs-Logiken können jederzeit und innerhalb weniger Stunden kostenfrei eingepflegt werden.'
        }
      ]
    }
  };

  const currentDetails = productDetails[productType];

  const prices = {
    voice: {
      original: '999,00 €',
      discounted: '797,00 €',
      vat: '151,43 €',
      total: '948,43 €'
    },
    assist: {
      original: '1.999,00 €',
      discounted: '1.497,00 €',
      vat: '284,43 €',
      total: '1.781,43 €'
    },
    pulse: {
      original: '2.999,00 €',
      discounted: '1.997,00 €',
      vat: '379,43 €',
      total: '2.376,43 €'
    }
  };
  const currentPrice = prices[productType];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDay && selectedTime) {
      setBookingConfirmed(true);
    }
  };

  const getDayLabel = (dayKey: string) => {
    switch(dayKey) {
      case 'day1': return 'Morgen (' + new Date(Date.now() + 86400000).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' }) + ')';
      case 'day2': return 'Übermorgen (' + new Date(Date.now() + 172800000).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' }) + ')';
      case 'day3': return 'Nächster Werktag (' + new Date(Date.now() + 259200000).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' }) + ')';
      default: return '';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-36 lg:pt-44 pb-20">
      
      {/* Visual background decorations */}
      <div className="absolute top-0 left-0 right-0 h-[350px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-500 hover:text-primary mb-6 text-sm font-medium transition-colors"
          id="thank-you-back-btn"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Zurück
        </button>

        {/* Celebration Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full border border-emerald-100 shadow-md mb-6 relative">
            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-15" />
            <CheckCircle2 size={44} className="text-emerald-500 relative z-10" />
          </div>
          
          <span className="block text-emerald-600 font-bold tracking-wider text-xs uppercase mb-2">Zahlung erfolgreich abgeschlossen</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Herzlichen Dank für Ihre Bestellung!
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Ihr Erwerb von <strong className="text-slate-900">{currentDetails.name}</strong> wurde erfolgreich verarbeitet. Wir freuen uns darauf, Ihre Praxis spürbar zu entlasten.
          </p>
        </div>

        {/* Responsive Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: Onboarding Timeline & Booking Call - Span 2 */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            
            {/* Steps Timeline Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8" id="onboarding-steps-card">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>Wie es jetzt weitergeht</span>
              </h2>
              <p className="text-sm text-slate-500 mb-8 font-normal">
                Ihr schneller Weg zur vollkommenen Entlastung. Unser Onboarding-Prozess im Überblick:
              </p>

              <div className="relative border-l-2 border-slate-100 pl-6 ml-4 space-y-8">
                {/* Step 1 */}
                <div className="relative group">
                  <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    1
                  </div>
                  <div className="pl-2">
                    <h3 className="font-bold text-slate-900 block text-base group-hover:text-primary transition-colors">
                      Seite als Lesezeichen speichern
                    </h3>
                    <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                      Sichern Sie sich diese Bestätigungsseite in Ihrem Browser (z. B. mit <kbd className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold text-slate-700">Strg + D</kbd> oder dem Stern-Symbol oben rechts), um Ihre Bestelldaten und den direkten Support-Zugang jederzeit schnell griffbereit zu haben.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group">
                  <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    2
                  </div>
                  <div className="pl-2">
                    <h3 className="font-bold text-slate-900 block text-base group-hover:text-primary transition-colors">
                      Onboarding-Guide (PDF) laden &amp; befolgen
                    </h3>
                    <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                      Laden Sie sich den bebilderten Onboarding-Guide herunter und gehen Sie die einfachen Schritte zur optimalen Vorbereitung Ihrer Telefonassistenz durch.
                    </p>
                    <div className="mt-3">
                      <button 
                        onClick={(e) => { e.preventDefault(); alert('Ihr Onboarding PDF-Dokument wird in Kürze generiert und an Sie versendet.'); }}
                        className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200 shadow-sm"
                      >
                        <Download size={14} className="text-slate-500" />
                        <span>Onboarding-Guide (PDF) jetzt laden</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group">
                  <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    3
                  </div>
                  <div className="pl-2">
                    <h3 className="font-bold text-slate-900 block text-base group-hover:text-primary transition-colors">
                      Onboarding-Call vereinbaren
                    </h3>
                    <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                      Buchen Sie gleich im Anschluss unten Ihren persönlichen Onboarding-Termin, damit wir Ihre Telefonassistenz in nur 15 Minuten gemeinsam mit unserem Praxistechniker freischalten können.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Interactive Booking Slot Selector */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8" id="appointment-booking-card">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Calendar className="text-primary" size={22} />
                <span>Onboarding-Call vereinbaren</span>
              </h2>
              <p className="text-sm text-slate-500 mb-6 font-normal">
                Wählen Sie direkt Ihren Wunschtermin, um die Einrichtung gemeinsam mit unserem Praxistechniker in maximal 15 Minuten durchzuführen.
              </p>

              {bookingConfirmed ? (
                <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-6 text-center animate-fade-in">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full text-emerald-600 mb-3">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900 mb-1">Termin erfolgreich reserviert!</h3>
                  <p className="text-sm text-emerald-700 max-w-md mx-auto">
                    Wir rufen Sie am <strong>{getDayLabel(selectedDay || '')}</strong> um <strong>{selectedTime} Uhr</strong> auf Ihrer hinterlegten Praxisnummer an. Eine Bestätigung wurde auch per E-Mail versendet.
                  </p>
                  <button 
                    onClick={() => setBookingConfirmed(false)}
                    className="mt-4 text-xs font-medium text-primary hover:underline"
                  >
                    Termin ändern
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookSession} className="space-y-6">
                  {/* Step A: Choose Day */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      1. Tag auswählen
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['day1', 'day2', 'day3'].map((dayKey) => (
                        <button
                          key={dayKey}
                          type="button"
                          onClick={() => setSelectedDay(dayKey)}
                          className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                            selectedDay === dayKey
                              ? 'border-primary bg-primary-light/40 text-primary-dark font-semibold shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                          }`}
                        >
                          <div className="text-xs text-slate-400 font-normal">Verfügbar</div>
                          <div className="text-sm truncate mt-0.5">{getDayLabel(dayKey)}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step B: Choose Time */}
                  {selectedDay && (
                    <div className="animate-fade-in">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                        2. Uhrzeit auswählen (Dauer: 15min)
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {['08:30', '09:00', '10:15', '11:00', '13:30', '14:45', '15:15', '16:00'].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-1 text-center text-xs rounded-lg border transition-all ${
                              selectedTime === time
                                ? 'bg-primary border-primary text-white font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Booking submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!selectedDay || !selectedTime}
                      className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 ${
                        selectedDay && selectedTime
                          ? 'bg-primary hover:bg-primary-dark text-white cursor-pointer active:scale-[0.99]'
                          : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Onboarding-Call jetzt festbuchen</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

          {/* RIGHT: Bill Overview & Quick Links - Span 1 */}
          <div className="col-span-1 space-y-8">
            
            {/* Order Summary Specs */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-hidden relative" id="billing-summary-card">
              {/* Colored Badge strip */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-[#0D9488]`} />
              
              <div className="flex items-center gap-3.5 mb-5 pt-2">
                <div className="p-3 bg-primary-light rounded-xl">
                  {currentDetails.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">{currentDetails.name}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Lizenz: Aktiv</p>
                </div>
              </div>

              {/* Price Table Breakdown */}
              <div className="border-t border-slate-100 pt-5 pb-4 space-y-2.5 text-xs md:text-sm">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Einrichtungspreis (regulär)</span>
                  <span className="line-through text-slate-400">{currentPrice.original}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 font-medium">
                  <span>Einrichtungspreis (Aktion)</span>
                  <span className="text-slate-800 font-bold">{currentPrice.discounted}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>MwSt. (19%)</span>
                  <span className="text-slate-700">{currentPrice.vat}</span>
                </div>
                <div className="flex justify-between items-center text-slate-900 font-bold border-t border-slate-100 pt-2.5 text-base">
                  <span>Gesamtbetrag</span>
                  <span className="text-[#0D9488]">{currentPrice.total}</span>
                </div>
              </div>

              {/* Digistore24 order billing notice (gelber container) */}
              <div className="mt-2 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-center text-xs text-amber-900 font-semibold leading-relaxed">
                Kostenpflichtiges Produkt: „Die Abbuchung erfolgt durch <a href="https://www.digistore24.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-700">Digistore24 GmbH</a> (Deutschland)“
              </div>

              {/* Resource Download Block */}
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert('Ihr Onboarding PDF-Dokument wird in Kürze generiert und an Sie versendet.'); }}
                  className="flex items-center gap-2.5 w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs text-slate-700 font-bold transition-all border border-slate-200"
                >
                  <Download size={15} className="text-slate-400" />
                  <span>Onboarding-Guide (PDF)</span>
                </a>
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert('Ihr Leistungsdatenblatt / Lastenheft steht in Kürze in Ihrem Kundenportal bereit.'); }}
                  className="flex items-center gap-2.5 w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs text-slate-700 font-bold transition-all border border-slate-200"
                >
                  <FileText size={15} className="text-slate-400" />
                  <span>Leistungsumfang (PDF)</span>
                </a>
              </div>
            </div>

            {/* Direct Instant Service Live Support Widget */}
            <div className="bg-gradient-to-br from-[#0D9488] to-[#0284C7] text-white rounded-3xl p-6 shadow-md" id="thankyou-support-widget">
              <h3 className="font-bold text-lg mb-2">Technischer Support</h3>
              <p className="text-xs text-teal-50 leading-relaxed mb-6">
                Schreiben Sie uns direkt per WhatsApp oder E-Mail, falls Sie Fragen zur Verknüpfung Ihrer Telefonanlage haben.
              </p>

              <div className="space-y-4">
                {/* WhatsApp Support with Profile Pic, Contact Save, and Hidden Number */}
                <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl transition-all border border-slate-100 text-slate-800 shadow-sm">
                  <div className="relative shrink-0">
                    <img 
                      src={manuelPhoto} 
                      alt="Manuel Engelhard - Auxilium Support" 
                      className="w-12 h-12 rounded-full object-cover shrink-0 shadow-sm"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-white rounded-full" />
                  </div>
                  <div className="flex-1 text-left space-y-2">
                    <div>
                      <div className="text-[10px] text-[#0D9488] uppercase font-bold tracking-wider">Auxilium Support</div>
                      <div className="text-sm font-bold text-slate-900">Manuel Engelhard</div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5 pt-1">
                      <a 
                        href="https://wa.me/4915257344044" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors shadow-md w-full"
                      >
                        <MessageCircle size={15} />
                        <span>WhatsApp Chat</span>
                      </a>
                      
                      <a 
                        href={`data:text/vcard;charset=utf-8,${encodeURIComponent(`BEGIN:VCARD
VERSION:3.0
FN:Manuel Engelhard (Auxilium Support)
ORG:Auxilium Assist
TEL;TYPE=CELL,VOICE:+4915257344044
EMAIL;TYPE=PREF,INTERNET:onboarding@auxilium-assist.de
URL:https://www.auxilium-assist.de
END:VCARD`)}`}
                        download="Manuel-Engelhard-Auxilium.vcf"
                        className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold py-2 px-3 rounded-xl text-xs transition-colors shadow-sm w-full border border-slate-200"
                      >
                        <span>Kontakt speichern</span>
                      </a>
                    </div>
                    
                    <div className="pt-1.5 border-t border-slate-150">
                      {showPhoneNum ? (
                        <span className="text-xs font-mono text-slate-700 font-bold block pt-0.5">
                          +49 1525 7344044
                        </span>
                      ) : (
                        <button 
                          onClick={() => setShowPhoneNum(true)}
                          className="text-[10px] text-slate-500 hover:text-[#0D9488] hover:underline font-bold text-left block"
                        >
                          Rufnummer für Desktop anzeigen
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <a 
                  href="mailto:onboarding@auxilium-assist.de" 
                  className="flex items-center gap-3 bg-white hover:bg-slate-50 border border-slate-150 p-3.5 rounded-2xl transition-all text-slate-800 shadow-sm"
                >
                  <Mail size={18} className="text-[#0D9488] shrink-0" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Support per E-Mail</div>
                    <div className="text-sm font-bold text-slate-900 break-all">onboarding@auxilium-assist.de</div>
                  </div>
                </a>
              </div>

              <div className="mt-6 text-center text-[10px] text-teal-100 font-medium">
                Mo. - Fr. von 08:00 bis 18:00 Uhr besetzt
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
