## TruVy — Portable Digital Identity Demo App

A 4-screen hackathon demo app with a dark fintech aesthetic, real API integration, and a dramatic forgery detection flow.

### Design System

- **Dark theme**: Navy (#0A1628) backgrounds, card surfaces (#0D1F35), borders (#1A3050)
- **Colors**: Cyan (#00A8E8) primary, Green (#00C48C) success, Red (#E84545) rejection, Gold (#F5A623) accent
- **Typography**: DM Sans / Inter, white on dark
- **Style**: Rounded cards (12px), subtle glows, Stripe-meets-crypto-wallet feel
- **Logo**: TruVy branding from uploaded screenshots copied into assets

### App Structure

Top navigation with 4 tabs + step progress indicator. State managed via React Context (name, country, token, currentScreen).

### Screen 0 — Scan ID (Entry Point)

- Two side-by-side cards: **Upload ID Photo** (drag-drop zone with fake OCR animation → pre-fills masked placeholder data) and **Enter Manually** (name, country, ID type form)
- "Proceed to Verification →" button triggers animated loading sequence (biometric check, sanctions screening, age verification) then auto-navigates to Screen 1

### Screen 1 — Legitimuz Issue

- Verification summary with 4 green checkmarks (biometric, sanctions, age, document)
- "Issue TruVy Credential →" button calls `POST /issue` with name & country
- Shows loading → then QR code (from `qrBase64`), issuer badge, and "Add to Wallet →" button

### Screen 2 — User Wallet

- 3D-tilted wallet card with cyan glow showing name, country, sanctions/age badges, issue date, "Valid" watermark
- **Protected section**: 5 locked rows (passport number, DOB, address, tax ID, raw document) each with red "WITHHELD" badge
- "Share with Any Bank →" (gold) and "View Raw Credential" (ghost, opens JWT modal)
- Empty state if no credential yet

### Screen 3 — Any Bank Verify

- Bank selector row (Nubank, Chase, HSBC, Itaú) — cosmetic, changes bank name in results
- Token textarea (pre-filled, partially masked with toggle)
- Two buttons side by side:
  - **✅ Verify Real Credential** (green) → `POST /verify` with real token → green success panel with claims, "Documents received: NONE" gold banner, and list of 5 items bank never received
  - **🔴 Test Forgery Attack** (red outline) → corrupts JWT signature → `POST /verify` → **dramatic red rejection**: screen flash, shake animation, "Cannot forge a TruVy Passport" message with RSA-2048 explanation

### Footer

Trust badges: FATF Compliant | NIST IAL2 | eIDAS 2.0 Ready | W3C VC Standard

### Key Technical Details

- API: `https://truvy-kyc-passport-production.up.railway.app` (`/issue` and `/verify`)
- Upload uses FileReader for preview only — no real OCR, fills placeholder values
- Forgery: splits token on last `.`, replaces signature with `AAA...` string
- Smooth transitions between screens, loading spinners on all API calls, error handling with red banners  
  
  
Add a 5th screen to the existing app. Keep everything already built exactly as is.
  SCREEN 4 — "Try It Live" (Judge Mobile Screen)
  Add "Try It Live" as the 5th tab in the existing top navigation bar, after the current 4 tabs.
  PURPOSE:
  Judges scan a QR code at the pitch table, this screen opens on their phone, they upload their own real ID, and get a live TruVy credential issued in seconds. This is the most dramatic demo moment.
  MOBILE-FIRST LAYOUT (single column, large tap targets, no horizontal scroll):
  HEADER:
  •⁠  ⁠TruVy logo small at top center
  •⁠  ⁠Title: "Try TruVy Live"  
  •⁠  ⁠Subtitle: "Upload your ID. Get a verified credential in seconds."
  •⁠  ⁠3 small trust badges in a row: "🔒 Never Stored" | "FATF Compliant" | "NIST IAL2"
  UPLOAD ZONE:
  •⁠  ⁠Large rounded upload area (full width, ~200px tall, cyan dashed border)
  •⁠  ⁠Center icon: 📷
  •⁠  ⁠Text: "Tap to take photo or upload ID"
  •⁠  ⁠Subtext: "Passport · Driver's License · National ID"
  •⁠  ⁠Accepted: JPG, PNG, PDF
  •⁠  ⁠On mobile, tapping opens native camera/photo library (use accept="image/*,application/pdf" capture="environment" on the input)
  •⁠  ⁠After file selected: show thumbnail preview inside the upload zone
  •⁠  ⁠Then show "Scan This ID →" cyan button below
  PROCESSING STATE (after button tap):
  Replace the upload zone with an animated checklist, items appearing one by one with 800ms delay each:
  ⏳ Scanning document...        → becomes ✅ Document detected
  ⏳ Running sanctions check...  → becomes ✅ Sanctions: PASSED  
  ⏳ Verifying age...            → becomes ✅ Age: 18+ confirmed
  ⏳ Signing with Legitimuz...   → becomes ✅ Credential signed
  API CALL:
  POST [https://truvy-kyc-passport-production.up.railway.app/issue-from-document](https://truvy-kyc-passport-production.up.railway.app/issue-from-document)
  Send file as multipart/form-data with field name "document"
  While waiting for response, keep the checklist animation running
  SUCCESS STATE (slide up from bottom, full screen):
  •⁠  ⁠Large animated green checkmark (scale in)
  •⁠  ⁠Heading: "Welcome, [name from [documentFields.name](http://documentFields.name)]"
  •⁠  ⁠Subheading: "Your TruVy Credential is ready"
  Credential card (same 3D-tilted cyan glow card style as Screen 2):
    - 🛂 TRUVY PASSPORT — label
    - Legitimuz issuer badge
    - Name: [value]
    - Country: [value]
    - ✅ Sanctions: PASSED
    - ✅ Age: 18+ VERIFIED
  Protected fields section — "🔒 What no bank will ever receive:":
    - 🔒 Document Number: [documentFields.documentNumber e.g. "AB***"]
    - 🔒 Date of Birth: *//* (age verified)
    - 🔒 Home Address
    - 🔒 Tax ID
    - 🔒 Raw Document Image
  Gold banner: "Your documents were never transmitted. Zero."
  Two buttons:
    - "See What a Bank Receives →" (cyan) — calls POST /verify with the token, shows a modal with the claims JSON and the withheld array
    - "Start Over" (ghost) — resets to upload state
  UNREADABLE STATE (if readable: false in response or error):
  •⁠  ⁠Orange warning card
  •⁠  ⁠"Document unclear — please try again"
  •⁠  ⁠Tips: "Make sure your ID is flat, well-lit, fully in frame, and not glared"
  •⁠  ⁠Large retry button
  DESIGN NOTES:
  •⁠  ⁠Minimum touch target 48px for all buttons
  •⁠  ⁠Font sizes minimum 16px (prevents iOS zoom on input)
  •⁠  ⁠No horizontal scrolling
  •⁠  ⁠Same color system as rest of app: navy backgrounds, cyan accents, green success, red error
  •⁠  ⁠The success state should feel celebratory — this is the judge's "wow" moment