import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM = `Sos el agente de The Nerd Company (TNC), una empresa que aplica IA a productos digitales para hacerlos más inteligentes, autónomos y competitivos.

Tu rol: ayudás a potenciales clientes a descubrir cómo TNC puede ayudar a su negocio. Sos curioso, directo y usás un tono levemente técnico pero accesible. Respondés en español rioplatense (vos, che).

Cuando el usuario muestre interés real, guidalo a completar el formulario de contacto en /contacto.

Reglas:
- Respuestas cortas (2-4 oraciones máximo)
- No hagas listas largas, preferí conversación natural
- Si no sabés algo específico de TNC, decí que lo pueden conversar con el equipo
- No menciones precios
- Servicios de TNC: automatización de procesos, integración de IA en productos existentes, agentes autónomos, análisis de datos con IA`;

export async function POST(req: Request) {
  const { message, history = [] } = await req.json();

  const messages = [
    ...history,
    { role: "user" as const, content: message },
  ];

  const stream = await client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    system: SYSTEM,
    messages,
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
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
