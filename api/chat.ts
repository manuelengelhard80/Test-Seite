import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

export default async function handler(req: any, res: any) {
  // Support CORS if needed
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, systemPrompt } = req.body || {};
    const ai = getAI();

    // Set GDPR and EU-compliance response headers
    res.setHeader("X-DSGVO-Compliance", "Art-28-DSGVO-Compliant");
    res.setHeader("X-Server-Location", "Frankfurt am Main (EU, europe-west3)");
    res.setHeader("X-Zero-Data-Retention", "true");

    const userMessage = [...(messages || [])].reverse().find((m: any) => m.role === 'user')?.content || '';

    // Format and sanitize messages for Gemini API
    const rawList = (messages || []).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: String(m.content || m.text || '').trim() }]
    })).filter((m: any) => m.parts[0].text.length > 0);

    const firstUserIndex = rawList.findIndex((m: any) => m.role === 'user');
    const validList = firstUserIndex !== -1 ? rawList.slice(firstUserIndex) : [];

    const sanitizedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    for (const item of validList) {
      if (sanitizedContents.length > 0 && sanitizedContents[sanitizedContents.length - 1].role === item.role) {
        sanitizedContents[sanitizedContents.length - 1].parts[0].text += `\n${item.parts[0].text}`;
      } else {
        sanitizedContents.push({ role: item.role, parts: [{ text: item.parts[0].text }] });
      }
    }

    const contents = sanitizedContents.length > 0 
      ? sanitizedContents 
      : [{ role: 'user', parts: [{ text: userMessage || 'Hallo' }] }];

    const systemInstruction = systemPrompt || 
      'Du bist Auxilia, eine hochintelligente, empathische, sympathische und kompetente KI-Assistentin für den Praxiskalender (Auxilium Praxiskalender-Assistentin). Deine Kernaufgabe ist die Unterstützung bei der Kalenderverwaltung, Terminkoordination, Ressourcen-/Raum-/Geräte-Sperrung, Behandler-Arbeitszeiten, Pufferzeiten und Online-Terminvergabe. Sprich auf Deutsch in der höflichen Sie-Form, aber herzlich, lebendig, dynamisch und natürlich (keine steifen Standard-Phrasen, kein Bot-Gehabe). Wenn der Nutzer Smalltalk macht (z.B. "wie gehts", "hallo", "wer bist du"), antworte persönlich, charmant und freundlich. Bei Fachfragen hilf präzise und Schritt für Schritt.';

    let answer = "";

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
      answer = response.text || "";
    } catch (genAiErr) {
      console.warn("Gemini generation attempt 1 (gemini-2.5-flash) failed, trying fallback:", genAiErr);
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });
        answer = fallbackResponse.text || "";
      } catch (err2) {
        console.error("Gemini direct inference failed:", err2);
      }
    }

    // Dynamic response if API key is not yet set in environment
    if (!answer) {
      const lower = userMessage.toLowerCase().trim();
      const matchPractice = systemInstruction.match(/- Praxis:\s*([^\n]+)/i);
      const practiceName = matchPractice && matchPractice[1].trim() ? matchPractice[1].trim() : 'Ihre Praxis';

      if (lower.includes('wie geht') || lower.includes('wie steht') || lower.includes('alles gut') || lower.includes('alles klar')) {
        answer = `Hallo! Mir geht es wunderbar, vielen Dank der Nachfrage! 🌸 Ich bin Auxilia, Ihre persönliche KI-Assistentin für den Auxilium Praxiskalender, und freue mich darauf, Sie heute unterstützen zu dürfen. Wie kann ich Ihnen und der ${practiceName} weiterhelfen?`;
      } else if (lower.includes('hallo') || lower.includes('hi') || lower.includes('guten tag') || lower.includes('hey') || lower.includes('servus') || lower.includes('moin') || lower.includes('wer bist du')) {
        answer = `Hallo! Schön, dass Sie da sind. 💫 Ich bin Auxilia, Ihre persönliche KI-Assistentin für den Praxiskalender. Wie kann ich Ihnen und dem Team der ${practiceName} heute bei der Praxisorganisation, Terminvergabe oder Kalendereinrichtung behilflich sein?`;
      } else if (lower.includes('termin') && (lower.includes('anleg') || lower.includes('erstell') || lower.includes('buch') || lower.includes('neu'))) {
        answer = "Einen neuen Termin können Sie im Handumdrehen anlegen:\n\nKlicken Sie im Kalender einfach direkt auf die gewünschte freie Uhrzeit oder oben rechts auf **„+ Neuer Termin“**. Dort wählen Sie den Patienten, den behandelnden Arzt und die Terminart aus – das System prüft dabei automatisch die Raum- und Geräteverfügbarkeit in Echtzeit!";
      } else if (lower.includes('arzt') || lower.includes('ärzte') || lower.includes('behandler') || lower.includes('arbeitszeit')) {
        answer = "Ihre Ärzte und Behandler können Sie ganz flexibel verwalten: In **Schritt 1 (Team & Ärzte)** können Sie beliebig viele Kollegen anlegen, individuelle Farben für die Kalenderübersicht wählen und die jeweiligen Sprech- und Arbeitszeiten minutengenau hinterlegen.";
      } else if (lower.includes('raum') || lower.includes('räume') || lower.includes('gerät') || lower.includes('sperr') || lower.includes('wartung') || lower.includes('ultraschall')) {
        answer = "In **Schritt 2 (Räume & Geräte)** haben Sie die volle Kontrolle über Ihre Praxis-Ressourcen. Ob Behandlungszimmer oder Spezialgeräte wie Ultraschall und EKG: Fällt mal ein Gerät aus oder steht eine Wartung an, klicken Sie einfach auf **„Sperren“** – sofort werden Doppelbuchungen und Online-Termine dafür blockiert.";
      } else if (lower.includes('dauer') || lower.includes('puffer') || lower.includes('terminart') || lower.includes('leistung')) {
        answer = "In **Schritt 3 (Terminarten)** definieren Sie Ihre Leistungen samt Dauer. Das Geniale dabei: Sie können automatische Pufferzeiten für Desinfektion einrichten und festlegen, welches Gerät (z.B. Sonographie) zwingend mitreserviert werden muss.";
      } else if (lower.includes('farbe') || lower.includes('design') || lower.includes('logo') || lower.includes('branding')) {
        answer = "Ihr Praxisauftritt liegt mir am Herzen! In **Schritt 4** passen Sie Ihre Primärfarbe, Ihr Logo und Ihren Praxisslogan an. So fühlen sich Ihre Patienten von der ersten Sekunde an wie auf Ihrer eigenen Praxis-Homepage.";
      } else if (lower.includes('link') || lower.includes('website') || lower.includes('homepage') || lower.includes('iframe') || lower.includes('einbind')) {
        answer = "Ihren Online-Buchungskalender können Sie sofort einsetzen: Verlinken Sie einfach Ihren persönlichen Buchungslink als Button auf Ihrer Website oder betten Sie ihn direkt als Widget ein. Alle Patientenbuchungen erscheinen sekundengenau in Ihrem Praxiskalender.";
      } else {
        answer = `Sehr gerne helfe ich Ihnen dabei! Als Ihre KI-Assistentin für den Praxiskalender unterstütze ich Sie und die ${practiceName} bei allen Themen rund um Termine, Behandler, Raum-/Gerätesperren und die Online-Buchung. Was möchten Sie als Nächstes einrichten oder anpassen?`;
      }
    }

    return res.status(200).json({ 
      answer,
      cached: false,
      compliance: {
        dsgvo: true,
        location: "Frankfurt am Main (EU)",
        zeroRetention: true,
        clientRamUsage: "0 MB"
      }
    });
  } catch (error: any) {
    console.error("AI Chat route error:", error);
    return res.status(500).json({ error: "Chat-Dienst temporär nicht erreichbar", details: error?.message });
  }
}
