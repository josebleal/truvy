import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, Share2, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useTruvy } from "@/context/TruvyContext";

const upcomingCredentials = [
  "Anti-Money Laundering (AML) Check",
  "Credit Payment History",
  "Credit Score",
  "Loan Payment History",
  "Rent Payment Verification",
  "Employment Verification",
  "Tax Records",
];

const UserWallet = () => {
  const { toast } = useToast();
  const { state, setCurrentScreen } = useTruvy();

  const handleShare = () => {
    toast({ title: "Credential shared securely", description: "No raw documents transmitted." });
  };

  // Empty state
  if (!state.token && !state.name) {
    return (
      <div className="max-w-lg mx-auto py-24 px-4 flex flex-col items-center gap-6 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Wallet className="text-muted-foreground" size={28} />
        </div>
        <h2 className="text-2xl font-bold text-foreground font-display">Your Wallet is Empty</h2>
        <p className="text-muted-foreground max-w-sm">Verify your identity once to unlock your portable digital credentials.</p>
        <Button onClick={() => setCurrentScreen(1)} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
          Get Verified →
        </Button>
      </div>
    );
  }

  const activeCredentials = [
    `Identity Verified — ${state.name || "Verified User"}`,
    `${state.documentType === "driver_license" ? "Driver's License" : "Passport"} — ${state.locationValue || state.country || "Unknown"}`,
    "Sanctions Screening — Clear",
    "Liveness Check — Passed",
    `Age Verification — ${state.ageVerified || "—"}`,
    "Issued by: Persona · RSA-2048 Encrypted",
  ];

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">Your TruVy Wallet</h1>
        <p className="text-muted-foreground">Your verified credentials, ready to share with any institution worldwide</p>
      </motion.div>

      {/* Active Credentials */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Verified Credentials</h2>
        <div className="space-y-3">
          {activeCredentials.map((cred, i) => (
            <motion.div key={cred} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="card-surface rounded-xl p-4 flex items-center gap-3 border-primary/20"
            >
              <CheckCircle className="text-primary shrink-0" size={18} />
              <span className="text-sm font-medium text-foreground">{cred}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Credentials */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="mb-10"
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Coming Soon to Your Wallet</h2>
        <div className="space-y-3">
          {upcomingCredentials.map((cred, i) => (
            <motion.div key={cred} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.04 }}
              className="card-surface rounded-xl p-4 flex items-center gap-3 opacity-50"
            >
              <Lock className="text-muted-foreground shrink-0" size={16} />
              <span className="text-sm text-muted-foreground">{cred}</span>
              <span className="ml-auto text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5">Coming Soon</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-center">
        <Button size="lg" onClick={handleShare}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base"
        >
          <Share2 size={16} className="mr-2" /> Share My Credential
        </Button>
      </div>
    </div>
  );
};

export default UserWallet;
