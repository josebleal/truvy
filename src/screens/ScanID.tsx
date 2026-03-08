import { useState, useCallback } from "react";
import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE = "https://truvy-kyc-passport-production.up.railway.app";

const countries = ["United States", "Brazil", "United Kingdom", "Canada", "Mexico", "Germany", "Japan", "Australia", "India", "Nigeria"];

const ScanID = () => {
  const { state, setName, setCountry, setToken, setQrBase64, setIssuedAt, setCurrentScreen } = useTruvy();
  const [mode, setMode] = useState<"choose" | "upload" | "manual">("choose");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [detected, setDetected] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [manualName, setManualName] = useState("");
  const [manualCountry, setManualCountry] = useState("United States");
  const [error, setError] = useState("");

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedFile(ev.target?.result as string);
      setMode("upload");
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setDetected(true);
        setName("ALEXANDER J. MORRISON");
        setCountry("United States");
      }, 2000);
    };
    reader.readAsDataURL(file);
  }, [setName, setCountry]);

  const handleProceed = async () => {
    const finalName = mode === "manual" ? manualName.trim() : state.name;
    const finalCountry = mode === "manual" ? manualCountry : state.country;

    if (mode === "manual") {
      if (!finalName) return;
      setName(finalName);
      setCountry(finalCountry);
    }

    setVerifying(true);
    setError("");

    const steps = [
      "Running biometric check...",
      "Sanctions screening...",
      "Age verification...",
      "Issuing TruVy credential...",
    ];

    for (let i = 0; i < steps.length - 1; i++) {
      setVerifyStep(i);
      await new Promise((r) => setTimeout(r, 1000));
    }

    // Final step: call the /issue API
    setVerifyStep(steps.length - 1);
    try {
      const res = await fetch(`${API_BASE}/issue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: finalName, country: finalCountry }),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        setQrBase64(data.qrBase64 || "");
        setIssuedAt(new Date().toISOString());
        setCurrentScreen(2); // Go to IssuedCredential
      } else {
        setError("Failed to issue credential. Please try again.");
        setVerifying(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setVerifying(false);
    }
  };

  const canProceed = mode === "upload" ? detected : mode === "manual" ? manualName.trim().length > 0 : false;

  if (verifying) {
    const steps = [
      "Running biometric check...",
      "Sanctions screening...",
      "Age verification...",
      "Issuing TruVy credential...",
    ];
    return (
      <div className="max-w-lg mx-auto py-16 px-4 flex flex-col items-center gap-8">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <Loader2 className="text-primary animate-spin" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Verifying & Issuing Credential</h2>
        <div className="w-full space-y-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all duration-500",
                i < verifyStep
                  ? "card-surface"
                  : i === verifyStep
                  ? "card-surface glow-cyan"
                  : "opacity-30"
              )}
            >
              {i < verifyStep ? (
                <CheckCircle className="text-success shrink-0" size={20} />
              ) : i === verifyStep ? (
                <Loader2 className="text-primary animate-spin shrink-0" size={20} />
              ) : (
                <div className="w-5 h-5 rounded-full border border-border shrink-0" />
              )}
              <span className="text-sm text-foreground">{step}</span>
            </div>
          ))}
        </div>
        {error && (
          <div className="bg-destructive/20 border border-destructive rounded-lg p-3 text-destructive text-sm w-full text-center">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Verify Your Identity</h1>
        <p className="text-muted-foreground">
          Scan or enter your info — we'll verify and issue your credential
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Upload Card */}
        <div
          className={cn(
            "card-surface rounded-xl p-6 cursor-pointer transition-all",
            mode === "upload" ? "border-primary glow-cyan border" : "hover:border-primary/50 border border-border"
          )}
          onClick={() => mode === "choose" && document.getElementById("id-upload")?.click()}
        >
          <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
            <Upload size={20} className="text-primary" />
            Upload ID Photo
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            American Driver's License or Passport
          </p>

          {!uploadedFile ? (
            <label
              htmlFor="id-upload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-primary/40 rounded-xl p-8 cursor-pointer hover:border-primary/70 transition-colors"
            >
              <Upload className="text-primary mb-2" size={36} />
              <span className="text-sm text-muted-foreground">Click or drag to upload</span>
              <span className="text-xs text-muted-foreground mt-1">JPG, PNG</span>
              <input
                id="id-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-border">
                <img src={uploadedFile} alt="ID Preview" className="w-full h-40 object-cover" />
              </div>
              {processing ? (
                <div className="flex items-center gap-2 text-primary">
                  <Loader2 className="animate-spin" size={16} />
                  <span className="text-sm">Processing document...</span>
                </div>
              ) : detected ? (
                <>
                  <div className="flex items-center gap-2 text-success text-sm font-medium">
                    <CheckCircle size={16} />
                    Identity document detected
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 rounded bg-secondary">
                      <span className="text-muted-foreground">Full Name</span>
                      <span className="text-foreground font-medium">{state.name}</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-secondary">
                      <span className="text-muted-foreground">State / Country</span>
                      <span className="text-foreground font-medium">{state.country}</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-secondary">
                      <span className="text-muted-foreground">ID Number</span>
                      <span className="text-foreground font-medium">*******</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-secondary">
                      <span className="text-muted-foreground">Date of Birth</span>
                      <span className="text-foreground font-medium">**/**/ ****</span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>

        {/* Manual Card */}
        <div
          className={cn(
            "card-surface rounded-xl p-6 cursor-pointer transition-all border",
            mode === "manual" ? "border-muted-foreground" : "border-border hover:border-muted-foreground/50"
          )}
          onClick={() => setMode("manual")}
        >
          <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
            <FileText size={20} className="text-muted-foreground" />
            Enter Manually
          </h3>
          <p className="text-xs text-muted-foreground mb-4 italic">
            For testing — enter any information
          </p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <Input
                id="name"
                value={manualName}
                onChange={(e) => { setManualName(e.target.value); setMode("manual"); }}
                placeholder="John Doe"
                className="mt-1 bg-secondary border-border text-foreground"
              />
            </div>
            <div>
              <Label className="text-foreground">Country</Label>
              <select
                value={manualCountry}
                onChange={(e) => { setManualCountry(e.target.value); setMode("manual"); }}
                className="mt-1 w-full h-10 rounded-md border border-border bg-secondary text-foreground px-3 text-sm"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-foreground">ID Type</Label>
              <select className="mt-1 w-full h-10 rounded-md border border-border bg-secondary text-foreground px-3 text-sm">
                <option>Passport</option>
                <option>Driver's License</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleProceed}
          disabled={!canProceed}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base"
        >
          Verify & Issue Credential →
        </Button>
      </div>
    </div>
  );
};

export default ScanID;
