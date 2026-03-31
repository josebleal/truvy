import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, Wallet } from "lucide-react";
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
  const displayDocType = rawDocType === "passport" ? "Passport" : "Driver's License";
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
                <TruVyLogo size="sm" className="[&_span]:text-white/90 [&_.text-foreground]:text-white/90" />
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

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={() => toast({ title: "Apple Wallet", description: "Apple Wallet integration coming soon!" })}
          className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-black text-white font-semibold text-sm hover:bg-black/80 transition-colors border border-white/10 min-w-[200px]"
        >
          <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.52-3.24 0-1.44.64-2.2.52-3.08-.4C3.79 16.17 4.36 9.43 8.9 9.15c1.25.07 2.12.7 2.87.73.82-.17 1.6-.65 2.49-.59 1.06.08 1.86.52 2.39 1.33-2.18 1.32-1.66 4.23.38 5.04-.44 1.17-.99 2.33-1.98 3.62zM12.05 9.11c-.12-2.15 1.66-3.92 3.8-4.11.26 2.42-2.22 4.27-3.8 4.11z" />
          </svg>
          Add to Apple Wallet
        </button>
        <button
          onClick={() => toast({ title: "Google Wallet", description: "Google Wallet integration coming soon!" })}
          className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-gray-800 font-semibold text-sm hover:bg-gray-50 transition-colors border border-gray-200 min-w-[200px]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.94.46 3.77 1.18 5.41l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Add to Google Wallet
        </button>
      </div>
    </div>
  );
};

export default UserWallet;
