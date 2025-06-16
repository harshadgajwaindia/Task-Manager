import { NextRequest } from "next/server";

export function getCookie(req: NextRequest, name: string) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;

  const cookies = cookie.split(";").map((c) => c.trim());
  for (const c of cookies) {
    const [key, value] = c.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}
