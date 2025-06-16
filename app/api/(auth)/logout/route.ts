import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const response = NextResponse.redirect(new URL("/login", origin));

  response.cookies.set("session", "", {
    maxAge: 0,
    path: "/",           
    secure: process.env.NODE_ENV === "production",        
    sameSite: "lax",    
  });

  return response;
}
