"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2, Lock, CheckCircle, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: "New passwords do not match" });
      return;
    }

    setLoading(true);
    setMessage(null);

    await authClient.changePassword({
      newPassword: newPassword,
      currentPassword: currentPassword,
      revokeOtherSessions: true,
    }, {
      onSuccess: () => {
        setMessage({ type: 'success', text: "Password changed successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setLoading(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (ctx: any) => {
        setMessage({ type: 'error', text: ctx.error.message });
        setLoading(false);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-100 rounded-xl text-primary">
          <Lock size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
          <p className="text-gray-500">Manage your password and account security</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Change Password</h2>
        
        {message && (
          <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="block text-sm font-bold text-black">Current Password</label>
            <input 
              type="password" 
              id="currentPassword" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="block text-sm font-bold text-black">New Password</label>
            <input 
              type="password" 
              id="newPassword" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-black">Confirm New Password</label>
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

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
