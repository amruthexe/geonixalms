"use client";

import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/thank-you");
        },
      },
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-500 hover:text-red-600 transition-colors"
      title="Sign Out"
    >
      <LogOut size={20} />
    </button>
  );
}
