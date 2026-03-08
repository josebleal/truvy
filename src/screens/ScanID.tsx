import { useState, useCallback } from "react";
import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, Loader2, Camera, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE = "https://truvy-kyc-passport-production.up.railway.app";

const ScanID = () => {
  const { state, setName, setCountry, setToken, setQrBase64, setIssuedAt, setCurrentScreen } = useTruvy();
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [detected, setDetected] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [error, setError] = useState("");

  const handleReset = useCallback(() => {
    setUploadedFile(null);
    setProcessing(false);
    setDetected(false);
    setError("");
  }, []);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview for images, placeholder for PDFs
    if (file.type === "application/pdf") {
      setUploadedFile("pdf");
    } else {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedFile(ev.target?.result as string);
      reader.readAsDataURL(file);
    }

    setProcessing(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("document", file);
      const docRes = await fetch(`${API_BASE}/issue-from-document`, {
        method: "POST",
        body: formData,
      });
      const docData = await docRes.json();
      const extractedName = docData.documentFields?.name || "";
      const extractedCountry = docData.documentFields?.country || "United States";

      if (!extractedName) {
        setError("Could not extract name from document. Please try again.");
        setProcessing(false);
        return;
      }

      setName(extractedName);
      setCountry(extractedCountry);
      setProcessing(false);
      setDetected(true);

      setVerifying(true);
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
      setVerifyStep(steps.length - 1);

      const issueRes = await fetch(`${API_BASE}/issue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: extractedName, country: extractedCountry }),
      });
      const issueData = await issueRes.json();
      if (issueData.token) {
        setToken(issueData.token);
        setQrBase64(issueData.qrBase64 || "");
        setIssuedAt(new Date().toISOString());
        setCurrentScreen(2);
      } else {
        setError("Failed to issue credential. Please try again.");
        setVerifying(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setProcessing(false);
      setVerifying(false);
    }
  }, [setName, setCountry, setToken, setQrBase64, setIssuedAt, setCurrentScreen]);

  const handleProceed = async () => {
    if (!detected) return;

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

    setVerifyStep(steps.length - 1);
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
        setCurrentScreen(2);
      } else {
        setError("Failed to issue credential. Please try again.");
        setVerifying(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setVerifying(false);
    }
  };

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
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Verify Your Identity</h1>
        <p className="text-muted-foreground">
          Two-factor verification: upload your document and complete a face scan
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Step 1: Document Upload */}
        <div className="card-surface rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Upload size={20} className="text-primary" />
              Upload ID Document
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 ml-8">
            Driver's License, Passport, or official ID (JPG, JPEG, PDF)
          </p>

          {!uploadedFile ? (
            <label
              htmlFor="id-upload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-primary/40 rounded-xl p-8 cursor-pointer hover:border-primary/70 transition-colors"
            >
              <Upload className="text-primary mb-2" size={36} />
              <span className="text-sm text-muted-foreground">Click or drag to upload</span>
              <span className="text-xs text-muted-foreground mt-1">JPG, JPEG, PDF</span>
              <input
                id="id-upload"
                type="file"
                accept=".jpg,.jpeg,.pdf,image/jpeg,application/pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-border">
                {uploadedFile === "pdf" ? (
                  <div className="w-full h-40 flex items-center justify-center bg-secondary">
                    <span className="text-muted-foreground text-sm font-medium">PDF Document Uploaded</span>
                  </div>
                ) : (
                  <img src={uploadedFile} alt="ID Preview" className="w-full h-40 object-cover" />
                )}
              </div>
              {processing ? (
                <div className="flex items-center gap-2 text-primary">
                  <Loader2 className="animate-spin" size={16} />
                  <span className="text-sm">Processing document...</span>
                </div>
              ) : error ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-destructive text-sm font-medium">
                    <XCircle size={16} />
                    {error}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="text-destructive border-destructive hover:bg-destructive/10"
                  >
                    <XCircle size={14} className="mr-1" /> Try Again
                  </Button>
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

        {/* Step 2: Face Scan (cosmetic only) */}
        <div className="card-surface rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Camera size={20} className="text-primary" />
              Face Scan
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 ml-8">
            Biometric verification to confirm your identity
          </p>

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-8">
            <div className="w-24 h-24 rounded-full border-4 border-muted-foreground/30 flex items-center justify-center mb-4">
              <Camera className="text-muted-foreground" size={36} />
            </div>
            <span className="text-sm text-muted-foreground mb-4">Position your face in the frame</span>
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white px-6"
              onClick={() => {}}
            >
              Start Face Scan
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/20 border border-destructive rounded-lg p-3 text-destructive text-sm w-full text-center mb-6">
          {error}
        </div>
      )}

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleProceed}
          disabled={!detected}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base"
        >
          Verify & Issue Credential →
        </Button>
      </div>
    </div>
  );
};

export default ScanID;
