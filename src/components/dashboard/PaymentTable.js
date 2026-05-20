import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function PaymentTable() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/insurance/payments");
      if (res.ok) {
        const data = await res.json();
        setPayments(data);
      }
    } catch (err) {
      console.error("Error loading payments table:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(
    (item) =>
      (item.transactionId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.planName || "Dream Policy - Life Insurance").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.policyNumber || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch ((status || "").toLowerCase()) {
      case "completed":
      case "success":
      case "approved":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "pending":
      case "processing":
        return "bg-amber-50 text-amber-700 border border-amber-100";
      case "failed":
      case "rejected":
        return "bg-rose-50 text-rose-700 border border-rose-100";
      default:
        return "bg-neutral-50 text-neutral-700 border border-neutral-100";
    }
  };

  const downloadReceiptAsImage = (p) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 800;
      const ctx = canvas.getContext("2d");

      // Draw background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 600, 800);

      // Header background
      ctx.fillStyle = "#064e3b";
      ctx.fillRect(0, 0, 600, 120);

      // Header Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px sans-serif";
      ctx.fillText("BEEMA DUKAAN", 40, 60);
      ctx.font = "14px sans-serif";
      ctx.fillText("Digital Payment Receipt", 40, 85);

      // Receipt Title
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("PAYMENT RECEIPT", 40, 180);

      // Transaction Details
      ctx.font = "bold 14px sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("Transaction ID:", 40, 240);
      ctx.fillStyle = "#0f172a";
      ctx.fillText(p.transactionId, 200, 240);

      ctx.fillStyle = "#64748b";
      ctx.fillText("Date:", 40, 280);
      ctx.fillStyle = "#0f172a";
      ctx.fillText(new Date(p.paymentDate).toLocaleString(), 200, 280);

      ctx.fillStyle = "#64748b";
      ctx.fillText("Payment Method:", 40, 320);
      ctx.fillStyle = "#0f172a";
      ctx.fillText(p.paymentMethod.toUpperCase(), 200, 320);

      ctx.fillStyle = "#64748b";
      ctx.fillText("Status:", 40, 360);
      ctx.fillStyle = "#10b981";
      ctx.fillText(p.status.toUpperCase(), 200, 360);

      // Divider
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, 400);
      ctx.lineTo(560, 400);
      ctx.stroke();

      // Policy Details
      ctx.fillStyle = "#64748b";
      ctx.fillText("Policy Plan:", 40, 450);
      ctx.fillStyle = "#0f172a";
      ctx.fillText(p.planName || "Life Insurance", 200, 450);

      ctx.fillStyle = "#64748b";
      ctx.fillText("Policy Number:", 40, 490);
      ctx.fillStyle = "#0f172a";
      ctx.fillText(p.policyNumber || "N/A", 200, 490);

      // Divider
      ctx.beginPath();
      ctx.moveTo(40, 530);
      ctx.lineTo(560, 530);
      ctx.stroke();

      // Amount
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("Amount Paid:", 40, 590);
      ctx.fillStyle = "#059669";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(`NPR ${p.amount.toLocaleString()}`, 200, 590);

      // Footer
      ctx.fillStyle = "#94a3b8";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Thank you for your payment.", 300, 720);
      ctx.fillText("This is a computer-generated receipt and requires no signature.", 300, 740);

      // Download
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `Receipt-${p.transactionId}.png`;
      link.href = url;
      link.click();
      toast.success("Receipt downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate receipt.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-8 flex flex-col items-center justify-center min-h-[250px]" id="payments-section">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-neutral-400 font-medium mt-3">Loading transaction records...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-6 sm:p-8 scroll-mt-24" id="payments-section">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
            Billing & Payments
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">Historical and pending policy payments</p>
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
            placeholder="Search payments..."
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
              <th className="py-3.5 px-4 rounded-l-xl">Transaction ID</th>
              <th className="py-3.5 px-4">Plan / Policy</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Method</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 rounded-r-xl text-center">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50 text-xs">
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-neutral-400 italic">
                  No transaction records found
                </td>
              </tr>
            ) : (
              filteredPayments.map((p) => (
                <tr key={p._id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-neutral-700">{p.transactionId}</td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-neutral-800 block">
                      {p.planName || "Dream Policy - Life Insurance"}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                      Policy: <span className="font-bold text-neutral-600">{p.policyNumber || "N/A"}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right font-black text-brand-600">NPR {p.amount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-neutral-500 font-medium">{new Date(p.paymentDate).toLocaleDateString()}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 bg-neutral-50 border border-neutral-200 text-neutral-700 rounded-lg text-[10px] font-extrabold uppercase tracking-wide">
                      {p.paymentMethod}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 text-[10px] font-extrabold rounded-full uppercase ${getStatusStyle(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button 
                      onClick={() => downloadReceiptAsImage(p)}
                      className="p-1.5 text-neutral-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      title="Download Receipt"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
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
