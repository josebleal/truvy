const Footer = () => {
  const badges = ["FATF Compliant", "NIST IAL2", "eIDAS 2.0 Ready", "W3C VC Standard"];

  return (
    <footer className="w-full border-t border-border py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {badges.map((badge) => (
            <span
              key={badge}
              className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1"
            >
              {badge}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          TruVy — The Visa Network for Identity
        </p>
      </div>
    </footer>
  );
};

export default Footer;
