"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    await authClient.forgetPassword({
      email,
      redirectTo: "/reset-password",
    }, {
      onSuccess: () => {
        setSuccess(true);
        setLoading(false);
      },
      onError: (ctx) => {
        setError(ctx.error.message);
        setLoading(false);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div className="text-center flex flex-col items-center">
          <Logo className="h-16 w-16 mb-4" />
          <h1 className="text-2xl font-bold text-primary">Forgot Password</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {success ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm text-center">
            <p className="font-medium">Check your email!</p>
            <p className="mt-1">We've sent a password reset link to <strong>{email}</strong>.</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold text-black">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
                  placeholder="you@example.com"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Send Reset Link"}
              </button>
            </form>
          </>
        )}

        <div className="text-center">
          <Link href="/login" className="text-gray-500 hover:text-gray-700 text-sm flex items-center justify-center gap-2">
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
