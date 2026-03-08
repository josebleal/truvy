import truvyLogoImg from "@/assets/truvy-logo.png";

const TruvyLogo = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const sizes = {
    small: { text: "text-xl", tagline: "text-[10px]", check: "text-lg" },
    default: { text: "text-3xl", tagline: "text-xs", check: "text-2xl" },
    large: { text: "text-5xl", tagline: "text-sm", check: "text-4xl" },
  };

  const s = sizes[size];

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center">
        <span className={`${s.text} font-black tracking-tight text-foreground`}>
          TRU
        </span>
        <span className={`${s.check} font-black text-primary`}>✓</span>
        <span className={`${s.text} font-black tracking-tight text-foreground`}>
          Y
        </span>
      </div>
      {size !== "small" && (
        <p className={`${s.tagline} text-muted-foreground tracking-widest uppercase italic`}>
          Verify once. Use anywhere.
        </p>
      )}
    </div>
  );
};

export default TruvyLogo;
