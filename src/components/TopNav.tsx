import { useTruvy } from "@/context/TruvyContext";
import { cn } from "@/lib/utils";
import { ScanLine, Building2, Wallet, ShieldCheck, Smartphone } from "lucide-react";

const tabs = [
  { label: "Scan ID", icon: ScanLine },
  { label: "Legitimuz — Issue", icon: Building2 },
  { label: "User Wallet", icon: Wallet },
  { label: "Any Bank — Verify", icon: ShieldCheck },
  { label: "Try It Live", icon: Smartphone },
];

const TopNav = () => {
  const { state, setCurrentScreen } = useTruvy();

  return (
    <nav className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = state.currentScreen === i;
            const colors = [
              "text-primary",
              "text-primary",
              "text-gold",
              "text-success",
              "text-primary",
            ];
            return (
              <button
                key={i}
                onClick={() => setCurrentScreen(i)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all min-w-fit",
                  isActive
                    ? `${colors[i]} bg-secondary`
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split("—")[0].trim()}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Progress indicator */}
      <div className="max-w-6xl mx-auto px-4 pb-2">
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                step <= state.currentScreen ? "bg-primary" : "bg-secondary"
              )}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
