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

  useEffect(() => { setTimeout(() => setAnimIn(true), 60); }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormMode(false);
  };

  const statusStyles: any = {
    approved:   { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0", dot: "#22c55e" },
    pending:    { bg: "#fffbeb", color: "#92400e", border: "#fde68a", dot: "#f59e0b" },
    rejected:   { bg: "#fff1f2", color: "#be123c", border: "#fecdd3", dot: "#f43f5e" },
    processing: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe", dot: "#3b82f6" },
  };
  const getStatus = (s: string) => statusStyles[s?.toLowerCase()] ?? { bg: "#f8fafc", color: "#475569", border: "#e2e8f0", dot: "#94a3b8" };

  const fields = [
    { key: "name",        label: "Full Name",        icon: "👤", half: true  },
    { key: "organization",label: "Organization",     icon: "🏢", half: true  },
    { key: "email",       label: "Email Address",    icon: "✉️",  half: true  },
    { key: "phone",       label: "Phone",            icon: "📞", half: true  },
    { key: "credential",  label: "Credential Type",  icon: "🪪", half: true  },
    { key: "amount",      label: "Amount",           icon: "💰", half: true  },
    { key: "referenceId", label: "Reference ID",     icon: "🔖", half: false },
    { key: "message",     label: "Message",          icon: "💬", half: false },
  ];

  const receiptTime = new Date().toLocaleString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });

  const avatarInitial = displayData?.name
    ? displayData.name.trim().charAt(0).toUpperCase() : "?";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f6fa",
      fontFamily: "'Inter', 'Segoe UI', -apple-system, sans-serif",
      opacity: animIn ? 1 : 0,
      transition: "opacity 0.4s ease",
    }}>

      {/* ── Navbar ─────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "white",
        borderBottom: "1px solid #e8eaf0",
        padding: "0 40px",
        height: 62,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, boxShadow: "0 2px 8px rgba(99,102,241,0.35)",
          }}>🔐</div>
          <span style={{ fontWeight: 800, fontSize: 17, color: "#1e1b4b", letterSpacing: "-0.5px" }}>LucidLedger</span>
          <span style={{ width: 1, height: 18, background: "#e8eaf0", margin: "0 8px" }} />
          <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>Party Information Portal</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {(hasUrlData || submitted) && (
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "#f0fdf4", border: "1px solid #bbf7d0",
              borderRadius: 50, padding: "5px 14px",
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#15803d" }}>Data Received</span>
            </div>
          )}
          <button onClick={() => navigate(-1)} style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "white", border: "1px solid #e8eaf0",
            borderRadius: 50, padding: "7px 18px",
            fontSize: 13, color: "#6b7280", cursor: "pointer", fontWeight: 500,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}>
            ← Back
          </button>
        </div>
      </nav>

      {/* ── Page body ──────────────────────────── */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "44px 24px 60px" }}>

        {/* Page title */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: "0 0 6px", letterSpacing: "-0.6px" }}>
            Party Information
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>
            Securely receive and display information shared by external parties.
          </p>
        </div>

        {/* ── DISPLAY CARD ───────────────────────── */}
        {displayData && (
          <div style={{
            background: "white",
            borderRadius: 24,
            border: "1px solid #e8eaf0",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            overflow: "hidden",
            marginBottom: 24,
          }}>
            {/* Top accent strip */}
            <div style={{ height: 5, background: "linear-gradient(90deg, #6366f1, #818cf8, #a5b4fc)" }} />

            {/* Identity row */}
            <div style={{
              padding: "28px 36px 24px",
              borderBottom: "1px solid #f3f4f6",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                {/* Avatar */}
                <div style={{
                  width: 56, height: 56, borderRadius: 18,
                  background: "linear-gradient(135deg, #6366f1, #818cf8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, fontWeight: 800, color: "white",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.3)", flexShrink: 0,
                }}>
                  {avatarInitial}
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#111827", letterSpacing: "-0.3px" }}>
                    {displayData.name || "Unknown Party"}
                  </div>
                  {displayData.organization && (
                    <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 3, fontWeight: 500 }}>
                      {displayData.organization}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                {/* Status pill */}
                {displayData.status && (() => {
                  const s = getStatus(displayData.status);
                  return (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 7,
                      background: s.bg, border: `1px solid ${s.border}`,
                      borderRadius: 50, padding: "6px 16px",
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{displayData.status}</span>
                    </div>
                  );
                })()}
                <span style={{ fontSize: 12, color: "#d1d5db" }}>{receiptTime}</span>
              </div>
            </div>

            {/* Data fields grid */}
            <div style={{ padding: "28px 36px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {fields.map(({ key, label, icon, half }) => {
                const value = (displayData as any)[key];
                if (!value || key === "status") return null;
                return (
                  <div key={key} style={{ gridColumn: half ? "auto" : "1 / -1" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 7, display: "flex", alignItems: "center", gap: 5 }}>
                      <span>{icon}</span> {label}
                    </div>
                    <div style={{
                      fontSize: 14, fontWeight: 600, color: "#1f2937",
                      background: "#f9fafb", border: "1px solid #f3f4f6",
                      borderRadius: 12, padding: "11px 16px",
                      wordBreak: "break-word", lineHeight: 1.5,
                    }}>
                      {key === "amount"
                        ? `₹ ${Number(value).toLocaleString("en-IN") || value}`
                        : value
                      }
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{
              padding: "16px 36px",
              borderTop: "1px solid #f3f4f6",
              background: "#fafafa",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderRadius: "0 0 24px 24px",
            }}>
              <span style={{ fontSize: 12, color: "#d1d5db" }}>
                {hasUrlData ? "Received via external secure link" : "Entered manually via portal"} · Inji Verify Platform
              </span>
              {!hasUrlData && (
                <button onClick={() => { setSubmitted(false); setFormMode(true); }} style={{
                  fontSize: 13, fontWeight: 600, color: "#6366f1",
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                }}>
                  Edit ›
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── EMPTY STATE ────────────────────────── */}
        {!displayData && !formMode && (
          <div style={{
            background: "white",
            borderRadius: 24,
            border: "1.5px dashed #e8eaf0",
            padding: "80px 40px",
            textAlign: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}>
            <div style={{
              width: 68, height: 68, borderRadius: 20,
              background: "#ede9fe",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 22px", fontSize: 30,
            }}>📋</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: "0 0 10px", letterSpacing: "-0.3px" }}>
              No Information Received Yet
            </h2>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.8, margin: "0 0 32px", maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
              This portal is ready to accept and display information from external parties. You can also enter data manually.
            </p>
            <button onClick={() => setFormMode(true)} style={{
              padding: "13px 36px",
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              color: "white", border: "none", borderRadius: 50,
              fontWeight: 700, fontSize: 14, cursor: "pointer",
              boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
              letterSpacing: "-0.1px",
            }}>
              Enter Information Manually →
            </button>
          </div>
        )}

        {/* ── FORM ───────────────────────────────── */}
        {formMode && (
          <div style={{
            background: "white",
            borderRadius: 24,
            border: "1px solid #e8eaf0",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          }}>
            <div style={{ height: 5, background: "linear-gradient(90deg, #6366f1, #818cf8, #a5b4fc)" }} />
            <div style={{ padding: "26px 36px 22px", borderBottom: "1px solid #f3f4f6" }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.3px" }}>
                Enter Party Information
              </h2>
              <p style={{ fontSize: 13, color: "#9ca3af", margin: "5px 0 0" }}>
                Fill in the details shared by the external party
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "30px 36px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                {[
                  { name: "name",         label: "Full Name",            placeholder: "e.g. John Doe",         required: true,  wide: false },
                  { name: "organization", label: "Organization",          placeholder: "e.g. HDFC Bank",        required: false, wide: false },
                  { name: "email",        label: "Email Address",         placeholder: "e.g. john@hdfc.com",    required: false, wide: false },
                  { name: "phone",        label: "Phone Number",          placeholder: "e.g. +91 9876543210",   required: false, wide: false },
                  { name: "credential",   label: "Credential / Document", placeholder: "e.g. Aadhaar, PAN",     required: false, wide: false },
                  { name: "amount",       label: "Amount (₹)",            placeholder: "e.g. 500000",           required: false, wide: false },
                  { name: "referenceId",  label: "Reference ID",          placeholder: "e.g. REF-2026-XYZ",     required: false, wide: true  },
                ].map(({ name, label, placeholder, required, wide }) => {
                  const focused = focusedField === name;
                  return (
                    <div key={name} style={{ gridColumn: wide ? "1 / -1" : "auto" }}>
                      <label style={{
                        display: "block", fontSize: 12, fontWeight: 700,
                        color: "#374151", marginBottom: 7,
                        letterSpacing: "0.03em",
                      }}>
                        {label}{required && <span style={{ color: "#f43f5e", marginLeft: 3 }}>*</span>}
                      </label>
                      <input
                        name={name} placeholder={placeholder}
                        required={required}
                        value={(formData as any)[name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(name)}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          width: "100%", padding: "11px 15px",
                          fontSize: 14, color: "#111827",
                          background: focused ? "white" : "#fafafa",
                          border: `1.5px solid ${focused ? "#6366f1" : "#e8eaf0"}`,
                          borderRadius: 12, outline: "none",
                          boxSizing: "border-box" as any,
                          transition: "all 0.18s ease",
                          boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
                        }}
                      />
                    </div>
                  );
                })}

                {/* Status */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, letterSpacing: "0.03em" }}>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}
                    onFocus={() => setFocusedField("status")} onBlur={() => setFocusedField(null)}
                    style={{
                      width: "100%", padding: "11px 15px", fontSize: 14, color: "#111827",
                      background: focusedField === "status" ? "white" : "#fafafa",
                      border: `1.5px solid ${focusedField === "status" ? "#6366f1" : "#e8eaf0"}`,
                      borderRadius: 12, outline: "none", boxSizing: "border-box" as any,
                      cursor: "pointer", transition: "all 0.18s ease",
                    }}>
                    <option value="">Select a status...</option>
                    <option value="Pending">⏳  Pending</option>
                    <option value="Approved">✓  Approved</option>
                    <option value="Rejected">✕  Rejected</option>
                    <option value="Processing">⟳  Processing</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, letterSpacing: "0.03em" }}>Message / Notes</label>
                  <textarea name="message" placeholder="Any additional context or notes from the party..."
                    value={formData.message} onChange={handleChange}
                    onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                    style={{
                      width: "100%", padding: "11px 15px", fontSize: 14, color: "#111827",
                      background: focusedField === "message" ? "white" : "#fafafa",
                      border: `1.5px solid ${focusedField === "message" ? "#6366f1" : "#e8eaf0"}`,
                      borderRadius: 12, outline: "none", boxSizing: "border-box" as any,
                      minHeight: 100, resize: "vertical" as any, transition: "all 0.18s ease",
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 12, marginTop: 28, paddingTop: 24, borderTop: "1px solid #f3f4f6" }}>
                <button type="button" onClick={() => setFormMode(false)} style={{
                  padding: "12px 26px", background: "white",
                  border: "1.5px solid #e8eaf0", borderRadius: 50,
                  fontSize: 14, fontWeight: 600, color: "#6b7280", cursor: "pointer",
                }}>
                  Cancel
                </button>
                <button type="submit" style={{
                  flex: 1, padding: "12px 26px",
                  background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  color: "white", border: "none", borderRadius: 50,
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
                }}>
                  Submit & Display Information →
                </button>
              </div>
            </form>
          </div>
        )}

        <p style={{ textAlign: "center", fontSize: 12, color: "#d1d5db", marginTop: 40 }}>
          Powered by <strong style={{ color: "#9ca3af" }}>Inji Verify</strong> · MOSIP Identity Platform
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: #c4c9d4 !important; }
        button { transition: opacity 0.15s, transform 0.15s; }
        button:hover { opacity: 0.88; transform: translateY(-1px); }
        input, textarea, select { font-family: inherit; }
      `}</style>
    </div>
  );
};
