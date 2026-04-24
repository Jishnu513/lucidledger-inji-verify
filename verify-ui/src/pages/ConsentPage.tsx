import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pages } from "../utils/config";

export function ConsentPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError(false);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
    if (e.key === "Enter") handleVerify();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    paste.split("").forEach((ch, i) => { newOtp[i] = ch; });
    setOtp(newOtp);
    const lastIdx = Math.min(paste.length - 1, 5);
    inputRefs.current[lastIdx]?.focus();
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "111111") {
      setVerified(true);
      setTimeout(() => navigate(Pages.Landing), 800);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setOtp(["", "", "", "", "", ""]);
        setError(false);
        inputRefs.current[0]?.focus();
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #fafafe 50%, #f5f0ff 100%)" }}>
      {/* Navbar */}
      <nav style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}
        className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 22 }}>🔐</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#4f46e5", letterSpacing: "-0.5px" }}>LucidLedger</span>
        </div>
        <span style={{ background: "#f59e0b", color: "white", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 20 }}>
          Step 2 of 2
        </span>
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div style={{
          background: "white", border: "1px solid #e2e8f0",
          borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          padding: "48px 44px", width: "100%", maxWidth: 480,
          animation: "slideUp 0.4s ease both"
        }}>
          {/* Icon */}
          <div style={{ textAlign: "center", fontSize: 48, marginBottom: 12 }}>🛡️</div>

          {/* Badge */}
          <div style={{
            display: "inline-block", background: "#ede9fe", color: "#4f46e5",
            fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
            padding: "4px 12px", borderRadius: 20, marginBottom: 16
          }}>Consent Verification</div>

          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.5px" }}>
            Verify Your Identity
          </h1>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 20 }}>
            An OTP has been sent to your registered mobile number. Enter it below to provide consent for your loan application.
          </p>

          {/* Consent Box */}
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 10, padding: 16, fontSize: 13, color: "#64748b",
            lineHeight: 1.6, marginBottom: 24
          }}>
            By proceeding, you authorize <strong>LucidLedger</strong> to process your
            loan application using your verified identity credentials.
          </div>

          {/* OTP Label */}
          <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 14 }}>
            Enter 6-Digit OTP
          </label>

          {/* OTP Inputs */}
          <div
            id="otp-inputs"
            style={{
              display: "flex", gap: 10, justifyContent: "center", marginBottom: 14,
              animation: shake ? "shake 0.4s ease" : "none"
            }}
          >
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                onPaste={handlePaste}
                style={{
                  width: 52, height: 60, textAlign: "center",
                  fontSize: 24, fontWeight: 700,
                  border: `2px solid ${error ? "#ef4444" : digit ? "#4f46e5" : "#e2e8f0"}`,
                  borderRadius: 10,
                  background: error ? "#fee2e2" : digit ? "#f5f3ff" : "#f8fafc",
                  color: "#0f172a", outline: "none",
                  transition: "all 0.15s ease"
                }}
              />
            ))}
          </div>

          {/* Error / Success */}
          {error && (
            <p style={{ color: "#ef4444", fontSize: 13, textAlign: "center", marginBottom: 8 }}>
              ❌ Invalid OTP. Please try again. <em style={{ opacity: 0.7 }}>(Hint: 111111)</em>
            </p>
          )}
          {verified && (
            <p style={{ color: "#10b981", fontSize: 13, textAlign: "center", marginBottom: 8, fontWeight: 600 }}>
              ✅ OTP Verified! Redirecting...
            </p>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={verified}
            style={{
              width: "100%", padding: "14px 24px", marginTop: 8,
              background: verified ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#4f46e5,#3730a3)",
              color: "white", border: "none", borderRadius: 10,
              fontSize: 15, fontWeight: 600, cursor: "pointer",
              boxShadow: "0 4px 16px rgba(79,70,229,0.35)",
              transition: "all 0.2s ease"
            }}
          >
            {verified ? "✓ Verified!" : "Verify & Continue"}
          </button>

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            style={{
              width: "100%", padding: "12px 24px", marginTop: 10,
              background: "transparent", color: "#64748b",
              border: "1px solid #e2e8f0", borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: "pointer"
            }}
          >
            ← Go Back
          </button>

          <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 14 }}>
            OTP valid for 10 minutes
          </p>
        </div>
      </main>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
