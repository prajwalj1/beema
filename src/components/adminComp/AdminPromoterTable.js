import React from "react";

export default function AdminPromoterTable({ promoters = [], onSelectPromoter }) {
  if (promoters.length === 0) {
    return (
      <div className="text-center py-16 bg-[#0F1C3F]/30 border border-blue-900/40 rounded-3xl">
        <svg className="w-12 h-12 text-blue-800 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857"/>
        </svg>
        <h4 className="font-bold text-blue-300">No Promoters Registered</h4>
        <p className="text-xs text-blue-400 mt-1">There are no promoter accounts in the database.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0F1C3F]/30 border border-blue-900/40 rounded-3xl overflow-hidden shadow-lg animate-fade-in">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-900/40">
          <thead className="bg-[#0F1C3F]">
            <tr>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Promoter Name</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Promoter Code</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Agency Contacts</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Referred Clients</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Estimated Commissions</th>
              <th className="px-6 py-4 text-right text-[10px] font-black text-blue-300 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-900/20 bg-transparent text-slate-300">
            {promoters.map((p) => (
              <tr 
                key={p.id || p.promoterId} 
                className="hover:bg-blue-950/40 transition-all"
              >
                <td className="px-6 py-4.5 font-bold text-white">
                  {p.name}
                  <span className="text-[10px] text-blue-400 block font-normal mt-0.5">Registered: {p.createdAt}</span>
                </td>
                <td className="px-6 py-4.5">
                  <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold rounded-lg uppercase tracking-wider">
                    {p.promoterId}
                  </span>
                </td>
                <td className="px-6 py-4.5">
                  <span className="text-xs block text-slate-300">{p.email}</span>
                  <span className="text-[10px] text-blue-400 block mt-0.5">{p.phone}</span>
                </td>
                <td className="px-6 py-4.5">
                  <span className="text-xs font-bold block text-white">{p.referredCount} Clients</span>
                  <span className="text-[10px] text-blue-400 block mt-0.5">Linked conversions</span>
                </td>
                <td className="px-6 py-4.5 font-black text-emerald-400 text-sm">
                  Rs. {p.totalCommission.toLocaleString()}
                </td>
                <td className="px-6 py-4.5 text-right">
                  <button
                    onClick={() => onSelectPromoter && onSelectPromoter(p)}
                    className="px-3 py-1.5 bg-blue-950 hover:bg-blue-900 border border-blue-800/40 text-xs font-bold text-white rounded-lg transition-all cursor-pointer"
                  >
                    Inspect Activity
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
