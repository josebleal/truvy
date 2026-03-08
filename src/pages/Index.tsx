import { TruvyProvider, useTruvy } from "@/context/TruvyContext";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import HomePage from "@/screens/HomePage";
import ScanID from "@/screens/ScanID";
import IssuedCredential from "@/screens/IssuedCredential";
import UserWallet from "@/screens/UserWallet";
import BankVerify from "@/screens/BankVerify";

const AppContent = () => {
  const { state } = useTruvy();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 1:
        return <ScanID />;
      case 2:
        return <IssuedCredential />;
      case 3:
        return <UserWallet />;
      case 4:
        return <BankVerify />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <main className="flex-1">
        {renderScreen()}
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
