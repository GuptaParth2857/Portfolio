import { cookies } from "next/headers";
import { createSessionValue, verifyPassword } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { password } = (body ?? {}) as { password?: string };
  if (!password || !verifyPassword(password)) {
    return Response.json({ error: "Wrong password" }, { status: 401 });
  }

  const store = await cookies();
  store.set("admin_session", createSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({ ok: true });
}