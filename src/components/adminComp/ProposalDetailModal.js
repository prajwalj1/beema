import React from "react";

export default function ProposalDetailModal({ 
  proposal, 
  onClose, 
  onApprove, 
  onReject, 
  actionLoading 
}) {
  if (!proposal) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#070F21]/80 backdrop-blur-sm flex items-start justify-center p-4 pt-24 overflow-hidden">
      <div className="bg-[#0F1C3F] border border-blue-900/40 rounded-3xl w-full max-w-2xl max-h-[calc(100vh-120px)] overflow-y-auto shadow-2xl animate-scale-up">
        {/* Header */}
        <div className="p-6 border-b border-blue-900/30 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-white">{proposal.fullName}</h3>
            <p className="text-xs text-blue-300 mt-1">Pre-Proposal ID: {proposal._id}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#070F21] hover:bg-blue-950 flex items-center justify-center text-blue-300 hover:text-blue-100 transition-all font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Grid 1: Policy Info */}
          <div className="bg-[#070F21]/50 p-4 border border-blue-900/30 rounded-2xl grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Sum Assured</span>
              <span className="text-sm font-black text-white">Rs. {proposal.sumAssured?.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Policy Term</span>
              <span className="text-sm font-black text-white">{proposal.policyTerm} Years</span>
            </div>
            <div>
              <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Premium Paying Mode</span>
              <span className="text-sm font-black text-amber-500 uppercase">{proposal.premiumMode}</span>
            </div>
            <div>
              <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Nationality</span>
              <span className="text-sm font-black text-white">{proposal.nationality}</span>
            </div>
          </div>

          {/* Grid 2: Identity Documents */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-blue-200 tracking-wider">Identity Credentials</h4>
            <div className="grid grid-cols-2 gap-4 bg-[#070F21]/50 p-4 border border-blue-900/30 rounded-2xl">
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Doc Type</span>
                <span className="text-xs font-bold text-white uppercase">{proposal.identityDocType}</span>
              </div>
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Doc Number</span>
                <span className="text-xs font-bold text-white font-mono">{proposal.identityDocNo}</span>
              </div>
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Issued Date</span>
                <span className="text-xs text-white">{proposal.identityDocIssuedDate ? new Date(proposal.identityDocIssuedDate).toISOString().split("T")[0] : "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Issued Place</span>
                <span className="text-xs text-white">{proposal.identityDocIssuedPlace}</span>
              </div>
            </div>
          </div>

          {/* Grid 3: Family details */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-blue-200 tracking-wider">Family Genealogy</h4>
            <div className="grid grid-cols-3 gap-4 bg-[#070F21]/50 p-4 border border-blue-900/30 rounded-2xl text-xs">
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Father</span>
                <span className="text-white font-semibold">{proposal.fatherName}</span>
              </div>
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Mother</span>
                <span className="text-white font-semibold">{proposal.motherName}</span>
              </div>
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Grandfather</span>
                <span className="text-white font-semibold">{proposal.grandfatherName}</span>
              </div>
            </div>
          </div>

          {/* Grid 4: Nominee details */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-blue-200 tracking-wider">Nominee Beneficiary</h4>
            <div className="grid grid-cols-2 gap-4 bg-[#070F21]/50 p-4 border border-blue-900/30 rounded-2xl text-xs">
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Nominee Name</span>
                <span className="text-white font-semibold">{proposal.nomineeName}</span>
              </div>
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Relation</span>
                <span className="text-white font-semibold">{proposal.nomineeRelation}</span>
              </div>
            </div>
          </div>
          
          {/* Document Images Display */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-blue-200 tracking-wider">Submitted Document Scans (Applicant)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {proposal.personalPhoto && (
                <div className="space-y-1.5 text-center">
                  <span className="text-[9px] text-blue-300 uppercase tracking-widest block font-bold">Personal Photo</span>
                  <div className="w-full h-48 sm:h-56 border border-blue-900/30 rounded-xl overflow-hidden bg-[#070F21] flex items-center justify-center p-2">
                    <img src={proposal.personalPhoto} alt="Personal" className="w-full h-full object-contain" />
                  </div>
                </div>
              )}
              {proposal.identityDocFront && (
                <div className="space-y-1.5 text-center">
                  <span className="text-[9px] text-blue-300 uppercase tracking-widest block font-bold">Document Front</span>
                  <div className="w-full h-48 sm:h-56 border border-blue-900/30 rounded-xl overflow-hidden bg-[#070F21] flex items-center justify-center p-2">
                    <img src={proposal.identityDocFront} alt="ID Front" className="w-full h-full object-contain" />
                  </div>
                </div>
              )}
              {proposal.identityDocBack && (
                <div className="space-y-1.5 text-center">
                  <span className="text-[9px] text-blue-300 uppercase tracking-widest block font-bold">Document Back</span>
                  <div className="w-full h-48 sm:h-56 border border-blue-900/30 rounded-xl overflow-hidden bg-[#070F21] flex items-center justify-center p-2">
                    <img src={proposal.identityDocBack} alt="ID Back" className="w-full h-full object-contain" />
                  </div>
                </div>
              )}
            </div>
            
            <h4 className="text-xs font-black uppercase text-blue-200 tracking-wider mt-6 pt-4 border-t border-blue-900/30">Submitted Document Scans (Nominee)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {proposal.nomineePhoto ? (
                <div className="space-y-1.5 text-center">
                  <span className="text-[9px] text-blue-300 uppercase tracking-widest block font-bold">Nominee Photo</span>
                  <div className="w-full h-48 sm:h-56 border border-blue-900/30 rounded-xl overflow-hidden bg-[#070F21] flex items-center justify-center p-2">
                    <img src={proposal.nomineePhoto} alt="Nominee Personal" className="w-full h-full object-contain" />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 text-center flex flex-col justify-center text-blue-900 text-xs">No Photo</div>
              )}
              {proposal.nomineeIdFront ? (
                <div className="space-y-1.5 text-center">
                  <span className="text-[9px] text-blue-300 uppercase tracking-widest block font-bold">Nominee ID Front</span>
                  <div className="w-full h-48 sm:h-56 border border-blue-900/30 rounded-xl overflow-hidden bg-[#070F21] flex items-center justify-center p-2">
                    <img src={proposal.nomineeIdFront} alt="Nominee ID Front" className="w-full h-full object-contain" />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 text-center flex flex-col justify-center text-blue-900 text-xs">No Document</div>
              )}
              {proposal.nomineeIdBack ? (
                <div className="space-y-1.5 text-center">
                  <span className="text-[9px] text-blue-300 uppercase tracking-widest block font-bold">Nominee ID Back</span>
                  <div className="w-full h-48 sm:h-56 border border-blue-900/30 rounded-xl overflow-hidden bg-[#070F21] flex items-center justify-center p-2">
                    <img src={proposal.nomineeIdBack} alt="Nominee ID Back" className="w-full h-full object-contain" />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 text-center flex flex-col justify-center text-blue-900 text-xs">No Document</div>
              )}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-6 border-t border-blue-900/30 flex items-center justify-end gap-3 bg-[#070F21]/20">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-blue-300 hover:text-blue-100 transition-all cursor-pointer"
          >
            Close File
          </button>
          {proposal.status === "pending" && (
            <>
              <button 
                onClick={() => onReject(proposal._id)}
                disabled={actionLoading !== null}
                className="px-4 py-2.5 bg-red-950/40 hover:bg-red-900/40 border border-red-900/30 text-red-400 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Reject Application
              </button>
              <button 
                onClick={() => onApprove(proposal._id)}
                disabled={actionLoading !== null}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl transition-all shadow-md flex items-center justify-center min-w-[100px] cursor-pointer"
              >
                {actionLoading === proposal._id ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Approve Policy"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
