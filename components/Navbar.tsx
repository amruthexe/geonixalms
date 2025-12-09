"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

import { authClient } from "@/lib/auth-client";
import { User as UserIcon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">Geonixa LMS</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/features" className="text-gray-600 hover:text-primary font-medium transition-colors">Features</Link>
          <Link href="/about" className="text-gray-600 hover:text-primary font-medium transition-colors">About</Link>
          <Link href="/pricing" className="text-gray-600 hover:text-primary font-medium transition-colors">Pricing</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 font-medium hover:text-primary transition-colors">
                <UserIcon size={20} />
                <span>{session.user.name}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <Link 
                href="/login" 
                className="px-5 py-2.5 text-gray-700 font-medium hover:text-primary transition-colors"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="px-5 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-200"
              >
                Sign up free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white absolute w-full left-0 shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              href="/features" 
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/pricing" 
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <div className="h-px bg-gray-100 my-2"></div>
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 text-gray-700 font-medium hover:text-primary flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <UserIcon size={18} />
                  {session.user.name}
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 text-left text-red-600 font-medium hover:bg-red-50 rounded-lg flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-gray-700 font-medium hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  href="/signup" 
                  className="px-4 py-2 bg-primary text-white rounded-lg font-medium text-center hover:bg-orange-600"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
