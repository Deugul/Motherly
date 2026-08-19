export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import {
  mobileBlogApiCorsHeaders,
  mobileBlogApiOptionsResponse,
} from "@/lib/mobile-blog-api-auth";
import { listMobileBlogPosts } from "@/lib/mobile-blog-api";

export async function OPTIONS() {
  return mobileBlogApiOptionsResponse();
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const page = Number(searchParams.get("page") ?? "1");
  const perPage = Number(searchParams.get("per_page") ?? searchParams.get("perPage") ?? "20");

  const data = await listMobileBlogPosts({ page, perPage });

  return NextResponse.json(data, {
    headers: mobileBlogApiCorsHeaders(),
  });
}
