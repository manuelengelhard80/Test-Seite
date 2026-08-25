import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Sliders, 
  Sparkles, 
  Code2, 
  Link2, 
  Globe, 
  Smartphone, 
  Monitor, 
  Eye, 
  Palette,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Share2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { BookingWidget, BookingWidgetConfig, DEFAULT_WIDGET_CONFIG } from './BookingWidget';
import { Doctor, ServiceType, DOCTOR_COLOR_PALETTE } from '../types/calendar';

export interface BookingWidgetConfiguratorProps {
  doctors?: Doctor[];
  serviceTypes?: ServiceType[];
  onNewBookingCreated?: (eventData: any) => void;
}

export const BookingWidgetConfigurator: React.FC<BookingWidgetConfiguratorProps> = ({
  doctors,
  serviceTypes,
  onNewBookingCreated
}) => {
  // Widget Customization State
  const [config, setConfig] = useState<BookingWidgetConfig>(DEFAULT_WIDGET_CONFIG);
  const [activePreviewDevice, setActivePreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeEmbedTab, setActiveEmbedTab] = useState<'nocode' | 'iframe' | 'button' | 'wordpress'>('nocode');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  // Generate unique direct link for practice
  const practiceSlug = config.practiceName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'praxis';
  const directBookingUrl = `https://termin.auxilium-assist.de/${practiceSlug}`;

  // Generated Embed Codes
  const noCodeDirectLink = directBookingUrl;
  
  const iframeEmbedCode = `<!-- Auxilium Assist Online-Terminbuchung Widget -->
<iframe 
  src="${directBookingUrl}?embed=true&color=${encodeURIComponent(config.primaryColor)}&radius=${config.borderRadius}"
  width="100%" 
  height="720" 
  frameborder="0" 
  style="border: none; max-width: 600px; width: 100%; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);"
  title="Online Terminbuchung ${config.practiceName}"
></iframe>`;

  const buttonPopupEmbedCode = `<!-- Auxilium Assist Buchungs-Button für Ihre Website -->
<a href="${directBookingUrl}" 
   target="_blank" 
   rel="noopener"
   style="display: inline-flex; align-items: center; gap: 8px; background-color: ${config.primaryColor}; color: #ffffff; padding: 12px 24px; border-radius: 12px; font-family: system-ui, sans-serif; font-weight: 700; text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <span>📅 Termin online buchen</span>
</a>`;

  const wordPressInstructions = `1. Öffnen Sie Ihre WordPress-Seite oder Ihren Website-Baukasten (Jimdo, Wix, Squarespace, Webflow).
2. Fügen Sie einen Block vom Typ "HTML" oder "Einbetten" hinzu.
3. Fügen Sie den folgenden Code ein:
${iframeEmbedCode}`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setNotificationBanner('In die Zwischenablage kopiert!');
    setTimeout(() => {
      setCopiedType(null);
      setNotificationBanner(null);
    }, 2500);
  };

  const handleBookingCompleted = (booking: any) => {
    if (onNewBookingCreated) {
      onNewBookingCreated(booking);
    }
    setNotificationBanner(`Neuer Termin für ${booking.patientName} erfolgreich im Praxiskalender angelegt!`);
    setTimeout(() => setNotificationBanner(null), 4000);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-50">
      
      {/* Toast Notification Banner */}
      {notificationBanner && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 size={16} className="text-[#0D9488]" />
          <span>{notificationBanner}</span>
        </div>
      )}

      {/* Main Grid: Left Controls, Right Live Preview */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT COLUMN: CONFIGURATION & INTEGRATION TABS (5 Cols) */}
        <div className="lg:col-span-5 border-r border-slate-200 bg-white flex flex-col h-full overflow-hidden">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/60 shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sliders size={18} className="text-[#0D9488]" />
                  <span>Website-Buchungs-Widget</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Individuell gestaltbar & mit 1 Klick ohne Programmierkenntnisse auf Ihrer Praxis-Website integriert.
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Settings Panel */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* 1. Practice Branding */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Palette size={14} className="text-[#0D9488]" />
                <span>Praxis-Branding & Design</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Praxisname</label>
                <input 
                  type="text"
                  value={config.practiceName}
                  onChange={(e) => setConfig({ ...config, practiceName: e.target.value })}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 font-semibold outline-none focus:border-[#0D9488] focus:bg-white"
                  placeholder="z.B. Praxis Dr. med. Müller"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Untertitel / Slogan</label>
                <input 
                  type="text"
                  value={config.practiceSubtitle}
                  onChange={(e) => setConfig({ ...config, practiceSubtitle: e.target.value })}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0D9488] focus:bg-white"
                  placeholder="z.B. Online-Terminvergabe für Privat & Kasse"
                />
              </div>

              {/* Primary Color Palette */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">Hauptfarbe des Widgets</label>
                <div className="grid grid-cols-6 gap-2">
                  {DOCTOR_COLOR_PALETTE.slice(0, 6).map((colorOpt) => {
                    const isSelected = config.primaryColor === colorOpt.hex;
                    return (
                      <button
                        key={colorOpt.id}
                        type="button"
                        onClick={() => setConfig({ ...config, primaryColor: colorOpt.hex })}
                        className={`h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                          isSelected ? 'ring-2 ring-offset-2 ring-slate-800 scale-105' : 'hover:opacity-90'
                        }`}
                        style={{ backgroundColor: colorOpt.hex }}
                        title={colorOpt.name}
                      >
                        {isSelected && <Check size={14} className="text-white drop-shadow" strokeWidth={3} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Corner Radius */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Eckenabrundung</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'rounded-lg', label: 'Leicht' },
                    { id: 'rounded-xl', label: 'Mittel' },
                    { id: 'rounded-2xl', label: 'Stark' },
                    { id: 'rounded-3xl', label: 'Pille' },
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setConfig({ ...config, borderRadius: r.id as any })}
                      className={`py-1.5 px-2 text-xs rounded-xl border font-semibold transition-all cursor-pointer ${
                        config.borderRadius === r.id 
                          ? 'border-[#0D9488] bg-teal-50 text-[#0D9488] font-bold' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Functional Toggles */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders size={14} className="text-[#0D9488]" />
                <span>Formular-Optionen</span>
              </h3>

              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 cursor-pointer select-none">
                  <div>
                    <span className="font-bold text-slate-800 block">Arzt-Auswahl anzeigen</span>
                    <span className="text-slate-500 text-[11px]">Patienten können den gewünschten Behandler wählen</span>
                  </div>
                  <input 
                    type="checkbox"
                    checked={config.showDoctorSelection}
                    onChange={(e) => setConfig({ ...config, showDoctorSelection: e.target.checked })}
                    className="rounded text-[#0D9488] focus:ring-[#0D9488] h-4 w-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 cursor-pointer select-none">
                  <div>
                    <span className="font-bold text-slate-800 block">Kassenart abfragen</span>
                    <span className="text-slate-500 text-[11px]">Auswahl zwischen GKV (Kasse) und PKV (Privat)</span>
                  </div>
                  <input 
                    type="checkbox"
                    checked={config.showInsuranceSelection}
                    onChange={(e) => setConfig({ ...config, showInsuranceSelection: e.target.checked })}
                    className="rounded text-[#0D9488] focus:ring-[#0D9488] h-4 w-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 cursor-pointer select-none">
                  <div>
                    <span className="font-bold text-slate-800 block">Mobilnummer als Pflichtfeld</span>
                    <span className="text-slate-500 text-[11px]">Sichert SMS-Erinnerungen und minimiert No-Shows</span>
                  </div>
                  <input 
                    type="checkbox"
                    checked={config.showPhoneRequired}
                    onChange={(e) => setConfig({ ...config, showPhoneRequired: e.target.checked })}
                    className="rounded text-[#0D9488] focus:ring-[#0D9488] h-4 w-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 cursor-pointer select-none">
                  <div>
                    <span className="font-bold text-slate-800 block">Freitextfeld für Patienten</span>
                    <span className="text-slate-500 text-[11px]">Patienten können Symptome oder Notizen angeben</span>
                  </div>
                  <input 
                    type="checkbox"
                    checked={config.allowComments}
                    onChange={(e) => setConfig({ ...config, allowComments: e.target.checked })}
                    className="rounded text-[#0D9488] focus:ring-[#0D9488] h-4 w-4 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* 3. Integration & Einbindung Options */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Globe size={14} className="text-[#0D9488]" />
                <span>Einbindung auf Ihrer Website</span>
              </h3>

              {/* Method Selector Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveEmbedTab('nocode')}
                  className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer text-center ${
                    activeEmbedTab === 'nocode' ? 'bg-white shadow-xs text-[#0D9488] font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Direktlink (No-Code)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEmbedTab('iframe')}
                  className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer text-center ${
                    activeEmbedTab === 'iframe' ? 'bg-white shadow-xs text-[#0D9488] font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  iFrame-Code
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEmbedTab('button')}
                  className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer text-center ${
                    activeEmbedTab === 'button' ? 'bg-white shadow-xs text-[#0D9488] font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Button-Code
                </button>
              </div>

              {/* Tab 1: No Code Direct Link */}
              {activeEmbedTab === 'nocode' && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Direktlink für Ihre Website:</span>
                    <span className="text-[10px] bg-teal-100 text-teal-900 font-bold px-2 py-0.5 rounded-full">
                      Empfohlen
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Fügen Sie diesen Link einfach als Button ("Jetzt Termin online buchen") in Ihren bestehenden Homepage-Baukasten ein.
                  </p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={noCodeDirectLink} 
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-700 outline-none select-all"
                    />
                    <button
                      type="button"
                      onClick={() => copyToClipboard(noCodeDirectLink, 'link')}
                      className="bg-[#0D9488] hover:bg-[#0f766e] text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
                    >
                      {copiedType === 'link' ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedType === 'link' ? 'Kopiert' : 'Kopieren'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: iFrame Code */}
              {activeEmbedTab === 'iframe' && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">HTML iFrame-Code zum Einbetten:</span>
                  <p className="text-[11px] text-slate-500">
                    Kopieren Sie diesen HTML-Schnipsel in einen HTML-Block Ihrer Website (WordPress, Jimdo, Wix, Typo3).
                  </p>
                  <pre className="bg-slate-900 text-teal-300 p-3 rounded-lg text-[11px] font-mono overflow-x-auto whitespace-pre-wrap">
                    {iframeEmbedCode}
                  </pre>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(iframeEmbedCode, 'iframe')}
                    className="w-full bg-[#0D9488] hover:bg-[#0f766e] text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                  >
                    {copiedType === 'iframe' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedType === 'iframe' ? 'Code in Zwischenablage kopiert' : 'iFrame-Code kopieren'}</span>
                  </button>
                </div>
              )}

              {/* Tab 3: Button Code */}
              {activeEmbedTab === 'button' && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">Fertiger HTML-Button:</span>
                  <p className="text-[11px] text-slate-500">
                    Ein responsiver Buchungsbutton im Corporate Design Ihrer Praxis.
                  </p>
                  <pre className="bg-slate-900 text-teal-300 p-3 rounded-lg text-[11px] font-mono overflow-x-auto whitespace-pre-wrap">
                    {buttonPopupEmbedCode}
                  </pre>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(buttonPopupEmbedCode, 'button')}
                    className="w-full bg-[#0D9488] hover:bg-[#0f766e] text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                  >
                    {copiedType === 'button' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedType === 'button' ? 'Button-Code kopiert' : 'Button-Code kopieren'}</span>
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: LIVE PREVIEW OF THE PATIENT BOOKING EXPERIENCE (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-100 flex flex-col h-full overflow-hidden">
          
          {/* Top Preview Control Bar */}
          <div className="p-3 px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">Echtzeit-Vorschau (Patientenansicht)</span>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActivePreviewDevice('desktop')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activePreviewDevice === 'desktop' ? 'bg-white text-[#0D9488] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Monitor size={14} />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewDevice('mobile')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activePreviewDevice === 'mobile' ? 'bg-white text-[#0D9488] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Smartphone size={14} />
                <span className="hidden sm:inline">Smartphone</span>
              </button>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center">
            
            <div className={`w-full transition-all duration-300 ${
              activePreviewDevice === 'mobile' ? 'max-w-[380px] p-2 bg-slate-800 rounded-[36px] shadow-2xl border-4 border-slate-700' : 'max-w-xl'
            }`}>
              {/* Mobile Notch simulation */}
              {activePreviewDevice === 'mobile' && (
                <div className="w-24 h-4 bg-slate-700 rounded-full mx-auto mb-3" />
              )}

              {/* The Actual Booking Widget Instance */}
              <BookingWidget 
                config={config} 
                doctors={doctors}
                serviceTypes={serviceTypes}
                onBookingComplete={handleBookingCompleted}
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
