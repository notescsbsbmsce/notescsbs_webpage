import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Scale, Mail, Info, Section, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SEOHead, buildBreadcrumbJsonLd } from "@/components/SEOHead";

export default function Privacy() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <SEOHead
        title="Privacy Policy — NOTESCSBS | BMSCE CSBS Academic Repository"
        description="Read the NOTESCSBS privacy policy. Learn how we handle data, protect student privacy, and comply with Indian IT regulations at BMS College of Engineering."
        canonicalPath="/privacy"
        jsonLd={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" }
        ])}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20 max-w-4xl animate-fade-in">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 sm:mb-16">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl h-10 px-4 group bg-muted/20 border-border hover:bg-primary/10 transition-all font-bold gap-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>

          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-black uppercase tracking-[0.2em] text-primary shadow-sm">
            Legal & Compliance
          </div>
        </div>

        <header className="mb-12 sm:mb-16 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 tracking-tighter leading-none italic font-serif text-foreground">
            Privacy <span className="text-primary not-italic font-sans">Policy</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            At <span className="font-bold text-foreground">NOTESCSBS</span>, we operate with a commitment to academic integrity and data sovereignty. This document outlines our data processing standards in compliance with modern digital guidelines and the Information Technology Act, 2000 (India).
          </p>
        </header>

        <div className="space-y-8 sm:space-y-16">
          {/* Section 1: Data Collection */}
          <section className="relative p-6 sm:p-10 rounded-3xl md:rounded-[40px] bg-card border border-border overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative z-10">
              <div className="p-4 rounded-3xl bg-primary/10 text-primary shrink-0">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span className="text-primary opacity-20 font-serif italic text-3xl">01</span>
                  Data Collection & Sovereignty
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                  <p>
                    Our platform is designed on the principle of <span className="text-foreground italic">Minimal Data Footprint</span>. We do not engage in unauthorized tracking or harvest PII (Personally Identifiable Information) without explicit consent.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span className="text-foreground font-bold">Email Addresses:</span> Collected solely for curriculum updates and academic newsletters via our voluntary subscription model.</li>
                    <li><span className="text-foreground font-bold">Session Analytics:</span> Use of non-invasive cookies to optimize academic resource delivery and site performance.</li>
                    <li><span className="text-foreground font-bold">Academic Resources:</span> All uploaded content is intended for educational purposes under the Fair Use doctrine.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 text-primary/5 pointer-events-none">
              <Scale className="h-48 w-48 rotate-12" />
            </div>
          </section>

          {/* Section 2: Institutional Disclaimer */}
          <section className="p-6 sm:p-10 rounded-3xl md:rounded-[40px] border border-dashed border-border/50 bg-muted/20">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <Info className="h-6 w-6 text-primary" />
              Institutional Disclaimer
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
              "NOTESCSBS is an independent digital academic repository developed for the student community of BMS College of Engineering (BMSCE). We are not an official administrative wing of the institution. All materials provided are curated by students, for students, to foster collaborative learning. Any institutional intellectual property is handled with strictly educational intent."
            </p>
          </section>

          {/* Section 3: Legal Recourse */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <div className="p-6 sm:p-10 rounded-3xl md:rounded-[40px] bg-card border border-border">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Legal Recourse
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Any discrepancies or grievances regarding the content or data management can be addressed under the jurisdiction of Bengaluru, Karnataka. We strictly adhere to the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
              </p>
            </div>
            <div className="p-6 sm:p-10 rounded-3xl md:rounded-[40px] bg-primary text-primary-foreground shadow-2xl shadow-primary/20">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Counsel
              </h3>
              <p className="text-xs opacity-90 leading-relaxed mb-6">
                For copyright concerns, data removal requests (Right to be Forgotten), or general legal feedback, please contact our administrative desk:
              </p>
              <a 
                href="mailto:notescsbsbmsce@gmail.com" 
                className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-[11px] bg-background text-foreground px-6 py-3 rounded-2xl hover:scale-105 transition-transform"
              >
                notescsbsbmsce@gmail.com
              </a>
            </div>
          </section>
        </div>

        <footer className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
          <p className="text-[10px] font-bold uppercase tracking-widest">Effective Date: April 02, 2026</p>
          <div className="flex gap-4">
            <Section className="h-4 w-4" />
            <Section className="h-4 w-4" />
            <Section className="h-4 w-4" />
          </div>
        </footer>
      </main>

      <Footer />
    </div>
  );
}
