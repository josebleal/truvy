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
    <nav className="w-full border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-14 gap-6">
          {/* Logo */}
          <button
            onClick={() => setCurrentScreen(0)}
            className="shrink-0 hover:opacity-80 transition-opacity"
          >
            <img src={truvyLogo} alt="TruVy" className="h-7 w-auto" />
          </button>

          {/* Divider */}
          <div className="h-5 w-px bg-border/50 hidden sm:block" />

          {/* Tabs */}
          <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide flex-1">
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
                      ? "text-foreground bg-muted/60"
                      : "text-muted-foreground hover:text-foreground/80"
                  )}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  <span className="hidden lg:inline">{tab.label}</span>
                  <span className="lg:hidden hidden sm:inline">{tab.label.split("—")[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Thin progress bar */}
      <div className="h-[1px] bg-border/30">
        <div
          className="h-full bg-primary/60 transition-all duration-700 ease-out"
          style={{ width: `${((state.currentScreen + 1) / tabs.length) * 100}%` }}
        />
      </div>
    </nav>
  );
};

export default TopNav;
