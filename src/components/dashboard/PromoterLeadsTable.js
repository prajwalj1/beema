import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function PromoterLeadsTable({ refreshTrigger, onLeadConverted }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, [refreshTrigger]);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/promoter/lead");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Error loading leads:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingId(leadId);
    try {
      const res = await fetch("/api/promoter/lead", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Lead status updated to ${newStatus}`);
        fetchLeads();
        if (newStatus === "Converted" && onLeadConverted) {
          onLeadConverted();
        }
      } else {
        const errData = await res.json();
        toast.error(errData.error || "Failed to update lead.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network communication error.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-8 flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-neutral-400 font-medium mt-3">Loading leads ledger...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-6 sm:p-8 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
            Sales Leads Tracker
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">Manage and track your private prospects</p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-black text-sky-700 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Sales pipeline
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-neutral-100 text-neutral-400 text-[10px] font-black tracking-wider uppercase bg-neutral-50/50">
              <th className="py-3.5 px-4 rounded-l-xl">Prospect Info</th>
              <th className="py-3.5 px-4">Plan Interest</th>
              <th className="py-3.5 px-4">Pipeline Status</th>
              <th className="py-3.5 px-4 rounded-r-xl text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50 text-xs">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-neutral-400 italic">
                  No registered leads. Tap "Log Customer Lead" to add one!
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-bold text-neutral-800">{lead.fullName}</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{lead.phone} • {lead.email || "No Email"}</p>
                    {lead.notes && (
                      <p className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md mt-1 inline-block font-semibold">
                        Notes: {lead.notes}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-4 text-neutral-500 font-semibold">
                    {lead.preferredPlan}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                      lead.status === "Converted" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                        : lead.status === "Proposal Submitted" 
                        ? "bg-purple-50 text-purple-700 border border-purple-100" 
                        : lead.status === "Contacted" 
                        ? "bg-blue-50 text-blue-700 border border-blue-100" 
                        : "bg-neutral-100 text-neutral-600 border border-neutral-200"
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <select
                      value={lead.status}
                      disabled={updatingId === lead._id}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      className="px-2 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-brand-500"
                    >
                      <option value="New">Mark New</option>
                      <option value="Contacted">Mark Contacted</option>
                      <option value="Proposal Submitted">Proposal Sent</option>
                      <option value="Converted">Converted Client</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
