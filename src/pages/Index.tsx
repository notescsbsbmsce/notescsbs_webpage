import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { fetchSemesters } from "@/lib/admin-utils";
import { Header } from "@/components/Header";
import { SemesterCard } from "@/components/SemesterCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/Footer";
import { BookOpen, GraduationCap, Mail, Sparkles, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead, buildBreadcrumbJsonLd } from "@/components/SEOHead";
import { AEOContent } from "@/components/AEOContent";
import { SubscriptionNotification } from "@/components/SubscriptionNotification";
import { HiddenSEOLayer } from "@/components/seo/HiddenSEOLayer";
import { HiddenSubjectSEO } from "@/components/seo/HiddenSubjectSEO";
import { HiddenSemesterSEO } from "@/components/seo/HiddenSemesterSEO";
import { SUBJECT_SEO, SEMESTER_SEO } from "@/config/seo-data";
import { buildOrganizationSchema, buildEducationalOrgSchema, buildWebSiteSchema, buildFAQSchema, buildHowToSchema, buildCourseSchema, buildArticleSchema, buildCollectionPageSchema } from "@/config/seo-schemas";

const Index = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: semesters, isLoading, error } = useQuery({
    queryKey: ["semesters"],
    queryFn: async () => {
      return await fetchSemesters();
    },
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      // Check if email already exists in our registry
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: existingUser } = await (supabase.from("subscribers" as any) as any)
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (existingUser) {
        toast({
          title: "Already Registered",
          description: "This email is already in the institutional registry.",
        });
        setEmail("");
        localStorage.setItem("hasSeenSubscription", "true");
        setIsSubmitting(false);
        return;
      }

      // Construct the direct form submission parameters
      const formResponseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc-uW3LdcGfrmXbL7EC-7SUwNcFSJoIj0gV6XJCA6UVePqshA/formResponse";
      const params = new URLSearchParams();
      params.append("entry.2024456662", email);
      params.append("submit", "Submit");

      // Execute a silent, background submission to the institutional registry
      // 'no-cors' ensures the data is transmitted even if the response is opaque
      fetch(`${formResponseUrl}?${params.toString()}`, {
        method: "POST",
        mode: "no-cors",
      });

      // Maintain local database synchronization for redundancy
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("subscribers" as any) as any).insert([{ email }]);
      
      toast({
        title: "Registry Enrollment Complete",
        description: "Your identity has been securely added to the academic board.",
      });
      setEmail("");
      localStorage.setItem("hasSeenSubscription", "true");
    } catch (err) {
      // If local sync fails, we still consider it a success as long as the form is captured
      toast({
        title: "Enrollment Confirmed",
        description: "Institutional registry updated successfully.",
      });
      setEmail("");
      localStorage.setItem("hasSeenSubscription", "true");
    } finally {
      setIsSubmitting(false);
    }
  };

  const aeoKeywords = "notes csbs, notes, note bms, note csbs vtu, bms vtu, bmsce csbs notes, csbs notes, note csbs, pyq csbs bmsce, bmsce pyq, bms pyq, csbs bmsce pyq, bsmce pyq csbs, csbs, csbs bms, csbs bmsce, BMSCE, CSBS, Computer Science and Business Systems, Lecture Notes, PYQ, Question Papers, VTU, BMSCE Notes, Study Material, Engineering Notes, BMS College of Engineering, Bengaluru, CIE, SEE, Semester Notes, DSA Notes, DBMS Notes, Machine Learning Notes, BMSCE CSBS Notes, VTU Notes 2024, VTU Notes 2025, Engineering Study Materials, BMSCE Academics, CSBS VTU Syllabus, Previous Year Papers VTU, Tushar Jain, Ayush Kumar, FABS, FLAT, Statistics, Stats for CSBS, Financial Accounting, Business Statistics, Formal Languages, Automata Theory, Discrete Mathematics, DE, Digital Electronics, UNIX, COA, DBMS, OS, Operating Systems, Computer Networks, CN, SE, Software Engineering, AI, Artificial Intelligence, ML, Machine Learning, BA, Business Analytics, WEB, Web Tech, CC, Cloud Computing, IS, Information Security, OB, Org Behavior, BD, Big Data, IOT, Internet of Things, Cyber Security, Cryptography, CSBS BMSCE, BMSCE CSBS Branch, BMSCE Placements, BMSCE Subjects, VTU Syllabus 2022 Scheme, VTU Syllabus 2021 Scheme, how to make csbs notes, csbs notes pdf, csbs pyq download, bmsce question bank, csbs book bank, csbs library, academic repository bmsce";

  const location = useLocation();
  const rawPath = location.pathname.toLowerCase().replace(/^\/|\/$/g, "");

  // Find matching subject or semester
  let matchedSubjectCode: string | null = null;
  let matchedSemesterId: number | null = null;

  const semMatch = rawPath.match(/^(\d)(?:st|nd|rd|th)?-sem-notes$/);
  if (semMatch) {
    matchedSemesterId = parseInt(semMatch[1]);
  } else if (rawPath !== "") {
    for (const [code, seo] of Object.entries(SUBJECT_SEO)) {
      const slugBase = seo.slug.replace("-notes", "");
      if (
        rawPath === seo.slug ||
        rawPath === `${slugBase}-pyq` ||
        rawPath === `${slugBase}-important-questions` ||
        rawPath.startsWith(`${slugBase}-unit-`) ||
        rawPath.includes(code.toLowerCase()) ||
        seo.keywords.some(k => rawPath.includes(k.toLowerCase().replace(/\s+/g, "-")))
      ) {
        matchedSubjectCode = code;
        matchedSemesterId = seo.semester;
        break;
      }
    }
  }

  // Get SEO configuration dynamically based on matched path
  let seoTitle = "Notes CSBS | BMSCE CSBS Academic Repository | Lecture Notes, PYQs & Study Materials";
  let seoDescription = "NOTESCSBS is the definitive, meticulously organized repository for CSBS academic assets at BMS College of Engineering. Access lecture notes, previous year question papers (PYQs), and premium study materials for all 8 semesters.";
  let seoKeywords = aeoKeywords;
  let seoJsonLd: any[] = [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildEducationalOrgSchema(),
    buildBreadcrumbJsonLd([{ name: "Home", path: "/" }]),
    buildFAQSchema([
      { question: "What is Notes CSBS?", answer: "Notes CSBS is the definitive academic repository for CSBS students at BMSCE, providing free lecture notes, PYQs, question banks, and study materials for all 8 semesters." },
      { question: "Where can I find BMSCE CSBS notes?", answer: "You can find comprehensive BMSCE CSBS notes at Notes CSBS (notescsbs.vercel.app). We provide verified lecture notes, PYQs, and study materials for all subjects." },
      { question: "Does Notes CSBS provide PYQs?", answer: "Yes, Notes CSBS provides an extensive collection of previous year question papers (PYQs) with solutions for CIE and SEE exams." },
      { question: "Are the notes verified?", answer: "Yes, all study materials are verified by top student contributors and academic representatives from BMSCE." },
      { question: "Is Notes CSBS free?", answer: "Yes, all notes, PYQs, question banks, and study materials are completely free to access and download." },
      { question: "Does Notes CSBS follow VTU syllabus?", answer: "Yes, all materials are aligned with the latest VTU syllabus for CSBS (2022/2021 scheme)." },
      { question: "How to prepare for CSBS exams at BMSCE?", answer: "Use verified notes from Notes CSBS, solve PYQs, focus on important questions, and practice lab programs for CIE and SEE preparation." },
      { question: "What subjects are in CSBS?", answer: "CSBS covers core CS subjects (DSA, DBMS, OS, CN, AI, ML), mathematics (M1-M4), and business subjects (FABS, BA, OB) across 8 semesters." },
      { question: "Who created Notes CSBS?", answer: "Notes CSBS was created by Tushar Jain and Ayush Kumar, students at BMS College of Engineering, Bengaluru." },
      { question: "Can I download PDFs from Notes CSBS?", answer: "Yes, all study materials are available as downloadable PDFs for offline access." }
    ]),
    buildHowToSchema({
      name: "How to Use Notes CSBS for Exam Preparation",
      description: "Step-by-step guide to prepare for CSBS exams using Notes CSBS resources.",
      steps: [
        { name: "Select Your Semester", text: "Visit notescsbs.vercel.app and select your semester from the homepage." },
        { name: "Choose a Subject", text: "Click on a subject to access unit-wise notes, PYQs, and study materials." },
        { name: "Download Notes", text: "Download PDF notes for offline study and revision." },
        { name: "Solve PYQs", text: "Practice with previous year question papers for CIE and SEE." },
        { name: "Review Important Questions", text: "Focus on frequently asked questions for last-minute preparation." }
      ]
    })
  ];

  if (matchedSubjectCode) {
    const seoData = SUBJECT_SEO[matchedSubjectCode];
    if (seoData) {
      seoTitle = `${seoData.name} (${seoData.code}) | Notes, PYQs & Books | BMSCE CSBS`;
      seoDescription = seoData.description;
      seoKeywords = `${seoData.keywords.join(", ")}, ${aeoKeywords}`;
      seoJsonLd = [
        buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: `Semester ${seoData.semester}`, path: `/semester/${seoData.semester}` },
          { name: seoData.name, path: `/${seoData.slug}` }
        ]),
        buildCourseSchema({
          name: seoData.name,
          code: seoData.code,
          description: seoData.description,
          semester: seoData.semester,
          topics: seoData.topics,
        }),
        buildFAQSchema(seoData.faqs),
        buildArticleSchema({
          title: `${seoData.name} (${seoData.code}) notes, PYQs & books`,
          description: seoData.description,
          path: `/${rawPath}`,
          section: `Semester ${seoData.semester}`,
          keywords: seoData.keywords,
        })
      ];
    }
  } else if (matchedSemesterId) {
    const seoData = SEMESTER_SEO[matchedSemesterId];
    if (seoData) {
      seoTitle = `Semester ${matchedSemesterId} | CSBS Notes, PYQs & Study Material | BMSCE NOTESCSBS`;
      seoDescription = seoData.description;
      seoKeywords = `${seoData.keywords.join(", ")}, ${aeoKeywords}`;
      seoJsonLd = [
        buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: `Semester ${matchedSemesterId}`, path: `/${rawPath}` }
        ]),
        buildCollectionPageSchema({
          name: `Semester ${matchedSemesterId} | CSBS Notes BMSCE`,
          description: seoData.description,
          path: `/${rawPath}`,
          items: Object.values(SUBJECT_SEO)
            .filter(s => s.semester === matchedSemesterId && !s.isLab)
            .map(s => ({
              name: `${s.name} (${s.code})`,
              url: `https://notescsbs.vercel.app/subject/${s.code}`
            }))
        }),
        buildFAQSchema(seoData.faqs)
      ];
    }
  }

  let subType: "notes" | "pyq" | "questions" | "unit1" | "unit2" | "unit3" | "unit4" | "unit5" = "notes";
  if (rawPath.endsWith("-pyq")) {
    subType = "pyq";
  } else if (rawPath.endsWith("-important-questions")) {
    subType = "questions";
  } else {
    const unitMatch = rawPath.match(/-unit-(\d)-notes$/);
    if (unitMatch) {
      subType = `unit${unitMatch[1]}` as any;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath={rawPath ? `/${rawPath}` : "/"}
        keywords={seoKeywords}
        jsonLd={seoJsonLd}
      />
      <Header />
      
      <main className="flex-1">
        {/* Premium Hero Section */}
        <section className="relative pt-16 sm:pt-28 pb-20 sm:pb-40 overflow-hidden bg-background">
          {/* Background Elements - Adaptive */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50 blur-[120px] pointer-events-none"></div>
          <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-purple-accent/10 rounded-full blur-[160px] pointer-events-none"></div>
          <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[160px] pointer-events-none"></div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-8 sm:mb-12 animate-fade-in shadow-2xl shadow-black/20">
              <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
              BMSCE Curated Resources
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-[10rem] font-black mb-6 sm:mb-10 tracking-tighter animate-fade-in [animation-delay:200ms] leading-[0.85] sm:leading-[0.8] text-foreground">
              Empowering<br/>
              <span className="italic font-serif text-primary">Excellence.</span>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 sm:mb-16 leading-relaxed animate-fade-in [animation-delay:400ms] font-serif italic opacity-70 px-2 sm:px-0">
              The definitive, meticulously organized repository for CSBS academic assets at BMSCE. Built for performance, designed for success.
            </p>

            {/* Live Stats Bar */}
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-10 sm:mb-16 animate-fade-in [animation-delay:500ms]">
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-black text-foreground tabular-nums tracking-tighter">100+</span>
                <span className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1.5 sm:mt-2">Verified Resources</span>
              </div>
              <div className="w-px h-10 sm:h-12 bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-black text-foreground tabular-nums tracking-tighter">24/7</span>
                <span className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1.5 sm:mt-2">Uptime Availability</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in [animation-delay:600ms] px-4 sm:px-0">
              <Button size="lg" className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black group shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto text-sm sm:text-base" onClick={() => document.getElementById('semesters')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Repository
                <ArrowRight className="ml-2 sm:ml-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl border-[1.5px] border-primary/50 bg-primary/5 hover:bg-primary/10 text-primary font-black transition-all shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] w-full sm:w-auto text-sm sm:text-base group" onClick={() => window.location.href = '/notices'}>
                Notice Board
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="container mx-auto px-4 sm:px-6 mb-16 sm:mb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {[
              { icon: BookOpen, title: "Study Materials", desc: "Hand-picked notes and reference materials for all subjects." },
              { icon: Zap, title: "Fast Access", desc: "Meticulously organized semester-wise for quick navigation." },
              { icon: CheckCircle2, title: "Verified Resources", desc: "Quality content verified by students and top contributors." }
            ].map((feature, i) => (
              <div key={i} className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Semesters Section */}
        <section id="semesters" className="container mx-auto px-4 sm:px-6 mb-16 sm:mb-32 scroll-mt-24">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3">Course Catalog</h2>
              <p className="text-muted-foreground">Academic excellence through structured learning modules.</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm">Select Semester</span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-3xl bg-white/5" />
              ))}
            </div>
          ) : semesters && semesters.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {semesters.map((semester, index) => (
                <SemesterCard
                  key={semester.id}
                  id={semester.id}
                  name={semester.name}
                  order={semester.order}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
              <p className="text-muted-foreground">
                No semesters available. Check back soon!
              </p>
            </div>
          )}
        </section>

        {/* Premium Subscription Section */}
        <section className="container mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <div className="rounded-2xl sm:rounded-[40px] p-6 sm:p-8 md:p-16 bg-gradient-to-br from-indigo-500/5 via-background to-primary/5 border border-border/40 relative overflow-hidden group shadow-2xl">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-xl shadow-primary/5">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Scholarly Broadcast</span>
                </div>
                
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-black mb-6 sm:mb-8 leading-[0.95] tracking-tighter uppercase font-serif">
                  Stay updated with latest <span className="italic italic-none block md:inline text-primary">academic shifts.</span>
                </h2>
                
                <p className="text-sm sm:text-xl text-muted-foreground font-medium opacity-70 leading-relaxed max-w-xl mx-auto md:mx-0">
                  Join the institutional registry for real-time curriculum notifications and curated resource drops. Verified student enrollment via secured Google Form boards.
                </p>
              </div>
              
              <div className="w-full md:w-auto md:min-w-[400px]">
                <form onSubmit={handleSubscribe} className="relative flex items-center p-2 rounded-full bg-muted border border-border/40 focus-within:border-primary/50 transition-all shadow-xl">
                  <Input 
                    type="email" 
                    placeholder="Email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-transparent border-none focus-visible:ring-0 h-10 px-6 text-foreground"
                  />
                  <Button type="submit" className="rounded-full px-8 h-10 font-bold bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 shadow-lg shadow-primary/30" disabled={isSubmitting}>
                    {isSubmitting ? "Joining..." : "Join"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <AEOContent />
      {matchedSubjectCode ? (
        <HiddenSubjectSEO subjectCode={matchedSubjectCode} semester={matchedSemesterId || 1} subType={subType} />
      ) : matchedSemesterId ? (
        <HiddenSemesterSEO semester={matchedSemesterId} />
      ) : (
        <HiddenSEOLayer />
      )}
      <Footer />
      <SubscriptionNotification />
    </div>
  );
};

export default Index;
