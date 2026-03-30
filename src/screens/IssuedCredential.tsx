import { useTruvy } from "@/context/TruvyContext";
import { CheckCircle, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const getString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const getObject = (value: unknown): Record<string, unknown> | null => {
  if (typeof value === "object" && value !== null) return value as Record<string, unknown>;
  return null;
};

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  if (!token || token.split(".").length < 2) return null;

  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(atob(padded)) as Record<string, unknown>;
  } catch {
    return null;
  }
};

const calculateAgeVerified = (ageVerified: string, dateOfBirth: string) => {
  if (ageVerified) return ageVerified;
  if (!dateOfBirth) return "";

  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return "";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  if (age >= 21) return "21+";
  if (age >= 18) return "18+";
  return "under18";
};

const formatAgeDisplay = (ageVerified: string, dateOfBirth: string) => {
  if (ageVerified === "21+" || ageVerified === "18+") return `${ageVerified} ✅`;
  if (ageVerified === "under18") return "Under 18 ❌";
  return dateOfBirth || "—";
};

const formatDocumentType = (documentType: string) =>
  documentType === "driver_license" ? "Driver's License" : "Passport";

const IssuedCredential = () => {
  const {
    state,
    setCurrentScreen,
    setName,
    setCountry,
    setIssuedAt,
    setLocationLabel,
    setLocationValue,
    setAgeVerified,
  } = useTruvy();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const steps = [
    "Verifying identity...",
    "Running sanctions screening...",
    "Checking liveness...",
    "Issuing credential...",
  ];

  const params = new URLSearchParams(window.location.search);
  const inquiryId = params.get("inquiry-id") || "inq_sandbox_demo";

  const tokenPayload = decodeJwtPayload(state.token);
  const sharedClaims = getObject(tokenPayload?.sharedClaims);
  const claimName =
    getString(sharedClaims?.name) ||
    [getString(sharedClaims?.firstName), getString(sharedClaims?.lastName)].filter(Boolean).join(" ") ||
    getString(tokenPayload?.name);
  const claimCountry =
    getString(sharedClaims?.country) ||
    getString(sharedClaims?.state) ||
    getString(tokenPayload?.country) ||
    getString(tokenPayload?.state);
  const claimLocationLabel = getString(sharedClaims?.state) || getString(tokenPayload?.state) ? "State" : "Country";
  const claimDateOfBirth = getString(sharedClaims?.dateOfBirth) || getString(tokenPayload?.dateOfBirth);
  const payloadIssuedAt = typeof tokenPayload?.iat === "number" ? new Date(tokenPayload.iat * 1000).toISOString() : "";
  const claimIssuedAt = getString(sharedClaims?.issuedAt) || getString(tokenPayload?.issuedAt) || payloadIssuedAt;
  const claimAgeVerified =
    getString(sharedClaims?.ageVerified) || getString(tokenPayload?.ageVerified);
  const displayName = state.name || claimName;
  const displayCountry = state.country || claimCountry;
  const displayLocationLabel =
    state.locationLabel && state.locationLabel !== "Document Country" ? state.locationLabel : claimLocationLabel;
  const displayLocationValue = state.locationValue || claimCountry;
  const displayIssuedAt = state.issuedAt || claimIssuedAt;
  const displayAgeVerified = calculateAgeVerified(state.ageVerified || claimAgeVerified, claimDateOfBirth);
  const displayDocumentType = formatDocumentType(
    getString(sharedClaims?.documentType) || getString(tokenPayload?.documentType) || state.documentType
  );

  useEffect(() => {
    if (!state.name && claimName) setName(claimName);
    if (!state.country && claimCountry) setCountry(claimCountry);
    if ((!state.locationLabel || state.locationLabel === "Document Country") && claimLocationLabel) {
      setLocationLabel(claimLocationLabel);
    }
    if (!state.locationValue && claimCountry) setLocationValue(claimCountry);
    if (!state.issuedAt && claimIssuedAt) setIssuedAt(claimIssuedAt);
    if (!state.ageVerified && displayAgeVerified) setAgeVerified(displayAgeVerified);
  }, [
    claimAgeVerified,
    claimCountry,
    claimIssuedAt,
    claimLocationLabel,
    claimName,
    displayAgeVerified,
    setAgeVerified,
    setCountry,
    setIssuedAt,
    setLocationLabel,
    setLocationValue,
    setName,
    state.ageVerified,
    state.country,
    state.issuedAt,
    state.locationLabel,
    state.locationValue,
    state.name,
  ]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < steps.length) {
        setStep(i);
      } else {
        clearInterval(interval);
        setDone(true);
        setTimeout(() => {
          setCurrentScreen(3);
        }, 1500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [setCurrentScreen, steps.length]);

  if (!done) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 flex flex-col items-center gap-8">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <Loader2 className="text-primary animate-spin" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-foreground font-display">Processing Credential</h2>
        <div className="w-full space-y-3">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                i < step ? "card-surface" : i === step ? "card-surface glow-cyan" : "opacity-30"
              }`}
            >
              {i < step ? (
                <CheckCircle className="text-primary shrink-0" size={20} />
              ) : i === step ? (
                <Loader2 className="text-primary animate-spin shrink-0" size={20} />
              ) : (
                <div className="w-5 h-5 rounded-full border border-border shrink-0" />
              )}
              <span className="text-sm text-foreground">{s}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 glow-primary">
          <CheckCircle className="text-primary" size={40} />
        </div>
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">Credential Issued!</h1>
        <p className="text-muted-foreground">Your TruVy Digital Passport has been cryptographically signed.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-surface rounded-xl p-6 mb-6 space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-primary" size={20} />
          <h3 className="text-lg font-semibold text-foreground">TruVy Digital Passport</h3>
        </div>
        <div className="space-y-3 text-sm">
          {[
            { label: "Name", value: displayName || "—" },
            { label: displayLocationLabel, value: displayLocationValue || displayCountry || "—" },
            { label: "Document", value: displayDocumentType },
            { label: "Status", value: "Verified ✅" },
            { label: "Sanctions", value: "Clear ✅" },
            { label: "Liveness", value: "Passed ✅" },
            { label: "Age Verification", value: formatAgeDisplay(displayAgeVerified, claimDateOfBirth) },
            { label: "Issued by", value: "Persona (Sandbox)" },
            { label: "Inquiry ID", value: inquiryId },
          ].map((row) => (
            <div key={row.label} className="flex justify-between p-3 rounded-lg bg-secondary">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="text-foreground font-medium">{row.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card-surface rounded-xl p-4 mb-8"
      >
        <p className="text-xs text-muted-foreground mb-2 font-medium">Cryptographic Token</p>
        <pre className="text-[11px] text-muted-foreground/70 bg-secondary rounded-lg p-3 font-mono break-all">
          {state.token || "—"}
        </pre>
      </motion.div>

      <p className="text-center text-sm text-muted-foreground animate-pulse">
        {displayIssuedAt ? `Issued ${new Date(displayIssuedAt).toLocaleString()} · Redirecting to wallet...` : "Redirecting to wallet..."}
      </p>
    </div>
  );
};

export default IssuedCredential;
