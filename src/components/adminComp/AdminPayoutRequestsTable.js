import React from "react";

export default function AdminPayoutRequestsTable({ 
  payoutRequests = [], 
  onApprove, 
  onReject, 
  actionLoading 
}) {
  if (payoutRequests.length === 0) {
    return (
      <div className="text-center py-16 bg-[#0F1C3F]/30 border border-blue-900/40 rounded-3xl">
        <svg className="w-12 h-12 text-blue-800 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1m-2 4h4a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <h4 className="font-bold text-blue-300">No Payout Requests</h4>
        <p className="text-xs text-blue-400 mt-1">There are no commission withdrawal requests pending.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0F1C3F]/30 border border-blue-900/40 rounded-3xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-900/40">
          <thead className="bg-[#0F1C3F]">
            <tr>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Promoter ID</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Method</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Details</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-right text-[10px] font-black text-blue-300 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-900/20 bg-transparent text-slate-300 text-xs">
            {payoutRequests.map((payout) => (
              <tr key={payout._id} className="hover:bg-blue-950/40 transition-all">
                <td className="px-6 py-4.5 font-bold text-white font-mono uppercase tracking-wider">
                  {payout.promoterId}
                </td>
                <td className="px-6 py-4.5">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                    payout.payoutMethod === "eSewa" 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                  }`}>
                    {payout.payoutMethod}
                  </span>
                </td>
                <td className="px-6 py-4.5 font-medium text-slate-300">
                  {payout.payoutMethod === "eSewa" ? (
                    <div>
                      <p>eSewa: <span className="font-bold text-white">{payout.details?.esewaId}</span></p>
                      <p className="text-[10px] text-blue-300">Name: {payout.details?.accountName}</p>
                    </div>
                  ) : (
                    <div>
                      <p>Bank: <span className="font-bold text-white">{payout.details?.bankName}</span></p>
                      <p className="text-[10px] text-blue-300">A/C: {payout.details?.accountNumber}</p>
                      <p className="text-[10px] text-blue-300">Name: {payout.details?.accountName}</p>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4.5 font-black text-emerald-400">
                  Rs. {payout.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4.5">
                  <span className={`inline-flex px-2.5 py-1 text-[9px] font-black rounded-full uppercase tracking-wider ${
                    payout.status === "Approved"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : payout.status === "Rejected"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {payout.status}
                  </span>
                </td>
                <td className="px-6 py-4.5 text-right whitespace-nowrap">
                  {payout.status === "Pending" ? (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => onApprove(payout._id)}
                        disabled={actionLoading !== null}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg transition-all shadow-md flex items-center justify-center min-w-[70px] cursor-pointer"
                      >
                        {actionLoading === payout._id ? (
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          "Approve"
                        )}
                      </button>
                      <button
                        onClick={() => onReject(payout._id)}
                        disabled={actionLoading !== null}
                        className="px-3.5 py-1.5 bg-red-950/40 hover:bg-red-900/40 border border-red-900/30 text-red-400 font-bold rounded-lg transition-all cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] text-blue-400 italic">Settled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
