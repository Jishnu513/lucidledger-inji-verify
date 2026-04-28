import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const PartyInfoPage = () => {
  const [searchParams] = useSearchParams();
  const [formMode, setFormMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    credential: "",
    amount: "",
    status: "",
    referenceId: "",
    message: "",
  });

  // Read from URL query params
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved": return { bg: "#dcfce7", text: "#166534", border: "#86efac" };
      case "pending": return { bg: "#fef9c3", text: "#854d0e", border: "#fde047" };
      case "rejected": return { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" };
      default: return { bg: "#eff6ff", text: "#1e40af", border: "#93c5fd" };
    }
  };

  const fields = [
    { key: "name", label: "Full Name", icon: "👤" },
    { key: "organization", label: "Organization", icon: "🏢" },
    { key: "email", label: "Email", icon: "📧" },
    { key: "phone", label: "Phone", icon: "📞" },
    { key: "credential", label: "Credential Type", icon: "🪪" },
    { key: "amount", label: "Amount", icon: "💰" },
    { key: "referenceId", label: "Reference ID", icon: "🔖" },
    { key: "message", label: "Message", icon: "💬" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 16px" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "white", borderRadius: "50px", padding: "8px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: "16px" }}>
          <span style={{ fontSize: "20px" }}>🔗</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1", letterSpacing: "0.08em" }}>INJI VERIFY</span>
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1e1b4b", margin: "0 0 8px 0" }}>Party Information</h1>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Information received from external party</p>
      </div>

      <div style={{ width: "100%", maxWidth: "560px" }}>

        {/* Display Card — when data is available */}
        {displayData && (
          <div style={{ background: "white", borderRadius: "20px", boxShadow: "0 8px 32px rgba(99,102,241,0.12)", padding: "32px", marginBottom: "24px", border: "1px solid #e0e7ff" }}>
            
            {/* Status badge */}
            {displayData.status && (() => {
              const sc = getStatusColor(displayData.status);
              return (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
                  <span style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, borderRadius: "50px", padding: "6px 20px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em" }}>
                    {displayData.status.toUpperCase()}
                  </span>
                </div>
              );
            })()}

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {fields.map(({ key, label, icon }) => {
                const value = (displayData as any)[key];
                if (!value) return null;
                return (
                  <div key={key} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "14px 16px", background: "#f8faff", borderRadius: "12px", border: "1px solid #e8eeff" }}>
                    <span style={{ fontSize: "20px", flexShrink: 0, marginTop: "1px" }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "3px" }}>{label}</div>
                      <div style={{ fontSize: "15px", fontWeight: 600, color: "#1e293b" }}>{value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Timestamp */}
            <div style={{ marginTop: "24px", textAlign: "center", color: "#94a3b8", fontSize: "12px" }}>
              Received at {new Date().toLocaleString()}
            </div>

            {/* Reset */}
            {!hasUrlData && (
              <button onClick={() => { setSubmitted(false); setFormMode(true); }} style={{ width: "100%", marginTop: "20px", padding: "12px", background: "transparent", border: "2px solid #e0e7ff", borderRadius: "12px", color: "#6366f1", fontWeight: 600, cursor: "pointer", fontSize: "14px" }}>
                ← Enter New Information
              </button>
            )}
          </div>
        )}

        {/* Empty state — no URL data, no form submission */}
        {!displayData && !formMode && (
          <div style={{ background: "white", borderRadius: "20px", boxShadow: "0 8px 32px rgba(99,102,241,0.12)", padding: "48px 32px", marginBottom: "24px", border: "1px solid #e0e7ff", textAlign: "center" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>📭</div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e1b4b", margin: "0 0 8px 0" }}>Waiting for Information</h2>
            <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.6, margin: "0 0 28px 0" }}>
              No information received yet.<br />You can enter the information manually below.
            </p>
            <button onClick={() => setFormMode(true)} style={{ padding: "14px 32px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", border: "none", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}>
              Enter Information Manually
            </button>
          </div>
        )}

        {/* Manual Form */}
        {formMode && (
          <div style={{ background: "white", borderRadius: "20px", boxShadow: "0 8px 32px rgba(99,102,241,0.12)", padding: "32px", marginBottom: "24px", border: "1px solid #e0e7ff" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e1b4b", margin: "0 0 24px 0" }}>Enter Party Information</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { name: "name", label: "Full Name", placeholder: "e.g. John Doe", required: true },
                { name: "organization", label: "Organization", placeholder: "e.g. HDFC Bank" },
                { name: "email", label: "Email", placeholder: "e.g. john@hdfc.com" },
                { name: "phone", label: "Phone", placeholder: "e.g. +91 9876543210" },
                { name: "credential", label: "Credential / Document Type", placeholder: "e.g. Aadhaar, PAN, Farmer ID" },
                { name: "amount", label: "Amount (₹)", placeholder: "e.g. 50000" },
                { name: "referenceId", label: "Reference ID", placeholder: "e.g. REF-2026-XYZ" },
              ].map(({ name, label, placeholder, required }) => (
                <div key={name}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
                  <input
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e0e7ff", borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#1e293b" }}
                    onFocus={e => (e.target.style.borderColor = "#6366f1")}
                    onBlur={e => (e.target.style.borderColor = "#e0e7ff")}
                  />
                </div>
              ))}
              {/* Status select */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</label>
                <select name="status" value={formData.status} onChange={handleChange} style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e0e7ff", borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#1e293b", background: "white" }}>
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Processing">Processing</option>
                </select>
              </div>
              {/* Message */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748b", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Message</label>
                <textarea name="message" placeholder="Any additional message..." value={formData.message} onChange={handleChange}
                  style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e0e7ff", borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#1e293b", minHeight: "80px", resize: "vertical" }}
                  onFocus={e => (e.target.style.borderColor = "#6366f1")}
                  onBlur={e => (e.target.style.borderColor = "#e0e7ff")}
                />
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button type="button" onClick={() => setFormMode(false)} style={{ flex: 1, padding: "13px", background: "transparent", border: "2px solid #e0e7ff", borderRadius: "12px", color: "#64748b", fontWeight: 600, cursor: "pointer", fontSize: "14px" }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 2, padding: "13px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", border: "none", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}>
                  Display Information →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Info footer */}
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "12px" }}>
          Powered by <strong style={{ color: "#6366f1" }}>Inji Verify</strong> · MOSIP
        </p>
      </div>
    </div>
  );
};
