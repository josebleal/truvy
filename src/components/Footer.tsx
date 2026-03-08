import truvyLogo from "@/assets/truvy-logo.png";

const Footer = () => {
  const badges = ["FATF Compliant", "NIST IAL2", "eIDAS 2.0 Ready", "W3C VC Standard"];

  return (
    <footer className="w-full border-t border-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        <img src={truvyLogo} alt="TruVy" className="h-6 w-auto opacity-60" />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="text-[11px] text-muted-foreground border border-border rounded-full px-3 py-1"
            >
              {badge}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">
          TruVy — The Visa Network for Identity
        </p>
      </div>
    </footer>
  );
};

export default Footer;
