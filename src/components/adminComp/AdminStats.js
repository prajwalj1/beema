import React from "react";

export default function AdminStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Global Users */}
      <div className="bg-[#0F1C3F] p-6 rounded-3xl border border-blue-900/40 shadow-md hover:border-blue-800/40 transition-all flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Global Users</p>
          <h3 className="text-xl font-black text-white mt-1">{stats?.totalUsers || 0}</h3>
          <p className="text-[10px] text-blue-200/70 mt-0.5">{stats?.totalCustomers || 0} Clients | {stats?.totalPromoters || 0} Promoters</p>
        </div>
      </div>

      {/* Active Policies */}
      <div className="bg-[#0F1C3F] p-6 rounded-3xl border border-blue-900/40 shadow-md hover:border-blue-800/40 transition-all flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Active Policies</p>
          <h3 className="text-xl font-black text-white mt-1">{stats?.activePolicies || 0}</h3>
          <p className="text-[10px] text-blue-200/70 mt-0.5">{stats?.pendingPreProposals || 0} Pending Proposals</p>
        </div>
      </div>

      {/* Collected Revenue */}
      <div className="bg-[#0F1C3F] p-6 rounded-3xl border border-blue-900/40 shadow-md hover:border-blue-800/40 transition-all flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M10 21h4a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Collected Revenue</p>
          <h3 className="text-xl font-black text-emerald-400 mt-1">Rs. {(stats?.totalRevenue || 0).toLocaleString()}</h3>
          <p className="text-[10px] text-blue-200/70 mt-0.5">Live Premium Accumulation</p>
        </div>
      </div>

      {/* Platform Status */}
      <div className="bg-[#0F1C3F] p-6 rounded-3xl border border-blue-900/40 shadow-md hover:border-blue-800/40 transition-all flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2"/>
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Platform Status</p>
          <h3 className="text-xl font-black text-white mt-1">Online</h3>
          <p className="text-[10px] text-sky-400 mt-0.5 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping"></span> Live Link
          </p>
        </div>
      </div>
    </div>
  );
}
