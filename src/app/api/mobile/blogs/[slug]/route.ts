export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import {
  isMobileBlogApiAuthorized,
  mobileBlogApiCorsHeaders,
  mobileBlogApiOptionsResponse,
  mobileBlogApiUnauthorizedResponse,
} from "@/lib/mobile-blog-api-auth";
import { getMobileBlogPost } from "@/lib/mobile-blog-api";

type RouteContext = { params: Promise<{ slug: string }> };

export async function OPTIONS() {
  return mobileBlogApiOptionsResponse();
}

export async function GET(req: NextRequest, context: RouteContext) {
  if (!isMobileBlogApiAuthorized(req)) {
    return mobileBlogApiUnauthorizedResponse();
  }

  const { slug } = await context.params;
  const post = await getMobileBlogPost(slug);

  if (!post) {
    return NextResponse.json(
      { error: "Not found", message: `No blog post found for slug "${slug}".` },
      { status: 404, headers: mobileBlogApiCorsHeaders() }
    );
  }

  return NextResponse.json(post, {
    headers: mobileBlogApiCorsHeaders(),
  });
}
