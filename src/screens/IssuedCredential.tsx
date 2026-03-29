import { useTruvy } from "@/context/TruvyContext";
import { CheckCircle, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const MOCK_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.truvy.credential.verified";

const IssuedCredential = () => {
  const { setCurrentScreen, setToken, setName, setCountry, setIssuedAt, setLocationLabel, setLocationValue, setAgeVerified } = useTruvy();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const steps = [
    "Verifying identity...",
    "Running sanctions screening...",
    "Checking liveness...",
    "Issuing credential...",
  ];

  // Read inquiry ID from URL if present
  const params = new URLSearchParams(window.location.search);
  const inquiryId = params.get("inquiry-id") || "inq_sandbox_demo";

  useEffect(() => {
    // Auto-populate demo data
    setName("MARIA SILVA");
    setCountry("Brazil");
    setLocationLabel("Country");
    setLocationValue("BRAZIL 🇧🇷");
    setToken(MOCK_TOKEN);
    setIssuedAt(new Date().toISOString());
    setAgeVerified("18+");

    // Animate through steps
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < steps.length) {
        setStep(i);
      } else {
        clearInterval(interval);
        setDone(true);
        // Auto-redirect to wallet after a brief pause
        setTimeout(() => {
          setCurrentScreen(3);
        }, 1500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!done) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 flex flex-col items-center gap-8">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <Loader2 className="text-primary animate-spin" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-foreground font-display">Processing Credential</h2>
        <div className="w-full space-y-3">
          {steps.map((s, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
              i < step ? "card-surface" : i === step ? "card-surface glow-cyan" : "opacity-30"
            }`}>
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
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 glow-primary">
          <CheckCircle className="text-primary" size={40} />
        </div>
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">Credential Issued!</h1>
        <p className="text-muted-foreground">Your TruVy Digital Passport has been cryptographically signed.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="card-surface rounded-xl p-6 mb-6 space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-primary" size={20} />
          <h3 className="text-lg font-semibold text-foreground">TruVy Digital Passport</h3>
        </div>
        <div className="space-y-3 text-sm">
          {[
            { label: "Name", value: "MARIA SILVA" },
            { label: "Country", value: "Brazil 🇧🇷" },
            { label: "Document", value: "Passport" },
            { label: "Status", value: "Verified ✅" },
            { label: "Sanctions", value: "Clear ✅" },
            { label: "Liveness", value: "Passed ✅" },
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

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="card-surface rounded-xl p-4 mb-8"
      >
        <p className="text-xs text-muted-foreground mb-2 font-medium">Cryptographic Token</p>
        <pre className="text-[11px] text-muted-foreground/70 bg-secondary rounded-lg p-3 font-mono break-all">
          {MOCK_TOKEN}
        </pre>
      </motion.div>

      <p className="text-center text-sm text-muted-foreground animate-pulse">Redirecting to wallet...</p>
    </div>
  );
};

export default IssuedCredential;
