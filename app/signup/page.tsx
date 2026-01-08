'use client';

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import TechLoader from "@/components/TechLoader";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (phone.length < 10) {
      setError("Phone number must be at least 10 digits");
      setLoading(false);
      return;
    }

    await authClient.signUp.email({
      email,
      password,
      name,
      phone,
    } as any, {
      onSuccess: () => {
        router.push("/dashboard");
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
          <h1 className="text-3xl font-bold text-primary">Geonixa LMS</h1>
          <p className="text-gray-500 mt-2">Create your student account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-bold text-black">Full Name</label>
            <input 
              type="text" 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold text-black">Email</label>
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

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-bold text-black">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
              placeholder="1234567890"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-bold text-black">Password</label>
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

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <TechLoader loading={loading} />
        </form>

        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
