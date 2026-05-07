import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

let client: ReturnType<typeof createClient> | null = null;

async function getRedis() {
  if (!client || !client.isOpen) {
    client = createClient({ url: process.env.REDIS_URL });
    client.on("error", () => { client = null; });
    await client.connect();
  }
  return client;
}

export async function POST(req: NextRequest) {
  let name: string, email: string, company: string, message: string;

  try {
    const body = await req.json();
    name = body.name;
    email = body.email;
    company = body.company;
    message = body.message;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const redis = await getRedis();
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    await redis.hSet(`tnc:lead:${id}`, {
      name: name ?? "",
      email,
      company: company ?? "",
      message: message ?? "",
      createdAt: new Date().toISOString(),
    });

    // Index by email for quick lookup
    await redis.sAdd("tnc:leads", id);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[subscribe] Redis error:", err);
    return NextResponse.json({ error: "Storage error" }, { status: 500 });
  }
}
