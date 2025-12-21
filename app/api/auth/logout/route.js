import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

function clearAuthCookie(res) {
  res.cookies.set("auth_token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
}

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  // Optional: verify (you can remove if you just want to always clear)
  try {
    verifyToken(token);
  } catch (e) {
    // token invalid/expired -> still clear cookie
  }

  const res = NextResponse.json({ message: "Logged out" });
  clearAuthCookie(res);
  return res;
}

// Optional: allow GET logout too (handy for links)
export async function GET() {
  const res = NextResponse.json({ message: "Logged out" });
  clearAuthCookie(res);
  return res;
}
