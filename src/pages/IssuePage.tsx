import { TruvyProvider } from "@/context/TruvyContext";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import IssuedCredential from "@/screens/IssuedCredential";

const IssuePage = () => (
  <TruvyProvider>
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <main className="flex-1">
        <IssuedCredential />
      </main>
      <Footer />
    </div>
  </TruvyProvider>
);

export default IssuePage;
