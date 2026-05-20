"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardRoot() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session.user.role === "promoter") {
        router.push("/dashboard/promoter");
      } else {
        router.push("/dashboard/customer");
      }
    }
  }, [status, session]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
