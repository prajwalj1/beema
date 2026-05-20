"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("customer"); // "customer" or "promoter"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      role
    });

    setIsLoading(false);

    if (res?.error) {
      toast.error("Invalid email address or password.");
    } else {
      toast.success("Logged in successfully!");
      if (role === "promoter") {
        window.location.href = "/dashboard/promoter";
      } else {
        window.location.href = "/dashboard/customer";
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-100/50 rounded-full blur-[100px] opacity-60 -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-100/50 rounded-full blur-[80px] opacity-60 -z-10"></div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-100 animate-slide-up">
        
        {/* Left Side: Role Selection & Information */}
        <div className="bg-neutral-50 p-10 md:p-12 flex flex-col justify-between border-r border-neutral-100">
          <div>
            <Link href="/">
              <Image src="/images/Logo.png" alt="Logo" width={140} height={35} className="object-contain mb-12" priority />
            </Link>
            <h2 className="text-3xl font-extrabold text-neutral-900 mb-2">Welcome Back</h2>
            <p className="text-neutral-500 text-sm mb-10">Select your account type to continue.</p>

            {/* Role Selection Cards */}
            <div className="space-y-4">
              {/* Customer */}
              <button 
                type="button"
                onClick={() => setRole("customer")}
                className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                  role === "customer" 
                    ? "border-brand-500 bg-white shadow-md shadow-brand-500/10" 
                    : "border-transparent bg-neutral-100 hover:bg-neutral-200/60"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors ${role === "customer" ? "bg-brand-100 text-brand-600" : "bg-white text-neutral-400"}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </div>
                <div>
                  <h4 className={`font-bold ${role === "customer" ? "text-brand-700" : "text-neutral-700"}`}>Customer</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Manage your personal policies</p>
                </div>
                {role === "customer" && (
                  <div className="ml-auto w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                )}
              </button>

              {/* Promoter */}
              <button 
                type="button"
                onClick={() => setRole("promoter")}
                className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                  role === "promoter" 
                    ? "border-emerald-500 bg-white shadow-md shadow-emerald-500/10" 
                    : "border-transparent bg-neutral-100 hover:bg-neutral-200/60"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors ${role === "promoter" ? "bg-emerald-100 text-emerald-600" : "bg-white text-neutral-400"}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <h4 className={`font-bold ${role === "promoter" ? "text-emerald-700" : "text-neutral-700"}`}>Promoter / Agent</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Access agency dashboard</p>
                </div>
                {role === "promoter" && (
                  <div className="ml-auto w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="mt-8 text-xs text-neutral-400">
            Protected by enterprise-grade encryption.
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-10 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Sign in to your account</h3>
            <p className="text-neutral-500 text-sm">
              Please enter your email and password to access the {role === "customer" ? "customer portal" : "agency portal"}.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
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

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-neutral-700">Password</label>
                <Link href="/forgot-password" className="text-xs font-bold text-brand-600 hover:text-brand-500">Forgot Password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all font-medium text-neutral-900"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 rounded-xl text-white font-bold text-sm transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                role === "customer" 
                  ? "bg-brand-600 hover:bg-brand-500 shadow-brand-500/30" 
                  : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/30"
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign in securely
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-neutral-500">
            Don't have an account? <Link href="/register" className="font-bold text-brand-600 hover:text-brand-500">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
