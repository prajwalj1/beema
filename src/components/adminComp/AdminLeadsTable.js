import React from "react";

export default function AdminLeadsTable({ leads = [] }) {
  if (leads.length === 0) {
    return (
      <div className="text-center py-16 bg-[#0F1C3F]/30 border border-blue-900/40 rounded-3xl">
        <svg className="w-12 h-12 text-blue-800 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
        <h4 className="font-bold text-blue-300">No Leads Logged</h4>
        <p className="text-xs text-blue-400 mt-1">No promoter leads have been entered into the database.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0F1C3F]/30 border border-blue-900/40 rounded-3xl overflow-hidden shadow-lg animate-fade-in">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-900/40 text-xs">
          <thead className="bg-[#0F1C3F]">
            <tr>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Prospect Name</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Promoter Agent</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Plan Preference</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-blue-300 uppercase tracking-widest">Prospect Contacts</th>
              <th className="px-6 py-4 text-right text-[10px] font-black text-blue-300 uppercase tracking-widest">Created Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-900/20 bg-transparent text-slate-300">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-blue-950/40 transition-all">
                <td className="px-6 py-4.5">
                  <span className="font-bold text-white block">{lead.fullName}</span>
                  {lead.notes && (
                    <span className="text-[10px] text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10 mt-1 inline-block">
                      Notes: {lead.notes}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4.5">
                  <span className="font-bold text-white block">{lead.promoterName}</span>
                  <span className="text-[10px] text-blue-400 font-mono block mt-0.5">{lead.promoterId}</span>
                </td>
                <td className="px-6 py-4.5 font-semibold text-slate-300">
                  {lead.preferredPlan}
                </td>
                <td className="px-6 py-4.5">
                  <span className={`inline-flex px-2.5 py-1 text-[9px] font-black rounded-full uppercase tracking-wider ${
                    lead.status === "Converted"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : lead.status === "Proposal Submitted"
                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      : lead.status === "Contacted"
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : "bg-blue-900/20 text-blue-300 border border-blue-800/30"
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4.5">
                  <p className="font-medium text-slate-300">{lead.phone}</p>
                  <p className="text-[10px] text-blue-400">{lead.email || "No Email"}</p>
                </td>
                <td className="px-6 py-4.5 text-right font-medium text-blue-400">
                  {lead.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
