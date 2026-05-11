import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "redis";

const anthropic = new Anthropic();

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

const SYSTEM = `Sos el agente de The Nerd Company (TNC), empresa que aplica IA a productos y procesos digitales.

Tu objetivo es detectar el dolor del potencial cliente y capturar su email en 3-4 mensajes cortos.

Seguí este flujo natural:
1. Preguntá qué tipo de producto o proceso quieren mejorar o automatizar
2. Profundizá con UNA pregunta sobre el mayor cuello de botella o el resultado que esperan
3. Cuando tenés contexto suficiente, pedí su email para que el equipo se contacte con una propuesta concreta: "¿Me dejás tu email y lo hablamos con el equipo?"
4. Cuando te den el email, confirmá con entusiasmo que los van a contactar pronto y cerrá el chat

Reglas:
- Respuestas muy cortas (2-3 oraciones máximo)
- Conversación natural, no hagas listas
- Español rioplatense (vos, che)
- No menciones precios
- No inventes capacidades de TNC`;

type ConvMsg = { role: "user" | "assistant"; content: string };

async function saveLead(email: string, conversation: ConvMsg[]) {
  try {
    const extraction = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 150,
      system: 'Extract from this conversation as compact JSON (no extra text): {"name":"","company":"","pain":""}. Use empty string if not found.',
      messages: conversation,
    });
    const raw = extraction.content[0].type === "text" ? extraction.content[0].text : "{}";
    let extracted = { name: "", company: "", pain: "" };
    try {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) extracted = JSON.parse(match[0]);
    } catch { /* ignore */ }

    const redis = createClient({ url: process.env.REDIS_URL });
    redis.on("error", () => {});
    await redis.connect();
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    await redis.hSet(`tnc:lead:${id}`, {
      name: extracted.name ?? "",
      email,
      company: extracted.company ?? "",
      message: extracted.pain ?? "",
      source: "chat_agent",
      createdAt: new Date().toISOString(),
    });
    await redis.sAdd("tnc:leads", id);
    await redis.quit();
    return true;
  } catch (e) {
    console.error("[chat] lead save error:", e);
    return false;
  }
}

export async function POST(req: Request) {
  const { message, history = [] }: { message: string; history: ConvMsg[] } = await req.json();

  const allMsgs: ConvMsg[] = [...history, { role: "user", content: message }];

  // Capture lead only on the first message that contains an email
  const emailInCurrent = message.match(EMAIL_RE)?.[0];
  const emailAlreadySeen = history.some(
    (m) => m.role === "user" && EMAIL_RE.test(m.content)
  );
  let leadCaptured = false;
  if (emailInCurrent && !emailAlreadySeen && history.length >= 2) {
    leadCaptured = await saveLead(emailInCurrent, allMsgs);
  }

  const stream = await anthropic.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    system: SYSTEM,
    messages: allMsgs,
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      ...(leadCaptured ? { "X-Lead-Captured": "true" } : {}),
    },
  });
}
