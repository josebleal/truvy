import { useEffect } from "react";
import { TruvyProvider, useTruvy } from "@/context/TruvyContext";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import HomePage from "@/screens/HomePage";
import ScanID from "@/screens/ScanID";
import IssuedCredential from "@/screens/IssuedCredential";
import UserWallet from "@/screens/UserWallet";

const AppContent = () => {
  const { state, setCurrentScreen, setSessionId, setToken } = useTruvy();

  // Handle URL params on mount (Persona callback & wallet redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inquiryId = params.get("inquiry-id");
    const screenParam = params.get("screen");

    if (inquiryId) {
      setSessionId(inquiryId);
      setToken(inquiryId);
      setCurrentScreen(2);
      window.history.replaceState({}, "", "/");
    } else if (screenParam === "3" || screenParam === "wallet") {
      setCurrentScreen(3);
      window.history.replaceState({}, "", "/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 1:
        return <ScanID />;
      case 2:
        return <IssuedCredential />;
      case 3:
        return <UserWallet />;
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
