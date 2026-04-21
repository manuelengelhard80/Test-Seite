import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMedicalSummary = async (notes: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Du bist ein intelligenter KI-Telefonassistent für eine Arztpraxis.
      Deine Aufgabe ist es, das folgende Transkript eines Patientenanrufs zu analysieren und strukturierte Daten zu extrahieren.
      
      Extrahiere folgende Informationen im JSON-ähnlichen Format (aber lesbar):
      - Anliegen (z.B. Terminwunsch, Rezept, Notfall)
      - Patienten-Name (falls genannt)
      - Gewünschter Zeitraum/Medikament
      - Dringlichkeit (Niedrig/Mittel/Hoch)
      - Vorgeschlagene Antwort/Aktion für das Personal

      Transkript: "${notes}"
      
      Antworte professionell, kurz und präzise auf Deutsch.`,
    });

    return response.text || "Konnte den Anruf nicht analysieren.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Fehler bei der Verarbeitung. Bitte überprüfen Sie die Verbindung.";
  }
};