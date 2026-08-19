import { NextRequest, NextResponse } from "next/server";
import { MOBILE_BLOG_API_KEY as MOBILE_BLOG_API_KEY_BUILTIN } from "@/config/mobile-blog-api-key";

function getExpectedMobileBlogApiKey(): string {
  const fromEnv = process.env.MOBILE_BLOG_API_KEY?.trim();
  return fromEnv || MOBILE_BLOG_API_KEY_BUILTIN;
}

export function readMobileBlogApiKey(req: NextRequest): string | null {
  const headerKey = req.headers.get("x-api-key")?.trim();
  if (headerKey) return headerKey;

  const auth = req.headers.get("authorization")?.trim();
  if (auth?.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }

  return null;
}

export function isMobileBlogApiAuthorized(req: NextRequest): boolean {
  const expected = getExpectedMobileBlogApiKey();
  const provided = readMobileBlogApiKey(req);
  return Boolean(provided && provided === expected);
}

export function mobileBlogApiUnauthorizedResponse(): NextResponse {
  return NextResponse.json(
    {
      error: "Unauthorized",
      message:
        "Provide a valid API key via the X-API-Key header or Authorization: Bearer <key>.",
    },
    { status: 401, headers: mobileBlogApiCorsHeaders() }
  );
}

export function mobileBlogApiCorsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "X-API-Key, Authorization, Content-Type",
  };
}

export function mobileBlogApiOptionsResponse(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: mobileBlogApiCorsHeaders(),
  });
}
