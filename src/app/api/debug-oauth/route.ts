export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID ?? "";
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ?? "";

  if (!code) {
    // Step 1: redirect to GitHub OAuth to get a real code
    const authUrl = new URL("https://github.com/login/oauth/authorize");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set(
      "redirect_uri",
      "https://motherly-two.vercel.app/api/debug-oauth"
    );
    authUrl.searchParams.set("scope", "repo");
    return Response.redirect(authUrl.toString());
  }

  // Step 2: exchange the real code and show raw GitHub response
  const url = new URL("https://github.com/login/oauth/access_token");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("client_secret", clientSecret);
  url.searchParams.set("code", code);

  const tokenRes = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json" },
  });

  const rawData = await tokenRes.json();

  return Response.json({
    status: tokenRes.status,
    fieldsReturned: Object.keys(rawData),
    error: rawData.error ?? null,
    hasAccessToken: !!rawData.access_token,
    hasRefreshToken: !!rawData.refresh_token,
    hasExpiresIn: !!rawData.expires_in,
    hasRefreshTokenExpiresIn: !!rawData.refresh_token_expires_in,
    tokenType: rawData.token_type ?? null,
    scope: rawData.scope ?? null,
  });
}
