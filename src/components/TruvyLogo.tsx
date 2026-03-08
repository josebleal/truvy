import { Shield } from "lucide-react";

const TruvyLogo = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const sizes = {
    small: { icon: 20, text: "text-lg", tagline: "text-[10px]" },
    default: { icon: 28, text: "text-2xl", tagline: "text-xs" },
    large: { icon: 36, text: "text-3xl", tagline: "text-sm" },
  };

  const s = sizes[size];

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Shield className="text-primary" size={s.icon} strokeWidth={2.5} />
          <div className="absolute inset-0 blur-sm opacity-50">
            <Shield className="text-primary" size={s.icon} strokeWidth={2.5} />
          </div>
        </div>
        <span className={`${s.text} font-bold tracking-tight text-foreground`}>
          Tru<span className="text-primary">Vy</span>
        </span>
      </div>
      {size !== "small" && (
        <p className={`${s.tagline} text-muted-foreground tracking-widest uppercase`}>
          Verify Once · Share Nothing · Trust Everything
        </p>
      )}
    </div>
  );
};

export default TruvyLogo;
