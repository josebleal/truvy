import { useState } from "react";
import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const UserWallet = () => {
  const { state, setCurrentScreen } = useTruvy();
  const [showToken, setShowToken] = useState(false);

  const protectedFields = [
    { label: "Passport Number", icon: "🔒" },
    { label: "Date of Birth", icon: "🔒" },
    { label: "Home Address", icon: "🔒" },
    { label: "Tax ID", icon: "🔒" },
    { label: "Raw Document Image", icon: "🔒" },
  ];

  if (!state.token) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 text-center">
        <p className="text-muted-foreground">No credential yet. Start at Scan ID.</p>
        <Button variant="outline" className="mt-4" onClick={() => setCurrentScreen(0)}>
          Go to Scan ID
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Your TruVy Passport</h1>
      </div>

      {/* Wallet Card */}
      <div className="wallet-card card-surface rounded-2xl p-6 glow-cyan relative overflow-hidden mb-8 border border-primary/30">
        {/* Valid watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <span className="text-8xl font-black text-foreground rotate-[-15deg]">VALID</span>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">🛂 TruVy Passport</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield size={12} className="text-primary" />
              Legitimuz
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Full Name</span>
              <p className="text-xl font-bold text-foreground">{state.name}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Country</span>
              <p className="text-foreground font-medium">{state.country}</p>
            </div>
            <div className="flex gap-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success/20 text-success text-xs font-semibold">
                <CheckCircle size={12} /> SANCTIONS: PASSED
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success/20 text-success text-xs font-semibold">
                <CheckCircle size={12} /> AGE: 18+ VERIFIED
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Issued: {state.issuedAt ? new Date(state.issuedAt).toLocaleDateString() : "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Protected Fields */}
      <div className="card-surface rounded-xl p-6 mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lock size={16} className="text-destructive" />
          Protected — Never Shared With Any Bank
        </h3>
        <div className="space-y-2">
          {protectedFields.map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary"
            >
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                {field.icon} {field.label}
              </span>
              <span className="text-xs font-semibold text-destructive bg-destructive/20 px-2 py-0.5 rounded">
                WITHHELD
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          size="lg"
          onClick={() => setCurrentScreen(3)}
          className="bg-gold hover:bg-gold/90 text-gold-foreground px-8"
        >
          Share with Any Bank →
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setShowToken(true)}
          className="border-border text-foreground"
        >
          <Eye size={16} className="mr-2" />
          View Raw Credential
        </Button>
      </div>

      <Dialog open={showToken} onOpenChange={setShowToken}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Raw JWT Token</DialogTitle>
          </DialogHeader>
          <div className="bg-secondary rounded-lg p-4 max-h-64 overflow-auto">
            <code className="text-xs text-primary break-all">{state.token}</code>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserWallet;
