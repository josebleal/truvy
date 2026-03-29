import { useTruvy } from "@/context/TruvyContext";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const providers = [
  { name: "Persona", logo: "https://logo.clearbit.com/withpersona.com", functional: true },
  { name: "Jumio", logo: "https://logo.clearbit.com/jumio.com", comingSoon: true },
  { name: "Legitimuz 🇧🇷", logo: "https://logo.clearbit.com/legitimuz.com", comingSoon: true },
  { name: "Nubank 🇧🇷", logo: "https://logo.clearbit.com/nubank.com.br", comingSoon: true },
  { name: "Onfido 🇬🇧", logo: "https://logo.clearbit.com/onfido.com", comingSoon: true },
  { name: "IDnow 🇩🇪", logo: "https://logo.clearbit.com/idnow.io", comingSoon: true },
  { name: "MyInfo 🇸🇬", logo: "https://logo.clearbit.com/myinfo.gov.sg", comingSoon: true },
  { name: "Sumsub 🌍", logo: "https://logo.clearbit.com/sumsub.com", comingSoon: true },
];

const PERSONA_URL = "https://withpersona.com/verify?inquiry-template-id=itmpl_cD8vUHZTdHuwUUbYgZuE9bu2M8NU&environment=sandbox";

const ScanID = () => {
  const { setCurrentScreen, setToken, setName, setCountry, setIssuedAt, setLocationLabel, setLocationValue } = useTruvy();
  const { toast } = useToast();

  // Detect return from Persona (inquiry-id in URL)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inquiryId = params.get("inquiry-id");
    if (inquiryId) {
      // Auto-advance to Issue page
      setCurrentScreen(2);
      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [setCurrentScreen]);

  const handleProviderClick = (provider: typeof providers[0]) => {
    if (provider.functional) {
      window.location.href = PERSONA_URL;
    } else {
      toast({ title: "Coming Soon", description: "This provider will be available soon!" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-3xl font-bold font-display text-foreground mb-3">Connect Your Verification Provider</h1>
        <p className="text-muted-foreground">Choose the identity issuer you verified with</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {providers.map((provider, i) => (
          <motion.button
            key={provider.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleProviderClick(provider)}
            className="card-surface rounded-xl p-5 flex items-center gap-4 hover:border-primary/30 transition-all duration-200 text-left group"
          >
            <img
              src={provider.logo}
              alt={provider.name}
              className="w-10 h-10 rounded-lg object-contain bg-background border border-border p-1"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{provider.name}</p>
              {provider.comingSoon && (
                <p className="text-[10px] text-muted-foreground">Coming Soon</p>
              )}
              {provider.functional && (
                <p className="text-[10px] text-primary font-medium">Click to verify →</p>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ScanID;
