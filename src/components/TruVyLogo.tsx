import { cn } from "@/lib/utils";

interface TruVyLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TruVyLogo = ({ size = "md", className }: TruVyLogoProps) => {
  const heightMap = { sm: "h-7", md: "h-9", lg: "h-12" };
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src="/lovable-uploads/2cb727b8-1240-4ef8-9278-db721cc38728.png"
        alt="TruVy"
        className={cn("w-auto object-contain rounded-md", heightMap[size])}
      />
    </span>
  );
};

export default TruVyLogo;
