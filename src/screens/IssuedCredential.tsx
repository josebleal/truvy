import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, ShieldCheck, Copy, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const calculateAge = (dob: string): number => {
  const birth = new Date(dob);
  const currentYear = 2026;
  const now = new Date(currentYear, new Date().getMonth(), new Date().getDate());
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const IssuedCredential = () => {
  const { state, setCurrentScreen } = useTruvy();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(state.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const age = state.dateOfBirth ? calculateAge(state.dateOfBirth) : null;
  const isDriverLicense = state.documentType === "driver_license";

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
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">
          Credential Issued!
        </h1>
        <p className="text-muted-foreground">
          Your TruVy Digital Passport has been cryptographically signed and is ready to use.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="card-surface rounded-xl p-6 mb-6 space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-primary" size={20} />
          <h3 className="text-lg font-semibold text-foreground">TruVy Digital Passport</h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between p-3 rounded-lg bg-secondary">
            <span className="text-muted-foreground">Full Name</span>
            <span className="text-foreground font-medium">{state.name.toUpperCase()}</span>
          </div>
          <div className="flex justify-between p-3 rounded-lg bg-secondary">
            <span className="text-muted-foreground">Document Country</span>
            <span className="text-foreground font-medium">
              {isDriverLicense ? "UNITED STATES OF AMERICA" : (state.locationValue || state.country).toUpperCase()}
            </span>
          </div>
          {isDriverLicense && (
            <div className="flex justify-between p-3 rounded-lg bg-secondary">
              <span className="text-muted-foreground">Issuing State</span>
              <span className="text-foreground font-medium">{(state.locationValue || "").toUpperCase()}</span>
            </div>
          )}
          <div className="flex justify-between p-3 rounded-lg bg-secondary">
            <span className="text-muted-foreground">Issued At</span>
            <span className="text-foreground font-medium">
              {state.issuedAt ? new Date(state.issuedAt).toLocaleString() : "—"}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-secondary">
            <span className="text-muted-foreground">Sanctions Check</span>
            <span className="text-primary font-medium flex items-center gap-1">
              <CheckCircle size={14} /> Clear
            </span>
          </div>

          {/* Age Verified section */}
          {isDriverLicense && age !== null ? (
            <>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary">
                <span className="text-muted-foreground">Age Verified (18+)</span>
                {age >= 18 ? (
                  <span className="text-green-500 font-medium flex items-center gap-1">
                    <CheckCircle size={14} /> 18+
                  </span>
                ) : (
                  <span className="text-destructive font-medium flex items-center gap-1">
                    <XCircle size={14} /> Under 18
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary">
                <span className="text-muted-foreground">Age Verified (21+)</span>
                {age >= 21 ? (
                  <span className="text-green-500 font-medium flex items-center gap-1">
                    <CheckCircle size={14} /> 21+
                  </span>
                ) : (
                  <span className="text-destructive font-medium flex items-center gap-1">
                    <XCircle size={14} /> Under 21
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center p-3 rounded-lg bg-secondary">
              <span className="text-muted-foreground">Age Verified</span>
              <span className="text-primary font-medium flex items-center gap-1">
                <CheckCircle size={14} /> 18+
              </span>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="card-surface rounded-xl p-4 mb-8"
      >
        <p className="text-xs text-muted-foreground mb-2 font-medium">Signed JWT Token</p>
        <div className="relative">
          <pre className="text-[10px] text-muted-foreground/70 bg-secondary rounded-lg p-3 overflow-x-auto max-h-20 scrollbar-hide">
            {state.token || "No token issued"}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 rounded bg-muted hover:bg-muted/80 transition-colors"
          >
            <Copy size={12} className={copied ? "text-primary" : "text-muted-foreground"} />
          </button>
        </div>
        {copied && (
          <p className="text-xs text-primary mt-1">Copied to clipboard!</p>
        )}
      </motion.div>

      {state.qrBase64 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="card-surface rounded-xl p-4">
            <img src={state.qrBase64} alt="QR Code" className="w-40 h-40" />
            <p className="text-xs text-muted-foreground text-center mt-2">Scan to verify</p>
          </div>
        </motion.div>
      )}

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={() => setCurrentScreen(3)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base"
        >
          View in Wallet <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default IssuedCredential;
