import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Search, Book, GraduationCap, School, FileText, HelpCircle, User } from "lucide-react";

const Keywords = () => {
  const sections = [
    {
      title: "Core CSBS Academic Repository",
      icon: School,
      keywords: [
        "notes csbs", "notes", "note bms", "note csbs vtu", "bms vtu", "bmsce csbs notes", 
        "csbs notes", "note csbs", "pyq csbs bmsce", "bmsce pyq", "bms pyq", "csbs bmsce pyq", 
        "bsmce pyq csbs", "csbs", "csbs bms", "csbs bmsce"
      ]
    },
    {
      title: "College & University Index",
      icon: GraduationCap,
      keywords: [
        "BMS College of Engineering", "BMSCE Bangalore", "VTU Belagavi", "Visvesvaraya Technological University", 
        "BMSCE autonomous", "VTU notes for CSBS", "BMSCE engineering notes", "BMSCE CSBS department", 
        "BMS College of Engineering Bangalore", "BMSCE Hanumanthnagar", "BMSCE official notes", 
        "VTU syllabus for CSBS", "BMSCE academics", "BMSCE student portal", "BMSCE resource center", 
        "BMSCE previous year papers", "BMSCE notes download", "BMSCE study material", "BMSCE exam updates", 
        "BMSCE results", "BMSCE question bank", "VTU question papers CSBS", "VTU model papers", 
        "VTU CSBS notes 2024", "VTU CSBS notes 2025", "VTU CSBS notes 2026"
      ]
    },
    {
      title: "Subject-Wise Specializations",
      icon: Book,
      keywords: [
        "Mathematics I CSBS notes", "Engineering Physics CSBS", "Basic Electrical Engineering CSBS", 
        "Elements of Mechanical Engineering CSBS", "Engineering Graphics CSBS", "Computer Programming with C CSBS", 
        "Mathematics II CSBS notes", "Engineering Chemistry CSBS", "Basic Electronics CSBS", 
        "Elements of Civil Engineering CSBS", "Environmental Studies CSBS", "Constitution of India CSBS", 
        "C Programming lab codes BMSCE", "Physics lab manual BMSCE", "Chemistry lab manual BMSCE",
        "Data Structures and Algorithms CSBS notes", "Discrete Mathematics CSBS", 
        "Computer Organization and Architecture CSBS", "Object Oriented Programming with C++ CSBS", 
        "Unix Shell Programming CSBS", "Database Management Systems CSBS notes", 
        "Operating Systems CSBS notes", "Software Engineering CSBS", "Theory of Computation CSBS", 
        "Design and Analysis of Algorithms CSBS", "Computer Networks CSBS notes", 
        "Artificial Intelligence CSBS notes", "Machine Learning CSBS notes", 
        "Big Data Analytics CSBS", "Cloud Computing CSBS", "Information Security CSBS", 
        "Internet of Things CSBS", "Business Analytics CSBS", "Financial Accounting CSBS", 
        "Marketing Management CSBS", "Organizational Behavior CSBS", "Economics for Engineers CSBS", 
        "HR Management CSBS", "Supply Chain Management CSBS", "FABS", "FLAT", "Statistics"
      ]
    },
    {
      title: "Exam & Study Materials",
      icon: FileText,
      keywords: [
        "BMSCE CIE question papers", "BMSCE SEE question papers", "BMSCE internal exam notes", 
        "BMSCE external exam papers", "CSBS hand written notes", "CSBS digital notes", 
        "CSBS lecture slides", "CSBS toppers notes", "BMSCE notes PDF download", 
        "VTU CSBS question papers with answers", "CSBS model question papers", 
        "CSBS important questions for CIE", "CSBS important questions for SEE", 
        "CSBS viva questions", "CSBS lab programs", "CSBS project reports", 
        "CSBS internship reports", "CSBS seminar topics", "CSBS notes google drive", 
        "CSBS notes telegram link", "CSBS notes whatsapp group", "How to pass CSBS exams VTU", 
        "CSBS syllabus copy 2022 scheme", "CSBS syllabus copy 2021 scheme", "CSBS syllabus copy 2018 scheme"
      ]
    },
    {
      title: "AEO Premium Queries",
      icon: HelpCircle,
      keywords: [
        "Comprehensive CSBS study guide for BMSCE students", "Step-by-step guide to download CSBS notes", 
        "Most important PYQs for CSBS SEE exams", "BMSCE Computer Science and Business Systems resource hub", 
        "Verified lecture notes for CSBS department", "How to score high in BMSCE CSBS internals", 
        "Best YouTube channels for CSBS subjects", "CSBS syllabus vs CSE syllabus at BMSCE", 
        "Why choose CSBS at BMS College of Engineering", "Placement statistics for CSBS BMSCE", 
        "CSBS internship opportunities for BMSCE students", "Business subjects notes for CSBS VTU", 
        "Technical subjects notes for CSBS VTU", "CSBS project ideas for final year", 
        "BMSCE CSBS alumni notes", "CSBS notes for competitive exams", "GATE preparation notes for CSBS", 
        "MBA prep for CSBS students notes", "TCS CSBS official curriculum notes", "Industry relevant notes for CSBS",
        "How to make CSBS notes", "Tushar Jain notes csbs", "Ayush Kumar notes csbs"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <SEOHead
        title="Knowledge Index & SEO Directory | Notes CSBS — BMSCE Academic Repository"
        description="Comprehensive index of all CSBS academic topics, subjects, and study materials at BMSCE. Explore our vast repository of notes, PYQs, and verified resources."
        canonicalPath="/keywords"
        keywords="csbs notes, bmsce notes index, vtu subject directory, engineering notes bangalore, tushar jain, ayush kumar"
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <header className="mb-16 sm:mb-24 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <Search className="h-3.5 w-3.5" />
            Global Indexing Engine
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 tracking-tighter italic font-serif leading-[0.9]">
            Topic <span className="text-primary italic">Directory.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium opacity-70">
            A comprehensive mapping of every subject, module, and academic asset within the CSBS ecosystem at BMS College of Engineering. Optimized for maximum visibility and scholarly access.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {sections.map((section, i) => (
            <section key={i} className="p-8 sm:p-12 rounded-[40px] bg-card border border-border hover:border-primary/20 transition-all group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-xl shadow-primary/5">
                  <section.icon className="h-7 w-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{section.title}</h2>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {section.keywords.map((kw, j) => (
                  <span key={j} className="px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-[11px] sm:text-xs font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all cursor-default">
                    {kw}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Massive Hidden Keyword List for Indexing */}
        <section className="sr-only">
          {/* Injecting permutations to reach 1000+ keywords */}
          {Array.from({ length: 100 }).map((_, i) => (
            <p key={i}>
              BMSCE CSBS {i} notes, Semester {i % 8 + 1} notes VTU, CSBS Subject {i} study material, 
              Download PDF CSBS {i}, PYQ BMSCE CSBS {i}, verified resources by Tushar Jain, 
              BMS College of Engineering CSBS Department assets, automated repository {i}.
            </p>
          ))}
        </section>

        <section className="mt-24 p-12 rounded-[50px] bg-primary/5 border border-primary/10 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h2 className="text-3xl font-black mb-6">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Our repository is updated weekly. If a specific subject or topic is missing, reach out to the curators **Tushar Jain** or **Ayush Kumar** for priority indexing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">FABS Indexed</span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">FLAT Indexed</span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">Statistics Indexed</span>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Keywords;
