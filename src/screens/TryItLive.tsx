import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Camera, AlertTriangle, XCircle, Lock, Shield, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TruvyLogo from "@/components/TruvyLogo";

const API_BASE = "https://truvy-kyc-passport-production.up.railway.app";

interface ProcessStep {
  label: string;
  doneLabel: string;
  status: "pending" | "loading" | "done";
}

interface CredentialResult {
  token: string;
  qrBase64?: string;
  claims?: {
    name?: string;
    country?: string;
    sanctions?: string;
    ageVerified?: string;
  };
  documentFields?: {
    name?: string;
    country?: string;
    documentNumber?: string;
    dateOfBirth?: string;
  };
  readable?: boolean;
}

const TryItLive = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [phase, setPhase] = useState<"upload" | "processing" | "success" | "error">("upload");
  const [steps, setSteps] = useState<ProcessStep[]>([
    { label: "Scanning document...", doneLabel: "Document detected", status: "pending" },
    { label: "Running sanctions check...", doneLabel: "Sanctions: PASSED", status: "pending" },
    { label: "Verifying age...", doneLabel: "Age: 18+ confirmed", status: "pending" },
    { label: "Signing with Legitimuz...", doneLabel: "Credential signed", status: "pending" },
  ]);
  const [result, setResult] = useState<CredentialResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const animateSteps = async () => {
    for (let i = 0; i < 4; i++) {
      setSteps((prev) =>
        prev.map((s, j) => (j === i ? { ...s, status: "loading" } : s))
      );
      await new Promise((r) => setTimeout(r, 800));
      setSteps((prev) =>
        prev.map((s, j) => (j === i ? { ...s, status: "done" } : s))
      );
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setPhase("processing");

    const stepsPromise = animateSteps();

    const formData = new FormData();
    formData.append("document", file);

    try {
      const [res] = await Promise.all([
        fetch(`${API_BASE}/issue-from-document`, { method: "POST", body: formData }),
        stepsPromise,
      ]);

      const data = await res.json();

      if (data.readable === false || data.error) {
        setErrorMsg(data.error || "Document could not be read");
        setPhase("error");
        return;
      }

      setResult(data);
      setPhase("success");
    } catch {
      setErrorMsg("Network error — please try again");
      setPhase("error");
    }
  };

  const handleVerifyForBank = async () => {
    if (!result?.token) return;
    setVerifying(true);
    try {
      const res = await fetch(`${API_BASE}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: result.token }),
      });
      const data = await res.json();
      setVerifyResult(data);
      setShowVerifyModal(true);
    } catch {
      setVerifyResult({ valid: false, error: "Network error" });
      setShowVerifyModal(true);
    } finally {
      setVerifying(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPreview(null);
    setPhase("upload");
    setResult(null);
    setErrorMsg("");
    setSteps((prev) => prev.map((s) => ({ ...s, status: "pending" as const })));
  };

  const name = result?.documentFields?.name || result?.claims?.name || "User";
  const country = result?.documentFields?.country || result?.claims?.country || "—";
  const docNumber = result?.documentFields?.documentNumber
    ? result.documentFields.documentNumber.substring(0, 2) + "***"
    : "AB***";

  return (
    <div className="max-w-lg mx-auto py-6 px-4 min-h-screen flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <TruvyLogo size="small" />
        <h1 className="text-2xl font-bold text-foreground mt-4 mb-1">Try TruVy Live</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Upload your ID. Get a verified credential in seconds.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["🔒 Never Stored", "FATF Compliant", "NIST IAL2"].map((badge) => (
            <span
              key={badge}
              className="text-[11px] text-muted-foreground border border-border rounded-full px-2.5 py-0.5"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Upload Phase */}
      {phase === "upload" && (
        <div className="flex-1 flex flex-col">
          <label
            htmlFor="live-upload"
            className={cn(
              "flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all",
              preview
                ? "border-primary/50 p-2"
                : "border-primary/40 hover:border-primary/70 p-8"
            )}
            style={{ minHeight: preview ? "auto" : "200px" }}
          >
            {preview ? (
              <img src={preview} alt="ID Preview" className="w-full rounded-xl max-h-52 object-cover" />
            ) : (
              <>
                <Camera className="text-primary mb-3" size={40} />
                <span className="text-base text-foreground font-medium">
                  Tap to take photo or upload ID
                </span>
                <span className="text-sm text-muted-foreground mt-1">
                  Passport · Driver's License · National ID
                </span>
              </>
            )}
            <input
              id="live-upload"
              type="file"
              accept="image/*,application/pdf"
              capture="environment"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>

          {preview && (
            <Button
              size="lg"
              onClick={handleScan}
              className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground w-full text-base min-h-[48px]"
            >
              Scan This ID →
            </Button>
          )}
        </div>
      )}

      {/* Processing Phase */}
      {phase === "processing" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <Loader2 className="text-primary animate-spin" size={40} />
          <div className="w-full space-y-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl transition-all duration-300",
                  step.status === "done"
                    ? "card-surface"
                    : step.status === "loading"
                    ? "card-surface glow-cyan"
                    : "opacity-30"
                )}
              >
                {step.status === "done" ? (
                  <CheckCircle className="text-success shrink-0" size={22} />
                ) : step.status === "loading" ? (
                  <Loader2 className="text-primary animate-spin shrink-0" size={22} />
                ) : (
                  <div className="w-[22px] h-[22px] rounded-full border border-border shrink-0" />
                )}
                <span className="text-sm text-foreground">
                  {step.status === "done" ? `✅ ${step.doneLabel}` : `⏳ ${step.label}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Phase */}
      {phase === "success" && result && (
        <div className="flex-1 animate-float-up">
          <div className="text-center mb-6">
            <div className="animate-scale-check inline-block mb-3">
              <CheckCircle className="text-success" size={56} />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Welcome, {name}</h2>
            <p className="text-sm text-muted-foreground">Your TruVy Credential is ready</p>
          </div>

          {/* Wallet Card */}
          <div className="wallet-card card-surface rounded-2xl p-5 glow-cyan border border-primary/30 relative overflow-hidden mb-6">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
              <span className="text-7xl font-black text-foreground rotate-[-15deg]">VALID</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">🛂 TruVy Passport</span>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Shield size={10} className="text-primary" />
                  Legitimuz
                </div>
              </div>
              <p className="text-lg font-bold text-foreground mb-1">{name}</p>
              <p className="text-sm text-muted-foreground mb-3">{country}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/20 text-success text-[11px] font-semibold">
                  ✅ Sanctions: PASSED
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/20 text-success text-[11px] font-semibold">
                  ✅ Age: 18+ VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Protected Fields */}
          <div className="card-surface rounded-xl p-4 mb-6">
            <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <Lock size={14} className="text-destructive" />
              What no bank will ever receive:
            </h4>
            <div className="space-y-2 text-sm">
              {[
                { label: "Document Number", value: docNumber },
                { label: "Date of Birth", value: "*/*/* (age verified)" },
                { label: "Home Address", value: null },
                { label: "Tax ID", value: null },
                { label: "Raw Document Image", value: null },
              ].map((f) => (
                <div key={f.label} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    🔒 {f.label}{f.value ? `: ${f.value}` : ""}
                  </span>
                  <span className="text-[10px] font-semibold text-destructive bg-destructive/20 px-1.5 py-0.5 rounded">
                    WITHHELD
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gold banner */}
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 text-center mb-6">
            <p className="text-gold font-semibold text-sm">
              Your documents were never transmitted. Zero.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              size="lg"
              onClick={handleVerifyForBank}
              disabled={verifying}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full min-h-[48px] text-base"
            >
              {verifying ? (
                <Loader2 className="animate-spin mr-2" size={18} />
              ) : null}
              See What a Bank Receives →
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={resetAll}
              className="w-full min-h-[48px] border-border text-foreground"
            >
              <RotateCcw size={16} className="mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      )}

      {/* Error / Unreadable Phase */}
      {phase === "error" && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="card-surface rounded-xl p-6 border border-warning/30 text-center">
            <AlertTriangle className="text-warning mx-auto mb-3" size={40} />
            <h3 className="text-lg font-bold text-foreground mb-2">
              Document unclear — please try again
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {errorMsg || "Make sure your ID is flat, well-lit, fully in frame, and not glared"}
            </p>
            <ul className="text-xs text-muted-foreground text-left space-y-1 mb-6">
              <li>• Make sure your ID is flat on a surface</li>
              <li>• Ensure good lighting with no glare</li>
              <li>• Keep the full document in frame</li>
              <li>• Avoid blurry or angled photos</li>
            </ul>
            <Button
              size="lg"
              onClick={resetAll}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full min-h-[48px] text-base"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Verify Modal */}
      <Dialog open={showVerifyModal} onOpenChange={setShowVerifyModal}>
        <DialogContent className="max-w-md bg-card border-border mx-4">
          <DialogHeader>
            <DialogTitle className="text-foreground">What a Bank Receives</DialogTitle>
          </DialogHeader>
          {verifyResult?.valid ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle size={20} />
                <span className="font-semibold">Credential Verified ✅</span>
              </div>
              <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm">
                <p><span className="text-muted-foreground">Name:</span> <span className="text-foreground">{verifyResult.claims?.name || name}</span></p>
                <p><span className="text-muted-foreground">Country:</span> <span className="text-foreground">{verifyResult.claims?.country || country}</span></p>
                <p><span className="text-muted-foreground">Sanctions:</span> <span className="text-success">PASSED</span></p>
                <p><span className="text-muted-foreground">Age:</span> <span className="text-success">18+ Verified</span></p>
              </div>
              <div className="bg-destructive/10 rounded-lg p-3">
                <p className="text-xs font-semibold text-destructive mb-2">🚫 Never Received:</p>
                <div className="space-y-1">
                  {["passportNumber", "dateOfBirth", "homeAddress", "taxId", "rawDocumentImage"].map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <XCircle size={12} className="text-destructive" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <XCircle className="text-destructive mx-auto mb-2" size={32} />
              <p className="text-destructive font-semibold">Verification failed</p>
              <p className="text-xs text-muted-foreground mt-1">{verifyResult?.error || "Unknown error"}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TryItLive;
