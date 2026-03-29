const Footer = () => {
  const badges = ["FATF Compliant", "NIST IAL2", "eIDAS 2.0 Ready", "W3C VC Standard"];

  return (
    <footer className="w-full border-t border-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        <span className="text-xl font-black font-display tracking-tight text-foreground">
          TRU<span className="text-primary">✓</span>Y
        </span>
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
        <p className="text-[11px] text-muted-foreground text-center">
          TruVy — The Global Identity Network | support@truvy.net
        </p>
      </div>
    </footer>
  );
};

export default Footer;
