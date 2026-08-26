import { CreateMLCEngine } from '@mlc-ai/web-llm';

// In WebLLM, SmolLM2 360M is the official lightest standard model in prebuiltAppConfig
export const DEFAULT_LLAMA_MODEL = 'SmolLM2-360M-Instruct-q4f16_1-MLC';

class LlamaManager {
  private engine: any | null = null;
  private isLoading = false;
  private loadProgress = 0;
  private loadError: string | null = null;
  private listeners: Array<() => void> = [];

  constructor() {
    // Start background preload immediately
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.preload();
      }, 100);
    }
  }

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
      engine: this.engine,
      isLoaded: !!this.engine,
      isLoading: this.isLoading,
      progress: this.loadProgress,
      error: this.loadError,
      modelName: DEFAULT_LLAMA_MODEL,
    };
  }

  public async preload() {
    if (this.engine || this.isLoading) return;

    if (typeof navigator === 'undefined' || !(navigator as any).gpu) {
      this.loadError = 'WebGPU wird von diesem Browser nicht unterstützt.';
      this.notify();
      return;
    }

    this.isLoading = true;
    this.loadProgress = 0;
    this.loadError = null;
    this.notify();

    try {
      // Try high-performance adapter first, then low-power, then any adapter
      let adapter = null;
      try {
        adapter = await (navigator as any).gpu.requestAdapter({ powerPreference: 'high-performance' });
      } catch (_) {}

      if (!adapter) {
        try {
          adapter = await (navigator as any).gpu.requestAdapter({ powerPreference: 'low-power' });
        } catch (_) {}
      }

      if (!adapter) {
        try {
          adapter = await (navigator as any).gpu.requestAdapter();
        } catch (_) {}
      }

      if (!adapter) {
        throw new Error('WebGPU-Grafikbeschleunigung ist in Ihrem Browser deaktiviert oder in der iFrame-Sandbox blockiert. Bitte öffnen Sie die App in einem separaten Tab oder aktivieren Sie WebGPU in den Browser-Einstellungen.');
      }

      this.engine = await CreateMLCEngine(DEFAULT_LLAMA_MODEL, {
        initProgressCallback: (report) => {
          if (report.progress !== undefined) {
            this.loadProgress = Math.round(report.progress * 100);
            this.notify();
          }
        },
      });

      this.isLoading = false;
      this.loadError = null;
      this.notify();
    } catch (err: any) {
      console.warn('Llama preload background error:', err);
      this.isLoading = false;
      this.loadError = err?.message || 'Fehler beim Laden von Llama über WebGPU';
      this.notify();
    }
  }

  public async generateChatStream(
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    onChunk: (chunk: string) => void
  ) {
    if (!this.engine) {
      if (!this.isLoading) {
        await this.preload();
      }
      if (!this.engine) {
        throw new Error(this.loadError || 'Llama Modell ist noch nicht geladen.');
      }
    }

    const asyncChunkGenerator = await this.engine.chat.completions.create({
      messages,
      temperature: 0.2,
      top_p: 0.8,
      max_tokens: 160,
      stream: true,
    });

    let fullText = '';
    for await (const chunk of asyncChunkGenerator) {
      const delta = chunk.choices[0]?.delta?.content || '';
      fullText += delta;
      onChunk(fullText);
    }

    return fullText;
  }

  public async generateChat(messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>) {
    return this.generateChatStream(messages, () => {});
  }
}

export const globalLlama = new LlamaManager();
