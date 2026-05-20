"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password updated successfully!");
        router.push("/profile");
      } else {
        toast.error(data.error || "Failed to update password.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFAF0] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden animate-slide-up">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-brand-600 to-emerald-600 px-6 py-8 text-white relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-y-6 translate-x-6"></div>
          <h1 className="text-2xl font-black">Change Password</h1>
          <p className="text-emerald-100 text-xs mt-1">Keep your Beema Dukaan account secure</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {/* Current Password */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleInputChange}
              className="px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-500 text-sm text-neutral-800 font-semibold"
              required
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleInputChange}
              className="px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-500 text-sm text-neutral-800 font-semibold"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleInputChange}
              className="px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-500 text-sm text-neutral-800 font-semibold"
              required
            />
          </div>

          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 flex items-center justify-center gap-2"
            >
              {saving ? "Updating..." : "Update Password"}
            </button>

            <Link 
              href="/profile" 
              className="w-full py-3.5 border border-neutral-200 text-neutral-500 hover:bg-neutral-50 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
