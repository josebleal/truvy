import { useTruvy } from "@/context/TruvyContext";
import { cn } from "@/lib/utils";
import { Home, ScanLine, Wallet, ShieldCheck, Smartphone } from "lucide-react";

const tabs = [
  { label: "Home", icon: Home },
  { label: "Scan ID", icon: ScanLine },
  { label: "Wallet", icon: Wallet },
  { label: "Bank Verify", icon: ShieldCheck },
  { label: "Try It Live", icon: Smartphone },
];

const TopNav = () => {
  const { state, setCurrentScreen } = useTruvy();

  return (
    <nav className="w-full border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-14 gap-6">
          <button
            onClick={() => setCurrentScreen(0)}
            className="shrink-0 hover:opacity-80 transition-opacity flex items-center"
          >
            <span className="text-xl font-black font-display tracking-tight text-foreground">
              TRU<span className="text-primary">✓</span>Y
            </span>
          </button>

          <div className="h-5 w-px bg-border/50 hidden sm:block" />

          <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide flex-1">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              const isActive = state.currentScreen === i;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentScreen(i)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                    isActive
                      ? "text-foreground bg-muted/60"
                      : "text-muted-foreground hover:text-foreground/80"
                  )}
                >
                  <Icon size={16} strokeWidth={1.5} />
                  <span className="hidden lg:inline">{tab.label}</span>
                  <span className="lg:hidden hidden sm:inline">{tab.label.split("—")[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

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
