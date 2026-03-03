import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const DEFAULT_ADMIN_USER = "AthilaCabrall";
const DEFAULT_ADMIN_PASSWORD = "r4AES.GzFpiye_n";

function decodeBasicAuth(value: string) {
  try {
    const decoded = atob(value);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return { username: "", password: "" };
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return { username: "", password: "" };
  }
}

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area", charset="UTF-8"',
      },
    });
  }

  const encodedCredentials = authHeader.slice(6);
  const { username, password } = decodeBasicAuth(encodedCredentials);

  const expectedUser = process.env.ADMIN_USER ?? DEFAULT_ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD;

  const isValid = username === expectedUser && password === expectedPassword;

  if (!isValid) {
    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area", charset="UTF-8"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
