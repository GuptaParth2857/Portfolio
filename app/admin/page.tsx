import { cookies } from "next/headers";
import { isValidSession, usingFallbackPassword } from "@/lib/admin";
import { getMessages } from "@/lib/contacts";
import AdminPanel from "@/components/AdminPanel";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — Parth Gupta",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const store = await cookies();
  const authed = isValidSession(store.get("admin_session")?.value);
  const messages = authed ? getMessages().slice(0, 200) : [];

  return (
    <AdminPanel
      authed={authed}
      messages={messages}
      showSetupNote={usingFallbackPassword()}
    />
  );
}