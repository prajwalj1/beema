import React from "react";

export default function AdminPreProposalTable({ 
  preProposals = [], 
  onViewFile, 
  onApprove, 
  onReject, 
  actionLoading 
}) {
  if (preProposals.length === 0) {
    return (
      <div className="text-center py-16 bg-[#0F1C3F]/30 border border-blue-900/40 rounded-3xl">
        <svg className="w-12 h-12 text-blue-800 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <h4 className="font-bold text-blue-300">Zero Pre-Proposals</h4>
        <p className="text-xs text-blue-400 mt-1">No applications pending review in the queue.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0F1C3F]/30 border border-blue-900/40 rounded-3xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-900/40">
          <thead className="bg-[#0F1C3F]">
            <tr>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Client</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Policy Details</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Contact</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-right text-[10px] font-black text-blue-300 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-900/20 bg-transparent text-slate-300">
            {preProposals.map((proposal) => (
              <tr key={proposal._id} className="hover:bg-blue-950/40 transition-all">
                <td className="px-6 py-4.5">
                  <span className="font-bold text-white block">{proposal.fullName}</span>
                  <span className="text-[10px] text-blue-400 uppercase tracking-wider block font-bold mt-0.5">
                    DOB: {proposal.dob ? new Date(proposal.dob).toISOString().split("T")[0] : "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4.5">
                  <span className="text-xs text-slate-300 block font-bold">
                    Assured: Rs. {proposal.sumAssured?.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-blue-300 block mt-0.5">
                    Term: {proposal.policyTerm} years | Paying Mode: <span className="font-bold text-amber-500 uppercase">{proposal.premiumMode}</span>
                  </span>
                </td>
                <td className="px-6 py-4.5">
                  <span className="text-xs block">{proposal.email}</span>
                  <span className="text-[10px] text-blue-400 block mt-0.5">{proposal.phone}</span>
                </td>
                <td className="px-6 py-4.5">
                  <span className={`inline-flex px-2.5 py-1 text-[9px] font-black rounded-full uppercase tracking-wider ${
                    proposal.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : proposal.status === "rejected"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {proposal.status}
                  </span>
                </td>
                <td className="px-6 py-4.5 text-right whitespace-nowrap">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => onViewFile(proposal)}
                      className="px-3.5 py-1.5 bg-blue-950 hover:bg-blue-900 border border-blue-800/40 text-xs font-bold text-white rounded-lg transition-all cursor-pointer"
                    >
                      View File
                    </button>
                    {proposal.status === "pending" && (
                      <>
                        <button
                          onClick={() => onApprove(proposal._id)}
                          disabled={actionLoading !== null}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-black text-white rounded-lg transition-all shadow-md flex items-center justify-center min-w-[70px] cursor-pointer"
                        >
                          {actionLoading === proposal._id ? (
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          ) : (
                            "Approve"
                          )}
                        </button>
                        <button
                          onClick={() => onReject(proposal._id)}
                          disabled={actionLoading !== null}
                          className="px-3.5 py-1.5 bg-red-950/40 hover:bg-red-900/40 border border-red-900/30 text-red-400 text-xs font-bold rounded-lg transition-all cursor-pointer"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
