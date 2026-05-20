"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    citizenshipNumber: "",
    role: "customer",
    promoterId: "",
    image: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        // Format date of birth to yyyy-MM-dd for the date input
        const formattedDob = data.dob ? new Date(data.dob).toISOString().split("T")[0] : "";
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          dob: formattedDob,
          gender: data.gender || "",
          address: data.address || "",
          citizenshipNumber: data.citizenshipNumber || "",
          role: data.role || "customer",
          promoterId: data.promoterId || "",
          image: data.image || ""
        });
      } else {
        toast.error("Failed to load profile details.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching your profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Initialize canvas resizer
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;

          // Maintain aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Export as compressed JPEG base64 (70% quality)
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          setFormData((prev) => ({ ...prev, image: compressedBase64 }));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          dob: formData.dob,
          gender: formData.gender,
          address: formData.address,
          citizenshipNumber: formData.citizenshipNumber,
          image: formData.image
        })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile updated successfully!");
        // Update next-auth session client-side
        await update({ name: formData.name });
      } else {
        toast.error(data.error || "Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#FFFAF0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden animate-slide-up">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-brand-600 to-emerald-600 px-8 py-10 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-12 translate-x-12"></div>
          <h1 className="text-3xl font-black">My Profile Settings</h1>
          <p className="text-emerald-100 text-sm mt-1">Manage your digital insurance profile and credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
          
          {/* Profile Image Uploader */}
          <div className="flex flex-col items-center pb-6 border-b border-neutral-100 mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center shadow-inner relative">
                {formData.image ? (
                  <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-neutral-400 font-bold text-2xl">
                    {getInitials(formData.name)}
                  </div>
                )}
                
                {/* Overlay camera icon */}
                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            </div>
            <p className="text-xs text-neutral-400 mt-2 font-medium">Click on avatar to upload photo (auto-compressed)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-500 text-sm text-neutral-800 font-semibold"
                required
              />
            </div>

            {/* Email (Read Only) */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Email Address (Primary)</label>
              <input
                type="email"
                value={session?.user?.email || ""}
                disabled
                className="px-4 py-3 rounded-xl border border-neutral-100 bg-neutral-50 text-sm text-neutral-400 font-medium cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-500 text-sm text-neutral-800 font-semibold"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-500 text-sm text-neutral-800 font-semibold"
                required
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-500 text-sm text-neutral-800 font-semibold bg-white"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Citizenship Number */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Citizenship Number</label>
              <input
                type="text"
                name="citizenshipNumber"
                value={formData.citizenshipNumber}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-500 text-sm text-neutral-800 font-semibold"
                required
              />
            </div>

            {/* Address */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Current Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-500 text-sm text-neutral-800 font-semibold"
                required
              />
            </div>

            {/* Role & Promoter ID */}
            <div className="flex flex-col md:col-span-2 p-5 bg-neutral-50 rounded-2xl border border-neutral-100 flex-row justify-between items-center gap-4">
              <div>
                <p className="text-sm font-bold text-neutral-900 capitalize">Current Role: {formData.role}</p>
                {formData.role === "promoter" ? (
                  <p className="text-xs text-neutral-500 mt-1">Promoter ID: <span className="font-mono font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded">{formData.promoterId}</span></p>
                ) : (
                  <p className="text-xs text-neutral-500 mt-1">Standard customer account</p>
                )}
              </div>
              <span className="px-3 py-1 bg-brand-100 text-brand-800 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                {formData.role}
              </span>
            </div>

          </div>

          <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/change-password" 
              className="text-sm text-brand-600 hover:text-brand-500 font-bold flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              Change Password
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 flex items-center justify-center gap-2"
            >
              {saving ? "Saving Changes..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
