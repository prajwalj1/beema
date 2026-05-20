"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  // Form State
  const [formData, setFormData] = useState({
    role: "customer", // 'customer' or 'promoter'
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    citizenshipNumber: "",
    address: "",
    promoterId: "" // Optional
  });

  // Validation State
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const refId = params.get("referrer_id") || params.get("promoterId");
      if (refId) {
        setFormData(prev => ({ ...prev, promoterId: refId }));
      }
    }
  }, []);

  const progressPercentage = ((step - 1) / totalSteps) * 100;

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Full name is required.";
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = "Valid email is required.";
      if (!formData.password || formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    } else if (step === 2) {
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
      if (!formData.dob) newErrors.dob = "Date of Birth is required.";
      if (!formData.gender) newErrors.gender = "Gender is required.";
      if (!formData.citizenshipNumber.trim()) newErrors.citizenshipNumber = "Citizenship number is required.";
    } else if (step === 3) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required to complete registration.";
      } else if (formData.address.trim().length < 5) {
        newErrors.address = "Please provide a more detailed address.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) {
      toast.error("Please fix the validation errors before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        toast.error(data.error || "Failed to register account.");
      } else {
        toast.success("Account registered successfully!");
        router.push("/login");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-100/50 rounded-full blur-[100px] opacity-60 -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-100/50 rounded-full blur-[80px] opacity-60 -z-10"></div>

      {/* Main Container Card (Both image and form in the same card) */}
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-100 animate-slide-up grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Side: Brand and Illustration */}
        <div className="hidden md:flex md:col-span-6 bg-neutral-50 p-8 flex-col justify-start border-r border-neutral-100 relative min-h-[480px]">
          <div>
            <Link href="/">
              <Image src="/images/Logo.png" alt="Logo" width={140} height={35} className="object-contain mb-6" priority />
            </Link>
            <h2 className="text-2xl font-extrabold text-neutral-900 leading-tight">Start Your Journey</h2>
            <p className="text-neutral-500 text-xs mt-2">
              Join Beema Dukaan to access the best insurance options and tools.
            </p>
          </div>
          
          <div className="relative w-full h-[350px] my-4 flex items-center justify-center">
            <Image 
              src="/images/register.png" 
              alt="Register Illustration" 
              fill
              className="object-contain"
              priority 
            />
          </div>

          <div className="text-neutral-400 text-[10px] flex items-center gap-1 mt-auto">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            Secure, encrypted registration
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="col-span-1 md:col-span-6 p-8 sm:p-10 flex flex-col justify-center">
          
          {/* Mobile Header */}
          <div className="flex flex-col items-center mb-6 md:hidden">
            <Link href="/">
              <Image src="/images/Logo.png" alt="Logo" width={120} height={30} className="object-contain mb-4" priority />
            </Link>
            <h2 className="text-xl font-extrabold text-neutral-900">Create an Account</h2>
            <p className="text-neutral-500 text-xs mt-1">Join Beema Dukaan today.</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block mb-6">
            <h2 className="text-2xl font-extrabold text-neutral-900">Create an Account</h2>
            <p className="text-neutral-500 text-sm mt-1">Join Beema Dukaan today.</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-bold text-neutral-400 mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span className="text-brand-600">{Math.round(progressPercentage)}% Completed</span>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={step === totalSteps ? handleSubmit : (e) => e.preventDefault()} className="space-y-6">
            
            {/* STEP 1: Basic Info & Role */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">I am registering as a:</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange({ target: { name: 'role', value: 'customer' } })}
                      className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${formData.role === 'customer' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'}`}
                    >
                      Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange({ target: { name: 'role', value: 'promoter' } })}
                      className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${formData.role === 'promoter' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'}`}
                    >
                      Promoter / Agent
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Full Name</label>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-neutral-50 border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs font-semibold mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Email Address</label>
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-neutral-50 border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50`}
                    placeholder="name@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs font-semibold mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Password</label>
                  <input 
                    type="password" name="password" value={formData.password} onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-neutral-50 border ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-red-500 text-xs font-semibold mt-1">{errors.password}</p>}
                </div>
              </div>
            )}

            {/* STEP 2: Personal Details */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-neutral-50 border ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50`}
                    placeholder="98XXXXXXXX"
                  />
                  {errors.phone && <p className="text-red-500 text-xs font-semibold mt-1">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Date of Birth</label>
                    <input 
                      type="date" name="dob" value={formData.dob} onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-neutral-50 border ${errors.dob ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50`}
                    />
                    {errors.dob && <p className="text-red-500 text-xs font-semibold mt-1">{errors.dob}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Gender</label>
                    <select 
                      name="gender" value={formData.gender} onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-neutral-50 border ${errors.gender ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50`}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs font-semibold mt-1">{errors.gender}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Citizenship Number</label>
                  <input 
                    type="text" name="citizenshipNumber" value={formData.citizenshipNumber} onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-neutral-50 border ${errors.citizenshipNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50`}
                    placeholder="e.g. 27-01-79-12345"
                  />
                  {errors.citizenshipNumber && <p className="text-red-500 text-xs font-semibold mt-1">{errors.citizenshipNumber}</p>}
                </div>
              </div>
            )}

            {/* STEP 3: Location & Extras */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Current Address</label>
                  <textarea 
                    name="address" rows="3" value={formData.address} onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-neutral-50 border ${errors.address ? 'border-red-500 ring-1 ring-red-500 bg-red-50/20' : 'border-neutral-200'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none`}
                    placeholder="Street, Ward No, City, District"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      {errors.address}
                    </p>
                  )}
                </div>

                {formData.role === 'promoter' && (
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Promoter ID <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <input 
                      type="text" name="promoterId" value={formData.promoterId} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      placeholder="Enter assigned promoter ID"
                    />
                    <p className="text-xs text-neutral-400 mt-1">If you were recruited, enter the referring promoter's ID.</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4 pt-4 mt-8 border-t border-neutral-100">
              {step > 1 && (
                <button 
                  type="button" onClick={prevStep}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                >
                  Back
                </button>
              )}
              
              {step < totalSteps ? (
                <button 
                  type="button" onClick={nextStep}
                  className="flex-1 px-6 py-3.5 rounded-xl font-bold text-sm bg-brand-600 text-white hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/30"
                >
                  Continue
                </button>
              ) : (
                <button 
                  type="submit" 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`flex-1 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-colors shadow-lg ${formData.role === 'customer' ? 'bg-brand-600 hover:bg-brand-500 shadow-brand-500/30' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/30'}`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              )}
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-neutral-500">
            Already have an account? <Link href="/login" className="font-bold text-brand-600 hover:text-brand-500">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}