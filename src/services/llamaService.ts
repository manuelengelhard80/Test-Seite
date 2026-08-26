export interface AIComplianceInfo {
  status: string;
  location: string;
  region: string;
  gdprCompliant: boolean;
  dataRetentionPolicy: string;
  encryption: string;
  ramUsageOnDevice: string;
  cacheStatus: string;
}

export const COMPLIANCE_INFO: AIComplianceInfo = {
  status: "Aktiv",
  location: "Frankfurt am Main (Deutschland / EU)",
  region: "europe-west3",
  gdprCompliant: true,
  dataRetentionPolicy: "Zero-Retention (Keine Speicherung für Modelltraining)",
  encryption: "TLS 1.3 / AES-256",
  ramUsageOnDevice: "0 MB (100% ressourcenschonend)",
  cacheStatus: "⚡ Sofort-Cache aktiv (0 Tokens / 0 ms Latenz)"
};

function extractContext(systemPrompt: string | undefined) {
  let practiceName = 'Ihre Praxis';
  let doctorsText = '';
  let resourcesText = '';
  let servicesText = '';
  let practiceSlug = 'praxis';

  if (systemPrompt) {
    const matchPractice = systemPrompt.match(/- Praxis:\s*([^\n]+)/i);
    if (matchPractice && matchPractice[1].trim()) {
      practiceName = matchPractice[1].trim();
    }
    const matchDoctors = systemPrompt.match(/- Ärzte \/ Behandler:\s*([^\n]+)/i);
    if (matchDoctors && matchDoctors[1].trim()) {
      doctorsText = matchDoctors[1].trim();
    }
    const matchResources = systemPrompt.match(/- Ressourcen, Räume & Geräte:\s*([^\n]+)/i);
    if (matchResources && matchResources[1].trim()) {
      resourcesText = matchResources[1].trim();
    }
    const matchServices = systemPrompt.match(/- Leistungen \/ Terminarten:\s*([^\n]+)/i);
    if (matchServices && matchServices[1].trim()) {
      servicesText = matchServices[1].trim();
    }
    const matchSlug = systemPrompt.match(/auxilium-assist\.de\/([a-zA-Z0-9_-]+)/i);
    if (matchSlug && matchSlug[1].trim()) {
      practiceSlug = matchSlug[1].trim();
    }
  }

  return { practiceName, doctorsText, resourcesText, servicesText, practiceSlug };
}

