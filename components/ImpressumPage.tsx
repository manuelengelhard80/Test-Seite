import React from 'react';
import { ArrowLeft, Scale, Phone, Mail, FileText } from 'lucide-react';
import { CTASection } from './CTASection';

interface ImpressumPageProps {
  onBack: () => void;
}

export const ImpressumPage: React.FC<ImpressumPageProps> = ({ onBack }) => {
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
              Impressum
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-12">
            
            {/* Angaben gemäß § 5 TMG */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">Angaben gemäß § 5 TMG</h2>
              <p className="text-slate-600 leading-relaxed">
                <strong>2Bmedia & Marketing GbR</strong><br />
                Beeker Ring 7<br />
                89423 Gundelfingen an der Donau<br />
                Deutschland
              </p>
            </div>

            {/* Vertretung */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">Vertreten durch</h2>
              <p className="text-slate-600 leading-relaxed">
                Manuel Engelhard (geschäftsführender Gesellschafter)
              </p>
            </div>

            {/* Kontakt */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">Kontakt</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail size={18} className="text-slate-400" />
                  <span>E-Mail: <a href="mailto:info@auxiliumassist.ai" className="text-primary hover:underline">info@auxiliumassist.ai</a></span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <FileText size={18} className="text-slate-400" />
                  <span>Web: www.auxiliumassist.ai</span>
                </div>
              </div>
            </div>

            {/* Registereintrag removed if not provided, usually for GbR not needed unless specifically requested */}
            
            {/* Umsatzsteuer-ID */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">Umsatzsteuer-ID</h2>
              <p className="text-slate-600 leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                <strong>[USt-ID Nummer wird nachgereicht]</strong>
              </p>
            </div>

            {/* EU-Streitschlichtung */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">EU-Streitschlichtung</h2>
              <p className="text-slate-600 leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  https://ec.europa.eu/consumers/odr/
                </a>.<br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>

            {/* Verbraucherstreitbeilegung */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
              <p className="text-slate-600 leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            {/* Haftung & Urheberrecht */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Haftung für Inhalte</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Haftung für Links</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Urheberrecht</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
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