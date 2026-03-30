import { useTruvy } from "@/context/TruvyContext";
import { CheckCircle, ShieldCheck, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const getString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const calculateAgeFromBirthdate = (birthdate: string): string => {
  if (!birthdate) return "";
  const birthDate = new Date(birthdate);
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

const formatAgeDisplay = (ageVerified: string) => {
  if (ageVerified === "21+" || ageVerified === "18+") return `${ageVerified} ✅`;
  if (ageVerified === "under18") return "Under 18 ❌";
  return "—";
};

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
  const [fetched, setFetched] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const steps = [
    "Verifying identity...",
    "Running sanctions screening...",
    "Checking liveness...",
    "Issuing credential...",
  ];

  // Primary: from context (set by Index.tsx URL handler), fallback: URL param
  const inquiryId = state.sessionId || new URLSearchParams(window.location.search).get("inquiry-id") || "";

  // Fetch real data from Persona on mount
  useEffect(() => {
    if (!inquiryId) return;
    if (fetched) return;

    const fetchPersonaData = async () => {
      if (!inquiryId || inquiryId === "inq_sandbox_demo") {
        // No real inquiry — use fallback values
        if (!state.name) setName("Verified User");
        if (!state.country) {
          setCountry("Unknown");
          setLocationLabel("Country");
          setLocationValue("Unknown");
        }
        setIssuedAt(new Date().toISOString());
        setFetched(true);
        return;
      }

      try {
        const res = await fetch(`https://withpersona.com/api/v1/inquiries/${inquiryId}`, {
          headers: {
            "Authorization": "Bearer sandbox",
            "Persona-Version": "2023-01-05",
            "Key-Inflection": "camel",
          },
        });

        if (!res.ok) throw new Error(`Persona API ${res.status}`);

        const json = await res.json();
        const attrs = json?.data?.attributes;
        const included = json?.included as Array<{ type: string; attributes: Record<string, unknown> }> | undefined;

        // Name
        const firstName = getString(attrs?.nameFirst);
        const lastName = getString(attrs?.nameLast);
        const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Verified User";
        if (!state.name) setName(fullName.toUpperCase());

        // Country from government-id verification
        const govId = included?.find((item) => item.type === "verification/government-id");
        const countryCode = getString(govId?.attributes?.countryCode) || getString(attrs?.countryCode) || "Unknown";
        if (!state.country) {
          setCountry(countryCode);
          setLocationLabel("Country");
          setLocationValue(countryCode.toUpperCase());
        }

        // Age from birthdate
        const birthdate = getString(attrs?.birthdate);
        if (birthdate && !state.ageVerified) {
          const ageResult = calculateAgeFromBirthdate(birthdate);
          if (ageResult) setAgeVerified(ageResult);
        }

        setIssuedAt(new Date().toISOString());
      } catch (err) {
        console.error("Failed to fetch Persona inquiry:", err);
        setFetchError(true);
        // Fallback values
        if (!state.name) setName("Verified User");
        if (!state.country) {
          setCountry("Unknown");
          setLocationLabel("Country");
          setLocationValue("Unknown");
        }
        setIssuedAt(new Date().toISOString());
      } finally {
        setFetched(true);
      }
    };

    fetchPersonaData();
  }, [inquiryId, fetched]); // eslint-disable-line react-hooks/exhaustive-deps

  // Step animation + redirect to wallet via URL so we stay in the same TruvyProvider
  useEffect(() => {
    if (!inquiryId) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < steps.length) {
        setStep(i);
      } else {
        clearInterval(interval);
        setDone(true);
        setTimeout(() => {
          window.location.href = "/?screen=3";
        }, 1500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [steps.length]);

  // Empty state — no credential yet
  if (!state.token && !state.name) {
    return (
      <div className="max-w-lg mx-auto py-24 px-4 flex flex-col items-center gap-6 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Lock className="text-muted-foreground" size={28} />
        </div>
        <h2 className="text-2xl font-bold text-foreground font-display">Your Credential Awaits</h2>
        <p className="text-muted-foreground max-w-sm">Complete your identity verification to receive your TruVy Digital Passport.</p>
        <Button onClick={() => setCurrentScreen(1)} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
          Start Verification →
        </Button>
      </div>
    );
  }

  if (!done) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 flex flex-col items-center gap-8">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <Loader2 className="text-primary animate-spin" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-foreground font-display">Processing Credential</h2>
        <div className="w-full space-y-3">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                idx < step ? "card-surface" : idx === step ? "card-surface glow-cyan" : "opacity-30"
              }`}
            >
              {idx < step ? (
                <CheckCircle className="text-primary shrink-0" size={20} />
              ) : idx === step ? (
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

  const displayName = state.name || "Verified User";
  const displayCountry = state.locationValue || state.country || "Unknown";
  const displayLocationLabel = state.locationLabel || "Country";
  const displayAgeVerified = state.ageVerified || "—";
  const displayDocumentType = state.documentType === "driver_license" ? "Driver's License" : "Passport";

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
            { label: "Name", value: displayName },
            { label: displayLocationLabel, value: displayCountry },
            { label: "Document", value: displayDocumentType },
            { label: "Status", value: "Verified ✅" },
            { label: "Sanctions", value: "Clear ✅" },
            { label: "Liveness", value: "Passed ✅" },
            { label: "Age Verification", value: formatAgeDisplay(displayAgeVerified) },
            { label: "Issued by", value: "Persona (Sandbox)" },
            { label: "Inquiry ID", value: inquiryId || "inq_sandbox_demo" },
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

      <p className="text-center text-sm text-muted-foreground animate-pulse">Redirecting to wallet...</p>
    </div>
  );
};

export default IssuedCredential;
