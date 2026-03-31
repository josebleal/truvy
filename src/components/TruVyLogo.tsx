import { cn } from "@/lib/utils";

interface TruVyLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TruVyLogo = ({ size = "md", className }: TruVyLogoProps) => {
  const sizeMap = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  };
  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className={cn("font-black font-display tracking-tight text-foreground", sizeMap[size])}>
        TRU<span className="text-primary">✓</span>Y
      </span>
    </span>
  );
};

export default TruVyLogo;
