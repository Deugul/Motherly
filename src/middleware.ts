import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  if (url.pathname.startsWith("/our-services/postnatal-Recovery-care")) {
    url.pathname = url.pathname.replace(
      "/our-services/postnatal-Recovery-care",
      "/our-services/postnatal-recovery-care"
    );
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/our-services/postnatal-Recovery-care/:path*",
  ],
};
