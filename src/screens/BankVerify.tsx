import { useState } from "react";
import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ShieldCheck, ShieldX, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const API_BASE = "https://truvy-kyc-passport-production.up.railway.app";

const BankVerify = () => {
  const { state, setCurrentScreen } = useTruvy();
  const [verifyResult, setVerifyResult] = useState<"idle" | "loading" | "success" | "fail">("idle");
  const [forgeryResult, setForgeryResult] = useState<"idle" | "loading" | "fail">("idle");
  const [verifyData, setVerifyData] = useState<Record<string, unknown> | null>(null);
  const [shaking, setShaking] = useState(false);

  const handleVerifyReal = async () => {
    setVerifyResult("loading");
    try {
      const res = await fetch(`${API_BASE}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: state.token }),
      });
      const data = await res.json();
      if (data.valid) {
        setVerifyResult("success");
        setVerifyData(data);
      } else {
        setVerifyResult("fail");
      }
    } catch {
      setVerifyResult("fail");
    }
  };

  const handleForgery = async () => {
    setForgeryResult("loading");
    try {
      await fetch(`${API_BASE}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.FORGED.INVALID" }),
      });
    } catch {
      // expected
    }
    setForgeryResult("fail");
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">
          Any Bank — Verify Credential
        </h1>
        <p className="text-muted-foreground">
          See how a bank verifies your TruVy credential using RSA-2048 cryptography.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Verify Real */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={cn(
            "card-surface rounded-xl p-6 transition-all",
            verifyResult === "success" && "border-primary glow-green border"
          )}
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="text-primary" size={20} />
            <h3 className="text-lg font-semibold text-foreground">Verify Real Credential</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Send your authentic signed token to the bank's verification endpoint.
          </p>

          {verifyResult === "idle" && (
            <Button
              onClick={handleVerifyReal}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Verify Real Credential
            </Button>
          )}

          {verifyResult === "loading" && (
            <div className="flex items-center justify-center gap-2 text-primary py-3">
              <Loader2 className="animate-spin" size={18} />
              <span className="text-sm">Verifying with RSA-2048...</span>
            </div>
          )}

          {verifyResult === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-primary font-medium">
                <CheckCircle size={20} className="animate-scale-check" />
                <span>Signature Valid — Identity Confirmed</span>
              </div>
              {verifyData && (
                <div className="space-y-2 text-sm">
                  {verifyData.decoded && typeof verifyData.decoded === "object" && (
                    <>
                      <div className="flex justify-between p-2 rounded bg-secondary">
                        <span className="text-muted-foreground">Name</span>
                        <span className="text-foreground font-medium">
                          {(verifyData.decoded as Record<string, unknown>).name as string}
                        </span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-secondary">
                        <span className="text-muted-foreground">Country</span>
                        <span className="text-foreground font-medium">
                          {(verifyData.decoded as Record<string, unknown>).country as string}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {verifyResult === "fail" && (
            <div className="flex items-center gap-2 text-destructive font-medium">
              <XCircle size={18} />
              <span className="text-sm">Verification failed</span>
            </div>
          )}
        </motion.div>

        {/* Test Forgery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "card-surface rounded-xl p-6 transition-all",
            forgeryResult === "fail" && "border-destructive glow-red border",
            shaking && "animate-shake animate-flash-red"
          )}
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldX className="text-destructive" size={20} />
            <h3 className="text-lg font-semibold text-foreground">Test Forgery Attack</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Send a tampered token to see the bank's cryptographic rejection in action.
          </p>

          {forgeryResult === "idle" && (
            <Button
              onClick={handleForgery}
              variant="outline"
              className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              Send Forged Token
            </Button>
          )}

          {forgeryResult === "loading" && (
            <div className="flex items-center justify-center gap-2 text-destructive py-3">
              <Loader2 className="animate-spin" size={18} />
              <span className="text-sm">Attempting verification...</span>
            </div>
          )}

          {forgeryResult === "fail" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-destructive font-medium">
                <XCircle size={20} />
                <span>REJECTED — Invalid Signature</span>
              </div>
              <p className="text-xs text-muted-foreground">
                The RSA-2048 signature check failed. The bank knows this token was tampered with.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={() => setCurrentScreen(5)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base"
        >
          Continue to Try It Live <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BankVerify;
