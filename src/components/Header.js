"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

const navLinks = [
  { href: "/insurance-plans", label: "Insurance Plans" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userImage, setUserImage] = useState(null);

  React.useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.image) {
            setUserImage(data.image);
          }
        })
        .catch((err) => console.error("Error fetching user image:", err));
    } else {
      setUserImage(null);
    }
  }, [status, session]);

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const handleSwitchProfile = async () => {
    try {
      const res = await fetch("/api/user/switch-role", {
        method: "PUT"
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Switched role to ${data.role}!`);
        // Update the next-auth session client-side with the new role
        await update({ role: data.role });
        setDropdownOpen(false);
        // Refresh the page to reflect any dashboard specific UI updates
        window.location.reload();
      } else {
        toast.error(data.error || "Failed to switch profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while switching profiles.");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/images/Logo.png"          
                alt="BeemaDukaan Logo"
                width={160}              
                height={40}
                priority
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/insurance-plans" className="text-sm font-medium text-neutral-600 hover:text-brand-600 transition-colors relative group">
              Insurance Plans
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-600 rounded-full transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/compare" className="text-sm font-medium text-neutral-600 hover:text-brand-600 transition-colors relative group">
              Compare
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-600 rounded-full transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/about" className="text-sm font-medium text-neutral-600 hover:text-brand-600 transition-colors relative group">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-600 rounded-full transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/contact" className="text-sm font-medium text-neutral-600 hover:text-brand-600 transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-600 rounded-full transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* CTA Buttons / Profile Avatar */}
          <div className="flex items-center gap-4">
            {status === "authenticated" ? (
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden bg-brand-600 hover:bg-brand-500 text-white flex items-center justify-center font-bold text-sm shadow-md transition-all duration-300 border-2 border-brand-100 hover:scale-105"
                >
                  {userImage ? (
                    <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    getInitials(session?.user?.name)
                  )}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 z-50 animate-slide-up origin-top-right">
                    <div className="px-4 py-2.5 border-b border-neutral-50">
                      <div className="flex items-center gap-3 mb-2 pb-2 border-b border-neutral-50">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-brand-50 flex items-center justify-center text-xs font-bold text-brand-600">
                          {userImage ? (
                            <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            getInitials(session?.user?.name)
                          )}
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-bold text-neutral-900 truncate leading-none">{session?.user?.name}</p>
                          <span className="inline-block px-1.5 py-0.5 mt-1 bg-brand-50 text-brand-700 text-[9px] font-extrabold rounded uppercase tracking-wider">
                            {session?.user?.role || "User"}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400 truncate">{session?.user?.email}</p>
                    </div>

                    <div className="py-1">
                      {/* Dashboard */}
                      <Link
                        href={
                          session?.user?.role === "admin"
                            ? "/dashboard/admin"
                            : session?.user?.role === "promoter"
                            ? "/dashboard/promoter"
                            : "/dashboard/customer"
                        }
                        onClick={() => setDropdownOpen(false)}
                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-brand-600 transition-all flex items-center gap-2 font-semibold"
                      >
                        <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        My Dashboard
                      </Link>

                      {/* Profile Settings */}
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-brand-600 transition-all flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        Profile Settings
                      </Link>

                      {/* Switch Profile (Only for promoter/customer, not admin) */}
                      {session?.user?.role !== "admin" && (
                        <button
                          onClick={handleSwitchProfile}
                          className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-brand-600 transition-all flex items-center gap-2"
                        >
                          <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                          Switch Profile ({session?.user?.role === "customer" ? "Promoter" : "Customer"})
                        </button>
                      )}

                      {/* Change Password */}
                      <Link
                        href="/change-password"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-brand-600 transition-all flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h6zM15 7V5a3 3 0 00-6 0v2m6 0H9"/></svg>
                        Change Password
                      </Link>
                    </div>

                    <div className="border-t border-neutral-50 pt-1">
                      <button
                        onClick={() => {
                          signOut({ redirect: false });
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:font-bold transition-all flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-brand-600 transition-colors">
                  Log in
                </Link>
                <Link href="/register" className="px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-flex items-center">
                  Register
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center ml-2">
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="text-neutral-600 hover:text-brand-600 focus:outline-none"
                >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Mobile navigation panel */}
            {mobileOpen && (
              <nav className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40 border-t border-neutral-100">
                <div className="flex flex-col gap-4 p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-base font-medium ${pathname === link.href ? "text-brand-600" : "text-neutral-600 hover:text-brand-600"} transition-colors`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  {status !== "authenticated" && (
                    <div className="flex flex-col gap-3 pt-4 border-t border-neutral-100">
                      <Link
                        href="/login"
                        className="text-center w-full px-4 py-2 text-brand-600 border-2 border-brand-100 rounded-xl font-bold transition-colors hover:bg-brand-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        href="/register"
                        className="text-center w-full px-4 py-2 bg-brand-600 text-white rounded-xl font-bold transition-colors hover:bg-brand-500 shadow-md"
                        onClick={() => setMobileOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;