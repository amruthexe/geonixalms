import Link from "next/link";
import { LogOut, User } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/"); // Redirect to login if not authenticated
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
             {/* Logo placeholder */}
             <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">G</div>
             <span className="text-xl font-bold text-gray-900">Geonixa LMS</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                <User size={16} />
              </div>
              <span className="hidden md:block">{session.user.name}</span>
            </div>
            
            {/* Logout Button */}
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
    </div>
  );
}
