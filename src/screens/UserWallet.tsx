import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, CheckCircle, Wallet, XCircle } from "lucide-react";
import { motion } from "framer-motion";

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

const UserWallet = () => {
  const { state, setCurrentScreen } = useTruvy();
  const isDriverLicense = state.documentType === "driver_license";
  const age = state.dateOfBirth ? calculateAge(state.dateOfBirth) : null;

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <Wallet className="text-primary" size={28} />
        </div>
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">Your Digital Wallet</h1>
        <p className="text-muted-foreground">
          Your verified credentials, ready to share with any institution.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="wallet-card card-surface rounded-2xl p-8 mb-8 glow-primary animate-pulse-glow"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-primary" size={24} />
            <div>
              <p className="text-sm font-bold text-foreground">TruVy Digital Passport</p>
              <p className="text-xs text-muted-foreground">Cryptographically Signed Credential</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary text-xs font-medium bg-primary/10 px-2 py-1 rounded-full">
            <CheckCircle size={12} /> Active
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Holder</span>
            <span className="text-foreground font-medium">{state.name.toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Document Country</span>
            <span className="text-foreground font-medium">
              {isDriverLicense ? "UNITED STATES OF AMERICA" : (state.locationValue || state.country).toUpperCase()}
            </span>
          </div>
          {isDriverLicense && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Issuing State</span>
              <span className="text-foreground font-medium">{(state.locationValue || "").toUpperCase()}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Issued</span>
            <span className="text-foreground font-medium">
              {state.issuedAt ? new Date(state.issuedAt).toLocaleDateString() : "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sanctions</span>
            <span className="text-primary font-medium">✓ Clear</span>
          </div>

          {/* Age Verified */}
          {isDriverLicense && age !== null ? (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age (18+)</span>
                {age >= 18 ? (
                  <span className="text-green-500 font-medium">✓ 18+</span>
                ) : (
                  <span className="text-destructive font-medium flex items-center gap-1">
                    <XCircle size={12} /> Under 18
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age (21+)</span>
                {age >= 21 ? (
                  <span className="text-green-500 font-medium">✓ 21+</span>
                ) : (
                  <span className="text-destructive font-medium flex items-center gap-1">
                    <XCircle size={12} /> Under 21
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Age Verified</span>
              <span className="text-primary font-medium">✓ 18+</span>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <p className="text-[10px] text-muted-foreground/50 font-mono truncate">
            {state.token ? `${state.token.substring(0, 60)}...` : "No token"}
          </p>
        </div>
      </motion.div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={() => setCurrentScreen(4)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base"
        >
          Present to Bank <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default UserWallet;
