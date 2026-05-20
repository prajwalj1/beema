"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      router.push("/dashboard/admin");
    }
  }, [status, session]);

  const handleAdminLogin = async (e) => {
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
      role: "admin" // Preset role to admin to satisfy auth verification
    });

    setIsLoading(true); // Keep loading state active during redirect transition

    if (res?.error) {
      toast.error("Invalid administrator credentials.");
      setIsLoading(false);
    } else {
      toast.success("Administrator session authorized!");
      window.location.href = "/dashboard/admin";
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#070F21] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070F21] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] -z-10"></div>

      <div className="w-full max-w-md bg-[#0F1C3F] border border-blue-900/40 rounded-[2rem] shadow-2xl p-8 sm:p-10 animate-slide-up">
        
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image 
              src="/images/Logo.png" 
              alt="BeemaDukaan Logo" 
              width={160} 
              height={40} 
              className="object-contain brightness-0 invert" 
              priority 
            />
          </Link>
          <h2 className="text-2xl font-black text-white tracking-tight">Admin Console</h2>
          <p className="text-blue-200 text-xs mt-1.5">Authorized Personnel Only</p>
        </div>

        {/* Form */}
        <form onSubmit={handleAdminLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#070F21] border border-blue-900/40 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium text-slate-100 placeholder-blue-900/50"
                placeholder="admin@beemadukaan.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-2">
              Secure Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#070F21] border border-blue-900/40 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium text-slate-100 placeholder-blue-900/50"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Authorize Session
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/login" className="text-xs text-blue-400 hover:text-blue-200 font-bold transition-colors">
            ← Return to Public Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
