import { useState } from "react";
import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE = "https://truvy-kyc-passport-production.up.railway.app";

const LegitimuzIssue = () => {
  const { state, setToken, setQrBase64, setIssuedAt, setCurrentScreen } = useTruvy();
  const [issuing, setIssuing] = useState(false);
  const [issued, setIssued] = useState(false);
  const [error, setError] = useState("");

  const handleIssue = async () => {
    setIssuing(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/issue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: state.name, country: state.country }),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        setQrBase64(data.qrBase64 || "");
        setIssuedAt(new Date().toISOString());
        setIssued(true);
      } else {
        setError("Failed to issue credential.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIssuing(false);
    }
  };

  const checks = [
    { label: "Biometric Check", status: "PASSED" },
    { label: "Sanctions Screening", status: "PASSED" },
    { label: "Age Verification", status: "18+ CONFIRMED" },
    { label: "Document Authenticity", status: "VERIFIED" },
  ];

  if (!state.name) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 text-center">
        <p className="text-muted-foreground">Please complete identity scan first.</p>
        <Button variant="outline" className="mt-4" onClick={() => setCurrentScreen(0)}>
          Go to Scan ID
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Issuing TruVy Credential</h1>
        <p className="text-muted-foreground">
          Legitimuz has verified your identity — now issuing your portable credential
        </p>
      </div>

      {/* Verification Summary */}
      <div className="card-surface rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Verification Summary</h3>
        <div className="space-y-3">
          {checks.map((check) => (
            <div key={check.label} className="flex items-center gap-3">
              <CheckCircle className="text-success shrink-0" size={20} />
              <span className="text-foreground">{check.label}:</span>
              <span className="text-success font-medium ml-auto">{check.status}</span>
            </div>
          ))}
        </div>
      </div>

      {!issued ? (
        <div className="text-center space-y-4">
          <Button
            size="lg"
            onClick={handleIssue}
            disabled={issuing}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base"
          >
            {issuing ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Signing credential with Legitimuz private key...
              </>
            ) : (
              "Issue TruVy Credential →"
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Legitimuz signs this credential. TruVy never sees your documents.
          </p>
          {error && (
            <div className="bg-destructive/20 border border-destructive rounded-lg p-3 text-destructive text-sm">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="animate-float-up space-y-6">
          <div className="card-surface rounded-xl p-6 text-center glow-green">
            <div className="animate-scale-check inline-block mb-4">
              <CheckCircle className="text-success" size={56} />
            </div>
            <h3 className="text-xl font-bold text-success mb-4">TruVy Credential Issued</h3>

            {state.qrBase64 && (
              <div className="inline-block bg-foreground p-3 rounded-xl mb-4">
                <img src={state.qrBase64} alt="QR Code" className="w-48 h-48" />
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
              <Shield size={14} className="text-primary" />
              Signed by Legitimuz — did:kycp:jumio-mock
            </div>

            <div className="bg-success/10 border border-success/30 rounded-lg p-3 text-success text-sm font-medium">
              Credential issued. Zero raw documents transmitted.
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() => setCurrentScreen(2)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              Add to Wallet →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegitimuzIssue;
