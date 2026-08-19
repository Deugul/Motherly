import { NextResponse } from "next/server";

export function mobileBlogApiCorsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export function mobileBlogApiOptionsResponse(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: mobileBlogApiCorsHeaders(),
  });
}
