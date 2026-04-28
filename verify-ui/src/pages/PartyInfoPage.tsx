import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const PartyInfoPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formMode, setFormMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "", organization: "", email: "", phone: "",
    credential: "", amount: "", status: "", referenceId: "", message: "",
  });

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

  const hasUrlData = Object.values(fromUrl).some((v) => v !== "");
  const displayData = hasUrlData ? fromUrl : submitted ? formData : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormMode(false);
  };

  const statusConfig: Record<string, { bg: string; text: string; dot: string; label: string }> = {
    approved:   { bg: "#f0fdf4", text: "#15803d", dot: "#22c55e", label: "Approved" },
    pending:    { bg: "#fffbeb", text: "#b45309", dot: "#f59e0b", label: "Pending" },
    rejected:   { bg: "#fef2f2", text: "#b91c1c", dot: "#ef4444", label: "Rejected" },
    processing: { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6", label: "Processing" },
  };

  const getStatus = (s: string) => statusConfig[s.toLowerCase()] ?? { bg: "#f8fafc", text: "#475569", dot: "#94a3b8", label: s };

  const fields = [
    { key: "name",         label: "Full Name",        icon: "M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" },
    { key: "organization", label: "Organization",      icon: "M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" },
    { key: "email",        label: "Email Address",    icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
    { key: "phone",        label: "Phone Number",     icon: "M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" },
    { key: "credential",   label: "Credential Type",  icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-9 4H4V6h7v2zm9 8H4v-2h16v2zm0-4H4v-2h16v2zm0-4h-5V6h5v2z" },
    { key: "amount",       label: "Amount",           icon: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" },
    { key: "referenceId",  label: "Reference ID",     icon: "M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zM7 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" },
    { key: "message",      label: "Message",          icon: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" },
  ];

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%", padding: "10px 14px", fontSize: 14, color: "#0f172a",
    border: `1.5px solid ${focusedField === name ? "#4f46e5" : "#e2e8f0"}`,
    borderRadius: 8, outline: "none", background: "white", boxSizing: "border-box",
    transition: "border-color 0.15s ease",
    boxShadow: focusedField === name ? "0 0 0 3px rgba(79,70,229,0.08)" : "none",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* Navbar */}
      <nav style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>🔐</span>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#4f46e5", letterSpacing: "-0.4px" }}>LucidLedger</span>
          <span style={{ width: 1, height: 20, background: "#e2e8f0", margin: "0 8px" }} />
          <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>Party Information Portal</span>
        </div>
        <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 14px", fontSize: 13, color: "#64748b", cursor: "pointer", fontWeight: 500 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Back
        </button>
      </nav>

      {/* Page Content */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>

        {/* Page Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: hasUrlData || submitted ? "#22c55e" : "#f59e0b" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: hasUrlData || submitted ? "#15803d" : "#b45309", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {hasUrlData ? "Data Received" : submitted ? "Submitted" : "Awaiting Input"}
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.5px" }}>Party Information</h1>
          <p style={{ fontSize: 14, color: "#64748b", marginTop: 6 }}>Information shared by an external party for processing</p>
        </div>

        {/* DISPLAY CARD */}
        {displayData && (
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>

            {/* Card Header */}
            <div style={{ padding: "20px 28px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fafafa" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                  {displayData.name || "External Party"}
                </div>
                {displayData.organization && (
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{displayData.organization}</div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {displayData.status && (() => {
                  const sc = getStatus(displayData.status);
                  return (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, background: sc.bg, border: `1px solid ${sc.dot}30`, borderRadius: 20, padding: "4px 12px" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: sc.dot }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: sc.text }}>{sc.label}</span>
                    </div>
                  );
                })()}
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>

            {/* Fields Grid */}
            <div style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {fields.map(({ key, label, icon }) => {
                const value = (displayData as any)[key];
                if (!value || key === "status") return null;
                const isWide = key === "message" || key === "referenceId";
                return (
                  <div key={key} style={{ gridColumn: isWide ? "1 / -1" : "auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#94a3b8">
                        <path d={icon} />
                      </svg>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", padding: "9px 14px", background: "#f8fafc", borderRadius: 8, border: "1px solid #f1f5f9", wordBreak: "break-word" }}>
                      {key === "amount" && "₹"}{value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Card Footer */}
            <div style={{ padding: "16px 28px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fafafa" }}>
              <span style={{ fontSize: 12, color: "#94a3b8" }}>
                {hasUrlData ? "Received via external link" : "Entered manually"} · Inji Verify Platform
              </span>
              {!hasUrlData && (
                <button onClick={() => { setSubmitted(false); setFormMode(true); }}
                  style={{ fontSize: 13, fontWeight: 600, color: "#4f46e5", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Edit
                </button>
              )}
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!displayData && !formMode && (
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "60px 40px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#94a3b8">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>No Information Received</h2>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: "0 0 28px", maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
              This page is ready to display information shared by an external party. You can also enter information manually.
            </p>
            <button onClick={() => setFormMode(true)}
              style={{ padding: "11px 28px", background: "#4f46e5", color: "white", border: "none", borderRadius: 9, fontWeight: 600, fontSize: 14, cursor: "pointer", boxShadow: "0 2px 8px rgba(79,70,229,0.3)" }}>
              Enter Information Manually
            </button>
          </div>
        )}

        {/* FORM */}
        {formMode && (
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <div style={{ padding: "20px 28px", borderBottom: "1px solid #f1f5f9", background: "#fafafa" }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>Enter Party Information</h2>
              <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>Fill in the details shared by the external party</p>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { name: "name",         label: "Full Name *",             placeholder: "e.g. John Doe",              required: true,  wide: false },
                  { name: "organization", label: "Organization",             placeholder: "e.g. HDFC Bank",            required: false, wide: false },
                  { name: "email",        label: "Email Address",            placeholder: "e.g. john@hdfc.com",        required: false, wide: false },
                  { name: "phone",        label: "Phone Number",             placeholder: "e.g. +91 9876543210",       required: false, wide: false },
                  { name: "credential",   label: "Credential / Document",    placeholder: "e.g. Aadhaar, PAN, Farmer ID", required: false, wide: false },
                  { name: "amount",       label: "Amount (₹)",               placeholder: "e.g. 50000",                required: false, wide: false },
                  { name: "referenceId",  label: "Reference ID",             placeholder: "e.g. REF-2026-XYZ",         required: false, wide: true  },
                ].map(({ name, label, placeholder, required, wide }) => (
                  <div key={name} style={{ gridColumn: wide ? "1 / -1" : "auto" }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6, letterSpacing: "0.02em" }}>{label}</label>
                    <input name={name} placeholder={placeholder} required={required}
                      value={(formData as any)[name]} onChange={handleChange}
                      onFocus={() => setFocusedField(name)} onBlur={() => setFocusedField(null)}
                      style={inputStyle(name)} />
                  </div>
                ))}

                {/* Status */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}
                    onFocus={() => setFocusedField("status")} onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle("status"), appearance: "none" as any }}>
                    <option value="">Select status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Processing">Processing</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Message / Notes</label>
                  <textarea name="message" placeholder="Any additional context or notes..." value={formData.message} onChange={handleChange}
                    onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle("message"), minHeight: 88, resize: "vertical" }} />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 12, marginTop: 28, paddingTop: 24, borderTop: "1px solid #f1f5f9" }}>
                <button type="button" onClick={() => setFormMode(false)}
                  style={{ padding: "11px 24px", background: "white", border: "1px solid #e2e8f0", borderRadius: 9, fontSize: 14, fontWeight: 600, color: "#64748b", cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit"
                  style={{ flex: 1, padding: "11px 24px", background: "#4f46e5", color: "white", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(79,70,229,0.3)" }}>
                  Display Information →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: 12, color: "#cbd5e1", marginTop: 32 }}>
          Powered by <strong style={{ color: "#94a3b8" }}>Inji Verify</strong> · MOSIP Identity Platform
        </p>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        select { cursor: pointer; }
        button:hover { opacity: 0.9; }
      `}</style>
    </div>
  );
};
