import { getCookie } from "@/lib/cookies";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const sessionId = getCookie(req, "session");
    if (!sessionId)
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );

    const sessionRaw = await redis.get(`session:${sessionId}`);
    if (!sessionRaw) {
      return NextResponse.json({ error: "Session not found" }, { status: 401 });
    }

    const session =
      typeof sessionRaw === "string" ? JSON.parse(sessionRaw) : sessionRaw;

    const userId = session.id;

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ tasks, userId: session.id });
  } catch (error) {
    console.error("error fetching tasks", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
