import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import TruvyLogo from "@/components/TruvyLogo";
import { ArrowRight, Clock, Users, DollarSign, ShieldCheck, Globe, Zap } from "lucide-react";

const stats = [
  { value: "~40.5%", desc: "of onboarding is manual identity verification", icon: Clock },
  { value: "11 min", desc: "average time per digital onboarding per person", icon: Users },
  { value: "70%", desc: "of banks lost clients due to slow KYC processes", icon: DollarSign },
  { value: "$22M", desc: "spent yearly on KYC reviews of retail customers", icon: ShieldCheck },
];

const HomePage = () => {
  const { setCurrentScreen } = useTruvy();

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Hero */}
      <section className="text-center py-12 md:py-20">
        <div className="mb-8">
          <TruvyLogo size="large" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Verify Once. Use Anywhere.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          The portable digital identity network for global finance. 
          Get verified once and share your credentials everywhere — without ever transmitting raw documents.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            onClick={() => setCurrentScreen(1)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base min-h-[48px]"
          >
            Try the Demo <ArrowRight size={18} className="ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setCurrentScreen(5)}
            className="border-primary/40 text-primary hover:bg-primary/10 px-8 text-base min-h-[48px]"
          >
            Try It Live on Mobile
          </Button>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-16">
        <div className="card-surface rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="text-primary" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Why We Built TruVy</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              As international students, we experienced firsthand the frustrating reality of opening a bank account 
              in a new country. Every time we moved — for school, for work, for life — we had to repeat the same 
              exhausting identity verification process from scratch. Hours spent gathering documents, uploading 
              passports, waiting days for manual reviews, only to do it all over again at the next institution.
            </p>
            <p>
              But the problem isn't just ours. On the bank side, we discovered that{" "}
              <span className="text-foreground font-semibold">70% of financial institutions report losing 
              potential customers</span> because of slow and inefficient KYC onboarding. Banks spend an average 
              of <span className="text-foreground font-semibold">$22 million per year</span> on identity 
              verification for retail customers — and the process still takes{" "}
              <span className="text-foreground font-semibold">11 minutes per person</span> on average.
            </p>
            <p>
              We asked ourselves: <span className="text-primary font-semibold italic">why can't identity 
              work like a Visa card?</span> You verify once with a trusted issuer, and every bank in the 
              world accepts it — without ever seeing your raw documents.
            </p>
            <p className="text-foreground font-medium">
              That's TruVy. A neutral network layer where verified credentials travel with you, 
              but your documents never do.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem — Stats */}
      <section className="py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            The Problem Behind Identity Verification
          </h2>
          <p className="text-muted-foreground">
            Today, users repeat KYC verification every time they join a new financial service
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.value}
                className="card-surface rounded-2xl p-6 text-center hover:glow-green transition-all"
              >
                <Icon className="text-primary mx-auto mb-3" size={24} />
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.desc}</p>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4 italic">
          According to reports from Fenergo, PwC, and Juniper Research
        </p>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">How TruVy Works</h2>
          <p className="text-muted-foreground">Three steps. Zero documents transmitted.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Verify Once",
              desc: "Upload your ID to a trusted issuer like Legitimuz. They verify your identity using biometrics, sanctions screening, and age checks.",
              icon: ShieldCheck,
            },
            {
              step: "02",
              title: "Get Your Credential",
              desc: "Receive a cryptographically signed TruVy Passport — a portable credential that proves who you are without exposing your documents.",
              icon: Zap,
            },
            {
              step: "03",
              title: "Share Everywhere",
              desc: "Any bank can verify your credential instantly using RSA-2048 cryptography. They get the answers they need — never the raw data.",
              icon: Globe,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="card-surface rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black text-primary/30">{item.step}</span>
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 text-center">
        <div className="card-surface rounded-2xl p-8 md:p-12 glow-green border border-primary/20">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            See It In Action
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Walk through the full TruVy flow: scan an ID, issue a credential, view your wallet, 
            verify with a bank, and even test a forgery attack.
          </p>
          <Button
            size="lg"
            onClick={() => setCurrentScreen(1)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base min-h-[48px]"
          >
            Start the Demo <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
