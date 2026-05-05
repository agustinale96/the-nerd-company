import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const EMAIL_SET_KEY = "tnc:waitlist";

export async function POST(req: NextRequest) {
  let email: string;

  try {
    const body = await req.json();
    email = body.email;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(normalized)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  try {
    // SADD returns 1 if added, 0 if already exists
    const added = await redis.sadd(EMAIL_SET_KEY, normalized);

    if (added === 0) {
      return NextResponse.json({ error: "Already subscribed" }, { status: 409 });
    }

    // Store signup timestamp alongside
    await redis.hset("tnc:waitlist:meta", {
      [normalized]: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[subscribe] Redis error:", err);
    return NextResponse.json({ error: "Storage error" }, { status: 500 });
  }
}
