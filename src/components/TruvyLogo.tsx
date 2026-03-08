import truvyLogoImg from "@/assets/truvy-logo.png";

const TruvyLogo = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const heights = {
    small: "h-6",
    default: "h-8",
    large: "h-12",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <img src={truvyLogoImg} alt="TruVy" className={`${heights[size]} w-auto`} />
      {size !== "small" && (
        <p className="text-xs text-muted-foreground tracking-widest uppercase">
          Verify once. Use anywhere.
        </p>
      )}
    </div>
  );
};

export default TruvyLogo;
