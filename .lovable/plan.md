

## Plan: Update Problem Section with Accurate Stats

**File: `src/screens/HomePage.tsx`** (lines 185-231)

### What changes and why

The current stats are placeholder numbers. We'll update them to match your slide data and add emphasis on the 43% ID verification abandonment.

### Specific edits

1. **Headline** (line 188): "50 out of 100 users" → **"55 out of 100"**

2. **Subtext** (line 193): → **"of retail banking digital account applications are abandoned during onboarding"**

3. **Add a callout** below the subtext: A highlighted stat showing **"43% abandon during ID verification"** — styled as a distinct accent callout (e.g., a bordered pill or card in primary/green) to emphasize this is the specific pain point TruVy solves.

4. **Traditional KYC bar** (lines 202-213):
   - Label: "Traditional KYC"
   - Stats: **"5-10 min · 45% completion"**
   - Bar width: **45%** (red/destructive color)

5. **TruVy bar** (lines 216-228):
   - Stats: **"<30 sec ID verification"** — no fake completion % since we're only accelerating the ID verification step, not claiming an overall completion rate
   - Bar width: keep full/near-full to show speed contrast
   - Add small note below: *"Reduces the 2-4 min ID verification step to under 30 seconds"*

6. **Remove the 97%** — we don't have real data for TruVy's completion rate, so we won't fabricate one. Instead the emphasis is on **speed** (< 30 sec vs 2-4 min) and **eliminating the #1 abandonment trigger** (the 43% who drop off at ID verification).

### Visual flow for the reader

```text
"55 out of 100"
"of retail banking digital account applications are abandoned"

  ┌─────────────────────────────────┐
  │  43% abandon during             │
  │  ID verification                │  ← highlighted callout
  └─────────────────────────────────┘

  Traditional KYC     5-10 min · 45% completion
  ████████░░░░░░░░░░  (red bar at 45%)

  TruVy ID Check      <30 seconds
  ██████████████████  (green bar, near full)
  "Reduces 2-4 min ID step → under 30 seconds"
```

