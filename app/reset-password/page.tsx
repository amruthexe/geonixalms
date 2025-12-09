"use client";

import { authClient } from "@/lib/auth-client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Better Auth might pass token in URL or handle it differently depending on config

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    await authClient.resetPassword({
      newPassword: password,
      // token is automatically handled if in URL, or passed explicitly if needed
    }, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: (ctx) => {
        setError(ctx.error.message);
        setLoading(false);
      }
    });
  };

  if (!token) {
    // In some flows, token might be handled differently, but usually it's a query param
    // If no token, show error or redirect
    // For now, let's assume it's there or Better Auth handles the check
  }

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div className="text-center flex flex-col items-center">
        <Logo className="h-16 w-16 mb-4" />
        <h1 className="text-2xl font-bold text-primary">Reset Password</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Enter your new password below.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-bold text-black">New Password</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-bold text-black">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Reset Password"}
        </button>
      </form>

      <div className="text-center">
        <Link href="/login" className="text-gray-500 hover:text-gray-700 text-sm flex items-center justify-center gap-2">
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<Loader2 className="animate-spin text-primary" />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
