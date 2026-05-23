import { NextRequest } from "next/server";

export function getAdminSecret(req: NextRequest) {
  const url = new URL(req.url);
  return (
    req.headers.get("x-admin-secret") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    url.searchParams.get("secret") ||
    undefined
  );
}

export function requireAdmin(req: NextRequest) {
  if (!process.env.ADMIN_SECRET) {
    return {
      status: 503,
      body: { error: "Admin not configured" },
    };
  }

  if (getAdminSecret(req) !== process.env.ADMIN_SECRET) {
    return {
      status: 401,
      body: { error: "Unauthorized" },
    };
  }

  return null;
}
