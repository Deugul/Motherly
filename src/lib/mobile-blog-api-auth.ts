import { NextRequest, NextResponse } from "next/server";

const API_KEY_ENV = "MOBILE_BLOG_API_KEY";

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
  const expected = process.env[API_KEY_ENV]?.trim();
  if (!expected) return false;
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
