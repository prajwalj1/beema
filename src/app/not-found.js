"use client";

import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFAF0] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8 animate-slide-up">
        {/* Visual Graphic */}
        <div className="relative flex justify-center">
          <div className="w-40 h-40 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center relative shadow-inner">
            <span className="text-7xl font-black select-none opacity-20">404</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                className="w-16 h-16 text-brand-600 animate-bounce" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-neutral-800 tracking-tight">
            Lost in Transition?
          </h1>
          <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
            The page you are looking for doesn't exist or has been shifted to a new location.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="px-6 py-3.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-bold text-sm rounded-xl transition-all shadow-sm"
          >
            Go Back Home
          </Link>
          <Link
            href="/login"
            className="px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-black text-sm rounded-xl transition-all shadow-md"
          >
            Access Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
