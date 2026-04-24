# LucidLedger — Inji Verify Customization

> **Internship Assignment** | MOSIP Inji Stack Integration | Jishn | April 2026

---

## 🌐 Live Demo

| Page | Link |
|------|------|
| 🏠 Home | [verify-ui-alpha.vercel.app](https://verify-ui-alpha.vercel.app) |
| 🔐 Consent / OTP Page | [verify-ui-alpha.vercel.app/consent](https://verify-ui-alpha.vercel.app/consent) |
| ✅ Loan Processing Page | [verify-ui-alpha.vercel.app/landing](https://verify-ui-alpha.vercel.app/landing) |

**To test the demo:**
1. Open https://verify-ui-alpha.vercel.app/consent
2. Enter OTP: **`111111`** (one digit per box)
3. Click **"Verify & Continue"**
4. You land on the success page automatically ✅

---

## 🎯 What This Project Does

This is the official **MOSIP Inji Verify** application, customized with a post-login consent and loan processing flow.

### The Problem It Solves
MOSIP Inji Verify allows users to verify their identity using a **Verifiable Credential (VC)**. After a user successfully verifies their identity, this customization adds:
1. A **Consent/OTP page** — the user must enter a 6-digit OTP (`111111`) to confirm they consent to sharing their data
2. A **Loan Processing page** — confirms their loan application is being processed

### How It Works (Step by Step)

```
User opens Inji Verify
        │
        ▼
  Uploads VC (QR Code / PDF)
        │
        ▼
  Inji Verify scans & verifies the credential
        │
        ▼ (if verification = SUCCESS)
  ┌─────────────────────────────┐
  │   /consent — OTP Page       │  ← We built this
  │   Enter 111111 → click      │
  │   "Verify & Continue"       │
  └─────────────┬───────────────┘
                │
                ▼ (auto redirect)
  ┌─────────────────────────────┐
  │   /landing — Success Page   │  ← We built this
  │   "Welcome! Thank You."     │
  │   "Your loan application    │
  │    is being processed."     │
  └─────────────────────────────┘
```

---

## 🗂️ Files Added / Modified

### New Files (Built from scratch)

| File | What it does |
|------|-------------|
| `verify-ui/src/pages/ConsentPage.tsx` | 6-digit OTP page. Only `111111` is accepted. Shakes on wrong OTP. Auto-redirects to `/landing` on success. |
| `verify-ui/src/pages/LandingPage.tsx` | Success page with animated checkmark, live status tracker, reference ID, and loan processing message. |

### Modified Files

| File | What changed |
|------|-------------|
| `verify-ui/src/App.tsx` | Imported and registered `/consent` and `/landing` routes |
| `verify-ui/src/utils/config.ts` | Added `Consent` and `Landing` to the `Pages` config object |
| `verify-ui/src/components/Home/VerificationSection/Result/index.tsx` | Added `useEffect` to auto-redirect to `/consent` when VC verification returns `SUCCESS` |
| `verify-ui/package.json` | Changed start script to be Windows-compatible (removed Linux `sh` dependency) |

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org) v16 or higher
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### Step 1 — Clone this repo

```bash
git clone https://github.com/Jishnu513/lucidledger-inji-verify.git
cd lucidledger-inji-verify
```

### Step 2 — Start Backend (Inji Certify Docker Stack)

> This runs the VC issuance backend locally.

```bash
cd inji-certify/docker-compose/docker-compose-injistack
docker compose up -d
```

Wait ~40 seconds, then check it's running:
```bash
docker ps
# Should show 4 containers: database, certify, Mimoto-Service, inji-web
```

Verify the API works:
```
http://localhost:8099/v1/mimoto/issuers  →  Should return 200 OK with JSON
```

### Step 3 — Start Inji Verify Frontend

```bash
cd lucidledger-inji-verify/verify-ui
npm install
npm start
```

App opens automatically at: **http://localhost:3000**

### Step 4 — Test the Custom Flow

| URL | What you see |
|-----|-------------|
| http://localhost:3000 | Inji Verify home — upload a VC file |
| http://localhost:3000/consent | **Our custom OTP page** |
| http://localhost:3000/landing | **Our custom landing page** |

**Quick demo (no VC needed):**
```
1. Open http://localhost:3000/consent
2. Type 111111 in the OTP boxes
3. Click "Verify & Continue"
4. ✅ Landing page appears
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 + TypeScript |
| Routing | React Router DOM v6 |
| State Management | Redux Toolkit + Redux Saga |
| Styling | Tailwind CSS + Inline styles |
| Backend | MOSIP Inji Certify (Spring Boot via Docker) |
| Database | PostgreSQL |
| VC Protocol | OpenID4VCI |
| Deployment | Vercel (frontend) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                 LOCAL MACHINE                    │
│                                                  │
│  Docker Containers                               │
│  ├── PostgreSQL          :5433                   │
│  ├── Inji Certify        :8090  (VC issuance)   │
│  ├── Mimoto BFF          :8099  (API layer)      │
│  └── Inji Web            :3001  (download UI)   │
│                                                  │
│  React App (npm start)                           │
│  └── Inji Verify         :3000  (customized)    │
│       ├── /              Upload QR Code          │
│       ├── /consent  ←── OTP Page [NEW]          │
│       └── /landing  ←── Success Page [NEW]      │
└─────────────────────────────────────────────────┘
```

---

## 📸 Screenshots

### Consent / OTP Page (`/consent`)
- LucidLedger branding
- "Verify Your Identity" heading
- 6-digit OTP boxes (enter `111111`)
- "Step 2 of 2" badge

### Landing Page (`/landing`)
- Green animated checkmark
- "Welcome! Thank You."
- "Your loan application is being processed."
- Status tracker: Identity Verified → Consent Recorded → Application Processing → Loan Disbursement
- Unique Application Reference ID (e.g., `LL-2026-3WLEGZ`)
- "Our team will review within 24–48 hours" message

---

## 👤 Author

**Jishn**  
LucidLedger Internship — April 2026  
Assignment: MOSIP Inji Stack — Verifiable Credential & Custom UI Integration
