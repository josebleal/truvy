import { useState, useRef } from "react";
import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Loader2, XCircle, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API_BASE = "https://truvy-kyc-passport-production.up.railway.app";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming",
];

const calculateAge = (dob: string): number => {
  const birth = new Date(dob);
  const currentYear = 2026;
  const now = new Date(currentYear, new Date().getMonth(), new Date().getDate());
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const ScanID = () => {
  const { state, setName, setCountry, setToken, setQrBase64, setIssuedAt, setCurrentScreen, setDocumentType, setLocationLabel, setLocationValue, setDateOfBirth } = useTruvy();
  const [docType, setDocType] = useState<"passport" | "driver_license">("passport");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountryField] = useState("United States of America");
  const [stateField, setStateField] = useState("Florida");
  const [passportNumber, setPassportNumber] = useState("");
  const [dob, setDob] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [error, setError] = useState("");
  const [issueComplete, setIssueComplete] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDocTypeChange = (type: "passport" | "driver_license") => {
    setDocType(type);
    setDocumentType(type);
  };

  const age = dob ? calculateAge(dob) : null;

  const runVerifyAnimation = async () => {
    setVerifying(true);
    setError("");
    setIssueComplete(false);

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
  };

  const handleFileUpload = async (file: File) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setUploadError("Invalid file type. Please upload JPG, JPEG, or PDF.");
      return;
    }

    setUploadedFile(file);
    setUploadError("");
    setUploadLoading(true);

    try {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("documentType", docType);

      const issueRes = await fetch(`${API_BASE}/issue-from-document`, {
        method: "POST",
        body: formData,
      });

      if (!issueRes.ok) {
        throw new Error(`API error: ${issueRes.statusText}`);
      }

      const issueData = await issueRes.json();
      if (issueData.token) {
        setToken(issueData.token);
        setQrBase64(issueData.qrBase64 || "");
        setIssuedAt(new Date().toISOString());
        if (issueData.name) setName(issueData.name);
        if (issueData.country) setCountry(issueData.country);
        if (issueData.state) {
          setLocationLabel("Issuing State");
          setLocationValue(issueData.state);
        }
        if (issueData.dateOfBirth) setDateOfBirth(issueData.dateOfBirth);
        if (issueData.documentType) setDocumentType(issueData.documentType);
      } else {
        setUploadError("Failed to issue credential. Please try again.");
      }
    } catch {
      setUploadError("Failed to upload document. Please try again.");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleUploadReset = () => {
    setUploadedFile(null);
    setUploadError("");
    setUploadLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !dob) return;

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    setName(fullName);
    setDateOfBirth(dob);

    if (docType === "driver_license") {
      setLocationLabel("Issuing State");
      setLocationValue(stateField);
      setCountry("United States of America");
    } else {
      setLocationLabel("Document Country");
      setLocationValue(country);
      setCountry(country);
    }

    await runVerifyAnimation();

    try {
      const body: Record<string, string> = {
        name: fullName,
        documentType: docType,
        dateOfBirth: dob,
      };
      if (docType === "passport") {
        body.country = country;
        body.documentNumber = passportNumber;
      } else {
        body.country = stateField;
      }

      const issueRes = await fetch(`${API_BASE}/issue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const issueData = await issueRes.json();
      if (issueData.token) {
        setToken(issueData.token);
        setQrBase64(issueData.qrBase64 || "");
        setIssuedAt(new Date().toISOString());
        setIssueComplete(true);
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
        {issueComplete && (
          <Button
            onClick={() => setCurrentScreen(2)}
            className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
          >
            View Issued Credential
          </Button>
        )}
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
          Upload a document or enter your details below to get verified
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
                ? "bg-green-600 text-white shadow-md"
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
                ? "bg-green-600 text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Driver's License
          </button>
        </div>
      </div>

      {/* Upload Document Box */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        onClick={() => fileInputRef.current?.click()}
        className="card-surface rounded-xl p-8 border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer mb-6 text-center"
      >
        <Upload className="mx-auto mb-3 text-muted-foreground" size={32} />
        <p className="text-sm font-medium text-foreground mb-1">Upload Document</p>
        <p className="text-xs text-muted-foreground">
          Drag & drop or click to select — JPG, JPEG, or PDF
        </p>
        {uploadedFile && (
          <p className="text-xs text-primary mt-2">{uploadedFile.name}</p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground uppercase">or enter manually</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Manual Entry Form */}
      <form onSubmit={handleSubmit} className="card-surface rounded-xl p-6 border border-border space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">First Name</label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Last Name</label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              required
            />
          </div>
        </div>

        {docType === "passport" ? (
          <>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Country</label>
              <Input
                value={country}
                onChange={(e) => setCountryField(e.target.value)}
                placeholder="United States of America"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Passport Number</label>
              <Input
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                placeholder="AB1234567"
                required
              />
            </div>
          </>
        ) : (
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">State</label>
            <Select value={stateField} onValueChange={setStateField}>
              <SelectTrigger>
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Date of Birth</label>
          <Input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>

        {/* Age Restriction badges for Driver's License */}
        {docType === "driver_license" && age !== null && (
          <div className="space-y-2 p-3 rounded-lg bg-secondary">
            <p className="text-sm font-medium text-foreground mb-2">Age Restriction</p>
            <div className="flex items-center gap-2">
              <Badge className={age >= 18 ? "bg-green-600 text-white border-green-600" : "bg-destructive text-destructive-foreground border-destructive"}>
                18+
              </Badge>
              {age >= 18 ? (
                <CheckCircle size={16} className="text-green-500" />
              ) : (
                <XCircle size={16} className="text-destructive" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge className={age >= 21 ? "bg-green-600 text-white border-green-600" : "bg-destructive text-destructive-foreground border-destructive"}>
                21+
              </Badge>
              {age >= 21 ? (
                <CheckCircle size={16} className="text-green-500" />
              ) : (
                <XCircle size={16} className="text-destructive" />
              )}
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={!firstName.trim() || !lastName.trim() || !dob}
        >
          Verify & Issue Credential
        </Button>
      </form>

      {error && (
        <div className="bg-destructive/20 border border-destructive rounded-lg p-3 text-destructive text-sm w-full text-center mt-6">
          {error}
        </div>
      )}
    </div>
  );
};

export default ScanID;
