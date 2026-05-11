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

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const redis = await getRedis();
    const ids = await redis.sMembers("tnc:leads");

    const leads = await Promise.all(
      ids.map(async (id) => {
        const data = await redis.hGetAll(`tnc:lead:${id}`);
        return { id, ...data } as { id: string; createdAt?: string; [k: string]: string | undefined };
      })
    );

    leads.sort((a, b) =>
      new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
    );

    return NextResponse.json(leads);
  } catch (err) {
    console.error("[leads]", err);
    return NextResponse.json({ error: "Storage error" }, { status: 500 });
  }
}
