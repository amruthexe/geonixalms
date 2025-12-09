import Link from "next/link";
import { LayoutDashboard, BookOpen, Users, LogOut } from "lucide-react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

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
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-primary">Geonixa</h1>
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Admin Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-primary rounded-lg transition-colors"
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <Link 
            href="/admin/courses" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-primary rounded-lg transition-colors"
          >
            <BookOpen size={20} />
            <span className="font-medium">Courses</span>
          </Link>
          
          <Link 
            href="/admin/students" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-primary rounded-lg transition-colors"
          >
            <Users size={20} />
            <span className="font-medium">Students</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 p-4 md:hidden flex items-center justify-between">
           <span className="font-bold text-primary">Geonixa Admin</span>
           {/* Mobile menu button would go here */}
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
