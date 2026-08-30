import nodemailer from "nodemailer";
import type { ContactMessage } from "@/lib/contacts";

export async function sendContactEmail(message: ContactMessage): Promise<boolean> {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) return false;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const text = [
    "New message from your portfolio contact form.",
    "",
    `Name:    ${message.name}`,
    `Email:   ${message.email}`,
    `Sent at: ${message.createdAt}`,
    "",
    "Message:",
    "--------",
    message.message,
    "",
    "View it in the admin panel: " + pathJoin(process.env.NEXTAUTH_URL ?? "", "admin"),
  ].join("\n");

  await transport.sendMail({
    from: user,
    to: process.env.CONTACT_EMAIL_TO || user,
    subject: `[Portfolio] New message from ${message.name}`,
    text,
  });
  return true;
}

function pathJoin(base: string, tail: string): string {
  if (!base) return tail;
  return `${base.replace(/\/+$/, "")}/${tail}`;
}