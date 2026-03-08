import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, DollarSign, ShieldCheck, Globe, Zap, Lock } from "lucide-react";
import heroShield from "@/assets/hero-shield.png";
import networkGlobe from "@/assets/network-globe.png";
import digitalPassport from "@/assets/digital-passport.png";

const stats = [
  { value: "~40.5%", desc: "of onboarding is manual identity verification", icon: Clock },
  { value: "11 min", desc: "average time per digital onboarding", icon: Users },
  { value: "70%", desc: "of banks lost clients due to slow KYC", icon: DollarSign },
  { value: "$22M", desc: "spent yearly on KYC per institution", icon: ShieldCheck },
];

const HomePage = () => {
  const { setCurrentScreen } = useTruvy();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-6">
                <Lock size={12} />
                Portable Digital Identity for Global Finance
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-display text-foreground mb-6 leading-[1.1] tracking-tight">
                Verify Once.{" "}
                <span className="gradient-text">Use Anywhere.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                Get verified once with a trusted issuer and share your credentials with any bank in the world — 
                without ever transmitting raw documents. The Visa network for identity.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => setCurrentScreen(1)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-sm font-semibold h-12"
                >
                  Try the Demo <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setCurrentScreen(5)}
                  className="border-border text-foreground hover:bg-muted/50 px-8 text-sm font-semibold h-12"
                >
                  Try It Live on Mobile
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative">
                <img
                  src={heroShield}
                  alt="Digital identity verification"
                  className="w-full max-w-lg mx-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">The Problem</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              Identity Verification is Broken
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.value}
                  className="card-surface rounded-xl p-6 text-center group hover:border-primary/30 transition-colors"
                >
                  <Icon className="text-primary mx-auto mb-3 opacity-60 group-hover:opacity-100 transition-opacity" size={20} />
                  <p className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">{stat.value}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{stat.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-[11px] text-muted-foreground mt-6 italic">
            Sources: Fenergo, PwC, Juniper Research
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-6">
              Why We Built TruVy
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                As international students, we experienced firsthand the frustrating reality of opening a bank account 
                in a new country. Every time we moved — for school, for work, for life — we had to repeat the same 
                exhausting identity verification process from scratch.
              </p>
              <p>
                Hours spent gathering documents, uploading passports, waiting days for manual reviews, only to do 
                it all over again at the next institution.
              </p>
              <p>
                On the bank side, we discovered that{" "}
                <span className="text-foreground font-semibold">70% of financial institutions report losing 
                potential customers</span> because of slow KYC onboarding. Banks spend{" "}
                <span className="text-foreground font-semibold">$22 million per year</span> on identity 
                verification — and the process still takes{" "}
                <span className="text-foreground font-semibold">11 minutes per person</span>.
              </p>
              <p className="text-foreground font-medium">
                We asked ourselves: <span className="text-primary italic">why can't identity 
                work like a Visa card?</span> Verify once with a trusted issuer, and every bank 
                accepts it — without seeing your raw documents.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src={networkGlobe}
              alt="Global identity network"
              className="w-full rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background/50 via-transparent to-transparent rounded-2xl" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-card/20">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-3">
              Three Steps. Zero Documents Transmitted.
            </h2>
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
                desc: "Any bank verifies your credential instantly using RSA-2048 cryptography. They get the answers they need — never the raw data.",
                icon: Globe,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="card-surface rounded-xl p-8 group hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl font-black font-display text-primary/20 group-hover:text-primary/40 transition-colors">{item.step}</span>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="text-primary" size={20} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold font-display text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Digital Passport Image */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              src={digitalPassport}
              alt="TruVy Digital Passport"
              className="w-full rounded-2xl"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">The Product</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-6">
              Your Digital Identity, <span className="gradient-text">Always With You</span>
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                The TruVy Passport is a cryptographically signed credential that lives in your digital wallet. 
                It contains verified claims about your identity — but never your raw documents.
              </p>
              <p>
                Banks receive only what they need: your name, country, sanctions status, and age verification. 
                They can mathematically prove these claims are authentic using RSA-2048 cryptography, 
                without ever seeing your passport, driver's license, or personal documents.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {["RSA-2048", "W3C VC", "FATF Compliant", "NIST IAL2", "eIDAS 2.0"].map((tag) => (
                <span key={tag} className="text-[11px] text-muted-foreground border border-border rounded-full px-3 py-1 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20 md:pb-28">
        <div className="card-surface rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
              See It In Action
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Walk through the full TruVy flow: scan an ID, issue a credential, view your wallet, 
              verify with a bank, and even test a forgery attack.
            </p>
            <Button
              size="lg"
              onClick={() => setCurrentScreen(1)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 text-sm font-semibold h-12"
            >
              Start the Demo <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
