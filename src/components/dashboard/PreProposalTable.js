import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function PreProposalTable({ onUpdateCount }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState(null);

  useEffect(() => {
    fetchProposals();
  }, []);

  // The useEffect that applied document.body.style.overflow = "hidden" 
  // has been removed to allow background scrolling while the modal is open.

  const fetchProposals = async () => {
    try {
      const res = await fetch("/api/insurance/pre-proposal");
      if (res.ok) {
        const data = await res.json();
        setProposals(data);
        if (onUpdateCount) {
          onUpdateCount(data.length);
        }
      } else {
        toast.error("Failed to load pre-proposal records.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading pre-proposal records.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-8 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-neutral-400 font-medium mt-3">Loading pre-proposal submissions...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-4 sm:p-6 md:p-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-neutral-100 pb-5 mb-6 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Pre-Proposal Submissions
        </h2>
        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase self-start sm:self-auto">
          {proposals.length} Submitted
        </span>
      </div>

      {proposals.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-neutral-200 rounded-2xl bg-neutral-50/30">
          <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h4 className="font-bold text-neutral-800 text-sm">No Pre-Proposals Yet</h4>
          <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
            You haven't configured or submitted any Dream Policy application yet. Click "Buy Dream Policy" to start.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((prop) => (
            <div key={prop._id} className="p-4 sm:p-5 rounded-2xl bg-neutral-50/50 border border-neutral-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-neutral-50 transition-all">
              <div className="w-full">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h4 className="font-bold text-neutral-800 text-base">{prop.fullName}</h4>
                  <span className="px-2.5 py-0.5 bg-brand-50 border border-brand-100 text-brand-700 text-[10px] font-extrabold rounded-full capitalize">
                    {prop.planName || "Whole Life Plan"}
                  </span>
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-full uppercase">
                    Under Review
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-2 md:mt-1">
                  Sum Assured: <span className="font-semibold text-brand-600">NPR {prop.sumAssured.toLocaleString()}</span> • 
                  Term: <span className="font-semibold text-neutral-700"> {prop.policyTerm} Years</span>
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-xs text-neutral-400">
                  <span>
                    Premium Mode: <strong className="text-neutral-700 font-semibold uppercase">{prop.premiumMode}</strong>
                  </span>
                  <span>
                    Date: <strong className="text-neutral-700 font-semibold">{new Date(prop.createdAt).toLocaleDateString()}</strong>
                  </span>
                </div>
              </div>

              <div className="flex w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-neutral-100 justify-end">
                <button 
                  onClick={() => setSelectedProposal(prop)}
                  className="w-full md:w-auto text-xs font-extrabold text-brand-600 hover:text-white hover:bg-brand-600 bg-white border border-brand-200 hover:border-brand-600 px-4 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  View Form Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Viewer Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col overflow-hidden animate-slide-up w-full h-[100dvh]">
            
            {/* Modal Header */}
            <div className="relative z-10 bg-gradient-to-r from-brand-600 to-emerald-600 px-4 sm:px-10 py-5 sm:py-6 text-white flex justify-between items-center shrink-0 shadow-md">
              <div>
                <h3 className="text-base sm:text-lg font-black">Pre-Proposal Details</h3>
                <p className="text-xs text-emerald-100 mt-0.5">Submitted on {new Date(selectedProposal.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => setSelectedProposal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-4 sm:px-6 py-5 sm:py-6 overflow-y-auto flex-1 min-h-0 space-y-6 sm:space-y-8 text-sm bg-neutral-50/50">
              
              {/* Grid Section 1: Policy Info */}
              <div>
                <h4 className="font-extrabold text-neutral-800 border-b border-neutral-200 pb-2 mb-3">1. Policy Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Policy Plan</span>
                    <span className="font-bold text-neutral-800 capitalize">{selectedProposal.planName || "Whole Life Plan"}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Sum Assured</span>
                    <span className="font-black text-brand-600 text-base">NPR {selectedProposal.sumAssured.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Policy Term</span>
                    <span className="font-bold text-neutral-800">{selectedProposal.policyTerm} Years</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Premium Mode</span>
                    <span className="font-bold text-neutral-800 uppercase">{selectedProposal.premiumMode}</span>
                  </div>
                </div>
              </div>

              {/* Grid Section 2: Personal Info */}
              <div>
                <h4 className="font-extrabold text-neutral-800 border-b border-neutral-200 pb-2 mb-3">2. Personal details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Full Name</span>
                    <span className="font-bold text-neutral-800">{selectedProposal.fullName}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Email</span>
                    <span className="font-bold text-neutral-800 break-all">{selectedProposal.email}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Phone</span>
                    <span className="font-bold text-neutral-800">{selectedProposal.phone}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">DOB</span>
                    <span className="font-bold text-neutral-800">{new Date(selectedProposal.dob).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Gender</span>
                    <span className="font-bold text-neutral-800 capitalize">{selectedProposal.gender}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Marital Status</span>
                    <span className="font-bold text-neutral-800 capitalize">{selectedProposal.maritalStatus}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Education</span>
                    <span className="font-bold text-neutral-800 capitalize">{selectedProposal.education || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Nationality</span>
                    <span className="font-bold text-neutral-800 capitalize">{selectedProposal.nationality}</span>
                  </div>
                </div>
              </div>

              {/* Grid Section 3: Identity Verification Documents */}
              <div>
                <h4 className="font-extrabold text-neutral-800 border-b border-neutral-200 pb-2 mb-3">3. Verification Documents</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Document Type</span>
                    <span className="font-bold text-neutral-800 capitalize">{selectedProposal.identityDocType}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Document Number</span>
                    <span className="font-bold text-neutral-800">{selectedProposal.identityDocNo}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Issued Date / Place</span>
                    <span className="font-bold text-neutral-800">
                      {new Date(selectedProposal.identityDocIssuedDate).toLocaleDateString()} • {selectedProposal.identityDocIssuedPlace}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-400 block font-extrabold uppercase">Applicant Photo</span>
                    {selectedProposal.personalPhoto ? (
                      <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-50 flex items-center justify-center p-2">
                        <img src={selectedProposal.personalPhoto} alt="Applicant" className="object-contain h-full w-full" />
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-400 italic">No photo uploaded</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-400 block font-extrabold uppercase">ID Front Side</span>
                    {selectedProposal.identityDocFront ? (
                      <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-50 flex items-center justify-center p-2">
                        <img src={selectedProposal.identityDocFront} alt="ID Front" className="object-contain h-full w-full" />
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-400 italic">No image uploaded</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-400 block font-extrabold uppercase">ID Back Side</span>
                    {selectedProposal.identityDocBack ? (
                      <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-50 flex items-center justify-center p-2">
                        <img src={selectedProposal.identityDocBack} alt="ID Back" className="object-contain h-full w-full" />
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-400 italic">No image uploaded</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Grid Section 4: Address Details */}
              <div>
                <h4 className="font-extrabold text-neutral-800 border-b border-neutral-200 pb-2 mb-3">4. Address Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 sm:p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                    <span className="text-xs text-neutral-400 block font-bold uppercase mb-1.5">Permanent Address</span>
                    <p className="font-semibold text-neutral-800 text-sm leading-relaxed">
                      {selectedProposal.permStreet}, Ward {selectedProposal.permWard}<br />
                      {selectedProposal.permMunicipality}, {selectedProposal.permDistrict}, {selectedProposal.permState}
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                    <span className="text-xs text-neutral-400 block font-bold uppercase mb-1.5">Temporary Address</span>
                    <p className="font-semibold text-neutral-800 text-sm leading-relaxed">
                      {selectedProposal.tempStreet}, Ward {selectedProposal.tempWard}<br />
                      {selectedProposal.tempMunicipality}, {selectedProposal.tempDistrict}, {selectedProposal.tempState}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid Section 5: Nominee Details */}
              <div>
                <h4 className="font-extrabold text-neutral-800 border-b border-neutral-200 pb-2 mb-3">5. Nominee Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Nominee Name</span>
                    <span className="font-bold text-neutral-800">{selectedProposal.nomineeName}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Relation</span>
                    <span className="font-bold text-neutral-800 capitalize">{selectedProposal.nomineeRelation}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">Phone</span>
                    <span className="font-bold text-neutral-800">{selectedProposal.nomineePhone}</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-bold uppercase">ID Card Details</span>
                    <span className="font-bold text-neutral-800 block">
                      {selectedProposal.nomineeIdType?.toUpperCase()} No: {selectedProposal.nomineeIdNo}
                    </span>
                    <span className="text-neutral-500 text-[10px] block mt-0.5">Issued: {selectedProposal.nomineeIdIssuedPlace}</span>
                  </div>
                </div>

                {/* Nominee Photos Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-400 block font-extrabold uppercase">Nominee Photo</span>
                    {selectedProposal.nomineePhoto ? (
                      <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-50 flex items-center justify-center p-2">
                        <img src={selectedProposal.nomineePhoto} alt="Nominee" className="object-contain h-full w-full" />
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-400 italic">No photo uploaded</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-400 block font-extrabold uppercase">Nominee ID Front</span>
                    {selectedProposal.nomineeIdFront ? (
                      <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-50 flex items-center justify-center p-2">
                        <img src={selectedProposal.nomineeIdFront} alt="Nominee ID Front" className="object-contain h-full w-full" />
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-400 italic">No image uploaded</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-400 block font-extrabold uppercase">Nominee ID Back</span>
                    {selectedProposal.nomineeIdBack ? (
                      <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-50 flex items-center justify-center p-2">
                        <img src={selectedProposal.nomineeIdBack} alt="Nominee ID Back" className="object-contain h-full w-full" />
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-400 italic">No image uploaded</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-white border-t border-neutral-200 p-4 sm:px-10 sm:py-5 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedProposal(null)}
                className="w-full sm:w-auto px-8 py-3 sm:py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold rounded-xl shadow-md transition-all"
              >
                Close View
              </button>
            </div>
        </div>
      )}
    </div>
  );
}