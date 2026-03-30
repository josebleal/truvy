import { useState } from "react";
import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Clock, Users, DollarSign, ShieldCheck, Globe, Zap, Lock, Building2, BadgeCheck, X, Check, Mail, Globe2, User } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerItemSlow = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
};

const stats = [
  { value: "~40.5%", desc: "Manual identity verification", icon: Clock },
  { value: "11 min", desc: "Per onboarding session", icon: Users },
  { value: "70%", desc: "Banks lose clients to slow KYC", icon: DollarSign },
  { value: "$22M", desc: "Annual KYC cost per institution", icon: ShieldCheck },
];

const trustedLogos = [
  "Persona", "Plaid", "Socure", "Onfido", "Jumio", "Alloy",
];

const HomePage = () => {
  const { setCurrentScreen } = useTruvy();
  const { toast } = useToast();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll be in touch soon." });
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-accent/[0.04]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
          {/* Geometric pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-36 md:pb-32 relative z-10">
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
            <div className="max-w-3xl">
              <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/[0.06] text-primary text-xs font-medium mb-8 tracking-wide backdrop-blur-sm"
              >
                <Lock size={11} />
                Portable Digital Identity for Global Finance
              </motion.div>
              <motion.h1 initial="hidden" animate="visible" custom={1} variants={fadeUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-foreground mb-6 leading-[1.05] tracking-tight"
              >
                Verify Once.{" "}
                <span className="gradient-text">Use Anywhere.</span>
              </motion.h1>
              <motion.p initial="hidden" animate="visible" custom={2} variants={fadeUp}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed"
              >
                Get verified once with a trusted issuer and share your credentials
                with any bank in the world, without ever transmitting raw documents.
              </motion.p>

              {/* Country flags */}
              <motion.div initial="hidden" animate="visible" custom={2.5} variants={fadeUp}
                className="flex items-center gap-3 mb-10"
              >
                <span className="text-2xl tracking-widest">🇧🇷 🇺🇸 🇩🇪 🇸🇬 🇬🇧 🇨🇦</span>
                <span className="text-xs text-muted-foreground font-medium">Available globally</span>
              </motion.div>

              <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
                <Button size="lg" onClick={() => setCurrentScreen(1)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-sm font-semibold h-12 rounded-lg shadow-lg shadow-primary/20"
                >
                  Try the Demo <ArrowRight size={15} className="ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Floating credential card mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateY: -8 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="hidden md:block"
            >
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl scale-95" />
                <div className="relative w-72 rounded-2xl border border-primary/20 bg-card/80 backdrop-blur-xl p-6 shadow-2xl shadow-primary/10">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ShieldCheck className="text-primary" size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground font-display">TruVy Passport</p>
                      <p className="text-[10px] text-muted-foreground">Digital Identity Credential</p>
                    </div>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    {[
                      { l: "Identity", v: "Verified ✅" },
                      { l: "Sanctions", v: "Clear ✅" },
                      { l: "Liveness", v: "Passed ✅" },
                      { l: "Age", v: "21+ ✅" },
                    ].map((r) => (
                      <div key={r.l} className="flex justify-between p-2 rounded-lg bg-secondary/60">
                        <span className="text-muted-foreground">{r.l}</span>
                        <span className="text-foreground font-medium">{r.v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/50">
                    <p className="text-[9px] text-muted-foreground/60 font-mono">RSA-2048 · W3C Verifiable Credential</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="border-y border-border/40 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em] shrink-0">Trusted by leading providers</p>
            <div className="flex flex-wrap items-center gap-3 justify-center">
              {trustedLogos.map((name) => (
                <span key={name} className="text-xs font-semibold text-muted-foreground/60 bg-card border border-border/50 rounded-full px-4 py-1.5 tracking-wide">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
            <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">Who We Serve</motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-4xl font-bold font-display text-foreground">Built for the Financial Ecosystem</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Building2, title: "Banks & Financial Institutions", desc: "Reduce onboarding time from 11 minutes to seconds. Accept pre-verified credentials and eliminate redundant KYC checks.", tags: ["Faster Onboarding", "Lower KYC Costs", "Higher Conversion"] },
              { icon: BadgeCheck, title: "Identity Issuers", desc: "Become a trusted credential issuer on the TruVy network. Sign portable credentials that any bank worldwide can verify instantly.", tags: ["Issue Credentials", "Network Revenue", "Global Reach"] },
              { icon: User, title: "Individuals & Expats", desc: "Verify once with a trusted issuer and reuse your credential at any bank worldwide — no repeated document uploads, no friction.", tags: ["One-Time Verification", "Global Portability", "Privacy First"] },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i} variants={fadeUp}
                className="card-surface rounded-xl p-8 group hover:border-primary/20 transition-colors duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/[0.08] flex items-center justify-center mb-5">
                  <item.icon className="text-primary" size={20} />
                </div>
                <h3 className="text-xl font-bold font-display text-foreground mb-3">{item.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[11px] text-primary/80 bg-primary/[0.06] rounded-full px-3 py-1 font-medium">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
          <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">The Problem</motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-4xl font-bold font-display text-foreground">Identity Verification is Broken</motion.h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.value} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i} variants={scaleIn}
                className="card-surface rounded-xl p-6 text-center group hover:border-primary/20 transition-colors duration-300"
              >
                <Icon className="text-primary mx-auto mb-3 opacity-60 group-hover:opacity-90 transition-opacity" size={24} />
                <p className="text-3xl md:text-4xl font-bold font-display text-foreground mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">How It Works</motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-4xl font-bold font-display text-foreground">Three Steps. Zero Documents Transmitted.</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Verify Once", desc: "Upload your ID to a trusted issuer. They verify your identity using biometrics, sanctions screening, and age checks.", icon: ShieldCheck },
              { step: "02", title: "Get Your Credential", desc: "Receive a cryptographically signed TruVy Passport — a portable credential that proves who you are.", icon: Zap },
              { step: "03", title: "Share Everywhere", desc: "Any bank verifies your credential instantly using RSA-2048 cryptography. They never see your raw data.", icon: Globe },
            ].map((item, i) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i} variants={fadeUp}
                className="card-surface rounded-xl p-8 group hover:border-primary/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-black font-display text-muted-foreground/30 group-hover:text-primary/30 transition-colors">{item.step}</span>
                  <div className="w-9 h-9 rounded-lg bg-primary/[0.08] flex items-center justify-center">
                    <item.icon className="text-primary" size={18} />
                  </div>
                </div>
                <h3 className="text-lg font-bold font-display text-foreground mb-3">{item.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maria's Story */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
          <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">Real Story. Real Impact.</motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
            One Identity. Two Continents. <span className="gradient-text">Zero Friction.</span>
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-muted-foreground">Maria verified her identity once. TruVy did the rest.</motion.p>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { emoji: "🇧🇷", label: "Nubank · Brazil", title: "Identity Verified", badge: "Done once" },
            { emoji: "🛡️", label: "TruVy", title: "Credential Issued", badge: "Zero docs stored" },
            { emoji: "✈️", label: "Moves to the US", title: "Same Identity", badge: "No re-verification" },
            { emoji: "🏦", label: "Bank of America", title: "Approved Instantly", badge: "2 minutes ✅" },
          ].map((step, i) => (
            <motion.div key={step.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i} variants={fadeUp}
              className="card-surface rounded-xl p-6 text-center relative"
            >
              {i > 0 && <span className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 text-primary text-xl font-bold">→</span>}
              <span className="text-3xl mb-3 block">{step.emoji}</span>
              <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1">{step.label}</p>
              <h3 className="text-sm font-bold font-display text-foreground mb-2">{step.title}</h3>
              <span className="text-[10px] text-primary bg-primary/[0.06] rounded-full px-3 py-1 font-medium">{step.badge}</span>
            </motion.div>
          ))}
        </div>
        <motion.blockquote initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="mt-12 text-center max-w-3xl mx-auto"
        >
          <p className="text-base italic text-primary/80 leading-relaxed">
            "I verified once with Nubank. Six months later, I walked into Bank of America and was approved in 2 minutes."
          </p>
          <cite className="block mt-3 text-sm text-muted-foreground not-italic font-medium">— Maria S., USF International Student</cite>
        </motion.blockquote>
      </section>

      {/* Today vs TruVy */}
      <section className="border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">Comparison</motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-4xl font-bold font-display text-foreground">
              The Old Way vs. The TruVy Way
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 max-w-5xl mx-auto items-start">
            {/* Old Way */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="card-surface rounded-xl p-8"
            >
              <h3 className="text-lg font-bold font-display text-foreground mb-6 flex items-center gap-2">
                <X size={18} className="text-destructive" /> Today
              </h3>
              <div className="space-y-3">
                {["Visit Bank", "Fill Paper Forms", "Upload Documents", "Wait for Review", "Repeat at Every Bank"].map((step) => (
                  <motion.div key={step} variants={staggerItem}
                    className="flex items-center gap-3 p-3 rounded-lg bg-destructive/[0.05] border border-destructive/10"
                  >
                    <X size={14} className="text-destructive shrink-0" />
                    <span className="text-sm text-foreground">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* VS Divider */}
            <div className="hidden md:flex flex-col items-center justify-center h-full">
              <div className="w-px flex-1 bg-border" />
              <span className="text-xs font-bold text-muted-foreground bg-muted rounded-full px-4 py-2 tracking-wider my-3">VS</span>
              <div className="w-px flex-1 bg-border" />
            </div>
            <div className="flex md:hidden justify-center">
              <span className="text-xs font-bold text-muted-foreground bg-muted rounded-full px-4 py-2 tracking-wider">VS</span>
            </div>

            {/* TruVy Way */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="card-surface rounded-xl p-8 border-primary/20"
            >
              <h3 className="text-lg font-bold font-display text-foreground mb-6 flex items-center gap-2">
                <Check size={18} className="text-primary" /> TruVy
              </h3>
              <div className="space-y-3">
                {["Verify Once", "Receive TruVy Credential", "Share with Any Bank Instantly"].map((step) => (
                  <motion.div key={step} variants={staggerItemSlow}
                    className="flex items-center gap-3 p-3 rounded-lg bg-primary/[0.05] border border-primary/10"
                  >
                    <Check size={14} className="text-primary shrink-0" />
                    <span className="text-sm text-foreground">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.div custom={0} variants={fadeUp} className="w-14 h-14 rounded-xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-6">
              <Globe2 className="text-primary" size={24} />
            </motion.div>
            <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">About Us</motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-4xl font-bold font-display text-foreground mb-6">Why We Built TruVy</motion.h2>
            <motion.p custom={2} variants={fadeUp} className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We are international students who experienced firsthand the frustration of re-verifying our identity every time we opened a bank account in a new country. We asked: why can't identity work like global payment network infrastructure? TruVy is our answer — verify once with a trusted issuer, and use your credential anywhere in the world.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-border/40">
        <div className="max-w-xl mx-auto px-6 py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-10">
            <motion.div custom={0} variants={fadeUp} className="w-14 h-14 rounded-xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-6">
              <Mail className="text-primary" size={24} />
            </motion.div>
            <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">Contact</motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl font-bold font-display text-foreground mb-2">Get In Touch</motion.h2>
            <motion.p custom={2} variants={fadeUp} className="text-muted-foreground">Interested in partnering or learning more? Reach out to us.</motion.p>
          </motion.div>

          <motion.form initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            onSubmit={handleContactSubmit} className="card-surface rounded-xl p-8 space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Your name" required className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="you@example.com" required className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Message</label>
              <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Tell us how we can help..." required
                className="flex min-h-[100px] w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Send Message
            </Button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
