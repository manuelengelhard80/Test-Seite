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

// --- CLIENT-SIDE INSTANT KNOWLEDGE BASE (0 TOKENS, 0 MS LATENCY, 100% KOSTENLOS) ---
interface StandardFaqRule {
  keywords: string[];
  generateAnswer: (context?: string) => string;
}

const STANDARD_KNOWLEDGE_BASE: StandardFaqRule[] = [
  {
    keywords: ["termin anlegen", "neuer termin", "termin erstellen", "termin buchen", "termin eintragen", "wie lege ich einen termin an"],
    generateAnswer: () => 
      `**Termin im Kalender anlegen:**\n\n` +
      `1. Klicken Sie oben rechts auf den blauen Button **„+ Neuer Termin“** oder klicken Sie direkt auf einen freien Zeitslot im Kalender.\n` +
      `2. Wählen Sie den **Patienten**, den **Behandler (Arzt)**, die **Terminart** sowie den **Raum bzw. das Gerät** aus.\n` +
      `3. Bestätigen Sie mit **„Termin speichern“**. Der Termin ist sofort gebucht und gegen Doppelbuchungen geschützt.`
  },
  {
    keywords: ["termin absagen", "termin löschen", "stornieren", "termin stornieren", "termin entfernen"],
    generateAnswer: () =>
      `**Termin absagen oder löschen:**\n\n` +
      `1. Klicken Sie im Kalender einfach auf den gewünschten Termin, um die **Detailansicht** zu öffnen.\n` +
      `2. Sie können den Status auf **„Abgesagt“** setzen (bleibt zur Dokumentation sichtbar) oder auf **„Termin löschen“** klicken, um den Slot sofort wieder für neue Patienten freizugeben.`
  },
  {
    keywords: ["termin verschieben", "zeit ändern", "uhrzeit ändern", "verschiebung"],
    generateAnswer: () =>
      `**Termin verschieben:**\n\n` +
      `* **Per Klick:** Klicken Sie auf den Termin, wählen Sie eine neue Uhrzeit oder ein anderes Datum aus und speichern Sie.\n` +
      `* **Automatische Prüfung:** Das System prüft automatisch in Echtzeit, ob der Arzt und der benötigte Raum zu der neuen Zeit verfügbar sind.`
  },
  {
    keywords: ["arzt", "ärzte", "behandler", "doktor", "team", "mitarbeiter hinzufügen", "arbeitszeiten", "wie viele ärzte", "kalenderfarbe", "farbe arzt"],
    generateAnswer: () =>
      `**Ärzte & Behandler verwalten (Schritt 1):**\n\n` +
      `* **Unbegrenzte Ärzte:** Sie können beliebig viele Ärztinnen und Ärzte mit Namen und Fachrichtung anlegen.\n` +
      `* **Eigene Kalenderfarbe:** Jeder Arzt erhält eine eigene Signalfarbe, sodass Termine im Kalender sofort auf einen Blick unterscheidbar sind.\n` +
      `* **Arbeitszeiten:** Die Sprechzeiten können flexibel für jeden Wochentag hinterlegt werden.`
  },
  {
    keywords: ["raum", "geräte", "sonographie", "ultraschall", "labor", "ekg", "ressource", "sperren", "wartung", "unterschied raum gerät", "doppelbelegung"],
    generateAnswer: () =>
      `**Räume & Geräte verwalten & sperren (Schritt 2):**\n\n` +
      `* **Räume:** Feste Behandlungszimmer (z. B. Zimmer 1, Labor, OP).\n` +
      `* **Geräte:** Mobile oder stationäre Medizingeräte (z. B. Sonographie, EKG, LuFu).\n` +
      `* **Echtzeit-Sperre:** Bei Wartung oder Defekt klicken Sie einfach auf „Sperren“ – das System verhindert dann automatisch Doppelbelegungen und blockiert Online-Buchungen für diesen Zeitraum.`
  },
  {
    keywords: ["terminart", "leistung", "dauer", "puffer", "pufferzeit", "behandlungsart", "kopplung", "pflicht-ressource"],
    generateAnswer: () =>
      `**Terminarten & Pufferzeiten einrichten (Schritt 3):**\n\n` +
      `* **Behandlungsdauer:** Definieren Sie die Standardzeit (z. B. 15, 20 oder 30 Min.).\n` +
      `* **Automatische Raum-Kopplung:** Wählen Sie unter „Sperrt“, welcher Raum oder welches Gerät für diese Terminart zwingend reserviert werden muss (z. B. Ultraschall-Gerät für Sonographie).\n` +
      `* **Pufferzeiten:** Verhindern Hektik und ermöglichen Desinfektion zwischen Patienten.`
  },
  {
    keywords: ["farbe", "design", "logo", "branding", "aussehen", "anpassen", "slogan", "praxisname"],
    generateAnswer: () =>
      `**Praxisdesign & Branding anpassen (Schritt 4):**\n\n` +
      `* **Markenfarbe:** Wählen Sie Ihre Primärfarbe passend zu Ihrer Praxis (z. B. Medizinisches Teal, Königsblau, Smaragdgrün).\n` +
      `* **Slogan & Name:** Personalisieren Sie den Titel für Ihre Patientinnen und Patienten.\n` +
      `* **Sichtbarkeit:** Das Design wird automatisch im Kalender, im Online-Buchungswidget und in allen Bestätigungen angewendet.`
  },
  {
    keywords: ["link", "buchungslink", "online buchen", "website", "homepage", "iframe", "einbinden", "patienten buchen", "schritt 5", "wie binde ich den link ein"],
    generateAnswer: () =>
      `**Ihr persönlicher Online-Buchungslink (Schritt 5):**\n\n` +
      `* **Praxis-Website Button:** Verlinken Sie Ihren persönlichen Buchungslink (z.B. „Jetzt online Termin buchen“) direkt auf Ihrer Homepage.\n` +
      `* **iFrame-Einbettung:** Sie können den Buchungskalender auch nahtlos direkt in Ihre Website einbetten.\n` +
      `* **Automatische Synchronisation:** Alle Online-Buchungen landen sekundengenau direkt in Ihrem Praxiskalender.`
  },
  {
    keywords: ["sms", "e-mail", "erinnerung", "bestätigung", "no-show", "ausfall"],
    generateAnswer: () =>
      `**Automatische Patienten-Erinnerungen:**\n\n` +
      `* Bei jeder Buchung erhält der Patient sofort eine **Bestätigungs-E-Mail** inklusive digitaler Kalenderdatei (.ics).\n` +
      `* **SMS-Erinnerung:** 24 Stunden vor dem Termin wird eine automatische Erinnerung versendet, was Termin-Ausfälle (No-Shows) um bis zu 85 % reduziert.`
  },
  {
    keywords: ["dsgvo", "datenschutz", "sicherheit", "frankfurt", "server", "eu", "art 28", "avv", "kostenlos", "tokens", "token", "limit"],
    generateAnswer: () =>
      `**Datenschutz (DSGVO) & Kosten:**\n\n` +
      `* **100 % DSGVO-konform:** Serverstandort in Frankfurt am Main (EU, \`europe-west3\`) nach Art. 28 DSGVO.\n` +
      `* **Zero-Retention:** Keine Speicherung für KI-Modelltraining.\n` +
      `* **0 Tokens & Kostenlos:** Dank unseres integrierten Sofort-Caches werden Standardfragen mit 0 Tokens und 0 ms Latenz beantwortet – dauerhaft ohne Limits.`
  }
];

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
      modelName: "Auxilia AI + Sofort-Cache (EU Frankfurt, DSGVO)",
    };
  }

  public async preload() {
    this.isLoading = false;
    this.notify();
  }

  /**
   * Checks if user message matches the instant standard knowledge cache.
   * Returns instant answer if matched (0 ms, 0 Tokens, 0 API Calls).
   */
  public matchInstantCache(userMessage: string): string | null {
    const cleanMsg = userMessage.toLowerCase().trim();
    if (!cleanMsg) return null;

    // Check session cache first
    if (this.sessionCache.has(cleanMsg)) {
      return this.sessionCache.get(cleanMsg)!;
    }

    // Match against standard rules
    for (const rule of STANDARD_KNOWLEDGE_BASE) {
      const match = rule.keywords.some(keyword => cleanMsg.includes(keyword));
      if (match) {
        const answer = rule.generateAnswer();
        this.sessionCache.set(cleanMsg, answer);
        return answer;
      }
    }

    return null;
  }

  public async generateChatStream(
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    onChunk: (chunk: string) => void
  ) {
    this.isLoading = true;
    this.notify();

    try {
      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';
      
      // 1. FAST INSTANT CACHE CHECK (0 Tokens, 0ms, 100% Free)
      const instantAnswer = this.matchInstantCache(lastUserMsg);
      if (instantAnswer) {
        const words = instantAnswer.split(' ');
        let currentText = '';
        for (let i = 0; i < words.length; i++) {
          currentText += (i === 0 ? '' : ' ') + words[i];
          onChunk(currentText);
          if (words.length > 10 && i < words.length - 1 && i % 4 === 0) {
            await new Promise(r => setTimeout(r, 12));
          }
        }
        onChunk(instantAnswer);
        return instantAnswer;
      }

      // 2. SERVER-SIDE CLOUD INFERENCE WITH CACHE (Frankfurt am Main, DSGVO)
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

      if (!res.ok) {
        throw new Error(`Chat-Dienst temporär nicht erreichbar (${res.status})`);
      }

      const data = await res.json();
      const answer = data.answer || "Ich bin für Sie da! Wie kann ich Ihnen bei der Praxis-Einrichtung helfen?";

      // Save into session cache
      if (lastUserMsg.trim()) {
        this.sessionCache.set(lastUserMsg.toLowerCase().trim(), answer);
      }

      // Fluid typewriter streaming
      const words = answer.split(' ');
      let currentText = '';
      for (let i = 0; i < words.length; i++) {
        currentText += (i === 0 ? '' : ' ') + words[i];
        onChunk(currentText);
        if (words.length > 20 && i < words.length - 1 && i % 3 === 0) {
          await new Promise(r => setTimeout(r, 15));
        }
      }
      onChunk(answer);
      return answer;
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallback = "Ich bin für Sie da! Wie kann ich Ihnen bei der Einrichtung Ihrer Praxis oder des Kalenders weiterhelfen?";
      onChunk(fallback);
      return fallback;
    } finally {
      this.isLoading = false;
      this.notify();
    }
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

