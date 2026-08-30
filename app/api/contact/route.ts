import { cookies } from "next/headers";
import { isValidSession } from "@/lib/admin";
import { addMessage, deleteMessage, updateMessage } from "@/lib/contacts";
import { sendContactEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

async function isAuthed() {
  const store = await cookies();
  return isValidSession(store.get("admin_session")?.value);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as {
    name?: string;
    email?: string;
    message?: string;
  };

  const cleanName = name?.trim() ?? "";
  const cleanEmail = email?.trim() ?? "";
  const cleanMessage = message?.trim() ?? "";

  if (!cleanName || !cleanMessage) {
    return Response.json({ error: "Name and message are required" }, { status: 400 });
  }
  if (cleanName.length > 120 || cleanMessage.length > 5000) {
    return Response.json({ error: "Message too long" }, { status: 400 });
  }
  if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  const saved = addMessage({
    name: cleanName,
    email: cleanEmail,
    message: cleanMessage,
  });

  sendContactEmail(saved).catch(() => {});

  return Response.json({ ok: true, id: saved.id });
}

export async function PATCH(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { id, read } = (body ?? {}) as { id?: string; read?: boolean };
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });
  const updated = updateMessage(id, { read: Boolean(read) });
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ ok: true, message: updated });
}

export async function DELETE(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { id } = (body ?? {}) as { id?: string };
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });
  const ok = deleteMessage(id);
  if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ ok: true });
}