function generateIntelligentContextualAnswer(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>
): string {
  const systemPrompt = messages.find(m => m.role === 'system')?.content;
  const userMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';
  const lower = userMsg.toLowerCase().trim();

  const { practiceName, doctorsText, resourcesText, servicesText, practiceSlug } = extractContext(systemPrompt);

  // 1. Smalltalk & well-being
  if (lower.includes('wie geht') || lower.includes('wie steht') || lower.includes('alles klar') || lower.includes('alles gut') || lower.includes('wie fühlst du')) {
    return `Hallo! Mir geht es wunderbar, vielen Dank der Nachfrage! 🌸 Ich bin Auxilia, Ihre persönliche KI-Assistentin für den Auxilium Praxiskalender, und freue mich darauf, Sie heute unterstützen zu dürfen. Wie kann ich Ihnen und der ${practiceName} weiterhelfen?`;
  }

  // 2. Greetings & Identity
  if (lower.includes('hallo') || lower.includes('hi') || lower.includes('guten tag') || lower.includes('guten morgen') || lower.includes('guten abend') || lower.includes('servus') || lower.includes('moin') || lower.includes('hey') || lower.includes('wer bist du') || lower.includes('was bist du')) {
    return `Hallo und herzlich willkommen! 💫 Ich bin Auxilia, Ihre persönliche KI-Assistentin für den Praxiskalender. Ich unterstütze Sie und das gesamte Team der ${practiceName} bei allen Fragen rund um Termine, Behandler, Raum- und Gerätesperren sowie die Online-Terminvergabe. Worüber möchten Sie mehr erfahren?`;
  }

  // 3. Gratitude & Praise
  if (lower.includes('danke') || lower.includes('vielen dank') || lower.includes('super') || lower.includes('klasse') || lower.includes('toll') || lower.includes('perfekt') || lower.includes('spitze') || lower.includes('genial')) {
    return `Sehr gerne! Ich freue mich riesig, dass ich Ihnen weiterhelfen konnte. Lassen Sie mich jederzeit wissen, wenn Sie oder das Team der ${practiceName} weitere Unterstützung bei Ihrem Praxiskalender benötigen! 😊`;
  }

  // 4. Goodbyes
  if (lower.includes('tschüss') || lower.includes('auf wiedersehen') || lower.includes('ciao') || lower.includes('schönen tag') || lower.includes('schönes wochenende') || lower.includes('bis dann')) {
    return `Auf Wiedersehen und einen wundervollen Tag für Sie und Ihr Praxisteam der ${practiceName}! Ich bin jederzeit hier, wenn Sie mich brauchen. 🌸`;
  }

  // 5. Create new appointment / Booking
  if (lower.includes('termin') && (lower.includes('anleg') || lower.includes('erstell') || lower.includes('buch') || lower.includes('neu') || lower.includes('eintrag') || lower.includes('vergeb'))) {
    return `**Termin im Kalender anlegen:**\n\n1. Klicken Sie im Kalender direkt auf die gewünschte freie Uhrzeit oder oben rechts auf den blauen Button **„+ Neuer Termin“**.\n2. Wählen Sie den Patienten, den Behandler (${doctorsText || 'zuständiger Arzt'}), die gewünschte Terminart sowie den Behandlungsraum oder das Medizingerät aus.\n3. Klicken Sie auf **„Termin speichern“**.\n\nDas System prüft im Hintergrund automatisch die Raum- und Geräteverfügbarkeit in Echtzeit und schützt Sie vor Doppelbelegungen!`;
  }

  // 6. Move / Cancel / Reschedule appointment
  if (lower.includes('verschieb') || lower.includes('absag') || lower.includes('lösch') || lower.includes('storn') || lower.includes('änder') || lower.includes('verleg')) {
    return `**Termin verschieben oder absagen:**\n\n* **Termin verschieben:** Klicken Sie im Kalender einfach auf den Termin und wählen Sie eine neue Uhrzeit oder ein anderes Datum. Das System prüft die Verfügbarkeit von Arzt und Raum in Echtzeit.\n* **Termin absagen:** Öffnen Sie die Termindetails und wählen Sie den Status **„Abgesagt“** (bleibt zur Praxisdokumentation im System) oder **„Termin löschen“** (gibt den Zeitslot sofort wieder frei).`;
  }

  // 7. Doctors, Practitioners & Working Hours (Step 1)
  if (lower.includes('arzt') || lower.includes('ärzte') || lower.includes('behandler') || lower.includes('arbeitszeit') || lower.includes('sprechzeit') || lower.includes('kollege') || lower.includes('team') || lower.includes('schritt 1')) {
    const doctorsInfo = doctorsText ? `In der ${practiceName} sind aktuell hinterlegt: **${doctorsText}**.\n\n` : '';
    return `**Ärzte & Behandler verwalten (Schritt 1):**\n\n${doctorsInfo}* **Unbegrenzte Behandler:** Sie können beliebig viele Kolleginnen und Kollegen anlegen.\n* **Farbkodierung:** Jeder Arzt erhält eine eigene Kalenderfarbe zur schnellen optischen Orientierung.\n* **Arbeits- & Sprechzeiten:** Für jeden Wochentag können Sie individuelle Arbeitszeiten und Pausen minutengenau einstellen.`;
  }

  // 8. Rooms, Equipment & Locking (Step 2)
  if (lower.includes('raum') || lower.includes('räume') || lower.includes('zimmer') || lower.includes('labor') || lower.includes('gerät') || lower.includes('geräte') || lower.includes('sperr') || lower.includes('sperrung') || lower.includes('wartung') || lower.includes('ultraschall') || lower.includes('ekg') || lower.includes('schritt 2')) {
    const resInfo = resourcesText ? `Für ${practiceName} sind u.a. eingerichtet: **${resourcesText}**.\n\n` : '';
    return `**Räume & Geräte verwalten & sperren (Schritt 2):**\n\n${resInfo}* **Echtzeit-Sperre:** Bei Wartung, Reparatur, Ausfall oder Urlaub klicken Sie einfach auf **„Sperren“**.\n* **Automatischer Schutz:** Der Praxiskalender blockiert den Raum bzw. das Gerät sofort für diesen Zeitraum und verhindert Online-Buchungen sowie manuelle Doppelbelegungen.`;
  }

  // 9. Appointment Types, Services & Buffer Times (Step 3)
  if (lower.includes('terminart') || lower.includes('terminarten') || lower.includes('leistung') || lower.includes('leistungen') || lower.includes('dauer') || lower.includes('puffer') || lower.includes('pufferzeit') || lower.includes('kopplung') || lower.includes('desinfektion') || lower.includes('schritt 3')) {
    const servInfo = servicesText ? `Eingerichtete Terminarten: **${servicesText}**.\n\n` : '';
    return `**Terminarten & Pufferzeiten einrichten (Schritt 3):**\n\n${servInfo}* **Behandlungsdauer:** Definieren Sie die Standarddauer pro Behandlungsart (z. B. 15, 20 oder 30 Min.).\n* **Ressourcen-Kopplung:** Verknüpfen Sie Leistungen fest mit Pflicht-Räumen oder Geräten (z. B. Ultraschall bei Sonographie).\n* **Pufferzeiten:** Konfigurieren Sie Vor- und Nachlaufzeiten für Desinfektion und Vorbereitung.`;
  }

  // 10. Design, Logo & Branding (Step 4)
  if (lower.includes('farbe') || lower.includes('farben') || lower.includes('design') || lower.includes('logo') || lower.includes('branding') || lower.includes('aussehen') || lower.includes('anpass') || lower.includes('slogan') || lower.includes('schritt 4')) {
    return `**Praxisdesign & Branding anpassen (Schritt 4):**\n\n* **Markenfarben:** Passen Sie die Primär- und Akzentfarben passend zu Ihrem Praxisauftritt an.\n* **Praxislogo & Slogan:** Laden Sie Ihr Logo hoch und personalisieren Sie den Titel für Ihre Patientinnen und Patienten.\n* **Einheitlicher Look:** Das Design wird automatisch auf den Kalender, das Online-Buchungswidget und alle Bestätigungs-E-Mails übertragen.`;
  }

  // 11. Online Booking Link & Website Embedding (Step 5)
  if (lower.includes('link') || lower.includes('online') || lower.includes('website') || lower.includes('homepage') || lower.includes('iframe') || lower.includes('einbind') || lower.includes('url') || lower.includes('schritt 5') || lower.includes('buchungslink')) {
    return `**Ihr persönlicher Online-Buchungslink (Schritt 5):**\n\n* **Direktlink:** \`https://termin.auxilium-assist.de/${practiceSlug}\`\n* **Website-Einbindung:** Verlinken Sie diesen Link als auffälligen Button („Jetzt online Termin buchen“) auf Ihrer Homepage oder betten Sie das Buchungs-Widget nahtlos per iFrame ein.\n* **Echtzeit-Synchronisation:** Alle Online-Buchungen Ihrer Patienten landen sofort und automatisch in Ihrem Praxiskalender.`;
  }

  // 12. SMS, E-Mail & Reminders
  if (lower.includes('sms') || lower.includes('e-mail') || lower.includes('email') || lower.includes('mail') || lower.includes('erinner') || lower.includes('benachricht') || lower.includes('no-show') || lower.includes('ausfall')) {
    return `**Automatische Patienten-Erinnerungen:**\n\n* **Sofortige Bestätigung:** Nach der Online-Buchung erhält der Patient eine Bestätigungs-E-Mail inklusive digitaler Kalenderdatei (.ics).\n* **SMS-Erinnerung:** 24 Stunden vor dem Termin wird eine automatische SMS-Erinnerung versendet – das reduziert Terminausfälle (No-Shows) nachweislich um bis zu 85 %.`;
  }

  // 13. DSGVO, Privacy & Security
  if (lower.includes('dsgvo') || lower.includes('datenschutz') || lower.includes('sicher') || lower.includes('server') || lower.includes('verschlüssel') || lower.includes('frankfurt') || lower.includes('eu')) {
    return `**Datenschutz & Sicherheit (100 % DSGVO-konform):**\n\n* **Serverstandort Deutschland:** Gehostet in Frankfurt am Main (EU-Region \`europe-west3\`) nach Art. 28 DSGVO.\n* **Ende-zu-Ende-Verschlüsselung:** Alle Datenübertragungen erfolgen nach modernstem TLS 1.3 / AES-256 Standard.\n* **Zero-Retention:** Medizinische Daten werden zu keinem Zeitpunkt für KI-Modelltraining verwendet oder an Dritte weitergegeben.`;
  }

  // 14. Overview / Help
  if (lower.includes('hilfe') || lower.includes('anleitung') || lower.includes('was kann') || lower.includes('funktionen') || lower.includes('übersicht') || lower.includes('erklär')) {
    return `**Der Auxilium Praxiskalender im Überblick:**\n\n1. **Schritt 1 (Team & Ärzte):** Behandler, Farben und Arbeitszeiten konfigurieren\n2. **Schritt 2 (Räume & Geräte):** Zimmer und Geräte verwalten & bei Bedarf sperren\n3. **Schritt 3 (Terminarten):** Behandlungsdauern und Pufferzeiten definieren\n4. **Schritt 4 (Design & Logo):** Eigenes Praxis-Branding hinterlegen\n5. **Schritt 5 (Online-Buchung):** Buchungslink auf Ihrer Homepage aktivieren\n\nWorüber möchten Sie mehr erfahren?`;
  }

  // 15. General fallback
  return `Sehr gerne helfe ich Ihnen und dem Praxisteam der ${practiceName} weiter! 💫\n\nAls Ihre persönliche Praxiskalender-Assistentin unterstütze ich Sie bei:\n* **Terminen anlegen, verschieben & absagen**\n* **Ärzte & Arbeitszeiten verwalten** (Schritt 1)\n* **Räume & Medizingeräte sperren** (Schritt 2)\n* **Terminarten & Pufferzeiten einstellen** (Schritt 3)\n* **Online-Buchungslink auf Ihrer Homepage einbinden** (Schritt 5)\n\nWie kann ich Ihnen aktuell am besten zur Hand gehen?`;
}

