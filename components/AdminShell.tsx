"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Users, LogOut, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface AdminShellProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
  };
}

export default function AdminShell({ children, user }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/thank-you");
        },
      },
    });
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/courses", label: "Courses", icon: BookOpen },
    { href: "/admin/students", label: "Students", icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-bold text-primary">Geonixa Admin</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out flex flex-col",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "md:h-screen" // Sticky on desktop
        )}
      >
        <div className="p-6 border-b border-gray-100 flex items-center gap-3 h-16 md:h-auto">
          <Logo />
          <div>
            <h1 className="text-xl font-bold text-primary">Geonixa</h1>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Admin Portal</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
                  isActive 
                    ? "bg-orange-50 text-primary" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-0 min-w-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
