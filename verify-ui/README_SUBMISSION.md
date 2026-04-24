# LucidLedger — Inji Verify Customization
### Internship Assignment Submission | Jishn | April 2026

---

## 🎯 Assignment Objective

Customize the MOSIP **Inji Verify** application to add a post-login consent and loan processing UI flow:

1. After successful Verifiable Credential (VC) verification → show **Consent/OTP page**
2. User enters OTP `111111` → show **Loan Processing Landing page**

---

## ✅ What Was Built

### New Pages Added to Inji Verify

| Page | Route | Description |
|------|-------|-------------|
| Consent/OTP Page | `/consent` | 6-digit OTP input. Only `111111` accepted. Auto-redirects to landing. |
| Landing Page | `/landing` | "Welcome! Thank You. Your loan application is being processed." |

### Files Added / Modified

```
inji-verify/verify-ui/src/
├── pages/
│   ├── ConsentPage.tsx          ← NEW: OTP consent page
│   └── LandingPage.tsx          ← NEW: Loan processing success page
├── App.tsx                      ← MODIFIED: Added /consent and /landing routes
├── utils/config.ts              ← MODIFIED: Added Consent and Landing to Pages object
└── components/Home/
    └── VerificationSection/
        └── Result/index.tsx     ← MODIFIED: Auto-redirect to /consent on VC SUCCESS
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v16+)
- Docker Desktop
- Git

### Step 1 — Start Backend (Inji Certify Stack)

```bash
cd inji-certify/docker-compose/docker-compose-injistack
docker compose up -d
```

Verify backend is running:
```
http://localhost:8099/v1/mimoto/issuers → should return 200 OK
```

### Step 2 — Start Frontend (Inji Verify)

```bash
cd inji-verify/verify-ui
npm install
npm start
```

App runs at: **http://localhost:3000**

---

## 🌐 Live Demo

| Page | URL |
|------|-----|
| Inji Verify Home | http://localhost:3000 |
| **Consent/OTP Page** | http://localhost:3000/consent |
| **Landing Page** | http://localhost:3000/landing |

---

## 📋 Demo Flow

```
1. Open http://localhost:3000/consent
2. Enter OTP: 111111 (one digit per box)
3. Click "Verify & Continue"
4. Auto-redirects to Landing Page
5. Shows: "Welcome! Thank You. Your loan application is being processed."
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Tailwind CSS |
| State Management | Redux Toolkit + Redux Saga |
| Routing | React Router DOM v6 |
| Backend | MOSIP Inji Certify (Spring Boot, Docker) |
| Database | PostgreSQL |
| VC Protocol | OpenID4VCI |

---

## 🏗️ Architecture

```
User
 │
 ▼
Inji Verify Frontend (localhost:3000)
 ├── / ──────────────→ Upload QR Code (original)
 ├── /consent ───────→ OTP Consent Page [NEW]
 │    └── OTP=111111 → redirect
 └── /landing ───────→ Loan Processing Page [NEW]

Backend (Docker)
 ├── Mimoto BFF      (localhost:8099)
 ├── Inji Certify    (localhost:8090)
 ├── Inji Web        (localhost:3001)
 └── PostgreSQL      (localhost:5433)
```

---

## 📁 Project Structure

```
LucidLedger/
├── inji-certify/              ← MOSIP Inji Certify (Part A)
│   └── docker-compose/
│       └── docker-compose-injistack/
│           ├── docker-compose.yaml
│           └── config/
├── inji-verify/               ← MOSIP Inji Verify (Part B - Customized)
│   └── verify-ui/
│       └── src/
│           └── pages/
│               ├── ConsentPage.tsx
│               └── LandingPage.tsx
└── ASSIGNMENT_SUBMISSION.md   ← Full submission report
```

---

## 👤 Author

**Jishn**  
LucidLedger Internship — April 2026  
Assignment: MOSIP Inji Stack Integration
