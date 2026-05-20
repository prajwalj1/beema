"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    const referrerId = searchParams.get("referrer_id");

    if (tab === "signup") {
      let target = "/register";
      if (referrerId) {
        target += `?referrer_id=${referrerId}`;
      }
      router.replace(target);
    } else {
      router.replace("/login");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFAF0]">
      <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xs text-neutral-400 font-bold mt-4 uppercase tracking-widest">Routing security...</p>
    </div>
  );
}

export default function AuthRedirectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFAF0]">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-neutral-400 font-bold mt-4 uppercase tracking-widest">Loading auth portal...</p>
      </div>
    }>
      <AuthRedirectContent />
    </Suspense>
  );
}
