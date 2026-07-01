import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, CheckCircle2, MessageSquare, Building2, User } from 'lucide-react';
import { CTASection } from './CTASection';

interface ContactPageProps {
  onBack: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practice: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        practice: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* Header Section */}
      <section className="bg-white pb-10 pt-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-500 hover:text-[#0D9488] mb-8 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Zurück zur Übersicht
          </button>
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-1.5 shadow-sm mb-6 border border-slate-200">
              <MessageSquare size={14} className="text-slate-600" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Kontakt</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Kontaktieren Sie uns
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl">
              Haben Sie Fragen zu Auxilium Assist oder wünschen Sie eine persönliche Beratung für Ihre Praxis? Wir sind gerne für Sie da.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Unsere Kontaktdaten</h3>
                  <p className="text-slate-500 text-sm">
                    Schreiben Sie uns eine E-Mail oder nutzen Sie das Kontaktformular. Wir antworten Ihnen in der Regel innerhalb weniger Stunden.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">E-Mail</p>
                      <a href="mailto:info@auxilium-assist.de" className="text-slate-900 font-bold hover:text-[#0D9488] transition-colors text-sm break-all">
                        info@auxilium-assist.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Anschrift</p>
                      <p className="text-slate-800 font-medium text-sm leading-relaxed">
                        <strong>2Bmedia & Marketing GbR</strong><br />
                        Beeker Ring 7<br />
                        89423 Gundelfingen an der Donau<br />
                        Deutschland
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge Card */}
              <div className="bg-teal-900 text-white p-8 rounded-3xl shadow-sm relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10">
                  <MessageSquare size={180} />
                </div>
                <h4 className="text-lg font-bold mb-3 relative z-10">Schnelle Hilfe garantiert</h4>
                <p className="text-teal-100 text-sm leading-relaxed relative z-10">
                  Unser engagiertes Support-Team unterstützt Sie gerne bei allen Fragen rund um die Einrichtung, Integration in Ihre bestehende Telefonanlage und Tarifauswahl.
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
                {isSubmitted ? (
                  <div className="text-center py-12 px-4 animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Vielen Dank!</h3>
                    <p className="text-slate-600 max-w-md mx-auto mb-8">
                      Ihre Nachricht wurde erfolgreich übermittelt. Wir werden uns so schnell wie möglich bei Ihnen melden.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all text-sm"
                    >
                      Neue Nachricht senden
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Nachricht senden</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                          <User size={12} /> Name *
                        </label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ihr Name"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all text-sm bg-slate-50/50"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                          <Mail size={12} /> E-Mail *
                        </label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ihre.adresse@mail.de"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all text-sm bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                          <Phone size={12} /> Telefonnummer
                        </label>
                        <input 
                          type="tel" 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="z.B. +49 123 45678"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all text-sm bg-slate-50/50"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="practice" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                          <Building2 size={12} /> Name der Praxis
                        </label>
                        <input 
                          type="text" 
                          id="practice"
                          name="practice"
                          value={formData.practice}
                          onChange={handleChange}
                          placeholder="z.B. Hausarztpraxis Dr. Muster"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all text-sm bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                        <MessageSquare size={12} /> Ihre Nachricht *
                      </label>
                      <textarea 
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Wie können wir Ihnen helfen?"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all text-sm bg-slate-50/50 resize-none"
                      />
                    </div>

                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      * Pflichtfelder. Mit Absenden des Formulars erklären Sie sich mit der Verarbeitung Ihrer Daten gemäß unserer Datenschutzerklärung einverstanden.
                    </p>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-75 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Wird gesendet...</span>
                        </>
                      ) : (
                        <span>Nachricht absenden</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
