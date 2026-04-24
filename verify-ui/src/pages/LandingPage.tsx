import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pages } from "../utils/config";

export function LandingPage() {
  const navigate = useNavigate();
  const [refId] = useState(
    "LL-2026-" + Math.random().toString(36).substr(2, 6).toUpperCase()
  );
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 100);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #fafafe 50%, #f5f0ff 100%)" }}
    >
      {/* Navbar */}
      <nav
        style={{
          background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2e8f0"
        }}
        className="flex items-center justify-between px-10 py-4"
      >
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 22 }}>🔐</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#4f46e5", letterSpacing: "-0.5px" }}>
            LucidLedger
          </span>
        </div>
        <span style={{
          background: "#10b981", color: "white", fontSize: 12,
          fontWeight: 700, padding: "4px 14px", borderRadius: 20
        }}>
          ✓ Verified
        </span>
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div style={{
          background: "white", border: "1px solid #e2e8f0",
          borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          padding: "48px 44px", width: "100%", maxWidth: 520,
          textAlign: "center",
          opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.5s ease"
        }}>

          {/* Success Circle */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "linear-gradient(135deg,#10b981,#059669)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(16,185,129,0.4)",
              animation: "popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both"
            }}>
              <span style={{ fontSize: 36, color: "white", fontWeight: 800 }}>✓</span>
            </div>
          </div>

          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.5px" }}>
            Welcome! Thank You.
          </h1>
          <p style={{ fontSize: 18, color: "#64748b", marginBottom: 32 }}>
            Your loan application is being processed.
          </p>

          {/* Status Tracker */}
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 12, padding: "20px 24px", marginBottom: 20,
            textAlign: "left"
          }}>
            {[
              { icon: "✓", label: "Identity Verified", time: "Just now", color: "#10b981", done: true },
              { icon: "✓", label: "Consent Recorded", time: "Just now", color: "#10b981", done: true },
              { icon: "⟳", label: "Application Processing", time: "In progress", color: "#4f46e5", spin: true },
              { icon: "4", label: "Loan Disbursement", time: "Pending", color: "#94a3b8", pending: true },
            ].map((step, i, arr) => (
              <div key={i}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "6px 0" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: step.pending ? "#e2e8f0" : step.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700, color: step.pending ? "#94a3b8" : "white",
                    flexShrink: 0,
                    animation: step.spin ? "spin 1.5s linear infinite" : "none"
                  }}>
                    {step.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{step.label}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{step.time}</div>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{
                    width: 2, height: 18, marginLeft: 15,
                    background: step.done ? "#10b981" : step.spin ? "linear-gradient(#10b981,#4f46e5)" : "#e2e8f0"
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Info Banner */}
          <div style={{
            display: "flex", gap: 12, alignItems: "flex-start",
            background: "#fffbeb", border: "1px solid #fde68a",
            borderRadius: 10, padding: "14px 16px",
            fontSize: 13, color: "#92400e", textAlign: "left",
            marginBottom: 20, lineHeight: 1.6
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>ℹ️</span>
            <p>
              Our team will review your application within <strong>24–48 hours</strong>.
              You will receive an update on your registered contact.
            </p>
          </div>

          {/* Reference ID */}
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 10, padding: 14, marginBottom: 20
          }}>
            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
              Application Reference ID
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#4f46e5", letterSpacing: 1, marginTop: 4 }}>
              {refId}
            </div>
          </div>

          {/* New Application Button */}
          <button
            onClick={() => navigate(Pages.Home)}
            style={{
              width: "100%", padding: "13px 24px",
              background: "transparent", color: "#4f46e5",
              border: "2px solid #e2e8f0", borderRadius: 10,
              fontSize: 15, fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            ← Start New Application
          </button>
        </div>
      </main>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
