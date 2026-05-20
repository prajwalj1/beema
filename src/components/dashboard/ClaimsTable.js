import React, { useState, useEffect } from "react";

export default function ClaimsTable({ refreshTrigger }) {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    fetchClaims();
  }, [refreshTrigger]);

  useEffect(() => {
    if (selectedClaim) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedClaim]);

  const fetchClaims = async () => {
    try {
      const res = await fetch("/api/insurance/claims");
      if (res.ok) {
        const data = await res.json();
        setClaims(data);
      }
    } catch (err) {
      console.error("Error loading claims table:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredClaims = claims.filter(
    (item) =>
      (item.claimNumber || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.planName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.claimType || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border border-rose-100";
      default:
        return "bg-amber-50 text-amber-700 border border-amber-100";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-8 flex flex-col items-center justify-center min-h-[250px]">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-neutral-400 font-medium mt-3">Loading claims records...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Submitted Claims
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">Track your submitted benefit claims and their review status</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search claims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand-500 rounded-xl pl-9 pr-4 py-2 text-xs outline-none text-neutral-800 transition-all focus:ring-1 focus:ring-brand-100"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-100 text-neutral-400 text-[10px] font-black tracking-wider uppercase bg-neutral-50/50">
              <th className="py-3.5 px-4 rounded-l-xl">Claim ID</th>
              <th className="py-3.5 px-4">Policy Plan</th>
              <th className="py-3.5 px-4">Claim Type</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
              <th className="py-3.5 px-4">Incident Date</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 rounded-r-xl text-center">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50 text-xs">
            {filteredClaims.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-neutral-400 italic">
                  No claims submitted yet
                </td>
              </tr>
            ) : (
              filteredClaims.map((claim) => (
                <tr key={claim._id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-neutral-700">{claim.claimNumber}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-neutral-800 block">
                      {claim.planName}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                      Policy: {claim.policyNumber || "N/A"}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-neutral-600">{claim.claimType}</td>
                  <td className="py-4 px-4 text-right font-black text-brand-600">NPR {claim.claimAmount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-neutral-500">{new Date(claim.incidentDate).toLocaleDateString()}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 text-[10px] font-extrabold rounded-full uppercase ${getStatusStyle(claim.status)}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => setSelectedClaim(claim)}
                      className="px-3 py-1 bg-neutral-100 hover:bg-brand-50 hover:text-brand-700 text-neutral-600 font-bold rounded-lg text-[10px] transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col overflow-hidden animate-slide-up w-full h-[100dvh]">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 pb-4 border-b border-neutral-100 relative z-10 shrink-0 shadow-sm bg-white">
            <button
              onClick={() => setSelectedClaim(null)}
              className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-black text-neutral-900 flex items-center gap-2 pr-6">
              <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </span>
              Claim: {selectedClaim.claimNumber}
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Submitted on {new Date(selectedClaim.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-6 sm:px-8 sm:py-8 overflow-y-auto flex-1 min-h-0 space-y-4 text-xs bg-neutral-50/50">
              <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-2xl">
                <div>
                  <span className="text-neutral-400 font-bold block uppercase text-[9px]">Policy Plan</span>
                  <span className="font-extrabold text-neutral-800">{selectedClaim.planName}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-bold block uppercase text-[9px]">Policy Number</span>
                  <span className="font-bold text-neutral-800 font-mono">{selectedClaim.policyNumber}</span>
                </div>
                <div className="mt-2">
                  <span className="text-neutral-400 font-bold block uppercase text-[9px]">Claim Type</span>
                  <span className="font-bold text-neutral-800">{selectedClaim.claimType}</span>
                </div>
                <div className="mt-2">
                  <span className="text-neutral-400 font-bold block uppercase text-[9px]">Claimed Amount</span>
                  <span className="font-black text-brand-600">NPR {selectedClaim.claimAmount.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 font-bold block uppercase text-[9px] mb-1">Status</span>
                <span className={`inline-block px-3 py-1 rounded-full font-black uppercase text-[10px] ${getStatusStyle(selectedClaim.status)}`}>
                  {selectedClaim.status}
                </span>
                {selectedClaim.remarks && (
                  <div className="mt-2 bg-rose-50/50 border border-rose-100 p-3 rounded-xl text-neutral-700">
                    <strong className="text-rose-800 font-bold block text-[10px] uppercase">Review Remarks:</strong>
                    {selectedClaim.remarks}
                  </div>
                )}
              </div>

              <div>
                <span className="text-neutral-400 font-bold block uppercase text-[9px] mb-1">Description</span>
                <p className="text-neutral-700 bg-neutral-50/50 p-3 rounded-xl border border-neutral-100 leading-relaxed whitespace-pre-line">
                  {selectedClaim.description}
                </p>
              </div>

              {selectedClaim.supportingDocs && selectedClaim.supportingDocs.length > 0 && (
                <div>
                  <span className="text-neutral-400 font-bold block uppercase text-[9px] mb-1.5">Attached Documents</span>
                  <div className="space-y-1.5">
                    {selectedClaim.supportingDocs.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-neutral-50 px-3 py-2 rounded-xl border border-neutral-100">
                        <span className="font-semibold text-neutral-700 truncate max-w-[280px]">{doc.fileName}</span>
                        <a
                          href={doc.fileData}
                          download={doc.fileName}
                          className="text-[10px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:px-10 py-5 border-t border-neutral-100 bg-white flex justify-end shrink-0">
              <button
                onClick={() => setSelectedClaim(null)}
                className="px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl text-sm shadow-md transition-all"
              >
                Close View
              </button>
            </div>
        </div>
      )}
    </div>
  );
}
