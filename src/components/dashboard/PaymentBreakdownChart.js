import React, { useState, useEffect } from "react";

export default function PaymentBreakdownChart() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("yearly"); // "monthly" or "yearly"

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const res = await fetch("/api/insurance/policies");
      if (res.ok) {
        const data = await res.json();
        setPolicies(data);
      }
    } catch (err) {
      console.error("Error fetching policies for chart:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-8 flex flex-col items-center justify-center min-h-[250px]">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-neutral-400 font-medium mt-3">Loading premium chart...</p>
      </div>
    );
  }

  // Calculate dynamic groups (Yearly sums first)
  let lifeYearly = 0;
  let healthYearly = 0;

  policies.forEach((policy) => {
    const name = (policy.planName || "").toLowerCase();
    const mode = (policy.premiumMode || "").toLowerCase();
    const prem = Number(policy.premium) || 0;
    
    let annualPrem = prem;
    if (mode === "quarterly") {
      annualPrem = prem * 4;
    } else if (mode === "monthly") {
      annualPrem = prem * 12;
    }

    if (name.includes("health") || name.includes("medical")) {
      healthYearly += annualPrem;
    } else {
      lifeYearly += annualPrem;
    }
  });

  // If there are no policies, render a clean empty state card
  if (policies.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-5 mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2"/>
              </svg>
              Premium Distribution
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">Compare monthly vs yearly premium allocation</p>
          </div>
        </div>
        
        <div className="text-center py-12 border border-dashed border-neutral-200 rounded-3xl bg-neutral-50/30">
          <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10"/>
            </svg>
          </div>
          <h4 className="font-bold text-neutral-800 text-sm">No Active Policies</h4>
          <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
            Please complete a pre-proposal. Once approved, your dynamic premium breakdown will render here.
          </p>
        </div>
      </div>
    );
  }

  // Adjust sums based on timeframe (Monthly vs Yearly)
  const lifeAmount = timeframe === "yearly" ? lifeYearly : Math.round(lifeYearly / 12);
  const healthAmount = timeframe === "yearly" ? healthYearly : Math.round(healthYearly / 12);
  const totalPremium = lifeAmount + healthAmount;

  // Chart configuration
  const maxValue = Math.max(lifeAmount, healthAmount, 100) * 1.2;
  const chartHeight = 150;

  const getBarHeight = (value) => {
    return (value / maxValue) * chartHeight;
  };

  const data = [
    {
      name: "Life Insurance",
      amount: lifeAmount,
      percentage: totalPremium > 0 ? Math.round((lifeAmount / totalPremium) * 100) : 0,
      color: "#9333ea",
      bg: "bg-purple-600"
    },
    {
      name: "Health Insurance",
      amount: healthAmount,
      percentage: totalPremium > 0 ? Math.round((healthAmount / totalPremium) * 100) : 0,
      color: "#06b6d4",
      bg: "bg-cyan-500"
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-6 sm:p-8">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2"/>
            </svg>
            Premium Distribution
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">Compare monthly vs yearly premium allocation</p>
        </div>

        {/* Toggle & Timeframe selector */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex bg-neutral-100 p-1 rounded-xl border border-neutral-200/50">
            <button
              onClick={() => setTimeframe("monthly")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === "monthly"
                  ? "bg-white text-neutral-800 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeframe("yearly")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === "yearly"
                  ? "bg-white text-neutral-800 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-4">
        {/* Bar Chart Column (7/12 width) */}
        <div className="md:col-span-7 flex justify-center w-full">
          <div className="relative w-full max-w-[380px] aspect-[4/3] bg-neutral-50/30 rounded-2xl border border-neutral-100 p-4">
            <svg width="100%" height="100%" viewBox="0 0 320 200" className="overflow-visible">
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                const yPos = 160 - ratio * chartHeight;
                const gridVal = Math.round(ratio * maxValue);
                return (
                  <g key={index} className="opacity-40">
                    <line
                      x1="45"
                      y1={yPos}
                      x2="300"
                      y2={yPos}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <text
                      x="40"
                      y={yPos + 3}
                      textAnchor="end"
                      className="fill-neutral-400 text-[8px] font-bold"
                    >
                      {gridVal >= 1000 ? `${(gridVal / 1000).toFixed(1)}k` : gridVal}
                    </text>
                  </g>
                );
              })}

              {/* Life Insurance Bar */}
              <g className="group cursor-pointer">
                <rect
                  x="85"
                  y={160 - getBarHeight(lifeAmount)}
                  width="40"
                  height={getBarHeight(lifeAmount)}
                  fill="#9333ea"
                  rx="6"
                  ry="6"
                  className="transition-all duration-500 ease-out hover:opacity-85"
                />
                <text
                  x="105"
                  y="175"
                  textAnchor="middle"
                  className="fill-neutral-400 text-[9px] font-bold"
                >
                  Life
                </text>
              </g>

              {/* Health Insurance Bar */}
              <g className="group cursor-pointer">
                <rect
                  x="195"
                  y={160 - getBarHeight(healthAmount)}
                  width="40"
                  height={getBarHeight(healthAmount)}
                  fill="#06b6d4"
                  rx="6"
                  ry="6"
                  className="transition-all duration-500 ease-out hover:opacity-85"
                />
                <text
                  x="215"
                  y="175"
                  textAnchor="middle"
                  className="fill-neutral-400 text-[9px] font-bold"
                >
                  Health
                </text>
              </g>

              {/* Base Line */}
              <line x1="45" y1="160" x2="300" y2="160" stroke="#d1d5db" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Legend / Metrics Column (5/12 width) */}
        <div className="md:col-span-5 space-y-4">
          {/* Total Box */}
          <div className="p-4 rounded-2xl bg-neutral-50/50 border border-neutral-100 flex flex-col justify-center">
            <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider">
              {timeframe === "yearly" ? "Total Annual Premium" : "Total Monthly Premium"}
            </span>
            <span className="text-xl font-black text-neutral-800 mt-1">
              Rs. {totalPremium.toLocaleString()}
            </span>
          </div>

          {/* Individual Category Cards */}
          <div className="space-y-3">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-neutral-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${item.bg}`}></span>
                  <div>
                    <span className="text-xs font-bold text-neutral-700 block">{item.name}</span>
                    <span className="text-[10px] text-neutral-400 font-medium">{item.percentage}% of total</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-neutral-800">
                  Rs. {item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
