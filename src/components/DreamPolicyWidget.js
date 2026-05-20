"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DreamPolicyWidget() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleOpenClick = () => {
    if (status === "unauthenticated") {
      toast.error("Please log in to buy a Dream Policy!");
      router.push("/login");
    } else {
      setIsOpen(true);
    }
  };

  // Provinces, districts, municipalities from API
  const [provinces, setProvinces] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Policy Info
    planName: "whole life plan",
    sumAssured: 500000,
    policyTerm: 15,
    premiumMode: "yearly",
    // Step 2: Personal Details
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    maritalStatus: "single",
    education: "",
    nationality: "Nepalese",
    // Step 3: Identity Documents
    personalPhoto: "",
    identityDocType: "citizenship",
    identityDocNo: "",
    identityDocFront: "",
    identityDocBack: "",
    identityDocIssuedDate: "",
    identityDocIssuedPlace: "",
    // Step 4: Family Info
    fatherName: "",
    motherName: "",
    grandfatherName: "",
    spouseName: "",
    // Step 5: Address Information
    permState: "",
    permDistrict: "",
    permMunicipality: "",
    permWard: "",
    permStreet: "",
    tempState: "",
    tempDistrict: "",
    tempMunicipality: "",
    tempWard: "",
    tempStreet: "",
    isSameAddress: false,
    // Step 6: Medical & Lifestyle
    height: "",
    weight: "",
    tobaccoUse: false,
    medicalConditions: "",
    // Step 7: Nominee
    nomineeName: "",
    nomineeRelation: "",
    nomineePhone: "",
    nomineeIdType: "citizenship",
    nomineeIdNo: "",
    nomineeIdIssuedDate: "",
    nomineeIdIssuedPlace: "",
    nomineePhoto: "",
    nomineeIdFront: "",
    nomineeIdBack: "",
    // Step 8: Terms & Review
    acceptedTerms: false
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Fetch Nepal location data from API
  useEffect(() => {
    if (isOpen) {
      fetch("/api/location")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.provinces) {
            setProvinces(data.provinces);
          }
        })
        .catch((err) => console.error("Error loading location details:", err));
    }
  }, [isOpen]);

  // Auto-fill personal details if user is logged in
  useEffect(() => {
    if (status === "authenticated" && isOpen) {
      fetch("/api/user/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            const formattedDob = data.dob ? new Date(data.dob).toISOString().split("T")[0] : "";
            setFormData((prev) => ({
              ...prev,
              fullName: data.name || prev.fullName,
              email: data.email || prev.email,
              phone: data.phone || prev.phone,
              dob: formattedDob || prev.dob,
              gender: data.gender || prev.gender,
              permStreet: data.address || prev.permStreet
            }));
          }
        })
        .catch((err) => console.error("Error loading user profile details:", err));
    }
  }, [status, isOpen]);

  // Handle "Same as Permanent Address" toggle
  useEffect(() => {
    if (formData.isSameAddress) {
      setFormData((prev) => ({
        ...prev,
        tempState: prev.permState,
        tempDistrict: prev.permDistrict,
        tempMunicipality: prev.permMunicipality,
        tempWard: prev.permWard,
        tempStreet: prev.permStreet
      }));
    }
  }, [
    formData.isSameAddress,
    formData.permState,
    formData.permDistrict,
    formData.permMunicipality,
    formData.permWard,
    formData.permStreet
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Location Selector Interceptor
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "permState") {
      setFormData(prev => ({
        ...prev,
        permState: value,
        permDistrict: "",
        permMunicipality: ""
      }));
    } else if (name === "permDistrict") {
      setFormData(prev => ({
        ...prev,
        permDistrict: value,
        permMunicipality: ""
      }));
    } else if (name === "tempState") {
      setFormData(prev => ({
        ...prev,
        tempState: value,
        tempDistrict: "",
        tempMunicipality: ""
      }));
    } else if (name === "tempDistrict") {
      setFormData(prev => ({
        ...prev,
        tempDistrict: value,
        tempMunicipality: ""
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Image Upload and Compression
  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("File is too large. Please upload an image under 4MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

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

          // Export as compressed JPG
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          setFormData((prev) => ({ ...prev, [field]: compressedBase64 }));
          if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9+() -]{7,15}$/;

    if (currentStep === 1) {
      if (!formData.sumAssured || formData.sumAssured < 50000) {
        newErrors.sumAssured = "Sum Assured must be at least Rs. 50,000";
      }
      if (!formData.policyTerm || formData.policyTerm < 5 || formData.policyTerm > 50) {
        newErrors.policyTerm = "Policy Term must be between 5 and 50 years";
      }
      if (!formData.premiumMode) newErrors.premiumMode = "Premium Paying Mode is required";
    }

    if (currentStep === 2) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid contact number";
      }
      if (!formData.dob) newErrors.dob = "Date of Birth is required";
      if (!formData.gender) newErrors.gender = "Gender selection is required";
      if (!formData.education.trim()) newErrors.education = "Education qualification is required";
      if (!formData.nationality.trim()) newErrors.nationality = "Nationality is required";
    }

    if (currentStep === 3) {
      if (!formData.personalPhoto) newErrors.personalPhoto = "Passport Size Photo is required";
      if (!formData.identityDocNo.trim()) newErrors.identityDocNo = "Document Number is required";
      if (!formData.identityDocFront) newErrors.identityDocFront = "Front photo of Document is required";
      if (!formData.identityDocBack) newErrors.identityDocBack = "Back photo of Document is required";
      if (!formData.identityDocIssuedDate) newErrors.identityDocIssuedDate = "Issued Date is required";
      if (!formData.identityDocIssuedPlace.trim()) newErrors.identityDocIssuedPlace = "Issued Place is required";
    }

    if (currentStep === 4) {
      if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
      if (!formData.motherName.trim()) newErrors.motherName = "Mother's name is required";
      if (!formData.grandfatherName.trim()) newErrors.grandfatherName = "Grandfather's name is required";
      if (formData.maritalStatus === "married" && !formData.spouseName.trim()) {
        newErrors.spouseName = "Spouse Name is required for married status";
      }
    }

    if (currentStep === 5) {
      if (!formData.permState.trim()) newErrors.permState = "Province/State is required";
      if (!formData.permDistrict.trim()) newErrors.permDistrict = "District is required";
      if (!formData.permMunicipality.trim()) newErrors.permMunicipality = "Municipality/VDC is required";
      if (!formData.permWard.trim()) newErrors.permWard = "Ward is required";
      if (!formData.permStreet.trim()) newErrors.permStreet = "Street/Tole is required";

      if (!formData.isSameAddress) {
        if (!formData.tempState.trim()) newErrors.tempState = "Province/State is required";
        if (!formData.tempDistrict.trim()) newErrors.tempDistrict = "District is required";
        if (!formData.tempMunicipality.trim()) newErrors.tempMunicipality = "Municipality/VDC is required";
        if (!formData.tempWard.trim()) newErrors.tempWard = "Ward is required";
        if (!formData.tempStreet.trim()) newErrors.tempStreet = "Street/Tole is required";
      }
    }

    if (currentStep === 6) {
      if (!formData.height || formData.height <= 0) newErrors.height = "Please enter a valid height";
      if (!formData.weight || formData.weight <= 0) newErrors.weight = "Please enter a valid weight";
    }

    if (currentStep === 7) {
      if (!formData.nomineeName.trim()) newErrors.nomineeName = "Nominee Name is required";
      if (!formData.nomineeRelation.trim()) newErrors.nomineeRelation = "Relationship is required";
      if (!formData.nomineePhone.trim()) {
        newErrors.nomineePhone = "Nominee Phone is required";
      } else if (!phoneRegex.test(formData.nomineePhone)) {
        newErrors.nomineePhone = "Please enter a valid contact number";
      }
      if (!formData.nomineeIdNo.trim()) newErrors.nomineeIdNo = "Nominee Document No is required";
      if (!formData.nomineeIdIssuedDate) newErrors.nomineeIdIssuedDate = "Issued Date is required";
      if (!formData.nomineeIdIssuedPlace.trim()) newErrors.nomineeIdIssuedPlace = "Issued Place (District) is required";
      if (!formData.nomineePhoto) newErrors.nomineePhoto = "Nominee Passport Size Photo is required";
      if (!formData.nomineeIdFront) newErrors.nomineeIdFront = "Nominee Document Front Photo is required";
      if (!formData.nomineeIdBack) newErrors.nomineeIdBack = "Nominee Document Back Photo is required";
    }

    if (currentStep === 8) {
      if (!formData.acceptedTerms) newErrors.acceptedTerms = "You must accept the declaration to submit this form";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    } else {
      toast.error("Please fill in all mandatory fields correctly.");
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(8)) {
      toast.error("Please agree to the terms and declaration.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/insurance/pre-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Dream Policy pre-proposal submitted successfully! We will contact you soon.");
        setIsOpen(false);
        // Reset states
        setStep(1);
        setFormData({
          planName: "whole life plan",
          sumAssured: 500000,
          policyTerm: 15,
          premiumMode: "yearly",
          fullName: "",
          email: "",
          phone: "",
          dob: "",
          gender: "",
          maritalStatus: "single",
          education: "",
          nationality: "Nepalese",
          personalPhoto: "",
          identityDocType: "citizenship",
          identityDocNo: "",
          identityDocFront: "",
          identityDocBack: "",
          identityDocIssuedDate: "",
          identityDocIssuedPlace: "",
          fatherName: "",
          motherName: "",
          grandfatherName: "",
          spouseName: "",
          permState: "",
          permDistrict: "",
          permMunicipality: "",
          permWard: "",
          permStreet: "",
          tempState: "",
          tempDistrict: "",
          tempMunicipality: "",
          tempWard: "",
          tempStreet: "",
          isSameAddress: false,
          height: "",
          weight: "",
          tobaccoUse: false,
          medicalConditions: "",
          nomineeName: "",
          nomineeRelation: "",
          nomineePhone: "",
          nomineeIdType: "citizenship",
          nomineeIdNo: "",
          nomineeIdIssuedDate: "",
          nomineeIdIssuedPlace: "",
          nomineePhoto: "",
          nomineeIdFront: "",
          nomineeIdBack: "",
          acceptedTerms: false
        });
      } else {
        toast.error(data.error || "Failed to submit policy proposal.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Helper variables for locations
  const selectedPermProvince = provinces.find((p) => p.name === formData.permState);
  const permDistricts = selectedPermProvince ? selectedPermProvince.districts : [];
  const selectedPermDistrict = permDistricts.find((d) => d.name === formData.permDistrict);
  const permMunicipalities = selectedPermDistrict ? selectedPermDistrict.municipalities : [];

  const selectedTempProvince = provinces.find((p) => p.name === formData.tempState);
  const tempDistricts = selectedTempProvince ? selectedTempProvince.districts : [];
  const selectedTempDistrict = tempDistricts.find((d) => d.name === formData.tempDistrict);
  const tempMunicipalities = selectedTempDistrict ? selectedTempDistrict.municipalities : [];

  // Generate a flat list of all unique Nepal districts alphabetically
  const allDistricts = provinces.reduce((acc, prov) => {
    prov.districts.forEach((d) => {
      if (!acc.includes(d.name)) acc.push(d.name);
    });
    return acc;
  }, []);
  allDistricts.sort();

  return (
    <>
      {/* Floating CTA Button & Toll Free */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <button
          onClick={handleOpenClick}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 text-white font-extrabold text-sm py-4 px-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 animate-float cursor-pointer"
        >
          <span className="absolute -inset-1 rounded-full bg-emerald-400/35 blur-sm opacity-75 animate-ping group-hover:opacity-100 duration-1000"></span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="relative">Buy Dream Policy 🌟</span>
        </button>

        {/* Floating Toll Free Badge */}
        <div className="flex items-center gap-1.5 text-neutral-600 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-neutral-200/80 shadow-md text-[10px] font-black tracking-wider uppercase hover:scale-105 transition-all select-none">
          <svg className="w-3.5 h-3.5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Toll Free: 1660-01-88888</span>
        </div>
      </div>

      {/* Main Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-2 sm:p-4 pt-24 sm:pt-28 bg-black/60 backdrop-blur-md overflow-hidden">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden flex flex-col max-h-[calc(100vh-110px)] sm:max-h-[calc(100vh-140px)]">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-600 to-emerald-600 px-6 py-4 sm:py-5 text-white flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-lg sm:text-xl font-black">Dream Policy Proposal Form</h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  {step === 8 ? "Step 8: Final Review" : `Step ${step} of 8 — Fill in details to get started`}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Stepper Progress Tracker */}
            <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between gap-1 overflow-x-auto select-none shrink-0">
              {[
                { n: 1, l: "Policy" },
                { n: 2, l: "Personal" },
                { n: 3, l: "Identity" },
                { n: 4, l: "Family" },
                { n: 5, l: "Address" },
                { n: 6, l: "Health" },
                { n: 7, l: "Nominee" },
                { n: 8, l: "Review" }
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-1.5 flex-1 min-w-[65px]">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      step >= s.n
                        ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                        : "bg-neutral-200 text-neutral-500"
                    }`}
                  >
                    {s.n}
                  </div>
                  <span
                    className={`text-[10px] font-extrabold hidden md:inline truncate ${
                      step >= s.n ? "text-brand-700" : "text-neutral-400"
                    }`}
                  >
                    {s.l}
                  </span>
                  {s.n < 8 && <div className="flex-1 h-0.5 bg-neutral-200 hidden md:block"></div>}
                </div>
              ))}
            </div>

            {/* Form body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* STEP 1: Policy Information */}
                {step === 1 && (
                  <div className="space-y-5 animate-fade-in">
                    <h4 className="text-sm font-extrabold text-neutral-800 border-b border-neutral-100 pb-2">Step 1: Configure Your Insurance Policy</h4>
                    
                    {/* Policy Plan */}
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5 font-sans">Select Policy Plan *</label>
                      <select
                        name="planName"
                        value={formData.planName}
                        onChange={handleInputChange}
                        className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 bg-white"
                      >
                        <option value="whole life plan">Whole Life Plan</option>
                        <option value="wtm plan">WTM Plan</option>
                        <option value="etm plan">ETM Plan</option>
                        <option value="wt plan">WT Plan</option>
                        <option value="endowment plan">Endowment Plan</option>
                        <option value="child plan">Child Plan</option>
                      </select>
                    </div>
                    
                    {/* Sum Assured */}
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Sum Assured (Rs.) *</label>
                        <span className="text-sm font-black text-brand-600">Rs. {Number(formData.sumAssured).toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        name="sumAssured"
                        min="50000"
                        max="10000000"
                        step="50000"
                        value={formData.sumAssured}
                        onChange={handleInputChange}
                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-600 focus:outline-none"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-bold">
                        <span>Min: Rs. 50K</span>
                        <span>Max: Rs. 10M</span>
                      </div>
                      <input
                        type="number"
                        name="sumAssured"
                        value={formData.sumAssured}
                        onChange={handleInputChange}
                        className="mt-2.5 px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold focus:outline-none focus:border-brand-500"
                      />
                      {errors.sumAssured && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.sumAssured}</p>}
                    </div>

                    {/* Policy Term */}
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-bold text-neutral-500 uppercase">Policy Term (Years) *</label>
                        <span className="text-sm font-black text-brand-600">{formData.policyTerm} Years</span>
                      </div>
                      <input
                        type="range"
                        name="policyTerm"
                        min="5"
                        max="50"
                        step="1"
                        value={formData.policyTerm}
                        onChange={handleInputChange}
                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-600 focus:outline-none"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-bold">
                        <span>5 Years</span>
                        <span>50 Years</span>
                      </div>
                      {errors.policyTerm && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.policyTerm}</p>}
                    </div>

                    {/* Premium Paying Mode */}
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-neutral-500 uppercase mb-2.5">Premium Paying Mode *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { value: "yearly", label: "Yearly" },
                          { value: "half-yearly", label: "Half-Yearly" },
                          { value: "quarterly", label: "Quarterly" },
                          { value: "monthly", label: "Monthly" }
                        ].map((mode) => (
                          <button
                            key={mode.value}
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, premiumMode: mode.value }))}
                            className={`py-3 px-2 rounded-xl text-xs font-extrabold border transition-all text-center cursor-pointer ${
                              formData.premiumMode === mode.value
                                ? "bg-brand-50 border-brand-500 text-brand-700 shadow-sm"
                                : "border-neutral-200 hover:bg-neutral-50 text-neutral-600"
                            }`}
                          >
                            {mode.label}
                          </button>
                        ))}
                      </div>
                      {errors.premiumMode && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.premiumMode}</p>}
                    </div>
                  </div>
                )}

                {/* STEP 2: Personal Details */}
                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h4 className="text-sm font-extrabold text-neutral-800 border-b border-neutral-100 pb-2">Step 2: Personal Profile</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.fullName ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="Your Full Name"
                        />
                        {errors.fullName && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.fullName}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.email ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="name@example.com"
                        />
                        {errors.email && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.email}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.phone ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="98XXXXXXXX"
                        />
                        {errors.phone && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.phone}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Date of Birth *</label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.dob ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                        />
                        {errors.dob && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.dob}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Gender *</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:ring-2 transition-all ${
                            errors.gender ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.gender}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Marital Status *</label>
                        <select
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleInputChange}
                          className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:border-brand-500"
                        >
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Education Qualification *</label>
                        <input
                          type="text"
                          name="education"
                          value={formData.education}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.education ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="e.g. Bachelor's, High School"
                        />
                        {errors.education && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.education}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Nationality *</label>
                        <input
                          type="text"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.nationality ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="Nepalese"
                        />
                        {errors.nationality && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.nationality}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Identity Documents (with Personal Photo, Front and Back Photos) */}
                {step === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <h4 className="text-sm font-extrabold text-neutral-800 border-b border-neutral-100 pb-2">Step 3: Identity Verification Documents</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Document Type *</label>
                        <select
                          name="identityDocType"
                          value={formData.identityDocType}
                          onChange={handleInputChange}
                          className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:border-brand-500"
                        >
                          <option value="citizenship">Citizenship Certificate</option>
                          <option value="passport">Passport</option>
                          <option value="license">Driver's License</option>
                          <option value="voter_id">Voter ID Card</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Document Number *</label>
                        <input
                          type="text"
                          name="identityDocNo"
                          value={formData.identityDocNo}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.identityDocNo ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="e.g. 12-34-56-789"
                        />
                        {errors.identityDocNo && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.identityDocNo}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Issued Date *</label>
                        <input
                          type="date"
                          name="identityDocIssuedDate"
                          value={formData.identityDocIssuedDate}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.identityDocIssuedDate ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                        />
                        {errors.identityDocIssuedDate && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.identityDocIssuedDate}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Issued Place (District) *</label>
                        <select
                          name="identityDocIssuedPlace"
                          value={formData.identityDocIssuedPlace}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:ring-2 transition-all ${
                            errors.identityDocIssuedPlace ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                        >
                          <option value="">Select Issued District</option>
                          {allDistricts.map((dist) => (
                            <option key={dist} value={dist}>{dist}</option>
                          ))}
                        </select>
                        {errors.identityDocIssuedPlace && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.identityDocIssuedPlace}</p>}
                      </div>
                    </div>

                    {/* Image Upload Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                      
                      {/* Personal PP Photo */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5 font-sans">Passport Size Photo *</label>
                        <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-4 flex flex-col items-center justify-center bg-neutral-50 relative h-36 group">
                          {formData.personalPhoto ? (
                            <div className="w-full h-full relative">
                              <img src={formData.personalPhoto} alt="Applicant PP Size" className="w-full h-full object-contain rounded-xl" />
                              <button
                                type="button"
                                onClick={() => setFormData((p) => ({ ...p, personalPhoto: "" }))}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 cursor-pointer"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg className="w-8 h-8 text-neutral-400 group-hover:scale-110 transition-transform mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                              </svg>
                              <p className="text-[10px] text-neutral-500 font-bold text-center">Applicant Photo</p>
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleImageChange(e, "personalPhoto")}
                              />
                            </>
                          )}
                        </div>
                        {errors.personalPhoto && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.personalPhoto}</p>}
                      </div>

                      {/* Front Image Upload */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5 font-sans">Document Front Side *</label>
                        <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-4 flex flex-col items-center justify-center bg-neutral-50 relative h-36 group">
                          {formData.identityDocFront ? (
                            <div className="w-full h-full relative">
                              <img src={formData.identityDocFront} alt="Doc Front Preview" className="w-full h-full object-contain rounded-xl" />
                              <button
                                type="button"
                                onClick={() => setFormData((p) => ({ ...p, identityDocFront: "" }))}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 cursor-pointer"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg className="w-8 h-8 text-neutral-400 group-hover:scale-110 transition-transform mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                              </svg>
                              <p className="text-[10px] text-neutral-500 font-bold text-center">Document Front</p>
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleImageChange(e, "identityDocFront")}
                              />
                            </>
                          )}
                        </div>
                        {errors.identityDocFront && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.identityDocFront}</p>}
                      </div>

                      {/* Back Image Upload */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5 font-sans">Document Back Side *</label>
                        <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-4 flex flex-col items-center justify-center bg-neutral-50 relative h-36 group">
                          {formData.identityDocBack ? (
                            <div className="w-full h-full relative">
                              <img src={formData.identityDocBack} alt="Doc Back Preview" className="w-full h-full object-contain rounded-xl" />
                              <button
                                type="button"
                                onClick={() => setFormData((p) => ({ ...p, identityDocBack: "" }))}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 cursor-pointer"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg className="w-8 h-8 text-neutral-400 group-hover:scale-110 transition-transform mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                              </svg>
                              <p className="text-[10px] text-neutral-500 font-bold text-center">Document Back</p>
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleImageChange(e, "identityDocBack")}
                              />
                            </>
                          )}
                        </div>
                        {errors.identityDocBack && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.identityDocBack}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Family Info */}
                {step === 4 && (
                  <div className="space-y-4 animate-fade-in">
                    <h4 className="text-sm font-extrabold text-neutral-800 border-b border-neutral-100 pb-2">Step 4: Family Information</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Father's Full Name *</label>
                        <input
                          type="text"
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.fatherName ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="Father's Full Name"
                        />
                        {errors.fatherName && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.fatherName}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Mother's Full Name *</label>
                        <input
                          type="text"
                          name="motherName"
                          value={formData.motherName}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.motherName ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="Mother's Full Name"
                        />
                        {errors.motherName && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.motherName}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Grandfather's Full Name *</label>
                        <input
                          type="text"
                          name="grandfatherName"
                          value={formData.grandfatherName}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.grandfatherName ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="Grandfather's Full Name"
                        />
                        {errors.grandfatherName && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.grandfatherName}</p>}
                      </div>

                      {formData.maritalStatus === "married" && (
                        <div className="flex flex-col animate-fade-in">
                          <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Spouse's Full Name *</label>
                          <input
                            type="text"
                            name="spouseName"
                            value={formData.spouseName}
                            onChange={handleInputChange}
                            className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                              errors.spouseName ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                            }`}
                            placeholder="Spouse's Full Name"
                          />
                          {errors.spouseName && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.spouseName}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 5: Address Information */}
                {step === 5 && (
                  <div className="space-y-4 animate-fade-in">
                    
                    {/* Permanent Address */}
                    <div className="space-y-3.5">
                      <h4 className="text-sm font-extrabold text-neutral-800 border-b border-neutral-100 pb-2">Step 5: Permanent Address</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        
                        {/* Permanent Province */}
                        <div className="flex flex-col col-span-2">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Province/State *</label>
                          <select
                            name="permState"
                            value={formData.permState}
                            onChange={handleLocationChange}
                            className="px-3 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:border-brand-500"
                          >
                            <option value="">Select Province</option>
                            {provinces.map((prov) => (
                              <option key={prov.id} value={prov.name}>{prov.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Permanent District */}
                        <div className="flex flex-col col-span-2">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1">District *</label>
                          <select
                            name="permDistrict"
                            value={formData.permDistrict}
                            onChange={handleLocationChange}
                            disabled={!formData.permState}
                            className="px-3 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:border-brand-500 disabled:bg-neutral-50 disabled:cursor-not-allowed"
                          >
                            <option value="">Select District</option>
                            {permDistricts.map((dist) => (
                              <option key={dist.name} value={dist.name}>{dist.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Permanent Ward */}
                        <div className="flex flex-col">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Ward *</label>
                          <input
                            type="text"
                            name="permWard"
                            value={formData.permWard}
                            onChange={handleInputChange}
                            className="px-3 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold focus:outline-none focus:border-brand-500"
                            placeholder="e.g. 10"
                          />
                        </div>

                        {/* Permanent Municipality */}
                        <div className="flex flex-col col-span-2 sm:col-span-3">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Municipality / VDC *</label>
                          <select
                            name="permMunicipality"
                            value={formData.permMunicipality}
                            onChange={handleInputChange}
                            disabled={!formData.permDistrict}
                            className="px-3 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:border-brand-500 disabled:bg-neutral-50 disabled:cursor-not-allowed"
                          >
                            <option value="">Select Municipality</option>
                            {permMunicipalities.map((muni) => (
                              <option key={muni} value={muni}>{muni}</option>
                            ))}
                          </select>
                        </div>

                        {/* Permanent Street */}
                        <div className="flex flex-col col-span-2">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Street / Tole *</label>
                          <input
                            type="text"
                            name="permStreet"
                            value={formData.permStreet}
                            onChange={handleInputChange}
                            className="px-3 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold focus:outline-none focus:border-brand-500"
                            placeholder="e.g. New Baneshwor"
                          />
                        </div>
                      </div>
                      {(errors.permState || errors.permDistrict || errors.permMunicipality || errors.permWard || errors.permStreet) && (
                        <p className="text-[10px] text-red-500 font-semibold text-right">Please complete all permanent address details.</p>
                      )}
                    </div>

                    {/* Same Address Switcher */}
                    <div className="flex items-center justify-between py-2 px-4 bg-neutral-50 rounded-2xl border border-neutral-100 mt-4">
                      <div>
                        <p className="text-xs font-bold text-neutral-700">Temporary Address is same as Permanent</p>
                        <p className="text-[10px] text-neutral-400 mt-0.5">Toggle this if your temporary address matches permanent address</p>
                      </div>
                      <input
                        type="checkbox"
                        name="isSameAddress"
                        checked={formData.isSameAddress}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 border-neutral-300 accent-brand-600 cursor-pointer"
                      />
                    </div>

                    {/* Temporary Address */}
                    {!formData.isSameAddress && (
                      <div className="space-y-3.5 mt-4 animate-fade-in">
                        <h4 className="text-sm font-extrabold text-neutral-800 border-b border-neutral-100 pb-2">Temporary Address</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                          
                          {/* Temporary Province */}
                          <div className="flex flex-col col-span-2">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Province/State *</label>
                            <select
                              name="tempState"
                              value={formData.tempState}
                              onChange={handleLocationChange}
                              className="px-3 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:border-brand-500"
                            >
                              <option value="">Select Province</option>
                              {provinces.map((prov) => (
                                <option key={prov.id} value={prov.name}>{prov.name}</option>
                              ))}
                            </select>
                          </div>

                          {/* Temporary District */}
                          <div className="flex flex-col col-span-2">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1">District *</label>
                            <select
                              name="tempDistrict"
                              value={formData.tempDistrict}
                              onChange={handleLocationChange}
                              disabled={!formData.tempState}
                              className="px-3 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:border-brand-500 disabled:bg-neutral-50 disabled:cursor-not-allowed"
                            >
                              <option value="">Select District</option>
                              {tempDistricts.map((dist) => (
                                <option key={dist.name} value={dist.name}>{dist.name}</option>
                              ))}
                            </select>
                          </div>

                          {/* Temporary Ward */}
                          <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Ward *</label>
                            <input
                              type="text"
                              name="tempWard"
                              value={formData.tempWard}
                              onChange={handleInputChange}
                              className="px-3 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold focus:outline-none focus:border-brand-500"
                              placeholder="e.g. 10"
                            />
                          </div>

                          {/* Temporary Municipality */}
                          <div className="flex flex-col col-span-2 sm:col-span-3">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Municipality / VDC *</label>
                            <select
                              name="tempMunicipality"
                              value={formData.tempMunicipality}
                              onChange={handleInputChange}
                              disabled={!formData.tempDistrict}
                              className="px-3 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:border-brand-500 disabled:bg-neutral-50 disabled:cursor-not-allowed"
                            >
                              <option value="">Select Municipality</option>
                              {tempMunicipalities.map((muni) => (
                                <option key={muni} value={muni}>{muni}</option>
                              ))}
                            </select>
                          </div>

                          {/* Temporary Street */}
                          <div className="flex flex-col col-span-2">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Street / Tole *</label>
                            <input
                              type="text"
                              name="tempStreet"
                              value={formData.tempStreet}
                              onChange={handleInputChange}
                              className="px-3 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold focus:outline-none focus:border-brand-500"
                              placeholder="e.g. Mid Baneshwor"
                            />
                          </div>
                        </div>
                        {(errors.tempState || errors.tempDistrict || errors.tempMunicipality || errors.tempWard || errors.tempStreet) && (
                          <p className="text-[10px] text-red-500 font-semibold text-right">Please complete all temporary address details.</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 6: Medical & Lifestyle */}
                {step === 6 && (
                  <div className="space-y-4 animate-fade-in">
                    <h4 className="text-sm font-extrabold text-neutral-800 border-b border-neutral-100 pb-2">Step 6: Medical & Lifestyle Information</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Height (cm) *</label>
                        <input
                          type="number"
                          name="height"
                          value={formData.height}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.height ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="e.g. 170"
                        />
                        {errors.height && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.height}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Weight (kg) *</label>
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.weight ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="e.g. 68"
                        />
                        {errors.weight && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.weight}</p>}
                      </div>

                      <div className="flex items-center sm:col-span-2 py-2.5 px-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex-row justify-between">
                        <div>
                          <p className="text-xs font-bold text-neutral-700">Tobacco / Nicotine Usage</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">Check this box if you consume cigarettes or tobacco products</p>
                        </div>
                        <input
                          type="checkbox"
                          name="tobaccoUse"
                          checked={formData.tobaccoUse}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 border-neutral-300 accent-brand-600 cursor-pointer"
                        />
                      </div>

                      <div className="flex flex-col sm:col-span-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Pre-existing Medical Conditions (if any)</label>
                        <textarea
                          name="medicalConditions"
                          value={formData.medicalConditions}
                          onChange={handleInputChange}
                          rows="3"
                          className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:font-normal"
                          placeholder="Explain any details regarding surgeries, chronic ailments, diabetes, blood pressure, etc. Type 'None' if not applicable."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 7: Nominee Details (with relationship dropdown, ID, and photos) */}
                {step === 7 && (
                  <div className="space-y-4 animate-fade-in">
                    <h4 className="text-sm font-extrabold text-neutral-800 border-b border-neutral-100 pb-2">Step 7: Nominee Details</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Nominee Full Name *</label>
                        <input
                          type="text"
                          name="nomineeName"
                          value={formData.nomineeName}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.nomineeName ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="Nominee Full Name"
                        />
                        {errors.nomineeName && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.nomineeName}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Relationship to Proposer *</label>
                        <select
                          name="nomineeRelation"
                          value={formData.nomineeRelation}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:ring-2 transition-all ${
                            errors.nomineeRelation ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                        >
                          <option value="">Select Relationship</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Son">Son</option>
                          <option value="Daughter">Daughter</option>
                          <option value="Brother">Brother</option>
                          <option value="Sister">Sister</option>
                          <option value="Grandfather">Grandfather</option>
                          <option value="Grandmother">Grandmother</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.nomineeRelation && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.nomineeRelation}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Nominee Phone Number *</label>
                        <input
                          type="tel"
                          name="nomineePhone"
                          value={formData.nomineePhone}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.nomineePhone ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="Nominee Contact Number"
                        />
                        {errors.nomineePhone && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.nomineePhone}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Nominee ID Doc Type *</label>
                        <select
                          name="nomineeIdType"
                          value={formData.nomineeIdType}
                          onChange={handleInputChange}
                          className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:border-brand-500"
                        >
                          <option value="citizenship">Citizenship Certificate</option>
                          <option value="passport">Passport</option>
                          <option value="voter_id">Voter ID Card</option>
                          <option value="minor_certificate">Minor Birth Certificate</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Nominee ID Document Number *</label>
                        <input
                          type="text"
                          name="nomineeIdNo"
                          value={formData.nomineeIdNo}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.nomineeIdNo ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                          placeholder="Nominee Document Number"
                        />
                        {errors.nomineeIdNo && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.nomineeIdNo}</p>}
                      </div>

                      {/* Nominee Issued Date */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Nominee ID Issued Date *</label>
                        <input
                          type="date"
                          name="nomineeIdIssuedDate"
                          value={formData.nomineeIdIssuedDate}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold focus:outline-none focus:ring-2 transition-all ${
                            errors.nomineeIdIssuedDate ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                        />
                        {errors.nomineeIdIssuedDate && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.nomineeIdIssuedDate}</p>}
                      </div>

                      {/* Nominee Issued Place (District Dropdown only) */}
                      <div className="flex flex-col sm:col-span-2">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Nominee ID Issued Place (District) *</label>
                        <select
                          name="nomineeIdIssuedPlace"
                          value={formData.nomineeIdIssuedPlace}
                          onChange={handleInputChange}
                          className={`px-4 py-2.5 rounded-xl border text-sm text-neutral-800 font-semibold bg-white focus:outline-none focus:ring-2 transition-all ${
                            errors.nomineeIdIssuedPlace ? "border-red-400 focus:ring-red-200" : "border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20"
                          }`}
                        >
                          <option value="">Select Issued District</option>
                          {allDistricts.map((dist) => (
                            <option key={dist} value={dist}>{dist}</option>
                          ))}
                        </select>
                        {errors.nomineeIdIssuedPlace && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.nomineeIdIssuedPlace}</p>}
                      </div>
                    </div>

                    {/* Nominee Image Upload Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-neutral-100">
                      
                      {/* Nominee PP Photo */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5">Nominee Passport Photo *</label>
                        <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-4 flex flex-col items-center justify-center bg-neutral-50 relative h-36 group">
                          {formData.nomineePhoto ? (
                            <div className="w-full h-full relative">
                              <img src={formData.nomineePhoto} alt="Nominee Photo Preview" className="w-full h-full object-contain rounded-xl" />
                              <button
                                type="button"
                                onClick={() => setFormData((p) => ({ ...p, nomineePhoto: "" }))}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 cursor-pointer"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg className="w-8 h-8 text-neutral-400 group-hover:scale-110 transition-transform mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                              </svg>
                              <p className="text-[10px] text-neutral-500 font-bold text-center">Nominee Photo</p>
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleImageChange(e, "nomineePhoto")}
                              />
                            </>
                          )}
                        </div>
                        {errors.nomineePhoto && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.nomineePhoto}</p>}
                      </div>

                      {/* Nominee Front Image Upload */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5 font-sans">Nominee Document Front *</label>
                        <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-4 flex flex-col items-center justify-center bg-neutral-50 relative h-36 group">
                          {formData.nomineeIdFront ? (
                            <div className="w-full h-full relative">
                              <img src={formData.nomineeIdFront} alt="Nominee Doc Front Preview" className="w-full h-full object-contain rounded-xl" />
                              <button
                                type="button"
                                onClick={() => setFormData((p) => ({ ...p, nomineeIdFront: "" }))}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 cursor-pointer"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg className="w-8 h-8 text-neutral-400 group-hover:scale-110 transition-transform mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                              </svg>
                              <p className="text-[10px] text-neutral-500 font-bold text-center">Document Front</p>
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleImageChange(e, "nomineeIdFront")}
                              />
                            </>
                          )}
                        </div>
                        {errors.nomineeIdFront && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.nomineeIdFront}</p>}
                      </div>

                      {/* Nominee Back Image Upload */}
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-neutral-500 uppercase mb-1.5 font-sans">Nominee Document Back *</label>
                        <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-4 flex flex-col items-center justify-center bg-neutral-50 relative h-36 group">
                          {formData.nomineeIdBack ? (
                            <div className="w-full h-full relative">
                              <img src={formData.nomineeIdBack} alt="Nominee Doc Back Preview" className="w-full h-full object-contain rounded-xl" />
                              <button
                                type="button"
                                onClick={() => setFormData((p) => ({ ...p, nomineeIdBack: "" }))}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 cursor-pointer"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg className="w-8 h-8 text-neutral-400 group-hover:scale-110 transition-transform mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                              </svg>
                              <p className="text-[10px] text-neutral-500 font-bold text-center">Document Back</p>
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleImageChange(e, "nomineeIdBack")}
                              />
                            </>
                          )}
                        </div>
                        {errors.nomineeIdBack && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.nomineeIdBack}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 8: Final Review & Terms Acceptance */}
                {step === 8 && (
                  <div className="space-y-6 animate-fade-in text-neutral-800 text-xs sm:text-sm">
                    <h4 className="text-sm font-extrabold text-neutral-800 border-b border-neutral-100 pb-2">Step 8: Review Your Proposal Summary</h4>
                    
                    <div className="space-y-5 bg-neutral-50 p-4 sm:p-5 rounded-2xl border border-neutral-200/60 max-h-[50vh] overflow-y-auto">
                      
                      {/* Section 1: Policy Info */}
                      <div>
                        <h5 className="text-[11px] font-black text-brand-600 uppercase tracking-wider mb-2">1. Policy configuration</h5>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-b border-neutral-200/60 pb-3">
                          <div><span className="text-neutral-400 font-medium">Sum Assured:</span> <span className="font-bold">Rs. {Number(formData.sumAssured).toLocaleString()}</span></div>
                          <div><span className="text-neutral-400 font-medium">Policy Term:</span> <span className="font-bold">{formData.policyTerm} Years</span></div>
                          <div className="col-span-2"><span className="text-neutral-400 font-medium">Premium Paying Mode:</span> <span className="font-bold capitalize">{formData.premiumMode}</span></div>
                        </div>
                      </div>

                      {/* Section 2: Personal Profile */}
                      <div>
                        <h5 className="text-[11px] font-black text-brand-600 uppercase tracking-wider mb-2">2. Personal Profile</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 border-b border-neutral-200/60 pb-3">
                          <div><span className="text-neutral-400 font-medium">Full Name:</span> <span className="font-bold">{formData.fullName}</span></div>
                          <div><span className="text-neutral-400 font-medium">Email:</span> <span className="font-bold">{formData.email}</span></div>
                          <div><span className="text-neutral-400 font-medium">Phone:</span> <span className="font-bold">{formData.phone}</span></div>
                          <div><span className="text-neutral-400 font-medium">DOB:</span> <span className="font-bold">{formData.dob}</span></div>
                          <div><span className="text-neutral-400 font-medium">Gender:</span> <span className="font-bold capitalize">{formData.gender}</span></div>
                          <div><span className="text-neutral-400 font-medium">Marital Status:</span> <span className="font-bold capitalize">{formData.maritalStatus}</span></div>
                          <div><span className="text-neutral-400 font-medium">Education:</span> <span className="font-bold">{formData.education}</span></div>
                          <div><span className="text-neutral-400 font-medium">Nationality:</span> <span className="font-bold">{formData.nationality}</span></div>
                        </div>
                      </div>

                      {/* Section 3: Identity Doc & Photos Preview */}
                      <div>
                        <h5 className="text-[11px] font-black text-brand-600 uppercase tracking-wider mb-2">3. Identity Documents & Photos</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 border-b border-neutral-200/60 pb-3">
                          <div><span className="text-neutral-400 font-medium">Document Type:</span> <span className="font-bold capitalize">{formData.identityDocType.replace("_", " ")}</span></div>
                          <div><span className="text-neutral-400 font-medium">Document No:</span> <span className="font-bold">{formData.identityDocNo}</span></div>
                          <div><span className="text-neutral-400 font-medium">Issued Date:</span> <span className="font-bold">{formData.identityDocIssuedDate}</span></div>
                          <div><span className="text-neutral-400 font-medium">Issued Place:</span> <span className="font-bold">{formData.identityDocIssuedPlace}</span></div>
                          <div className="col-span-1 sm:col-span-2 flex gap-3 mt-1.5 flex-wrap">
                            {formData.personalPhoto && (
                              <div>
                                <p className="text-[9px] text-neutral-400 font-bold mb-1">Applicant PP Photo</p>
                                <img src={formData.personalPhoto} alt="Applicant PP Size" className="h-14 w-14 object-cover rounded-lg border border-neutral-200 bg-neutral-100" />
                              </div>
                            )}
                            {formData.identityDocFront && (
                              <div>
                                <p className="text-[9px] text-neutral-400 font-bold mb-1">Front Photo</p>
                                <img src={formData.identityDocFront} alt="Doc Front Preview" className="h-14 w-20 object-cover rounded-lg border border-neutral-200 bg-neutral-100" />
                              </div>
                            )}
                            {formData.identityDocBack && (
                              <div>
                                <p className="text-[9px] text-neutral-400 font-bold mb-1">Back Photo</p>
                                <img src={formData.identityDocBack} alt="Doc Back Preview" className="h-14 w-20 object-cover rounded-lg border border-neutral-200 bg-neutral-100" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Section 4: Family Details */}
                      <div>
                        <h5 className="text-[11px] font-black text-brand-600 uppercase tracking-wider mb-2">4. Family details</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 border-b border-neutral-200/60 pb-3">
                          <div><span className="text-neutral-400 font-medium">Father's Name:</span> <span className="font-bold">{formData.fatherName}</span></div>
                          <div><span className="text-neutral-400 font-medium">Mother's Name:</span> <span className="font-bold">{formData.motherName}</span></div>
                          <div><span className="text-neutral-400 font-medium">Grandfather's Name:</span> <span className="font-bold">{formData.grandfatherName}</span></div>
                          {formData.maritalStatus === "married" && (
                            <div><span className="text-neutral-400 font-medium">Spouse's Name:</span> <span className="font-bold">{formData.spouseName}</span></div>
                          )}
                        </div>
                      </div>

                      {/* Section 5: Address Information */}
                      <div>
                        <h5 className="text-[11px] font-black text-brand-600 uppercase tracking-wider mb-2">5. Address details</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 border-b border-neutral-200/60 pb-3">
                          <div>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase mb-0.5">Permanent Address</p>
                            <p className="font-semibold text-neutral-700 leading-normal">
                              {formData.permState}, {formData.permDistrict}, {formData.permMunicipality} - Ward {formData.permWard}, {formData.permStreet}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase mb-0.5">Temporary Address</p>
                            <p className="font-semibold text-neutral-700 leading-normal">
                              {formData.isSameAddress ? (
                                <span className="italic text-neutral-400">Same as Permanent Address</span>
                              ) : (
                                `${formData.tempState}, ${formData.tempDistrict}, ${formData.tempMunicipality} - Ward ${formData.tempWard}, ${formData.tempStreet}`
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Section 6: Health Details */}
                      <div>
                        <h5 className="text-[11px] font-black text-brand-600 uppercase tracking-wider mb-2">6. Medical & Lifestyle</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 border-b border-neutral-200/60 pb-3">
                          <div><span className="text-neutral-400 font-medium">Height:</span> <span className="font-bold">{formData.height} cm</span></div>
                          <div><span className="text-neutral-400 font-medium">Weight:</span> <span className="font-bold">{formData.weight} kg</span></div>
                          <div><span className="text-neutral-400 font-medium">Tobacco Usage:</span> <span className="font-bold">{formData.tobaccoUse ? "Yes" : "No"}</span></div>
                          <div className="col-span-1 sm:col-span-2"><span className="text-neutral-400 font-medium">Medical Conditions:</span> <span className="font-bold">{formData.medicalConditions || "None"}</span></div>
                        </div>
                      </div>

                      {/* Section 7: Nominee Details */}
                      <div>
                        <h5 className="text-[11px] font-black text-brand-600 uppercase tracking-wider mb-2">7. Nominee details</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 border-b border-neutral-200/60 pb-3 font-sans">
                          <div><span className="text-neutral-400 font-medium">Nominee Name:</span> <span className="font-bold">{formData.nomineeName}</span></div>
                          <div><span className="text-neutral-400 font-medium">Relationship:</span> <span className="font-bold">{formData.nomineeRelation}</span></div>
                          <div><span className="text-neutral-400 font-medium">Nominee Phone:</span> <span className="font-bold">{formData.nomineePhone}</span></div>
                          <div><span className="text-neutral-400 font-medium">Nominee ID ({formData.nomineeIdType}):</span> <span className="font-bold">{formData.nomineeIdNo}</span></div>
                          <div><span className="text-neutral-400 font-medium">Issued Date:</span> <span className="font-bold">{formData.nomineeIdIssuedDate}</span></div>
                          <div><span className="text-neutral-400 font-medium">Issued Place (District):</span> <span className="font-bold">{formData.nomineeIdIssuedPlace}</span></div>
                          
                          {/* Nominee Uploads Previews */}
                          <div className="col-span-1 sm:col-span-2 flex gap-3 mt-2 flex-wrap">
                            {formData.nomineePhoto && (
                              <div>
                                <p className="text-[9px] text-neutral-400 font-bold mb-1">Nominee Photo</p>
                                <img src={formData.nomineePhoto} alt="Nominee Photo Preview" className="h-14 w-14 object-cover rounded-lg border border-neutral-200 bg-neutral-100" />
                              </div>
                            )}
                            {formData.nomineeIdFront && (
                              <div>
                                <p className="text-[9px] text-neutral-400 font-bold mb-1">Nominee Front Photo</p>
                                <img src={formData.nomineeIdFront} alt="Nominee Doc Front Preview" className="h-14 w-20 object-cover rounded-lg border border-neutral-200 bg-neutral-100" />
                              </div>
                            )}
                            {formData.nomineeIdBack && (
                              <div>
                                <p className="text-[9px] text-neutral-400 font-bold mb-1">Nominee Back Photo</p>
                                <img src={formData.nomineeIdBack} alt="Nominee Doc Back Preview" className="h-14 w-20 object-cover rounded-lg border border-neutral-200 bg-neutral-100" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Terms & Conditions Checkbox */}
                    <div className="flex flex-col p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="acceptedTerms"
                          name="acceptedTerms"
                          checked={formData.acceptedTerms}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 border-neutral-300 accent-brand-600 cursor-pointer mt-0.5 shrink-0"
                        />
                        <label htmlFor="acceptedTerms" className="text-xs font-bold text-neutral-700 cursor-pointer leading-relaxed">
                          I declare that all the information provided in this pre-proposal form is true, accurate, and complete. I authorize BeemaDukaan to verify these details.
                        </label>
                      </div>
                      {errors.acceptedTerms && <p className="text-[10px] text-red-500 font-bold ml-8">{errors.acceptedTerms}</p>}
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between shrink-0">
              <div>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-600 transition-all cursor-pointer"
                  >
                    Back
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-600 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                {step < 8 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-extrabold transition-all shadow-md shadow-brand-500/10 cursor-pointer"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white text-xs font-extrabold transition-all shadow-md shadow-brand-500/10 flex items-center gap-1.5 cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>Submit Proposal 🚀</>
                    )}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
