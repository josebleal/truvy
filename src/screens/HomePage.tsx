import { useState } from "react";
import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ShieldCheck, Globe, Zap, Lock, Building2, BadgeCheck, X, Check, Mail, Globe2, User, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import TruVyLogo from "@/components/TruVyLogo";
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

const marqueeItems = [
  "22M+ Identities Verified",
  "< 30s Verification Time",
  "RSA-2048 Encrypted",
  "W3C VC Standard",
  "Zero Raw Documents Transmitted",
  "Global KYC Network",
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
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        {/* Green radial glow behind right side */}
        <div className="absolute top-1/2 right-0 w-[700px] h-[700px] -translate-y-1/2 translate-x-[10%] rounded-full bg-primary/20 blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-24 md:pt-40 md:pb-36 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left text */}
            <div>
              <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/[0.06] text-primary text-xs font-medium mb-8 tracking-wide"
              >
                <Lock size={11} />
                Portable Digital Identity for Global Finance
              </motion.div>
              <motion.h1 initial="hidden" animate="visible" custom={1} variants={fadeUp}
                className="text-6xl md:text-8xl font-bold font-display leading-[0.95] tracking-tight mb-6"
              >
                <span className="text-white">Verify Once.</span>
                <br />
                <span className="text-primary">Use Anywhere.</span>
              </motion.h1>
              <motion.p initial="hidden" animate="visible" custom={2} variants={fadeUp}
                className="text-lg md:text-xl text-white/50 max-w-lg mb-10 leading-relaxed"
              >
                Get verified once with a trusted issuer and share your credentials
                with any bank in the world — without ever transmitting raw documents.
              </motion.p>
              <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
                <Button size="lg" onClick={() => setCurrentScreen(1)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 text-sm font-semibold h-13 rounded-xl shadow-lg shadow-primary/25"
                >
                  Try the Demo <ArrowRight size={15} className="ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Right — Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="hidden md:flex justify-center"
            >
              <div className="relative">
                {/* Glow orb behind phone */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/25 blur-[100px]" />
                {/* Phone frame */}
                <div className="relative w-[280px] rounded-[2.5rem] border-[3px] border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-5 pt-10 shadow-2xl animate-[float_6s_ease-in-out_infinite]">
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />
                  {/* Card inside phone */}
                  <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 p-5 mt-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                          <ShieldCheck className="text-primary" size={14} />
                        </div>
                        <span className="text-xs font-bold text-white font-display">TruVy Passport</span>
                      </div>
                      <CheckCircle2 className="text-primary" size={18} />
                    </div>
                    <div className="mb-4">
                      <p className="text-white text-base font-bold font-display tracking-wide">JOHN DOE</p>
                      <p className="text-primary text-[11px] font-semibold mt-1">Identity Verified</p>
                    </div>
                    <div className="space-y-2 text-[11px]">
                      {[
                        { l: "Sanctions", v: "Clear" },
                        { l: "Liveness", v: "Passed" },
                        { l: "Age", v: "21+" },
                      ].map((r) => (
                        <div key={r.l} className="flex justify-between items-center py-1.5 px-2.5 rounded-lg bg-white/[0.05]">
                          <span className="text-white/40">{r.l}</span>
                          <span className="text-white/80 font-medium flex items-center gap-1">
                            {r.v} <Check size={10} className="text-primary" />
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <p className="text-[9px] text-white/25 font-mono">Issued by Persona · RSA-2048</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE STATS STRIP ─── */}
      <section className="bg-primary overflow-hidden">
        <div className="py-3.5 relative">
          <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="mx-8 text-sm font-semibold text-primary-foreground/90 tracking-wide flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section style={{ background: "#0a0a0a" }}>
        <div className="max-w-5xl mx-auto px-6 py-28 text-center">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-xs font-semibold text-primary uppercase tracking-[0.3em] mb-8"
          >
            THE PROBLEM
          </motion.p>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="text-5xl md:text-7xl font-bold font-display text-white leading-tight mb-4"
          >
            50 out of 100 users
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
            className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto mb-16"
          >
            abandon onboarding because of repetitive KYC
          </motion.p>

          {/* Comparison bars */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp}
            className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-left">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-white/60">Traditional KYC</span>
                <span className="text-sm text-white/40">11 min · 73% completion</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "73%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="h-full rounded-full bg-destructive/70"
                />
              </div>
            </div>
            <div className="text-left">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-white/60">TruVy</span>
                <span className="text-sm text-primary/80">28 sec · 97% completion</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "97%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.7 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── REAL PHOTO SECTION ─── */}
      <section style={{ background: "#0f0f0f" }}>
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left — photo */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={scaleIn}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-primary/10">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                  alt="Person verifying identity on phone"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>

            {/* Right — text */}
            <div>
              <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
                className="text-xs font-semibold text-primary uppercase tracking-[0.3em] mb-4"
              >
                BUILT FOR REAL PEOPLE
              </motion.p>
              <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
                className="text-4xl md:text-5xl font-bold font-display text-white leading-tight mb-8"
              >
                One Identity.<br />Every Bank.<br /><span className="text-primary">Anywhere.</span>
              </motion.h2>
              <div className="space-y-5">
                {[
                  "Verify once with a trusted issuer",
                  "Share with any bank instantly",
                  "Your raw documents never leave your device",
                ].map((item, i) => (
                  <motion.div key={item} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2} variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                    <span className="text-lg text-white/70">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        {/* Background photo with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.07]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-28 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.3em] mb-3">HOW IT WORKS</motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-4xl md:text-5xl font-bold font-display text-white">Three Steps. Zero Documents.</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Verify Once", desc: "Upload your ID to a trusted issuer. They verify your identity using biometrics, sanctions screening, and age checks.", icon: ShieldCheck },
              { step: "02", title: "Get Your Credential", desc: "Receive a cryptographically signed TruVy Passport — a portable credential that proves who you are.", icon: Zap },
              { step: "03", title: "Share Everywhere", desc: "Any bank verifies your credential instantly using RSA-2048 cryptography. They never see your raw data.", icon: Globe },
            ].map((item, i) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i} variants={fadeUp}
                className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8 group hover:border-primary/20 transition-all duration-300 overflow-hidden"
              >
                {/* Big background number */}
                <span className="absolute -top-4 -right-2 text-[120px] font-black font-display text-white/[0.03] leading-none pointer-events-none select-none group-hover:text-primary/[0.06] transition-colors duration-500">
                  {item.step}
                </span>
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-primary/[0.1] flex items-center justify-center mb-6">
                    <item.icon className="text-primary" size={20} />
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-3">{item.title}</h3>
                  <p className="text-base text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO WE SERVE ─── */}
      <section style={{ background: "#0f0f0f" }}>
        <div className="max-w-7xl mx-auto px-6 py-28">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.3em] mb-3">WHO WE SERVE</motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-4xl md:text-5xl font-bold font-display text-white">Built for the Financial Ecosystem</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Building2,
                title: "Banks & Financial Institutions",
                desc: "Reduce onboarding time from 11 minutes to seconds. Accept pre-verified credentials and eliminate redundant KYC checks.",
                tags: ["Faster Onboarding", "Lower KYC Costs", "Higher Conversion"],
                img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
              },
              {
                icon: BadgeCheck,
                title: "Identity Issuers",
                desc: "Become a trusted credential issuer on the TruVy network. Sign portable credentials that any bank worldwide can verify instantly.",
                tags: ["Issue Credentials", "Network Revenue", "Global Reach"],
                img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80",
              },
              {
                icon: User,
                title: "Individuals & Expats",
                desc: "Verify once with a trusted issuer and reuse your credential at any bank worldwide — no repeated document uploads, no friction.",
                tags: ["One-Time Verification", "Global Portability", "Privacy First"],
                img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
              },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i} variants={fadeUp}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden group hover:border-primary/20 transition-colors duration-300"
              >
                <div className="h-40 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-7">
                  <div className="w-10 h-10 rounded-lg bg-primary/[0.1] flex items-center justify-center mb-4 -mt-12 relative z-10 border-2 border-[#0f0f0f]">
                    <item.icon className="text-primary" size={18} />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-primary/80 bg-primary/[0.08] rounded-full px-3 py-1 font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section style={{ background: "#0a0a0a" }}>
        <div className="max-w-4xl mx-auto px-6 py-28">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={scaleIn}
            className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-10 md:p-14 text-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                alt="Maria S."
                className="w-16 h-16 rounded-full object-cover mx-auto mb-6 border-2 border-primary/30"
                loading="lazy"
              />
              <p className="text-xl md:text-2xl italic text-primary/80 leading-relaxed max-w-2xl mx-auto mb-6 font-display">
                "I verified once with Nubank in Brazil. Six months later, Bank of America approved me in 2 minutes."
              </p>
              <p className="text-sm text-white/40 font-medium">— Maria S., USF International Student</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── MARIA'S STORY ─── */}
      <section style={{ background: "#0f0f0f" }}>
        <div className="max-w-7xl mx-auto px-6 py-28">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
            <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.3em] mb-3">REAL STORY. REAL IMPACT.</motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-4xl md:text-5xl font-bold font-display text-white mb-3">
              One Identity. Two Continents. <span className="text-primary">Zero Friction.</span>
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="text-white/40">Maria verified her identity once. TruVy did the rest.</motion.p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Nubank · Brazil", title: "Identity Verified", badge: "Done once" },
              { label: "TruVy", title: "Credential Issued", badge: "Zero docs stored" },
              { label: "Moves to the US", title: "Same Identity", badge: "No re-verification" },
              { label: "Bank of America", title: "Approved Instantly", badge: "2 minutes" },
            ].map((step, i) => (
              <motion.div key={step.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i} variants={fadeUp}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 text-center relative"
              >
                {i > 0 && <span className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 text-primary text-xl font-bold">→</span>}
                <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-2">{step.label}</p>
                <h3 className="text-sm font-bold font-display text-white mb-3">{step.title}</h3>
                <span className="text-[10px] text-primary bg-primary/[0.08] rounded-full px-3 py-1 font-medium">{step.badge}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TODAY vs TRUVY ─── */}
      <section style={{ background: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-6 py-28">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.3em] mb-3">COMPARISON</motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-4xl md:text-5xl font-bold font-display text-white">
              The Old Way vs. The TruVy Way
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 max-w-5xl mx-auto items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8"
            >
              <h3 className="text-lg font-bold font-display text-white mb-6 flex items-center gap-2">
                <X size={18} className="text-destructive" /> Today
              </h3>
              <div className="space-y-3">
                {["Visit Bank", "Fill Paper Forms", "Upload Documents", "Wait for Review", "Repeat at Every Bank"].map((step) => (
                  <motion.div key={step} variants={staggerItem}
                    className="flex items-center gap-3 p-3 rounded-lg bg-destructive/[0.06] border border-destructive/10"
                  >
                    <X size={14} className="text-destructive shrink-0" />
                    <span className="text-sm text-white/70">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="hidden md:flex flex-col items-center justify-center h-full">
              <div className="w-px flex-1 bg-white/10" />
              <span className="text-xs font-bold text-white/30 bg-white/[0.05] rounded-full px-4 py-2 tracking-wider my-3">VS</span>
              <div className="w-px flex-1 bg-white/10" />
            </div>
            <div className="flex md:hidden justify-center">
              <span className="text-xs font-bold text-white/30 bg-white/[0.05] rounded-full px-4 py-2 tracking-wider">VS</span>
            </div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="rounded-2xl border border-primary/20 bg-primary/[0.03] p-8"
            >
              <h3 className="text-lg font-bold font-display text-white mb-6 flex items-center gap-2">
                <Check size={18} className="text-primary" /> TruVy
              </h3>
              <div className="space-y-3">
                {["Verify Once", "Receive TruVy Credential", "Share with Any Bank Instantly"].map((step) => (
                  <motion.div key={step} variants={staggerItemSlow}
                    className="flex items-center gap-3 p-3 rounded-lg bg-primary/[0.06] border border-primary/10"
                  >
                    <Check size={14} className="text-primary shrink-0" />
                    <span className="text-sm text-white/70">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT US ─── */}
      <section style={{ background: "#0f0f0f" }}>
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
              <motion.div custom={0} variants={fadeUp} className="w-14 h-14 rounded-xl bg-primary/[0.1] flex items-center justify-center mx-auto mb-6">
                <Globe2 className="text-primary" size={24} />
              </motion.div>
              <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.3em] mb-3">ABOUT US</motion.p>
              <motion.h2 custom={1} variants={fadeUp} className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Why We Built TruVy</motion.h2>
              <motion.p custom={2} variants={fadeUp} className="text-base md:text-lg text-white/40 leading-relaxed">
                We are international students who experienced firsthand the frustration of re-verifying our identity every time we opened a bank account in a new country. We asked: why can't identity work like global payment network infrastructure? TruVy is our answer — verify once with a trusted issuer, and use your credential anywhere in the world.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section style={{ background: "#0a0a0a" }} className="border-t border-white/[0.06]">
        <div className="max-w-xl mx-auto px-6 py-28">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-10">
            <motion.div custom={0} variants={fadeUp} className="w-14 h-14 rounded-xl bg-primary/[0.1] flex items-center justify-center mx-auto mb-6">
              <Mail className="text-primary" size={24} />
            </motion.div>
            <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.3em] mb-3">CONTACT</motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl font-bold font-display text-white mb-2">Get In Touch</motion.h2>
            <motion.p custom={2} variants={fadeUp} className="text-white/40">Interested in partnering or learning more? Reach out to us.</motion.p>
          </motion.div>

          <motion.form initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            onSubmit={handleContactSubmit} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Full Name</label>
              <Input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Your name" required className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/20" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Email Address</label>
              <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="you@example.com" required className="bg-white/[0.05] border-white/10 text-white placeholder:text-white/20" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Message</label>
              <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Tell us how we can help..." required
                className="flex min-h-[100px] w-full rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
