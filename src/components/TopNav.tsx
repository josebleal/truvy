import { useTruvy } from "@/context/TruvyContext";
import { cn } from "@/lib/utils";
import truvyLogo from "@/assets/truvy-logo.png";
import { Home, ScanLine, Building2, Wallet, ShieldCheck, Smartphone } from "lucide-react";

const tabs = [
  { label: "Home", icon: Home },
  { label: "Scan ID", icon: ScanLine },
  { label: "Legitimuz — Issue", icon: Building2 },
  { label: "User Wallet", icon: Wallet },
  { label: "Any Bank — Verify", icon: ShieldCheck },
  { label: "Try It Live", icon: Smartphone },
];

const TopNav = () => {
  const { state, setCurrentScreen } = useTruvy();

  return (
    <nav className="w-full border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-16 gap-8">
          {/* Logo */}
          <button
            onClick={() => setCurrentScreen(0)}
            className="shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src={truvyLogo} alt="TruVy" className="h-8 w-auto" />
          </button>

          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              const isActive = state.currentScreen === i;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentScreen(i)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium whitespace-nowrap transition-all",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.label.split("—")[0].trim().split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-border">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${((state.currentScreen + 1) / tabs.length) * 100}%` }}
        />
      </div>
    </nav>
  );
};

export default TopNav;
