import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function SubscribedPolicies({ onUpdateCount, onUpdatePremium, session, profileDetails, onClaimSubmitted }) {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [activeCardPolicy, setActiveCardPolicy] = useState(null);
  const [flipCard, setFlipCard] = useState(false);

  const [activeClaimPolicy, setActiveClaimPolicy] = useState(null);
  const [claimStep, setClaimStep] = useState(1);
  const [claimSuccessData, setClaimSuccessData] = useState(null);
  const [submittingClaim, setSubmittingClaim] = useState(false);
  const [claimFormData, setClaimFormData] = useState({
    claimType: "Medical/Health",
    claimAmount: "",
    incidentDate: "",
    description: "",
    supportingDocs: [],
  });

  useEffect(() => {
    fetchPolicies();
  }, []);

  useEffect(() => {
    if (activeCardPolicy || activeClaimPolicy) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCardPolicy, activeClaimPolicy]);

  const fetchPolicies = async () => {
    try {
      const res = await fetch("/api/insurance/policies");
      if (res.ok) {
        const data = await res.json();
        setPolicies(data);
        if (onUpdateCount) {
          onUpdateCount(data.length);
        }
        
        // Calculate annual premium sum
        let premiumSum = 0;
        data.forEach((policy) => {
          const mode = (policy.premiumMode || "").toLowerCase();
          const prem = Number(policy.premium) || 0;
          if (mode === "yearly") {
            premiumSum += prem;
          } else if (mode === "quarterly") {
            premiumSum += prem * 4;
          } else if (mode === "monthly") {
            premiumSum += prem * 12;
          } else {
            premiumSum += prem;
          }
        });
        if (onUpdatePremium) {
          onUpdatePremium(premiumSum);
        }
      }
    } catch (err) {
      console.error("Error loading policies:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate coverage health dynamically based on start and end dates
  const getProgress = (policy) => {
    try {
      const start = new Date(policy.startDate || policy.createdAt).getTime();
      const end = new Date(policy.expiryDate).getTime();
      const now = Date.now();
      if (now >= end) return 0;
      const total = end - start;
      const elapsed = now - start;
      const progress = Math.max(0, Math.min(100, Math.round(((total - elapsed) / total) * 100)));
      return progress;
    } catch {
      return 100;
    }
  };

  // Canvas Card Downloader
  const downloadCardAsImage = (policy) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1000;
      canvas.height = 630;
      const ctx = canvas.getContext("2d");

      // Enable smooth rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Draw background gradient
      const grad = ctx.createLinearGradient(0, 0, 1000, 630);
      grad.addColorStop(0, "#064e3b"); // Brand 900
      grad.addColorStop(0.5, "#022c22"); // Deepest green
      grad.addColorStop(1, "#10b981"); // Brand 500
      ctx.fillStyle = grad;
      
      // Rounded corners for the card
      ctx.beginPath();
      ctx.roundRect(0, 0, 1000, 630, 40);
      ctx.fill();

      // Draw some modern decorative circles/curves in background
      ctx.fillStyle = "rgba(16, 185, 129, 0.12)";
      ctx.beginPath();
      ctx.arc(900, 100, 250, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      ctx.beginPath();
      ctx.arc(100, 550, 350, 0, Math.PI * 2);
      ctx.fill();

      // Chip decoration (Simulated Gold Chip)
      const chipGrad = ctx.createLinearGradient(80, 150, 170, 220);
      chipGrad.addColorStop(0, "#fef08a"); // light gold
      chipGrad.addColorStop(1, "#ca8a04"); // gold
      ctx.fillStyle = chipGrad;
      ctx.beginPath();
      ctx.roundRect(80, 150, 90, 70, 12);
      ctx.fill();
      
      // Draw chip lines
      ctx.strokeStyle = "#854d0e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(110, 150); ctx.lineTo(110, 220);
      ctx.moveTo(140, 150); ctx.lineTo(140, 220);
      ctx.moveTo(80, 173); ctx.lineTo(170, 173);
      ctx.moveTo(80, 196); ctx.lineTo(170, 196);
      ctx.stroke();

      // Brand Logo (Shield Icon)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(820, 80);
      ctx.lineTo(845, 70);
      ctx.lineTo(870, 80);
      ctx.lineTo(870, 105);
      ctx.quadraticCurveTo(870, 130, 845, 140);
      ctx.quadraticCurveTo(820, 130, 820, 105);
      ctx.closePath();
      ctx.fill();

      // Shield cross in brand color
      ctx.strokeStyle = "#064e3b";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(845, 80); ctx.lineTo(845, 130);
      ctx.moveTo(828, 98); ctx.lineTo(862, 98);
      ctx.stroke();

      // Logo text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText("BEEMA DUKAAN", 480, 105);
      
      ctx.fillStyle = "#d1fae5";
      ctx.font = "bold 13px sans-serif";
      ctx.fillText("DIGITAL INSURANCE PLATFORM", 480, 128);

      // Divider line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(80, 270);
      ctx.lineTo(920, 270);
      ctx.stroke();

      // Subscriber Details
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("SUBSCRIBER NAME", 80, 310);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px sans-serif";
      const userName = profileDetails?.name || session?.user?.name || "Valued Customer";
      ctx.fillText(userName.toUpperCase(), 80, 348);

      // Policy Details (Row 1)
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("POLICY NUMBER", 80, 420);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px monospace";
      ctx.fillText(policy.policyNumber, 80, 455);

      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("PLAN TYPE", 450, 420);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(policy.planName, 450, 455);

      // Policy Details (Row 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("COVERAGE AMOUNT", 80, 520);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(`NPR ${policy.sumAssured.toLocaleString()}`, 80, 555);

      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("VALID UNTIL", 450, 520);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(new Date(policy.expiryDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), 450, 555);

      // Active Status Tag (Green pill badge)
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.roundRect(800, 318, 120, 36, 18);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 15px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ACTIVE", 860, 342);
      ctx.textAlign = "left"; // reset

      // QR Code visual mockup
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(810, 440, 110, 110, 12);
      ctx.fill();
      // Draw simulated QR blocks
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(820, 450, 30, 30);
      ctx.fillRect(870, 450, 30, 30);
      ctx.fillRect(820, 500, 30, 30);
      ctx.fillRect(835, 465, 10, 10);
      ctx.fillRect(885, 465, 10, 10);
      ctx.fillRect(835, 515, 10, 10);
      ctx.fillRect(860, 480, 15, 15);
      ctx.fillRect(875, 500, 20, 10);
      ctx.fillRect(860, 515, 10, 15);
      ctx.fillRect(890, 525, 15, 15);

      // Emergency Helpline
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "11px sans-serif";
      ctx.fillText("For claims/support: +977-1-4400000 | support@beemadukaan.com", 80, 595);

      // Trigger Download
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `BeemaCard-${policy.policyNumber}.png`;
      link.href = url;
      link.click();
      toast.success("Card downloaded successfully!");
    } catch (err) {
      console.error("Error generating card image:", err);
      toast.error("Failed to generate card image.");
    }
  };

  // Open Claim Modal
  const openClaimModal = (policy) => {
    setActiveClaimPolicy(policy);
    setClaimStep(1);
    setClaimSuccessData(null);
    setClaimFormData({
      claimType: "Medical/Health",
      claimAmount: "",
      incidentDate: new Date().toISOString().split("T")[0],
      description: "",
      supportingDocs: [],
    });
  };

  // Handle file uploads for claims supporting docs
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max size is 2MB.`);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setClaimFormData((prev) => ({
          ...prev,
          supportingDocs: [
            ...prev.supportingDocs,
            { fileName: file.name, fileData: reader.result },
          ],
        }));
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        toast.error("Error reading file.");
      };
    });
  };

  const removeDoc = (index) => {
    setClaimFormData((prev) => ({
      ...prev,
      supportingDocs: prev.supportingDocs.filter((_, idx) => idx !== index),
    }));
  };

  // Submit Claim
  const submitClaim = async () => {
    // Form validations
    if (!claimFormData.claimAmount || Number(claimFormData.claimAmount) <= 0) {
      toast.error("Please enter a valid claim amount.");
      return;
    }
    if (Number(claimFormData.claimAmount) > activeClaimPolicy.sumAssured) {
      toast.error(`Claim amount cannot exceed policy coverage limit of NPR ${activeClaimPolicy.sumAssured.toLocaleString()}`);
      return;
    }
    if (!claimFormData.incidentDate) {
      toast.error("Please select the incident date.");
      return;
    }
    if (new Date(claimFormData.incidentDate) > new Date()) {
      toast.error("Incident date cannot be in the future.");
      return;
    }
    if (!claimFormData.description || claimFormData.description.trim().length < 15) {
      toast.error("Please provide a detailed description (min 15 characters).");
      return;
    }

    setSubmittingClaim(true);
    try {
      const res = await fetch("/api/insurance/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          policyId: activeClaimPolicy._id,
          claimType: claimFormData.claimType,
          claimAmount: claimFormData.claimAmount,
          incidentDate: claimFormData.incidentDate,
          description: claimFormData.description,
          supportingDocs: claimFormData.supportingDocs,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setClaimSuccessData(data);
        setClaimStep(5); // Success step
        toast.success("Claim submitted successfully!");
        if (onClaimSubmitted) {
          onClaimSubmitted();
        }
      } else {
        toast.error(data.error || "Claim submission failed.");
      }
    } catch (err) {
      console.error("Error submitting claim:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmittingClaim(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-8 flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-neutral-400 font-medium mt-3">Loading active policies...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-6 sm:p-8 scroll-mt-24" id="policies-section">
      {/* Self-contained card flip styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .card-perspective { perspective: 1000px; }
        .card-inner { transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-style: preserve-3d; }
        .card-flipped { transform: rotateY(180deg); }
        .card-front, .card-back { backface-visibility: hidden; -webkit-backface-visibility: hidden; position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .card-back { transform: rotateY(180deg); }
      `}} />

      <div className="flex items-center justify-between border-b border-neutral-100 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.475 3.475 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.475 3.475 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.475 3.475 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.475 3.475 0 013.138-3.138z"/>
            </svg>
            Subscribed Policies
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">Your currently active policies and coverage health</p>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">
          {policies.length} Active
        </span>
      </div>

      {policies.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-neutral-200 rounded-2xl bg-neutral-50/30">
          <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h4 className="font-bold text-neutral-800 text-sm">No Active Policies</h4>
          <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
            You don't have any subscribed policies yet. Complete a Pre-Proposal form to get one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((policy) => {
            const progress = getProgress(policy);
            const isHealth = policy.planName.toLowerCase().includes("health");
            return (
              <div key={policy._id} className="p-6 rounded-2xl bg-neutral-50/50 border border-neutral-100 flex flex-col justify-between hover:bg-neutral-50 transition-all shadow-sm hover:shadow">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      isHealth ? "bg-cyan-50 text-cyan-700 border border-cyan-100" : "bg-purple-50 text-purple-700 border border-purple-100"
                    }`}>
                      {isHealth ? "Health" : "Life"} Insurance
                    </span>
                    <span className="text-xs font-bold text-neutral-400 font-mono">ID: {policy.policyNumber}</span>
                  </div>

                  <h4 className="font-extrabold text-neutral-800 text-lg">{policy.planName}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{policy.provider}</p>

                  {/* Progress/Validity Bar */}
                  <div className="mt-5 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-neutral-400">Coverage Duration Health</span>
                      <span className="text-neutral-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isHealth ? "bg-gradient-to-r from-cyan-500 to-brand-500" : "bg-gradient-to-r from-purple-500 to-brand-500"
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-neutral-100 text-xs">
                    <div>
                      <span className="text-neutral-400 block font-bold uppercase text-[9px] tracking-wider">Total Coverage</span>
                      <span className="font-extrabold text-neutral-800 text-sm">NPR {policy.sumAssured.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block font-bold uppercase text-[9px] tracking-wider">Policy Expiry</span>
                      <span className="font-extrabold text-neutral-800 text-sm">{new Date(policy.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={() => {
                      setActiveCardPolicy(policy);
                      setFlipCard(false);
                    }}
                    className="flex-1 text-center py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
                  >
                    Download Card
                  </button>
                  <button 
                    onClick={() => openClaimModal(policy)}
                    className="flex-1 text-center py-2.5 bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 font-bold rounded-xl text-xs shadow-sm transition-all"
                  >
                    Claim Benefits
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DOWNLOAD CARD PREVIEW MODAL */}
      {activeCardPolicy && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-neutral-100 animate-scale-up flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={() => setActiveCardPolicy(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-black text-neutral-900 mb-1">Insurance Membership Card</h3>
            <p className="text-xs text-neutral-400 mb-6 text-center">Interactive 3D preview. Click card or flip button to rotate.</p>

            {/* 3D Flip Card Container */}
            <div 
              onClick={() => setFlipCard(!flipCard)}
              className="w-full max-w-[420px] aspect-[1.58/1] card-perspective cursor-pointer relative group mb-6"
              style={{ minHeight: "265px" }}
            >
              <div className={`w-full h-full card-inner ${flipCard ? "card-flipped" : ""}`}>
                
                {/* FRONT SIDE */}
                <div className="card-front rounded-2xl bg-gradient-to-br from-brand-900 via-emerald-950 to-brand-500 text-white p-5 flex flex-col justify-between shadow-2xl overflow-hidden border border-emerald-800">
                  {/* Subtle Background Glows */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-xl translate-x-10 -translate-y-10"></div>
                  <div className="absolute bottom-0 left-0 w-52 h-52 bg-brand-500/10 rounded-full blur-2xl -translate-x-12 translate-y-12"></div>

                  <div className="relative z-10 flex justify-between items-start">
                    {/* Chip & Provider logo */}
                    <div className="space-y-4">
                      {/* Simulated Gold Chip */}
                      <div className="w-11 h-9 rounded-lg bg-gradient-to-br from-yellow-200 via-amber-400 to-yellow-600 p-[1px] relative overflow-hidden shadow-inner flex flex-wrap gap-[2px] items-center justify-center">
                        <div className="w-full h-[1px] bg-amber-800/40 absolute top-1/3"></div>
                        <div className="w-full h-[1px] bg-amber-800/40 absolute top-2/3"></div>
                        <div className="h-full w-[1px] bg-amber-800/40 absolute left-1/3"></div>
                        <div className="h-full w-[1px] bg-amber-800/40 absolute left-2/3"></div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="w-5 h-5 rounded-md bg-white text-brand-900 flex items-center justify-center font-black text-xs shadow-sm">B</span>
                        <span className="font-extrabold text-sm tracking-wider">BEEMA DUKAAN</span>
                      </div>
                      <span className="text-[8px] font-black uppercase text-emerald-300 tracking-widest block mt-0.5">Digital Membership</span>
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto space-y-4">
                    {/* Subscriber Name */}
                    <div>
                      <span className="text-[8px] font-bold text-emerald-300/80 block uppercase tracking-wider">Subscriber Name</span>
                      <h4 className="font-black text-lg truncate uppercase tracking-wide">
                        {profileDetails?.name || session?.user?.name || "Valued Customer"}
                      </h4>
                    </div>

                    {/* Policy Info row */}
                    <div className="grid grid-cols-2 gap-4 text-left border-t border-white/10 pt-2.5">
                      <div>
                        <span className="text-[8px] font-bold text-emerald-300/80 block uppercase tracking-wider">Policy Number</span>
                        <span className="font-mono text-xs font-extrabold">{activeCardPolicy.policyNumber}</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-emerald-300/80 block uppercase tracking-wider">Plan Name</span>
                        <span className="text-xs font-bold truncate block">{activeCardPolicy.planName}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="card-back rounded-2xl bg-gradient-to-br from-emerald-950 via-neutral-900 to-brand-900 text-white p-5 flex flex-col justify-between shadow-2xl overflow-hidden border border-emerald-900">
                  <div className="relative z-10 grid grid-cols-3 gap-3">
                    <div className="col-span-2 space-y-2.5">
                      <span className="text-[9px] font-extrabold text-brand-400 block tracking-widest uppercase">Terms & Instructions</span>
                      <ul className="text-[7.5px] leading-relaxed text-neutral-300 list-disc pl-3.5 space-y-1">
                        <li>Show this membership card at network hospitals for cashless admission.</li>
                        <li>Claim benefits must be submitted within 30 days of the incident.</li>
                        <li>This card is non-transferable and requires photo ID verification.</li>
                      </ul>
                    </div>

                    {/* QR Code visual mockup */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-1 bg-white rounded-lg shadow">
                        <div className="w-[60px] h-[60px] relative bg-neutral-900 flex flex-wrap p-1">
                          <div className="w-4 h-4 bg-white m-0.5"></div>
                          <div className="w-4 h-4 bg-white m-0.5 ml-auto"></div>
                          <div className="w-4 h-4 bg-white m-0.5 mt-auto"></div>
                          <div className="w-1 h-1 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                      </div>
                      <span className="text-[7px] text-neutral-400 mt-1 uppercase font-bold tracking-wider">Verify Card</span>
                    </div>
                  </div>

                  <div className="relative z-10 border-t border-white/10 pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-bold text-emerald-300/80 block uppercase tracking-wider">Emergency Helpline</span>
                      <span className="font-extrabold text-sm font-mono">+977-1-4400000</span>
                    </div>

                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase shadow-sm">
                      Active
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Flip Card Action Button */}
            <button
              onClick={() => setFlipCard(!flipCard)}
              className="mb-6 px-4 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8.89M9 11l3-3 3 3m-3-3v12" />
              </svg>
              Flip Card View
            </button>

            {/* Actions Footer */}
            <div className="w-full flex gap-3 mt-2 border-t border-neutral-100 pt-5">
              <button
                onClick={() => downloadCardAsImage(activeCardPolicy)}
                className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PNG Card
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2zm5-11h.01" />
                </svg>
                Print Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLAIM BENEFITS MODAL */}
      {activeClaimPolicy && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl relative border border-neutral-100 animate-scale-up flex flex-col max-h-[90vh] sm:max-h-[85vh]">
            
            {/* Header */}
            <div className="p-6 sm:p-8 pb-4 border-b border-neutral-100 flex items-start justify-between shrink-0 relative z-10 shadow-sm">
              <div>
                <h3 className="text-lg font-black text-neutral-900 flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  Claim Insurance Benefits
                </h3>
                <p className="text-xs text-neutral-400 mt-1">Policy: {activeClaimPolicy.planName} ({activeClaimPolicy.policyNumber})</p>
              </div>
              {claimStep < 5 && (
                <button
                  onClick={() => setActiveClaimPolicy(null)}
                  className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Spacer to prevent content from touching header line */}
            <div className="h-6 shrink-0 bg-white z-10"></div>

            {/* Modal Body (Scrollable content) */}
            <div className="px-6 pb-6 sm:px-8 sm:pb-8 overflow-y-auto flex-1 space-y-5">
              {/* Stepper indicator */}
              {claimStep < 5 && (
                <div className="flex justify-between items-center mb-6 px-1">
                  {[1, 2, 3, 4].map((step) => (
                    <React.Fragment key={step}>
                      <div className="flex items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs transition-all ${
                          claimStep === step 
                            ? "bg-brand-600 text-white shadow-md ring-4 ring-brand-100" 
                            : claimStep > step 
                              ? "bg-brand-100 text-brand-700" 
                              : "bg-neutral-100 text-neutral-400"
                        }`}>
                          {claimStep > step ? "✓" : step}
                        </div>
                        <span className="text-[10px] font-black text-neutral-800 ml-2 hidden sm:inline">
                          {step === 1 ? "Info" : step === 2 ? "Incident" : step === 3 ? "Documents" : "Review"}
                        </span>
                      </div>
                      {step < 4 && <div className={`flex-1 h-0.5 mx-2 rounded-full ${claimStep > step ? "bg-brand-200" : "bg-neutral-100"}`}></div>}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* STEP 1: Basic Info */}
              {claimStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-neutral-800 uppercase tracking-wider">Claim Benefit Type</label>
                    <select
                      value={claimFormData.claimType}
                      onChange={(e) => setClaimFormData({ ...claimFormData, claimType: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 text-xs outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-100 text-neutral-800 font-bold"
                    >
                      <option value="Medical/Health">Medical / Health Expense Claim</option>
                      <option value="Accident/Injury">Accident / Physical Injury Claim</option>
                      <option value="Critical Illness">Critical Illness Benefit Claim</option>
                      <option value="Disability">Disability & Loss of Income Claim</option>
                      <option value="Life Benefit">Whole Life / Accidental Death Claim</option>
                      <option value="Other">Other Benefit Request</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-neutral-800 uppercase tracking-wider">Requested Claim Amount (NPR)</label>
                    <input
                      type="number"
                      placeholder="e.g. 50000"
                      value={claimFormData.claimAmount}
                      onChange={(e) => setClaimFormData({ ...claimFormData, claimAmount: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 text-xs outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-100 text-neutral-800 font-semibold"
                    />
                    <div className="flex justify-between items-center px-1 text-[10px]">
                      <span className="text-neutral-400">Enter value in Nepalese Rupees.</span>
                      <span className="font-bold text-neutral-500">Max limit: NPR {activeClaimPolicy.sumAssured.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-neutral-800 uppercase tracking-wider">Date of Incident / Admission</label>
                    <input
                      type="date"
                      value={claimFormData.incidentDate}
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setClaimFormData({ ...claimFormData, incidentDate: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 text-xs outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-100 text-neutral-800 font-bold"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Description */}
              {claimStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-neutral-800 uppercase tracking-wider">Details & Context of Incident</label>
                    <textarea
                      rows="6"
                      placeholder="Please explain the incident in detail (e.g. diagnosis, treatment details, hospital name, date of admission/discharge, cause of accident)..."
                      value={claimFormData.description}
                      onChange={(e) => setClaimFormData({ ...claimFormData, description: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 text-xs outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-100 text-neutral-800 leading-relaxed"
                    ></textarea>
                    <span className="text-[10px] text-neutral-400 px-1 block">Minimum 15 characters required for evaluation. ({claimFormData.description.trim().length} chars)</span>
                  </div>
                </div>
              )}

              {/* STEP 3: Supporting Docs */}
              {claimStep === 3 && (
                <div className="space-y-4">
                  <label className="text-xs font-black text-neutral-800 uppercase tracking-wider">Supporting Documents Upload</label>
                  
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-neutral-200 hover:border-brand-500 transition-colors rounded-2xl bg-neutral-50/50 p-6 text-center cursor-pointer relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <svg className="w-8 h-8 text-neutral-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <h4 className="font-bold text-neutral-700 text-xs">Drag and drop or browse files</h4>
                    <p className="text-[9.5px] text-neutral-400 mt-1">Upload hospital reports, bills, or prescription (PDF, Images up to 2MB)</p>
                  </div>

                  {/* Uploaded Files List */}
                  {claimFormData.supportingDocs.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">Attached Files ({claimFormData.supportingDocs.length})</h5>
                      <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                        {claimFormData.supportingDocs.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-neutral-50 px-3 py-2 rounded-xl border border-neutral-100 text-xs">
                            <div className="flex items-center gap-2 truncate">
                              <span className="p-1 rounded bg-brand-50 text-brand-600">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </span>
                              <span className="font-semibold text-neutral-700 truncate max-w-[280px]">{doc.fileName}</span>
                            </div>
                            <button
                              onClick={() => removeDoc(idx)}
                              className="p-1 text-neutral-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: Review and Submit */}
              {claimStep === 4 && (
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">Review Submission Details</span>
                  
                  <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 text-xs space-y-3">
                    <div className="grid grid-cols-2 gap-3 border-b border-neutral-200/50 pb-3">
                      <div>
                        <span className="text-neutral-400 block font-bold text-[9px] uppercase">Policy Holder</span>
                        <span className="font-extrabold text-neutral-800 uppercase">{profileDetails?.name || session?.user?.name || "Customer"}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block font-bold text-[9px] uppercase">Plan Name</span>
                        <span className="font-bold text-neutral-800 truncate block">{activeClaimPolicy.planName}</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-neutral-400 block font-bold text-[9px] uppercase">Policy Number</span>
                        <span className="font-semibold text-neutral-800 font-mono">{activeClaimPolicy.policyNumber}</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-neutral-400 block font-bold text-[9px] uppercase">Claim Type</span>
                        <span className="font-bold text-neutral-800">{claimFormData.claimType}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 border-b border-neutral-200/50 pb-3">
                      <div>
                        <span className="text-neutral-400 block font-bold text-[9px] uppercase">Incident Date</span>
                        <span className="font-semibold text-neutral-800">{new Date(claimFormData.incidentDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block font-bold text-[9px] uppercase">Claim Amount</span>
                        <span className="font-black text-brand-600 text-sm">NPR {Number(claimFormData.claimAmount).toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-neutral-400 block font-bold text-[9px] uppercase mb-0.5">Description Context</span>
                      <p className="text-neutral-600 italic bg-white/50 p-2.5 rounded-xl border border-neutral-100 max-h-24 overflow-y-auto leading-relaxed whitespace-pre-line">
                        "{claimFormData.description}"
                      </p>
                    </div>

                    {claimFormData.supportingDocs.length > 0 && (
                      <div>
                        <span className="text-neutral-400 block font-bold text-[9px] uppercase mb-1">Uploaded Files ({claimFormData.supportingDocs.length})</span>
                        <div className="flex flex-wrap gap-1.5">
                          {claimFormData.supportingDocs.map((doc, idx) => (
                            <span key={idx} className="inline-block bg-white border border-neutral-200 rounded-lg px-2 py-0.5 text-[9px] font-bold text-neutral-700 truncate max-w-[130px]">
                              📎 {doc.fileName}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 text-[10px] text-emerald-800 leading-relaxed flex gap-2">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>By submitting, you certify that all information supplied is truthful and accurate. Providing false documents is a punishable offense under insurance regulation laws.</span>
                  </div>
                </div>
              )}

              {/* STEP 5: Success Screen */}
              {claimStep === 5 && claimSuccessData && (
                <div className="text-center py-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-bounce">
                    <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-extrabold text-neutral-900 text-lg">Claim Filed Successfully!</h4>
                  <p className="text-xs text-neutral-400 mt-1 max-w-sm">Your claim benefits application has been logged and sent to the claims underwriting committee.</p>

                  <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 my-6 text-xs max-w-sm w-full space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-bold uppercase text-[9px]">Claim Reference ID</span>
                      <span className="font-mono font-black text-brand-600">{claimSuccessData.claimNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-bold uppercase text-[9px]">Policy ID</span>
                      <span className="font-mono text-neutral-700">{claimSuccessData.policyNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-bold uppercase text-[9px]">Claim Amount</span>
                      <span className="font-bold text-neutral-800">NPR {claimSuccessData.claimAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-bold uppercase text-[9px]">Status</span>
                      <span className="font-extrabold text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded-full text-[9px] border border-amber-100">
                        Under Review
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-400 max-w-xs leading-relaxed">
                    We will contact you via email or phone for verification or if we require any original paper bills/discharges. You can monitor the claim status live inside the dashboard claims table.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="p-6 sm:p-8 pt-4 border-t border-neutral-100 flex justify-between items-center gap-3 shrink-0">
              {claimStep === 5 ? (
                <button
                  onClick={() => setActiveClaimPolicy(null)}
                  className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-2xl text-xs shadow-md transition-all text-center"
                >
                  Return to Dashboard
                </button>
              ) : (
                <>
                  {claimStep > 1 ? (
                    <button
                      onClick={() => setClaimStep(claimStep - 1)}
                      className="px-5 py-3 bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 font-bold rounded-2xl text-xs transition-all flex items-center gap-1"
                    >
                      ← Back
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveClaimPolicy(null)}
                      className="px-5 py-3 bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-500 font-bold rounded-2xl text-xs transition-all"
                    >
                      Cancel
                    </button>
                  )}

                  {claimStep < 4 ? (
                    <button
                      onClick={() => setClaimStep(claimStep + 1)}
                      className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-2xl text-xs shadow-md transition-all flex items-center gap-1"
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button
                      onClick={submitClaim}
                      disabled={submittingClaim}
                      className="px-8 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-bold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {submittingClaim ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting Claim...
                        </>
                      ) : (
                        "Submit Claim"
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
