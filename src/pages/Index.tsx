import { TruvyProvider, useTruvy } from "@/context/TruvyContext";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import HomePage from "@/screens/HomePage";
import ScanID from "@/screens/ScanID";
import LegitimuzIssue from "@/screens/LegitimuzIssue";
import UserWallet from "@/screens/UserWallet";
import BankVerify from "@/screens/BankVerify";
import TryItLive from "@/screens/TryItLive";

const screens = [HomePage, ScanID, LegitimuzIssue, UserWallet, BankVerify, TryItLive];

const AppContent = () => {
  const { state } = useTruvy();
  const Screen = screens[state.currentScreen] || HomePage;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <main className="flex-1">
        <Screen />
      </main>
      <Footer />
    </div>
  );
};

const Index = () => (
  <TruvyProvider>
    <AppContent />
  </TruvyProvider>
);

export default Index;
