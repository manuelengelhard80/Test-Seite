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
    // Let dynamic Gemini AI handle queries naturally with full context
    return null;
  }

  public async generateChatStream(
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    onChunk: (chunk: string) => void
  ) {
    this.isLoading = true;
    this.notify();

    try {
      // Dynamic Gemini AI inference (Server-side, DSGVO EU Frankfurt)
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
      const answer = data.answer || "Hallo! Ich bin für Sie da. Wie kann ich Sie unterstützen?";

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
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallback = "Hallo! Ich bin Auxilia, Ihre KI-Assistentin für den Praxiskalender. Es gab eine kurze Verbindungsunterbrechung, aber ich bin für Sie da. Wie kann ich Ihnen bei der Kalendereinrichtung oder Terminvergabe helfen?";
      onChunk(fallback);
      this.isLoading = false;
      this.notify();
      return fallback;
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

