import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
};

const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

function ensureFile() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, "[]", "utf8");
}

export function getMessages(): ContactMessage[] {
  ensureFile();
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addMessage(input: {
  name: string;
  email: string;
  message: string;
}): ContactMessage {
  const list = getMessages();
  const item: ContactMessage = {
    id: randomUUID(),
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  list.unshift(item);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(list, null, 2), "utf8");
  return item;
}

export function updateMessage(
  id: string,
  patch: Partial<Pick<ContactMessage, "read">>
): ContactMessage | null {
  const list = getMessages();
  const index = list.findIndex((m) => m.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...patch };
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(list, null, 2), "utf8");
  return list[index];
}

export function deleteMessage(id: string): boolean {
  const list = getMessages();
  const next = list.filter((m) => m.id !== id);
  if (next.length === list.length) return false;
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(next, null, 2), "utf8");
  return true;
}