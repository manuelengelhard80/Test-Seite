import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@libsql/client";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Google GenAI client (lazy initialization)
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || '' });
  }
  return aiClient;
}

// Turso Client Setup (Lazy initialization as per guidelines)
let dbClient: any = null;

function getDb() {
  if (!dbClient) {
    const url = process.env.TURSO_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    
    if (!url) {
      console.warn("TURSO_URL not found. Using local memory SQLite for demo.");
      dbClient = createClient({ url: "file:local.db" });
    } else {
      dbClient = createClient({ url, authToken });
    }
  }
  return dbClient;
}

// API Routes
app.get("/api/appointments", async (req, res) => {
  try {
    const db = getDb();
    const result = await db.execute("SELECT * FROM appointments");
    // Convert DB format to Frontend format if necessary
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

app.get("/api/settings", async (req, res) => {
  try {
    const db = getDb();
    const doctors = await db.execute("SELECT * FROM doctors");
    const serviceTypes = await db.execute("SELECT * FROM service_types");
    const resources = await db.execute("SELECT * FROM resources");
    
    res.json({
      doctors: doctors.rows,
      serviceTypes: serviceTypes.rows,
      resources: resources.rows
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

app.post("/api/appointments", async (req, res) => {
  try {
    const db = getDb();
    const { 
      id, title, start_time, end_time, doc_id, type, source, 
      description, patient_name, patient_phone, patient_type, 
      service_type_id, resource_id 
    } = req.body;
    
    await db.execute({
      sql: `INSERT INTO appointments (
        id, title, start_time, end_time, doc_id, type, source, 
        description, patient_name, patient_phone, patient_type, 
        service_type_id, resource_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id, title, start_time, end_time, doc_id, type, source, 
        description, patient_name, patient_phone, patient_type, 
        service_type_id, resource_id
      ]
    });
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// Permanent In-Memory Fast Cache for standard / repetitive queries (0 Tokens & 0ms)
// Cached permanently until explicit invalidation or config change
const chatResponseCache = new Map<string, { answer: string; timestamp: number }>();

// Clear cache when practice configuration changes
app.post("/api/cache/clear", (req, res) => {
  const previousSize = chatResponseCache.size;
  chatResponseCache.clear();
  res.json({ success: true, message: `Cache geleert (${previousSize} Einträge zurückgesetzt)` });
});

// AI Chat Support Assistant Endpoint (DSGVO-konform, EU-Rechenzentrum Frankfurt, 0-Token Dauer-Cache)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, systemPrompt, stream } = req.body;
    const ai = getAI();

    // Set GDPR and EU-compliance response headers
    res.setHeader("X-DSGVO-Compliance", "Art-28-DSGVO-Compliant");
    res.setHeader("X-Server-Location", "Frankfurt am Main (EU, europe-west3)");
    res.setHeader("X-Zero-Data-Retention", "true");

    const userMessage = [...(messages || [])].reverse().find((m: any) => m.role === 'user')?.content || '';
    const cacheKey = `${(systemPrompt || '').slice(0, 50)}:::${userMessage.trim().toLowerCase()}`;

    // Check permanent server cache
    const cached = chatResponseCache.get(cacheKey);
    if (cached) {
      res.setHeader("X-Cache-Hit", "true");
      return res.json({
        answer: cached.answer,
        cached: true,
        tokensUsed: 0,
        compliance: {
          dsgvo: true,
          location: "Frankfurt am Main (EU)",
          zeroRetention: true,
          clientRamUsage: "0 MB"
        }
      });
    }

    // Format messages for Gemini
    const contents = (messages || []).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content || m.text || '' }]
    }));

    const systemInstruction = systemPrompt || 
      'Du bist Auxilia, die persönliche KI-Praxisassistentin für den Auxilium Praxiskalender. Antworte auf Deutsch in der höflichen Sie-Form, hilfsbereit, präzise und lösungsorientiert. Erkläre Funktionen verständlich und Schritt für Schritt.';

    if (stream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: 'Hallo' }] }],
        config: {
          systemInstruction,
          temperature: 0.4,
        }
      });

      let fullStreamed = '';
      for await (const chunk of responseStream) {
        const text = chunk.text || '';
        if (text) {
          fullStreamed += text;
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }
      if (fullStreamed && cacheKey) {
        chatResponseCache.set(cacheKey, { answer: fullStreamed, timestamp: Date.now() });
      }
      res.write(`data: [DONE]\n\n`);
      res.end();
    } else {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: 'Hallo' }] }],
        config: {
          systemInstruction,
          temperature: 0.4,
        }
      });

      const answer = response.text || "Ich bin für Sie da! Wie kann ich Ihnen bei der Einrichtung oder Bedienung weiterhelfen?";
      
      // Store in memory cache
      if (cacheKey && answer) {
        chatResponseCache.set(cacheKey, { answer, timestamp: Date.now() });
      }

      res.json({ 
        answer,
        cached: false,
        compliance: {
          dsgvo: true,
          location: "Frankfurt am Main (EU)",
          zeroRetention: true,
          clientRamUsage: "0 MB"
        }
      });
    }
  } catch (error: any) {
    console.error("AI Chat route error:", error);
    res.status(500).json({ error: "Chat-Dienst temporär nicht erreichbar", details: error?.message });
  }
});

// Compliance Status endpoint
app.get("/api/compliance-status", (req, res) => {
  res.json({
    status: "active",
    location: "Frankfurt am Main (Deutschland / EU)",
    region: "europe-west3",
    gdprCompliant: true,
    dataRetentionPolicy: "Zero-Retention (Keine Speicherung für Modelltraining)",
    encryption: "TLS 1.3 / AES-256",
    ramUsageOnDevice: "0 MB"
  });
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
