import prisma from "@/lib/prisma";
import { createUserSession, SESSION_EXPIRATION_SECONDS } from "@/auth/session";
import { NextRequest, NextResponse } from "next/server";
import { comparePasswords } from "@/auth/passwordHasher";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Incorrect email or password" },
        { status: 400 }
      );
    }

    const user = await prisma.taskUser.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const salt = user.salt;
    const hashedPassword = user.hashedPassword;

    if (!(await comparePasswords({ password, salt, hashedPassword }))) {
      return NextResponse.json(
        { message: "Incorrect email or password!" },
        { status: 401 }
      );
    }

    const sessionId = await createUserSession({
      id: user.id,
      email,
      name: user.name,
    });

    const response = NextResponse.json({ message: "Login successful" });

    response.cookies.set("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_EXPIRATION_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
