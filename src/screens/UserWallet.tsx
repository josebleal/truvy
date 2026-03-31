import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, Wallet, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useTruvy } from "@/context/TruvyContext";
import TruVyLogo from "@/components/TruVyLogo";

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




  // Empty state
  if (!state.token && !state.name && state.credentials.length === 0) {
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

  const cred0 = state.credentials?.[0];
  const displayName = cred0?.name || state.name || "Verified User";
  const displayCountry = cred0?.country || state.locationValue || state.country || "Unknown";
  const rawDocType = cred0?.documentType || state.documentType;
  const displayDocType = rawDocType === "driver_license" ? "Driver's License" : "Passport";
  const rawAge = cred0?.ageVerified || state.ageVerified;
  const displayAge = rawAge === "21+" || rawAge === "18+" ? `${rawAge} ✅` : rawAge === "under18" ? "Under 18 ❌" : "—";

  const credentialFields = [
    { label: "Country", value: displayCountry.toUpperCase() },
    { label: "Document", value: displayDocType },
    { label: "Age", value: displayAge },
    { label: "Sanctions", value: "Clear ✅" },
    { label: "Liveness", value: "Passed ✅" },
    { label: "Issued by", value: cred0?.issuer || "Persona" },
  ];

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TruVyLogo size="md" />
          <h1 className="text-3xl font-bold font-display text-foreground">Wallet</h1>
        </div>
        <p className="text-muted-foreground">Your verified credentials, ready to share with any institution worldwide</p>
      </motion.div>

      {/* Apple Wallet-style KYC Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
        className="mb-10"
      >
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Verified Credentials</h2>
        <div className="relative group">
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-primary/60 via-primary/20 to-primary/60 opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-primary/30 p-6 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }} />
            <div className="relative flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Shield className="text-primary" size={16} />
                </div>
                <span className="text-white/90 font-bold text-sm tracking-wide">TruVy</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">KYC Credential</span>
            </div>
            <div className="relative mb-6">
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">Verified Identity</p>
              <p className="text-xl font-bold text-white tracking-wide font-display">{displayName}</p>
            </div>
            <div className="relative grid grid-cols-2 gap-2">
              {credentialFields.map((field) => (
                <div key={field.label} className="flex items-center gap-2 bg-white/[0.06] rounded-lg px-3 py-2">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 shrink-0">{field.label}</span>
                  <span className="text-xs text-white/90 font-medium ml-auto text-right">{field.value}</span>
                </div>
              ))}
            </div>
            <div className="relative mt-5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="text-primary" size={14} />
                <span className="text-xs text-primary font-medium">Verified</span>
              </div>
              <span className="text-[10px] text-white/30 font-mono">RSA-2048 Encrypted</span>
            </div>
          </div>
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
