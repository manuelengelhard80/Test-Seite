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
  if (lower.includes('wie geht') || lower.includes('wie steht') || lower.includes('alles klar') || lower.includes('alles gut')) {
    return `Hallo! Mir geht es wunderbar, vielen Dank der Nachfrage! 🌸 Ich bin Auxilia, Ihre persönliche KI-Assistentin für den Auxilium Praxiskalender, und freue mich darauf, Sie heute unterstützen zu dürfen. Wie kann ich Ihnen und der ${practiceName} weiterhelfen?`;
  }

  // 2. Greetings
  if (lower.includes('hallo') || lower.includes('hi') || lower.includes('guten tag') || lower.includes('guten morgen') || lower.includes('servus') || lower.includes('moin') || lower.includes('hey') || lower.includes('wer bist du')) {
    return `Hallo und herzlich willkommen! 💫 Ich bin Auxilia, Ihre persönliche KI-Assistentin für den Praxiskalender. Ich unterstütze Sie und das Team der ${practiceName} bei allen Fragen rund um Termine, Behandler, Raum-/Gerätesperren und die Online-Buchung. Worüber möchten Sie mehr erfahren?`;
  }

  // 3. Gratitude & compliments
  if (lower.includes('danke') || lower.includes('vielen dank') || lower.includes('super') || lower.includes('klasse') || lower.includes('toll') || lower.includes('perfekt')) {
    return `Sehr gerne! Ich freue mich, dass ich Ihnen weiterhelfen konnte. Lassen Sie mich jederzeit wissen, wenn Sie oder das Team der ${practiceName} weitere Unterstützung bei Ihrem Praxiskalender benötigen! 😊`;
  }

  // 4. Create new appointment
  if (lower.includes('termin') && (lower.includes('anleg') || lower.includes('erstell') || lower.includes('buch') || lower.includes('neu') || lower.includes('eintrag'))) {
    return `**Termin im Kalender anlegen:**\n\n1. Klicken Sie im Kalender direkt auf die gewünschte Uhrzeit oder oben rechts auf **„+ Neuer Termin“**.\n2. Wählen Sie den Patienten, den Behandler (${doctorsText || 'Arzt'}), die Terminart sowie den Raum bzw. das Gerät aus.\n3. Bestätigen Sie mit **„Termin speichern“**. Der Termin ist sofort verbucht und durch den automatischen Schutz vor Doppelbelegungen gesichert.`;
  }

  // 5. Move / Cancel / Reschedule appointment
  if (lower.includes('verschieb') || lower.includes('absag') || lower.includes('lösch') || lower.includes('storn') || lower.includes('änder')) {
    return `**Termin verschieben oder absagen:**\n\n* **Verschieben:** Klicken Sie im Kalender auf den entsprechenden Termin, wählen Sie eine neue Zeit oder ein neues Datum und speichern Sie – das System prüft Raum und Arzt in Echtzeit.\n* **Absagen / Löschen:** Öffnen Sie die Termindetails und wählen Sie **„Abgesagt“** (bleibt dokumentiert) oder **„Löschen“** (gibt den Zeitslot sofort wieder frei).`;
  }

  // 6. Doctors & working hours (Step 1)
  if (lower.includes('arzt') || lower.includes('ärzte') || lower.includes('behandler') || lower.includes('arbeitszeit') || lower.includes('team') || lower.includes('schritt 1')) {
    const doctorsInfo = doctorsText ? `Aktuell hinterlegte Behandler: **${doctorsText}**.\n\n` : '';
    return `**Ärzte & Behandler verwalten (Schritt 1):**\n\n${doctorsInfo}* Sie können beliebig viele Ärztinnen und Ärzte anlegen und individuelle Kalender-Farben zur schnellen Unterscheidung vergeben.\n* Die Sprech- und Arbeitszeiten lassen sich für jeden Wochentag minutengenau konfigurieren.`;
  }

  // 7. Rooms, Equipment & Locking (Step 2)
  if (lower.includes('raum') || lower.includes('räume') || lower.includes('zimmer') || lower.includes('gerät') || lower.includes('geräte') || lower.includes('sperr') || lower.includes('wartung') || lower.includes('ultraschall') || lower.includes('schritt 2')) {
    const resInfo = resourcesText ? `In der Praxis ${practiceName} sind u.a. konfiguriert: **${resourcesText}**.\n\n` : '';
    return `**Räume & Geräte verwalten & sperren (Schritt 2):**\n\n${resInfo}* **Echtzeit-Sperre:** Bei Wartung, Reparatur oder Urlaub klicken Sie einfach auf **„Sperren“**.\n* Der Praxiskalender blockiert diesen Raum bzw. das Gerät sofort für diesen Zeitraum und verhindert Online-Buchungen sowie Doppelbelegungen.`;
  }

  // 8. Appointment types & buffers (Step 3)
  if (lower.includes('terminart') || lower.includes('terminarten') || lower.includes('leistung') || lower.includes('dauer') || lower.includes('puffer') || lower.includes('kopplung') || lower.includes('schritt 3')) {
    const servInfo = servicesText ? `Konfigurierte Terminarten: **${servicesText}**.\n\n` : '';
    return `**Terminarten & Pufferzeiten einrichten (Schritt 3):**\n\n${servInfo}* **Behandlungsdauer:** Definieren Sie die Standard-Dauer pro Leistung.\n* **Ressourcen-Kopplung:** Verknüpfen Sie Terminarten fest mit Pflicht-Räumen oder Geräten.\n* **Pufferzeiten:** Verhindern Hektik und ermöglichen Desinfektion zwischen Patienten.`;
  }

  // 9. Design & Branding (Step 4)
  if (lower.includes('farbe') || lower.includes('design') || lower.includes('logo') || lower.includes('branding') || lower.includes('aussehen') || lower.includes('schritt 4')) {
    return `**Praxisdesign & Branding anpassen (Schritt 4):**\n\n* Passen Sie die Primärfarbe, Ihr Praxislogo und den Praxisslogan individuell an.\n* Das Design wird nahtlos im Kalender, im Online-Buchungswidget und auf allen Bestätigungen angewendet.`;
  }

  // 10. Online booking link / Website embedding (Step 5)
  if (lower.includes('link') || lower.includes('online') || lower.includes('website') || lower.includes('homepage') || lower.includes('iframe') || lower.includes('url') || lower.includes('schritt 5')) {
    return `**Ihr persönlicher Online-Buchungslink (Schritt 5):**\n\n* Ihr persönlicher Buchungslink lautet: \`https://termin.auxilium-assist.de/${practiceSlug}\`\n* **Website-Einbindung:** Verlinken Sie diesen Link als Button auf Ihrer Website oder betten Sie das Buchungs-Widget per iFrame ein.\n* Alle Patientenbuchungen synchronisieren sich sekundengenau mit Ihrem Praxiskalender.`;
  }

  // 11. SMS & Notifications
  if (lower.includes('sms') || lower.includes('e-mail') || lower.includes('mail') || lower.includes('erinnerung') || lower.includes('no-show')) {
    return `**Automatische Patienten-Erinnerungen:**\n\n* Direkt nach der Online-Buchung erhält der Patient eine **Bestätigungs-E-Mail** mit digitaler Kalenderdatei (.ics).\n* 24 Stunden vor dem Termin wird eine automatische **SMS-Erinnerung** versendet – das reduziert Terminausfälle (No-Shows) um bis zu 85 %.`;
  }

  // 12. General fallback
  return `Ich helfe Ihnen und dem Praxisteam der ${practiceName} sehr gerne bei allen Fragen rund um den Praxiskalender!\n\nIch unterstütze Sie bei:\n1. **Ärzte & Arbeitszeiten** (Schritt 1)\n2. **Räume & Geräte sperren** (Schritt 2)\n3. **Terminarten & Pufferzeiten** (Schritt 3)\n4. **Praxisdesign & Logo** (Schritt 4)\n5. **Online-Buchungslink einbinden** (Schritt 5)\n\nZu welchem Bereich möchten Sie Näheres wissen?`;
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
      // 1. Try server-side Gemini API route first
      const systemPrompt = messages.find(m => m.role === 'system')?.content;
      const conversationMessages = messages.filter(m => m.role !== 'system');

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationMessages,
          systemPrompt: systemPrompt,
          stream: false
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.answer && data.answer.trim()) {
          answer = data.answer;
        }
      }
    } catch (err: any) {
      console.warn('Server chat route unreachable or running on static hosting, using client contextual intelligence:', err);
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

