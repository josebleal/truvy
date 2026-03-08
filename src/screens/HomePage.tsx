import { useTruvy } from "@/context/TruvyContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, DollarSign, ShieldCheck, Globe, Zap, Lock, Building2, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

import digitalPassport from "@/assets/digital-passport.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.1, ease: "easeOut" as const },
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

const stats = [
  { value: "~40.5%", desc: "of onboarding involves manual identity verification", icon: Clock },
  { value: "11 min", desc: "average time per digital onboarding per person", icon: Users },
  { value: "70%", desc: "of banks lose potential clients to slow KYC processes", icon: DollarSign },
  { value: "$22M", desc: "spent annually on KYC reviews per institution", icon: ShieldCheck },
];

const HomePage = () => {
  const { setCurrentScreen } = useTruvy();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-24 md:pt-36 md:pb-36 relative z-10">
          <div className="max-w-3xl">
              <motion.div
                initial="hidden"
                animate="visible"
                custom={0}
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/[0.06] text-primary text-xs font-medium mb-8 tracking-wide"
              >
                <Lock size={11} />
                Portable Digital Identity for Global Finance
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="visible"
                custom={1}
                variants={fadeUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-foreground mb-6 leading-[1.05] tracking-tight"
              >
                Verify Once.{" "}
                <span className="gradient-text">Use Anywhere.</span>
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="visible"
                custom={2}
                variants={fadeUp}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
              >
                Get verified once with a trusted issuer and share your credentials 
                with any bank in the world, without ever transmitting raw documents.
              </motion.p>

              <motion.div
                initial="hidden"
                animate="visible"
                custom={3}
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  size="lg"
                  onClick={() => setCurrentScreen(1)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-sm font-semibold h-12 rounded-lg"
                >
                  Try the Demo <ArrowRight size={15} className="ml-2" />
                </Button>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
              Who We Serve
            </motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-4xl font-bold font-display text-foreground">
              Built for the Financial Ecosystem
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={0}
              variants={fadeUp}
              className="card-surface rounded-xl p-8 group hover:border-primary/20 transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/[0.08] flex items-center justify-center mb-5">
                <Building2 className="text-primary" size={20} />
              </div>
              <h3 className="text-xl font-bold font-display text-foreground mb-3">Banks &amp; Financial Institutions</h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Reduce onboarding time from 11 minutes to seconds. Accept pre-verified credentials 
                from any TruVy issuer and eliminate redundant KYC checks. Stop losing customers to 
                slow verification processes.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] text-primary/80 bg-primary/[0.06] rounded-full px-3 py-1 font-medium">Faster Onboarding</span>
                <span className="text-[11px] text-primary/80 bg-primary/[0.06] rounded-full px-3 py-1 font-medium">Lower KYC Costs</span>
                <span className="text-[11px] text-primary/80 bg-primary/[0.06] rounded-full px-3 py-1 font-medium">Higher Conversion</span>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={1}
              variants={fadeUp}
              className="card-surface rounded-xl p-8 group hover:border-primary/20 transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/[0.08] flex items-center justify-center mb-5">
                <BadgeCheck className="text-primary" size={20} />
              </div>
              <h3 className="text-xl font-bold font-display text-foreground mb-3">Identity Issuers (like Jumio)</h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Become a trusted credential issuer on the TruVy network. Sign portable 
                credentials that any bank worldwide can verify instantly. Expand your reach 
                beyond one-time verification into a recurring trust network.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] text-primary/80 bg-primary/[0.06] rounded-full px-3 py-1 font-medium">Issue Credentials</span>
                <span className="text-[11px] text-primary/80 bg-primary/[0.06] rounded-full px-3 py-1 font-medium">Network Revenue</span>
                <span className="text-[11px] text-primary/80 bg-primary/[0.06] rounded-full px-3 py-1 font-medium">Global Reach</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
            The Problem
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-4xl font-bold font-display text-foreground">
            Identity Verification is Broken
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.value}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={scaleIn}
                className="card-surface rounded-xl p-6 text-center group hover:border-primary/20 transition-colors duration-300"
              >
                <Icon className="text-primary mx-auto mb-3 opacity-50 group-hover:opacity-80 transition-opacity" size={18} />
                <p className="text-3xl md:text-4xl font-bold font-display text-foreground mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeIn}
          className="text-center text-[10px] text-muted-foreground/60 mt-8"
        >
          Sources: Fenergo, PwC, Juniper Research
        </motion.p>
      </section>

      {/* Our Story */}
      <section className="border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
                Our Story
              </motion.p>
              <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-4xl font-bold font-display text-foreground mb-8">
                Why We Built TruVy
              </motion.h2>
              <motion.div custom={2} variants={fadeUp} className="space-y-5 text-muted-foreground text-base md:text-lg leading-[1.8]">
                <p>
                  As international students, we experienced firsthand the frustrating reality of opening 
                  a bank account in a new country. Every time we moved for school, work, or life, we repeated 
                  the same exhausting identity verification process from scratch.
                </p>
                <p>
                  On the bank side, we discovered that{" "}
                  <span className="text-foreground font-medium">70% of financial institutions lose 
                  potential customers</span> due to slow KYC onboarding. Banks spend{" "}
                  <span className="text-foreground font-medium">$22M per year</span> on identity 
                  verification, and the process still takes{" "}
                  <span className="text-foreground font-medium">11 minutes per person</span> on average.
                </p>
                <p className="text-foreground/90">
                  We asked ourselves: <span className="text-primary italic">why can't identity 
                  work like a Visa card?</span> You verify once with a trusted issuer, and every bank 
                  in the world accepts it, without ever seeing your raw documents.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
            How It Works
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-4xl font-bold font-display text-foreground">
            Three Steps. Zero Documents Transmitted.
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Verify Once",
              desc: "Upload your ID to a trusted issuer like Jumio or Legitimuz. They verify your identity using biometrics, sanctions screening, and age checks.",
              icon: ShieldCheck,
            },
            {
              step: "02",
              title: "Get Your Credential",
              desc: "Receive a cryptographically signed TruVy Passport, a portable credential that proves who you are without exposing your documents.",
              icon: Zap,
            },
            {
              step: "03",
              title: "Share Everywhere",
              desc: "Any bank can verify your credential instantly using RSA-2048 cryptography. They get the answers they need and never the raw data.",
              icon: Globe,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="card-surface rounded-xl p-8 group hover:border-primary/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-black font-display text-muted/80 group-hover:text-primary/30 transition-colors">{item.step}</span>
                  <div className="w-9 h-9 rounded-lg bg-primary/[0.08] flex items-center justify-center group-hover:bg-primary/[0.12] transition-colors">
                    <Icon className="text-primary" size={18} />
                  </div>
                </div>
                <h3 className="text-lg font-bold font-display text-foreground mb-3">{item.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Digital Passport */}
      <section className="border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={0}
              variants={scaleIn}
              className="order-2 lg:order-1"
            >
              <img
                src={digitalPassport}
                alt="TruVy Digital Passport"
                className="w-full rounded-2xl"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="order-1 lg:order-2"
            >
              <motion.p custom={0} variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
                The Product
              </motion.p>
              <motion.h2 custom={1} variants={fadeUp} className="text-3xl md:text-4xl font-bold font-display text-foreground mb-6">
                Your Digital Identity,{" "}
                <span className="gradient-text">Always With You</span>
              </motion.h2>
              <motion.div custom={2} variants={fadeUp} className="space-y-4 text-base md:text-lg text-muted-foreground leading-[1.8]">
                <p>
                  The TruVy Passport is a cryptographically signed credential that lives in your digital wallet. 
                  It contains verified claims about your identity, but never your raw documents.
                </p>
                <p>
                  Banks receive only what they need: your name, country, sanctions status, and age verification. 
                  They can mathematically prove these claims are authentic using RSA-2048 cryptography, 
                  without ever accessing your passport, license, or personal records.
                </p>
              </motion.div>
              <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-2 mt-8">
                {["RSA-2048", "W3C VC", "FATF Compliant", "NIST IAL2", "eIDAS 2.0"].map((tag) => (
                  <span key={tag} className="text-[11px] text-muted-foreground/70 border border-border/50 rounded-full px-3 py-1 font-medium">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
          variants={scaleIn}
          className="card-surface rounded-2xl p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-primary/[0.02]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              See It In Action
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-lg leading-relaxed">
              Walk through the full TruVy flow: scan an ID and issue a reusable digital credential.
            </p>
            <Button
              size="lg"
              onClick={() => setCurrentScreen(1)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 text-sm font-semibold h-11 rounded-lg"
            >
              Start the Demo <ArrowRight size={15} className="ml-2" />
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
