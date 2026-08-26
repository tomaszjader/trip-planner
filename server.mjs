import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT) || 8787;
const rootDir = path.dirname(fileURLToPath(import.meta.url));
const requestLog = new Map();
const allowedModels = {
  openai: new Set(['gpt-4o-mini', 'gpt-4o', 'gpt-4.5-preview', 'o3-mini', 'o1', 'gpt-4-turbo']),
  gemini: new Set(['gemini-2.0-flash', 'gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.0-pro-exp-02-05', 'gemini-1.5-pro', 'gemini-1.5-flash'])
};

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

app.use('/api', (request, response, next) => {
  const now = Date.now();
  const key = request.ip || 'unknown';
  const recent = (requestLog.get(key) || []).filter(timestamp => now - timestamp < 60_000);
  if (recent.length >= 20) return response.status(429).json({ error: 'Too many requests' });
  recent.push(now);
  requestLog.set(key, recent);
  next();
});

function cleanJson(text) {
  return JSON.parse(text.replace(/```json/gi, '').replace(/```/g, '').trim());
}

async function callOpenAI({ model, systemInstruction, prompt }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    }),
    signal: AbortSignal.timeout(90_000)
  });

  if (!response.ok) throw new Error(`OpenAI returned ${response.status}`);
  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('OpenAI returned an empty response');
  return cleanJson(text);
}

async function callGemini({ model, prompt }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

  const targetModel = model || 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(targetModel)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, responseMimeType: 'application/json' }
    }),
    signal: AbortSignal.timeout(90_000)
  });

  if (!response.ok) throw new Error(`Gemini returned ${response.status}`);
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned an empty response');
  return cleanJson(text);
}

async function runProvider(provider, payload) {
  if (!allowedModels[provider]?.has(payload.model)) throw new Error('Unsupported AI model');
  if (provider === 'openai') return callOpenAI(payload);
  if (provider === 'gemini') return callGemini(payload);
  throw new Error('Unsupported AI provider');
}

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    providers: {
      openai: Boolean(process.env.OPENAI_API_KEY),
      gemini: Boolean(process.env.GEMINI_API_KEY)
    }
  });
});

app.post('/api/trips', async (request, response) => {
  const { provider, model, prompt } = request.body ?? {};
  if (typeof prompt !== 'string' || prompt.length < 20 || prompt.length > 100_000) {
    return response.status(400).json({ error: 'Invalid trip prompt' });
  }

  try {
    response.json(await runProvider(provider, {
      model,
      systemInstruction: 'Zwracaj wyłącznie poprawny JSON zgodny z żądaną strukturą planu podróży.',
      prompt
    }));
  } catch (error) {
    console.error('Trip generation failed:', error instanceof Error ? error.message : error);
    response.status(503).json({ error: 'AI service is currently unavailable' });
  }
});

app.post('/api/chat', async (request, response) => {
  const { provider, model, systemInstruction, conversationContext } = request.body ?? {};
  if (
    typeof systemInstruction !== 'string' || systemInstruction.length > 20_000 ||
    typeof conversationContext !== 'string' || conversationContext.length > 100_000
  ) {
    return response.status(400).json({ error: 'Invalid chat payload' });
  }

  try {
    response.json(await runProvider(provider, {
      model,
      systemInstruction,
      prompt: conversationContext
    }));
  } catch (error) {
    console.error('Chat request failed:', error instanceof Error ? error.message : error);
    response.status(503).json({ error: 'AI service is currently unavailable' });
  }
});

app.use(express.static(path.join(rootDir, 'dist')));
app.use((_request, response) => response.sendFile(path.join(rootDir, 'dist', 'index.html')));

app.listen(port, () => {
  console.log(`VoyageAI server listening on http://localhost:${port}`);
});
