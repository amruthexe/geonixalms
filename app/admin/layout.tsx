import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
     return redirect("/");
  }

  return (
    <AdminShell user={{ name: session.user.name, email: session.user.email }}>
      {children}
    </AdminShell>
  );
}
