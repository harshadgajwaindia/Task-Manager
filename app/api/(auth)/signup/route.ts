import { generateSalt, hashPassword } from "@/auth/passwordHasher";
import { createUserSession, SESSION_EXPIRATION_SECONDS } from "@/auth/session";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    const user = await prisma.taskUser.create({
      data: {
        name,
        email,
        salt,
        hashedPassword,
      },
    });

    const sessionData = { name, email, id: user.id };
    const sessionId = await createUserSession(sessionData);

    const response = NextResponse.json({ message: "User Registered" });

    response.cookies.set("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: SESSION_EXPIRATION_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("signup error", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
