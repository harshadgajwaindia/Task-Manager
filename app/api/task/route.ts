import { getCookie } from "@/lib/cookies";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();

    if (!description || typeof description !== "string")
      return NextResponse.json(
        { error: "invalid description" },
        { status: 400 }
      );

    const sessionId = getCookie(req, "session");
    if (!sessionId)
      return NextResponse.json({ error: "not authenticated" }, { status: 401 });

    const sessionRaw = await redis.get(`session:${sessionId}`);
    
    if (!sessionRaw) {
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 401 }
      );
    }

    let sessionData: { id: string };
    try {
      sessionData =
        typeof sessionRaw === "string" ? JSON.parse(sessionRaw) : sessionRaw;
     
    } catch (e) {
      console.error("Invalid session data:", e);
      return NextResponse.json(
        { success: false, error: "Invalid session format" },
        { status: 401 }
      );
    }

    if (!sessionData.id) {
      return NextResponse.json(
        { success: false, error: "Invalid session data" },
        { status: 401 }
      );
    }

    const userId = sessionData.id;

    const task = await prisma.task.create({
      data: {
        description,
        read: false,
        userId: userId,
      },
    });

    return NextResponse.json("Task created", { status: 201 });
  } catch (error) {
    console.error("Error creating Task", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
