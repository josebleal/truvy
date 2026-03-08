import { useState } from "react";
import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Eye, EyeOff, ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE = "https://truvy-kyc-passport-production.up.railway.app";

const banks = ["Nubank", "Chase", "HSBC", "Itaú"];

const FAKE_SIG = "A".repeat(344);

const BankVerify = () => {
  const { state, setCurrentScreen } = useTruvy();
  const [selectedBank, setSelectedBank] = useState("Chase");
  const [showFullToken, setShowFullToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [forgery, setForgery] = useState(false);
  const [flashRed, setFlashRed] = useState(false);
  const [shake, setShake] = useState(false);

  const maskedToken = state.token
    ? state.token.substring(0, 20) + "....[truncated]"
    : "";

  const handleVerify = async (isForgery: boolean) => {
    setLoading(true);
    setResult(null);
    setForgery(isForgery);

    let tokenToSend = state.token;
    if (isForgery) {
      const parts = state.token.split(".");
      parts[parts.length - 1] = FAKE_SIG;
      tokenToSend = parts.join(".");
    }

    try {
      const res = await fetch(`${API_BASE}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenToSend }),
      });
      const data = await res.json();
      setResult(data);

      if (!data.valid && isForgery) {
        setFlashRed(true);
        setShake(true);
        setTimeout(() => setFlashRed(false), 400);
        setTimeout(() => setShake(false), 600);
      }
    } catch {
      setResult({ valid: false, error: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  if (!state.token) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 text-center">
        <p className="text-muted-foreground">No credential to verify. Issue one first.</p>
        <Button variant="outline" className="mt-4" onClick={() => setCurrentScreen(1)}>
          Go to Scan ID
        </Button>
      </div>
    );
  }

  const neverReceived = [
    "passportNumber",
    "dateOfBirth",
    "homeAddress",
    "taxId",
    "rawDocumentImage",
  ];

  return (
    <div className={cn("max-w-3xl mx-auto py-8 px-4", flashRed && "animate-flash-red")}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Verify TruVy Credential</h1>
        <p className="text-muted-foreground">
          This bank receives only what it needs — nothing more
        </p>
      </div>

      {/* Bank selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {banks.map((bank) => (
          <button
            key={bank}
            onClick={() => setSelectedBank(bank)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
              selectedBank === bank
                ? "bg-secondary border-primary text-foreground"
                : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
            )}
          >
            {bank}
          </button>
        ))}
      </div>

      {/* Token display */}
      <div className="card-surface rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-medium">JWT Token</span>
          <button
            onClick={() => setShowFullToken(!showFullToken)}
            className="text-xs text-primary flex items-center gap-1 hover:underline"
          >
            {showFullToken ? <EyeOff size={12} /> : <Eye size={12} />}
            {showFullToken ? "Hide" : "View Full Token"}
          </button>
        </div>
        <div className="bg-secondary rounded-lg p-3 max-h-32 overflow-auto">
          <code className="text-xs text-primary break-all">
            {showFullToken ? state.token : maskedToken}
          </code>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        <Button
          size="lg"
          onClick={() => handleVerify(false)}
          disabled={loading}
          className="bg-success hover:bg-success/90 text-success-foreground px-6"
        >
          {loading && !forgery ? (
            <Loader2 className="animate-spin mr-2" size={18} />
          ) : (
            <ShieldCheck size={18} className="mr-2" />
          )}
          ✅ Verify Real Credential
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleVerify(true)}
          disabled={loading}
          className="border-destructive text-destructive hover:bg-destructive/10 px-6"
        >
          {loading && forgery ? (
            <Loader2 className="animate-spin mr-2" size={18} />
          ) : (
            <ShieldAlert size={18} className="mr-2" />
          )}
          🔴 Test Forgery Attack
        </Button>
      </div>

      {/* Subtitle for forgery */}
      <p className="text-center text-xs text-muted-foreground mb-8 -mt-4">
        Forgery button simulates a hacker trying to forge a credential
      </p>

      {/* Results */}
      {result && (
        <div className={cn("animate-float-up", shake && "animate-shake")}>
          {result.valid ? (
            <div className="card-surface rounded-xl p-6 glow-green border border-success/30">
              <div className="text-center mb-6">
                <div className="animate-scale-check inline-block mb-3">
                  <CheckCircle className="text-success" size={64} />
                </div>
                <h3 className="text-2xl font-bold text-success">
                  {selectedBank} — Credential Accepted ✅
                </h3>
              </div>

              <div className="space-y-4">
                <div className="card-surface rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Claims Received</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span className="text-foreground font-medium">{result.claims?.name || state.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Country</span>
                      <span className="text-foreground font-medium">{result.claims?.country || state.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sanctions Check</span>
                      <span className="text-success font-medium">PASSED</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age Verified</span>
                      <span className="text-success font-medium">18+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issuer</span>
                      <span className="text-primary font-medium">Legitimuz (did:kycp:jumio-mock)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-destructive mb-3">
                    🚫 {selectedBank} Never Received:
                  </h4>
                  <div className="space-y-2">
                    {neverReceived.map((field) => (
                      <div key={field} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <XCircle size={14} className="text-destructive shrink-0" />
                        {field}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 text-center">
                  <p className="text-gold font-semibold text-sm">
                    Credential verified. Documents received: NONE.
                  </p>
                </div>

                <p className="text-center text-xs text-muted-foreground">
                  Verified by RSA-2048 cryptography — FATF compliant
                </p>
              </div>
            </div>
          ) : (
            <div className="card-surface rounded-xl p-6 glow-red border border-destructive/30">
              <div className="text-center mb-6">
                <div className="animate-scale-check inline-block mb-3">
                  <XCircle className="text-destructive" size={64} />
                </div>
                <h3 className="text-2xl font-bold text-destructive">Forgery Detected ❌</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Error: {result.error || "invalid signature"}
                </p>
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center mb-4">
                <p className="text-destructive font-semibold">
                  Credential rejected. Cannot forge a TruVy Passport.
                </p>
              </div>

              <div className="card-surface rounded-lg p-4 text-sm text-muted-foreground">
                <p>
                  RSA-2048 mathematics makes forgery computationally impossible.
                  Without Legitimuz's private key, no valid credential can be produced.
                </p>
              </div>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Compliant with NIST SP 800-63 IAL2
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BankVerify;
