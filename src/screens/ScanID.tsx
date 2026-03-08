import { useState, useCallback, useMemo } from "react";
import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE = "https://truvy-kyc-passport-production.up.railway.app";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

const ScanID = () => {
  const { state, setName, setCountry, setToken, setQrBase64, setIssuedAt, setCurrentScreen, setDocumentType, setLocationLabel, setLocationValue, setAgeVerified } = useTruvy();
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [detected, setDetected] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [error, setError] = useState("");
  const [docType, setDocType] = useState<"passport" | "driver_license">("passport");

  // Manual form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [manualCountry, setManualCountry] = useState("United States of America");
  const [manualState, setManualState] = useState("Florida");
  const [passportNumber, setPassportNumber] = useState("");
  const [dob, setDob] = useState("");
  const [manualError, setManualError] = useState("");

  const handleReset = useCallback(() => {
    setUploadedFile(null);
    setProcessing(false);
    setDetected(false);
    setError("");
  }, []);

  const handleDocTypeChange = (type: "passport" | "driver_license") => {
    setDocType(type);
    setDocumentType(type);
    handleReset();
    setManualError("");
  };

  // Age calculation (assuming current year is 2026)
  const ageInfo = useMemo(() => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const currentDate = new Date(2026, new Date().getMonth(), new Date().getDate());
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return { age, is18: age >= 18, is21: age >= 21 };
  }, [dob]);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      const extractedState = docData.documentFields?.state || "";

      if (!extractedName) {
        setError("Could not extract name from document. Please try again.");
        setProcessing(false);
        return;
      }

      setName(extractedName);
      setCountry(extractedCountry);

      if (docType === "driver_license") {
        setLocationLabel("Issuing State");
        setLocationValue(extractedState || extractedCountry);
      } else {
        setLocationLabel("Country");
        setLocationValue(extractedCountry);
      }

      setProcessing(false);
      setDetected(true);

      // Auto-issue
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
        body: JSON.stringify({
          name: extractedName,
          country: extractedCountry,
          documentType: docType,
        }),
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
  }, [docType, setName, setCountry, setToken, setQrBase64, setIssuedAt, setCurrentScreen, setDocumentType, setLocationLabel, setLocationValue]);

  const handleManualSubmit = async () => {
    if (!firstName.trim() || !lastName.trim() || !dob) {
      setManualError("Please fill in all required fields.");
      return;
    }
    if (docType === "passport" && !passportNumber.trim()) {
      setManualError("Please enter your passport number.");
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const locationVal = docType === "passport" ? manualCountry : manualState;

    setName(fullName);
    setCountry(docType === "passport" ? manualCountry : "UNITED STATES OF AMERICA");
    if (docType === "driver_license") {
      setLocationLabel("Issuing State");
      setLocationValue(manualState.toUpperCase());
    } else {
      setLocationLabel("Country");
      setLocationValue(manualCountry.toUpperCase());
    }

    setVerifying(true);
    setManualError("");

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
      const body: Record<string, string> = {
        name: fullName,
        country: docType === "passport" ? manualCountry : locationVal,
        documentType: docType,
        dateOfBirth: dob,
      };
      if (docType === "passport") {
        body.documentNumber = passportNumber.trim();
      }

      const res = await fetch(`${API_BASE}/issue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        setQrBase64(data.qrBase64 || "");
        setIssuedAt(new Date().toISOString());
        setCurrentScreen(2);
      } else {
        setManualError("Failed to issue credential. Please try again.");
        setVerifying(false);
      }
    } catch {
      setManualError("Network error. Please try again.");
      setVerifying(false);
    }
  };

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
        body: JSON.stringify({
          name: state.name,
          country: state.country,
          documentType: docType,
        }),
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
        {(error || manualError) && (
          <div className="bg-destructive/20 border border-destructive rounded-lg p-3 text-destructive text-sm w-full text-center">
            {error || manualError}
          </div>
        )}
      </div>
    );
  }

  const uploadLabel = docType === "passport" ? "Upload Passport Photo" : "Upload Driver's License";

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Verify Your Identity</h1>
        <p className="text-muted-foreground">
          Upload your document or enter your details manually
        </p>
      </div>

      {/* Document Type Selector */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-full bg-secondary p-1 border border-border">
          <button
            type="button"
            onClick={() => handleDocTypeChange("passport")}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
              docType === "passport"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Passport
          </button>
          <button
            type="button"
            onClick={() => handleDocTypeChange("driver_license")}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
              docType === "driver_license"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Driver's License
          </button>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {/* Document Upload */}
        <div className="card-surface rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-1">
            <Upload size={20} className="text-primary" />
            {uploadLabel}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {docType === "passport" ? "Passport photo page" : "Front of Driver's License"} (JPG, JPEG, PDF)
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
                      <span className="text-muted-foreground">{state.locationLabel}</span>
                      <span className="text-foreground font-medium">{state.locationValue}</span>
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

        {/* OR Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-semibold text-muted-foreground tracking-wider">OR ENTER MANUALLY</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Manual Entry Form */}
        <div className="card-surface rounded-xl p-6 border border-border space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-foreground">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="bg-secondary border-border"
              />
            </div>
          </div>

          {docType === "passport" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-foreground">Country</Label>
                <Input
                  id="country"
                  value={manualCountry}
                  onChange={(e) => setManualCountry(e.target.value)}
                  placeholder="United States of America"
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportNum" className="text-foreground">Passport Number</Label>
                <Input
                  id="passportNum"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  placeholder="AB1234567"
                  className="bg-secondary border-border"
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="state" className="text-foreground">State</Label>
              <select
                id="state"
                value={manualState}
                onChange={(e) => setManualState(e.target.value)}
                className="flex h-10 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="dob" className="text-foreground">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          {/* Age badges for Driver's License */}
          {docType === "driver_license" && ageInfo && (
            <div className="flex items-center gap-4 pt-1">
              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                ageInfo.is18 ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"
              )}>
                {ageInfo.is18 ? <CheckCircle size={14} /> : <XCircle size={14} />}
                18+
              </div>
              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                ageInfo.is21 ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"
              )}>
                {ageInfo.is21 ? <CheckCircle size={14} /> : <XCircle size={14} />}
                21+
              </div>
            </div>
          )}

          {manualError && (
            <div className="bg-destructive/20 border border-destructive rounded-lg p-3 text-destructive text-sm text-center">
              {manualError}
            </div>
          )}

          <Button
            onClick={handleManualSubmit}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base"
            size="lg"
          >
            Verify & Issue Credential →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScanID;
