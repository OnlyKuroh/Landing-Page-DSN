import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "r4AES.GzFpiye_n";
const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "dev-secret-change-in-production"
);

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { verified: false, error: "Senha incorreta" },
        { status: 401 }
      );
    }

    // Create JWT session (valid 7 days)
    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    const response = NextResponse.json({ verified: true });
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { verified: false, error: "Erro interno" },
      { status: 500 }
    );
  }
}