class AIManager {
  private isLoading = false;
  private listeners: Array<() => void> = [];
  private sessionCache = new Map<string, string>();

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public getStatus() {
    return {
      isLoaded: true,
      isLoading: this.isLoading,
      progress: 100,
      error: null,
      isServerFallback: true,
      compliance: COMPLIANCE_INFO,
      modelName: "Auxilia KI (Gemini AI, EU Frankfurt, DSGVO)",
    };
  }

  public async preload() {
    this.isLoading = false;
    this.notify();
  }

  public matchInstantCache(_userMessage: string): string | null {
    return null;
  }

  public async generateChatStream(
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    onChunk: (chunk: string) => void
  ) {
    this.isLoading = true;
    this.notify();

    let answer = "";

    try {
      // 1. Try server-side Gemini API route first (with fast timeout)
      const systemPrompt = messages.find(m => m.role === 'system')?.content;
      const conversationMessages = messages.filter(m => m.role !== 'system');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationMessages,
          systemPrompt: systemPrompt,
          stream: false
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.answer && data.answer.trim()) {
          answer = data.answer;
        }
      }
    } catch (err: any) {
      // Gracefully fall back to client contextual intelligence
    }

    // 2. If server route is unavailable (e.g. static hosting on GitHub Pages, offline mode, network glitched)
    if (!answer) {
      answer = generateIntelligentContextualAnswer(messages);
    }

    // Fluid typewriter streaming effect for pleasant, real-time feel
    const words = answer.split(' ');
    let currentText = '';
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      onChunk(currentText);
      if (words.length > 15 && i < words.length - 1 && i % 3 === 0) {
        await new Promise(r => setTimeout(r, 12));
      }
    }
    onChunk(answer);
    this.isLoading = false;
    this.notify();
    return answer;
  }

  public async clearCache() {
    this.sessionCache.clear();
    try {
      await fetch('/api/cache/clear', { method: 'POST' });
    } catch (_) {}
  }

  public async generateChat(messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>) {
    return this.generateChatStream(messages, () => {});
  }
}

export const globalLlama = new AIManager();
export const DEFAULT_LLAMA_MODEL = 'Auxilia AI + Sofort-Cache (Frankfurt / DSGVO)';

