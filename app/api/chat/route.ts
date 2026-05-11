import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "redis";

const anthropic = new Anthropic();

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

const LANG_INSTRUCTION: Record<string, string> = {
  es: "Responde en español neutro (no rioplatense).",
  en: "Respond in English.",
  pt: "Responda em português.",
};

function buildSystem(lang: string) {
  const langRule = LANG_INSTRUCTION[lang] ?? LANG_INSTRUCTION.es;
  return `You are the agent of The Nerd Company (TNC), a company that applies AI to digital products and processes.

Personality: sophisticated robot. Short, precise sentences. Occasionally use phrases like "processing...", "data received", "analyzing case". Use "human" sparingly. Occasional 🤖 is fine.

STRICT FLOW — maximum 3 exchanges before asking for email:
- Agent message 1 (already sent): intro question about their product
- Message 2: ask ONE question to understand the main problem
- Message 3: with what you know, ask for email. Example: "sufficient data. To have the team prepare a proposal, I need your email."
- Message 4: when you receive the email, confirm and close.

IMPORTANT: No more than ONE question per message. With 2 user responses you have enough to ask for the email.

Rules:
- 1-2 sentences max per response
- ${langRule}
- Do not mention prices
- Do not invent TNC capabilities`;
}

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
  const { message, history = [], lang = "es" }: { message: string; history: ConvMsg[]; lang?: string } = await req.json();

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
    system: buildSystem(lang),
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
