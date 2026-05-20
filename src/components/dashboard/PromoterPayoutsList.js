import React, { useState, useEffect } from "react";

export default function PromoterPayoutsList({ refreshTrigger }) {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayouts();
  }, [refreshTrigger]);

  const fetchPayouts = async () => {
    try {
      const res = await fetch("/api/promoter/payout");
      if (res.ok) {
        const data = await res.json();
        setPayouts(data);
      }
    } catch (err) {
      console.error("Error loading payouts:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-6 flex flex-col items-center justify-center min-h-[150px]">
        <div className="w-6 h-6 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[11px] text-neutral-400 font-medium mt-2">Loading withdrawal records...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-6">
      <h3 className="text-sm font-extrabold text-neutral-900 border-b border-neutral-50 pb-3 mb-4 flex items-center justify-between">
        <span>Payout History Ledger</span>
        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
          Secured Payouts
        </span>
      </h3>

      <div className="space-y-3 max-h-[250px] overflow-y-auto scrollbar-none pr-1">
        {payouts.length === 0 ? (
          <p className="text-xs text-neutral-400 italic text-center py-6">
            No payouts requested yet.
          </p>
        ) : (
          payouts.map((p) => (
            <div 
              key={p._id} 
              className="p-3.5 border border-neutral-100 rounded-2xl flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <p className="font-extrabold text-neutral-800">Rs. {p.amount.toLocaleString()}</p>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  via {p.payoutMethod} ({p.details.esewaId || p.details.accountNumber})
                </p>
                <p className="text-[9px] text-neutral-400 mt-0.5">
                  {new Date(p.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-2 py-0.5 text-[9px] font-black rounded-full uppercase tracking-wider ${
                p.status === "Approved" 
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                  : p.status === "Rejected" 
                  ? "bg-red-50 text-red-700 border border-red-100" 
                  : "bg-amber-50 text-amber-700 border border-amber-100"
              }`}>
                {p.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
