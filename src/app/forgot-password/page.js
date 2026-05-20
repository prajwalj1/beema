"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: request code, 2: reset password
  const [method, setMethod] = useState("phone"); // "phone" or "email"
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleRequestCode = async (e) => {
    e.preventDefault();
    
    if (method === "email" && !email) {
      toast.error("Please enter your email address.");
      return;
    }
    if (method === "phone" && !phone) {
      toast.error("Please enter your phone number.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = method === "email" ? { email } : { phone };
      
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        toast.error(data.error || "Failed to send verification code.");
      } else {
        toast.success("Verification code generated!");
        setStep(2);
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the verification code.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        otp,
        newPassword,
        ...(method === "email" ? { email } : { phone })
      };

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        toast.error(data.error || "Failed to reset password.");
      } else {
        toast.success("Password reset successfully! Redirecting...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-100/50 rounded-full blur-[100px] opacity-60 -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-100/50 rounded-full blur-[80px] opacity-60 -z-10"></div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-100 animate-slide-up">
        {/* Left Side: Security Info */}
        <div className="bg-neutral-50 p-10 md:p-12 flex flex-col justify-between border-r border-neutral-100">
          <div>
            <Link href="/">
              <Image
                src="/images/Logo.png"
                alt="Logo"
                width={140}
                height={35}
                className="object-contain mb-12"
                priority
              />
            </Link>
            <h2 className="text-3xl font-extrabold text-neutral-900 mb-2">Reset Password</h2>
            <p className="text-neutral-500 text-sm mb-8">
              Verify your identity via phone or email to securely reset your account password.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800 text-sm">Secure Authentication</h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Your connection and details are encrypted and stored safely.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800 text-sm">Instant OTP Verification</h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    We'll generate a verification code to authenticate your request instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-xs text-neutral-400">
            Protected by enterprise-grade encryption.
          </div>
        </div>

        {/* Right Side: Reset Form */}
        <div className="p-10 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              {step === 1 ? "Forgot Password" : "Set New Password"}
            </h3>
            <p className="text-neutral-500 text-sm">
              {step === 1
                ? "Choose your verification method and enter your registered details below."
                : `Enter the code we generated for your ${method === "email" ? "email" : "phone number"} and choose a secure new password.`}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleRequestCode} className="space-y-6">
              {/* Method Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => setMethod("phone")}
                  className={`py-2 px-3 rounded-lg font-bold text-xs transition-all ${
                    method === "phone"
                      ? "bg-white text-brand-700 shadow-sm"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Phone Number
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("email")}
                  className={`py-2 px-3 rounded-lg font-bold text-xs transition-all ${
                    method === "email"
                      ? "bg-white text-brand-700 shadow-sm"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Email Address
                </button>
              </div>

              {method === "email" ? (
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all font-medium text-neutral-900"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all font-medium text-neutral-900"
                      placeholder="98XXXXXXXX"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-white font-bold text-sm bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-500/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Send Verification Code
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-5">


              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Verification Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all font-semibold tracking-widest text-center text-lg text-neutral-900"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all font-medium text-neutral-900"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all font-medium text-neutral-900"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3.5 rounded-xl text-white font-bold text-sm bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center text-sm text-neutral-500">
            Remember your password?{" "}
            <Link href="/login" className="font-bold text-brand-600 hover:text-brand-500">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
