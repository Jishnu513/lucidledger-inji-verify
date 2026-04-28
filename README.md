# LucidLedger — Inji Verify Customization

> **Internship Assignment** | MOSIP Inji Stack Integration | Jishn | April 2026

---

## 🌐 Live Demo

| Page | Link |
|------|------|
| 🏠 Home | [verify-ui-alpha.vercel.app](https://verify-ui-alpha.vercel.app) |
| 🔐 Consent / OTP Page | [verify-ui-alpha.vercel.app/consent](https://verify-ui-alpha.vercel.app/consent) |
| ✅ Loan Processing Page | [verify-ui-alpha.vercel.app/landing](https://verify-ui-alpha.vercel.app/landing) |
| 📋 Party Information Page | [verify-ui-alpha.vercel.app/party-info](https://verify-ui-alpha.vercel.app/party-info) |

---

## 🎯 Assignment Overview

This project customizes the official **MOSIP Inji Verify** application with a post-verification business flow for loan processing and a party data intake portal.

---

## ✅ Pages Built

### 1. Consent / OTP Page — `/consent`
- 6-digit OTP input with auto-focus and auto-advance between boxes
- Only OTP `111111` is accepted
- Shake animation + error on wrong OTP
- On success → auto-redirects to `/landing`

**Demo:**
```
https://verify-ui-alpha.vercel.app/consent
```
Enter OTP: `111111` → Click Verify & Continue

---

### 2. Loan Processing Landing Page — `/landing`
- Displays: **"Welcome! Thank You. Your loan application is being processed."**
- Animated green checkmark
- Live status tracker: Identity Verified → Consent Recorded → Application Processing → Loan Disbursement
- Auto-generated Reference ID (e.g. `LL-2026-3WLEGZ`)
- 24–48 hour review message

**Demo:**
```
https://verify-ui-alpha.vercel.app/landing
```

---

### 3. Party Information Portal — `/party-info`
A professional data intake page that accepts information from external parties and displays it.

**Two ways to use:**

**Option A — Via URL Parameters (automated):**
Any external system can send data directly in the URL:
```
https://verify-ui-alpha.vercel.app/party-info?name=John+Doe&organization=HDFC+Bank&status=Approved&amount=500000&email=john@hdfc.com&credential=Aadhaar
```
The page instantly reads and displays the received data.

**Option B — Via Manual Form:**
```
https://verify-ui-alpha.vercel.app/party-info
```
Click "Enter Information Manually" → fill the form → submit → data displays in a formatted card.

**Accepted Fields:**
| Field | URL Parameter |
|-------|--------------|
| Full Name | `name` |
| Organization | `organization` or `org` |
| Email | `email` |
| Phone | `phone` |
| Credential Type | `credential` or `credentialType` |
| Amount | `amount` |
| Status | `status` (Approved / Pending / Rejected / Processing) |
| Reference ID | `referenceId` or `ref` |
| Message | `message` |

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js v16+
- Docker Desktop
- Git

### Step 1 — Clone the repo
```bash
git clone https://github.com/Jishnu513/lucidledger-inji-verify.git
cd lucidledger-inji-verify
```

### Step 2 — Start Backend (Inji Certify Docker Stack)
```bash
cd inji-certify/docker-compose/docker-compose-injistack
docker compose up -d
```

Verify backend:
```
http://localhost:8099/v1/mimoto/issuers  →  200 OK ✅
```

### Step 3 — Start Inji Verify Frontend
```bash
cd verify-ui
npm install
npm start
```

App runs at: **http://localhost:3000**

> **Note:** If port 3000 is busy, it will auto-use 3002. Check the terminal output.

### Step 4 — Open Pages

| Page | Local URL |
|------|----------|
| Home | http://localhost:3000 |
| Consent/OTP | http://localhost:3000/consent |
| Landing | http://localhost:3000/landing |
| Party Info | http://localhost:3000/party-info |

---

## 🗂️ Files Added / Modified

### New Files (Built from scratch)

| File | Description |
|------|-------------|
| `verify-ui/src/pages/ConsentPage.tsx` | OTP consent page — accepts only `111111`, auto-redirects |
| `verify-ui/src/pages/LandingPage.tsx` | Loan processing success page with status tracker |
| `verify-ui/src/pages/PartyInfoPage.tsx` | Party data intake and display portal |

### Modified Files

| File | Change |
|------|--------|
| `verify-ui/src/App.tsx` | Registered `/consent`, `/landing`, `/party-info` routes |
| `verify-ui/src/utils/config.ts` | Added `Consent`, `Landing`, `PartyInfo` to Pages config |
| `verify-ui/src/components/Home/VerificationSection/Result/index.tsx` | Auto-redirect to `/consent` on VC verification SUCCESS |
| `verify-ui/package.json` | Fixed start script for Windows compatibility |
| `verify-ui/public/env.config.js` | Created manually to replace Linux shell script |

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Routing | React Router DOM v6 |
| State Management | Redux Toolkit + Redux Saga |
| Styling | Tailwind CSS + Inline styles |
| VC Protocol | OpenID4VCI + W3C DID |
| Backend | MOSIP Inji Certify (Docker) |
| Database | PostgreSQL |
| Deployment | Vercel |

---

## 🏗️ Architecture

```
User
 │
 ▼
Inji Verify Frontend (localhost:3000)
 ├── /              → Home — Upload QR Code
 ├── /consent  ─── → OTP Consent Page        [NEW ✅]
 ├── /landing  ─── → Loan Processing Page    [NEW ✅]
 └── /party-info ─ → Party Info Portal       [NEW ✅]

Backend (Docker)
 ├── Mimoto BFF     (localhost:8099)
 ├── Inji Certify   (localhost:8090)
 ├── Inji Web       (localhost:3001)
 └── PostgreSQL     (localhost:5433)
```

---

## 👤 Author

**Jishn**
LucidLedger Internship — April 2026
Assignment: MOSIP Inji Stack — Verifiable Credential & Custom UI Integration

GitHub: [github.com/Jishnu513/lucidledger-inji-verify](https://github.com/Jishnu513/lucidledger-inji-verify)
Live: [verify-ui-alpha.vercel.app](https://verify-ui-alpha.vercel.app)
