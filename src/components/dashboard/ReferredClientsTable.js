import React, { useState, useEffect } from "react";

export default function ReferredClientsTable({ onUpdateCount, onUpdateCommission, onUpdateRate }) {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const res = await fetch("/api/promoter/referrals");
      if (res.ok) {
        const data = await res.json();
        setReferrals(data);

        // Update stats
        if (onUpdateCount) {
          onUpdateCount(data.length);
        }

        // Calculate commission & conversion rate
        let commissionSum = 0;
        let verifiedCount = 0;

        data.forEach((ref) => {
          if (ref.status === "Verified") {
            verifiedCount++;
            // Calculate a simulated commission: 10% of total premium or a fixed NPR 1,500/3,000 based on status
            commissionSum += ref.commissionAmt || 1500;
          }
        });

        if (onUpdateCommission) {
          onUpdateCommission(commissionSum);
        }

        const rate = data.length > 0 ? Math.round((verifiedCount / data.length) * 100) + "%" : "0%";
        if (onUpdateRate) {
          onUpdateRate(rate);
        }
      }
    } catch (err) {
      console.error("Error loading referrals:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-8 flex flex-col items-center justify-center min-h-[250px]">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-neutral-400 font-medium mt-3">Loading referral records...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Referred Client Status
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">Real-time status of your referred signups</p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Realtime Tracking
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-neutral-100 text-neutral-400 text-[10px] font-black tracking-wider uppercase bg-neutral-50/50">
              <th className="py-3.5 px-4 rounded-l-xl">Client Info</th>
              <th className="py-3.5 px-4">Join Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 rounded-r-xl text-right">Commission</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50 text-xs">
            {referrals.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-neutral-400 italic">
                  No referred clients found yet. Share your link to start earning!
                </td>
              </tr>
            ) : (
              referrals.map((ref) => (
                <tr key={ref.id || ref._id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-bold text-neutral-800">{ref.name}</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{ref.email} • ID: {ref.id || "N/A"}</p>
                  </td>
                  <td className="py-4 px-4 text-neutral-500">
                    {new Date(ref.date || ref.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                      ref.status === "Verified" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}>
                      {ref.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right font-black text-emerald-600">
                    NPR {(ref.commissionAmt || (ref.status === "Verified" ? 1500 : 0)).toLocaleString()}
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
