import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { RotateCcw, CheckCircle, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const TryItLive = () => {
  const { state, resetState, setCurrentScreen } = useTruvy();

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <Smartphone className="text-primary" size={28} />
        </div>
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">
          Try It Live
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          You've completed the full TruVy demo flow — from identity verification to bank acceptance.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-surface rounded-xl p-8 mb-8"
      >
        <h3 className="text-lg font-semibold text-foreground mb-6">Demo Summary</h3>
        <div className="space-y-4">
          {[
            { step: "Identity Verified", detail: state.name },
            { step: "Credential Issued", detail: "RSA-2048 Signed JWT" },
            { step: "Stored in Wallet", detail: "Portable Digital Passport" },
            { step: "Bank Verification", detail: "Cryptographic proof accepted" },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary"
            >
              <CheckCircle className="text-primary shrink-0" size={18} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.step}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {state.qrBase64 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="card-surface rounded-xl p-6 text-center">
            <p className="text-sm font-medium text-foreground mb-3">Scan on Mobile</p>
            <img src={state.qrBase64} alt="QR Code" className="w-40 h-40 mx-auto" />
            <p className="text-xs text-muted-foreground mt-2">Verify your credential on any device</p>
          </div>
        </motion.div>
      )}

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={() => {
            resetState();
            setCurrentScreen(0);
          }}
          variant="outline"
          className="px-8 text-base"
        >
          <RotateCcw size={16} className="mr-2" /> Restart Demo
        </Button>
      </div>
    </div>
  );
};

export default TryItLive;
