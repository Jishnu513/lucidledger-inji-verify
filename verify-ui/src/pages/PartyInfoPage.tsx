import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const PartyInfoPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formMode, setFormMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "", organization: "", email: "", phone: "",
    credential: "", amount: "", status: "", referenceId: "", message: "",
  });

  useEffect(() => { setTimeout(() => setAnimIn(true), 80); }, []);

  const fromUrl = {
    name: searchParams.get("name") || "",
    organization: searchParams.get("organization") || searchParams.get("org") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    credential: searchParams.get("credential") || searchParams.get("credentialType") || "",
    amount: searchParams.get("amount") || "",
    status: searchParams.get("status") || "",
    referenceId: searchParams.get("referenceId") || searchParams.get("ref") || "",
    message: searchParams.get("message") || "",
  };

  const hasUrlData = Object.values(fromUrl).some(v => v !== "");
  const displayData = hasUrlData ? fromUrl : submitted ? formData : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); setFormMode(false); };

  const statusConfig: any = {
    approved:   { gradient: "linear-gradient(135deg,#22c55e,#16a34a)", label: "Approved",   icon: "✓" },
    pending:    { gradient: "linear-gradient(135deg,#f59e0b,#d97706)", label: "Pending",    icon: "⏳" },
    rejected:   { gradient: "linear-gradient(135deg,#ef4444,#dc2626)", label: "Rejected",   icon: "✕" },
    processing: { gradient: "linear-gradient(135deg,#6366f1,#4f46e5)", label: "Processing", icon: "⟳" },
  };
  const getStatus = (s: string) => statusConfig[s?.toLowerCase()] ?? { gradient: "linear-gradient(135deg,#94a3b8,#64748b)", label: s, icon: "•" };

  const displayFields = [
    { key: "name",        label: "Full Name",       icon: "👤" },
    { key: "organization",label: "Organization",    icon: "🏢" },
    { key: "email",       label: "Email",           icon: "📧" },
    { key: "phone",       label: "Phone",           icon: "📞" },
    { key: "credential",  label: "Credential",      icon: "🪪" },
    { key: "amount",      label: "Amount",          icon: "💰" },
    { key: "referenceId", label: "Reference ID",    icon: "🔖" },
    { key: "message",     label: "Message",         icon: "💬" },
  ];

  const receiptTime = new Date().toLocaleString("en-IN", { day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" });

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", fontFamily: "'Inter', -apple-system, sans-serif", position: "relative", overflow: "hidden" }}>

      {/* Background orbs */}
      <div style={{ position: "fixed", top: -200, left: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -150, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(15,15,26,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🔐</div>
          <span style={{ fontWeight: 800, fontSize: 17, color: "white", letterSpacing: "-0.4px" }}>LucidLedger</span>
          <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.15)", margin: "0 6px" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>Party Information Portal</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 20, padding: "5px 14px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 6px #6366f1" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#a5b4fc" }}>Live Portal</span>
          </div>
          <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "8px 16px", fontSize: 13, color: "rgba(255,255,255,0.6)", cursor: "pointer", fontWeight: 500 }}>
            ← Back
          </button>
        </div>
      </nav>

      {/* Page */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px", opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.5s ease" }}>

        {/* Hero Header */}
        <div style={{ marginBottom: 40, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 20, padding: "5px 14px", marginBottom: 14 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: hasUrlData || submitted ? "#22c55e" : "#f59e0b", boxShadow: `0 0 8px ${hasUrlData || submitted ? "#22c55e" : "#f59e0b"}` }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: hasUrlData || submitted ? "#86efac" : "#fde68a", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {hasUrlData ? "Data Received" : submitted ? "Submitted" : "Awaiting Input"}
              </span>
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: "white", margin: 0, letterSpacing: "-1px", lineHeight: 1.1 }}>
              Party Information
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginTop: 10, lineHeight: 1.6 }}>
              Securely collect and display information shared by external parties
            </p>
          </div>
          {displayData?.status && (
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 24 }}>
              {(() => {
                const sc = getStatus(displayData.status);
                return (
                  <div style={{ background: sc.gradient, borderRadius: 14, padding: "12px 24px", textAlign: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{sc.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "white", letterSpacing: "0.04em" }}>{sc.label}</div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* DISPLAY CARD */}
        {displayData && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, backdropFilter: "blur(10px)", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>

            {/* Card top strip */}
            <div style={{ height: 4, background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)" }} />

            {/* Party identity row */}
            <div style={{ padding: "28px 36px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, boxShadow: "0 8px 20px rgba(99,102,241,0.4)" }}>
                {displayData.name ? displayData.name.charAt(0).toUpperCase() : "?"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "white", letterSpacing: "-0.3px" }}>{displayData.name || "Unknown Party"}</div>
                {displayData.organization && <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>{displayData.organization}</div>}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Received</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>{receiptTime}</div>
              </div>
            </div>

            {/* Data grid */}
            <div style={{ padding: "28px 36px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              {displayFields.map(({ key, label, icon }) => {
                const value = (displayData as any)[key];
                if (!value) return null;
                const isWide = key === "message";
                return (
                  <div key={key} style={{ gridColumn: isWide ? "1 / -1" : "auto", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 20px", transition: "all 0.2s ease" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 16 }}>{icon}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.07em", textTransform: "uppercase" }}>{label}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "white", wordBreak: "break-word" }}>
                      {key === "amount" ? `₹ ${Number(value).toLocaleString("en-IN") || value}` : value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer bar */}
            <div style={{ padding: "18px 36px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
                  {hasUrlData ? "Received from external party via secure link" : "Entered manually via portal"}
                </span>
              </div>
              {!hasUrlData && (
                <button onClick={() => { setSubmitted(false); setFormMode(true); }}
                  style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 8, padding: "6px 16px", fontSize: 12, fontWeight: 600, color: "#a5b4fc", cursor: "pointer" }}>
                  Edit Information
                </button>
              )}
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!displayData && !formMode && (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.12)", borderRadius: 20, padding: "80px 40px", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 32 }}>
              📋
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", margin: "0 0 10px", letterSpacing: "-0.3px" }}>No Information Received Yet</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, margin: "0 0 32px", maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
              This portal is ready to receive and display information from external parties. Enter data manually to get started.
            </p>
            <button onClick={() => setFormMode(true)}
              style={{ padding: "14px 36px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 24px rgba(99,102,241,0.4)", letterSpacing: "-0.2px" }}>
              Enter Information Manually →
            </button>
          </div>
        )}

        {/* FORM */}
        {formMode && (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
            <div style={{ height: 4, background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)" }} />
            <div style={{ padding: "28px 36px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", margin: 0, letterSpacing: "-0.3px" }}>Enter Party Information</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "6px 0 0" }}>Fill in the details shared by the external party</p>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "32px 36px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { name: "name",         label: "Full Name",            placeholder: "e.g. John Doe",           required: true,  wide: false },
                  { name: "organization", label: "Organization",          placeholder: "e.g. HDFC Bank",          required: false, wide: false },
                  { name: "email",        label: "Email Address",         placeholder: "e.g. john@hdfc.com",      required: false, wide: false },
                  { name: "phone",        label: "Phone Number",          placeholder: "e.g. +91 9876543210",     required: false, wide: false },
                  { name: "credential",   label: "Credential / Document", placeholder: "e.g. Aadhaar, PAN",       required: false, wide: false },
                  { name: "amount",       label: "Amount (₹)",            placeholder: "e.g. 500000",             required: false, wide: false },
                  { name: "referenceId",  label: "Reference ID",          placeholder: "e.g. REF-2026-XYZ",       required: false, wide: true  },
                ].map(({ name, label, placeholder, required, wide }) => (
                  <div key={name} style={{ gridColumn: wide ? "1 / -1" : "auto" }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}{required && <span style={{ color: "#f87171", marginLeft: 4 }}>*</span>}</label>
                    <input name={name} placeholder={placeholder} required={required}
                      value={(formData as any)[name]} onChange={handleChange}
                      onFocus={() => setFocusedField(name)} onBlur={() => setFocusedField(null)}
                      style={{ width: "100%", padding: "12px 16px", fontSize: 14, color: "white", background: "rgba(255,255,255,0.06)", border: `1.5px solid ${focusedField === name ? "#6366f1" : "rgba(255,255,255,0.1)"}`, borderRadius: 10, outline: "none", boxSizing: "border-box", transition: "all 0.2s ease", boxShadow: focusedField === name ? "0 0 0 3px rgba(99,102,241,0.15)" : "none" }} />
                  </div>
                ))}

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}
                    onFocus={() => setFocusedField("status")} onBlur={() => setFocusedField(null)}
                    style={{ width: "100%", padding: "12px 16px", fontSize: 14, color: "white", background: "#1a1a2e", border: `1.5px solid ${focusedField === "status" ? "#6366f1" : "rgba(255,255,255,0.1)"}`, borderRadius: 10, outline: "none", boxSizing: "border-box", transition: "all 0.2s ease", cursor: "pointer" }}>
                    <option value="">Select status...</option>
                    <option value="Pending">⏳ Pending</option>
                    <option value="Approved">✓ Approved</option>
                    <option value="Rejected">✕ Rejected</option>
                    <option value="Processing">⟳ Processing</option>
                  </select>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>Message / Notes</label>
                  <textarea name="message" placeholder="Any additional context..." value={formData.message} onChange={handleChange}
                    onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                    style={{ width: "100%", padding: "12px 16px", fontSize: 14, color: "white", background: "rgba(255,255,255,0.06)", border: `1.5px solid ${focusedField === "message" ? "#6366f1" : "rgba(255,255,255,0.1)"}`, borderRadius: 10, outline: "none", boxSizing: "border-box", minHeight: 96, resize: "vertical", transition: "all 0.2s ease" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: 14, marginTop: 32, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <button type="button" onClick={() => setFormMode(false)}
                  style={{ padding: "13px 28px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit"
                  style={{ flex: 1, padding: "13px 28px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(99,102,241,0.4)", letterSpacing: "-0.2px" }}>
                  Submit & Display →
                </button>
              </div>
            </form>
          </div>
        )}

        <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.15)", marginTop: 40 }}>
          Powered by <strong style={{ color: "rgba(255,255,255,0.25)" }}>Inji Verify</strong> · MOSIP Identity Platform
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::placeholder { color: rgba(255,255,255,0.2) !important; }
        button { transition: all 0.2s ease; }
        button:hover { opacity: 0.85; transform: translateY(-1px); }
      `}</style>
    </div>
  );
};
