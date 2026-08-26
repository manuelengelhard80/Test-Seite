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

// AI Chat Support Assistant Endpoint (Fallback if local WebLLM is not loaded or initializing)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;
    const ai = getAI();

    // Format messages for Gemini
    const contents = (messages || []).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content || m.text || '' }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: 'Hallo' }] }],
      config: {
        systemInstruction: systemPrompt || 'Du bist Auxilia, die freundliche KI-Praxisassistentin für den Auxilium Praxiskalender. Antworte auf Deutsch in der höflichen Sie-Form, hilfsbereit, präzise und lösungsorientiert.',
        temperature: 0.7,
      }
    });

    const answer = response.text || "Ich bin für Sie da! Wie kann ich Ihnen bei der Einrichtung oder Bedienung weiterhelfen?";
    res.json({ answer });
  } catch (error: any) {
    console.error("AI Chat route error:", error);
    res.status(500).json({ error: "Chat service currently unavailable", details: error?.message });
  }
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
