import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TruVyLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TruVyLogo = ({ size = "md", className }: TruVyLogoProps) => {
  const sizeMap = {
    sm: { icon: 13, text: "text-base", iconBox: "w-6 h-6" },
    md: { icon: 16, text: "text-xl", iconBox: "w-8 h-8" },
    lg: { icon: 22, text: "text-3xl", iconBox: "w-11 h-11" },
  };
  const s = sizeMap[size];
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30", s.iconBox)}>
        <ShieldCheck className="text-primary" size={s.icon} />
      </span>
      <span className={cn("font-black font-display tracking-tight text-foreground", s.text)}>
        TRU<span className="text-primary">✓</span>Y
      </span>
    </span>
  );
};

export default TruVyLogo;
