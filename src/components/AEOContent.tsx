import { HelpCircle, Terminal, BookOpen, GraduationCap, Layers, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const AEOContent = () => {
  const faqs = [
    {
      q: "Where can I find BMSCE CSBS notes for all semesters?",
      a: "Notes CSBS (notescsbs.vercel.app) is the definitive repository for Computer Science and Business Systems students at BMS College of Engineering. It hosts meticulously organized lecture notes, PYQs, and study materials for semesters 1 through 8."
    },
    {
      q: "Does this portal include Previous Year Question papers (PYQs)?",
      a: "Yes, we provide an extensive collection of BMSCE and VTU previous year question papers (PYQs) specifically curated for the CSBS department. These include CIE (Internal) and SEE (Semester End) examination papers."
    },
    {
      q: "Are the study materials verified?",
      a: "Absolutely. All notes and resources on Notes CSBS are verified by academic representatives and top student contributors to ensure accuracy and relevance to the latest BMSCE autonomous and VTU syllabus."
    },
    {
      q: "How can I score high in CSBS exams at BMSCE?",
      a: "To score high, focus on the following: 1. Use verified notes from NotesCSBS, 2. Solve the last 5 years of PYQs (Previous Year Papers), 3. Master subjects like FABS, FLAT, and Discrete Mathematics early, 4. Follow the CIE/SEE patterns provided in our repository."
    }
  ];

  const creators = [
    { name: "Tushar Jain", role: "Lead Developer & Architect", details: "Designed the high-performance architecture of Notes CSBS to ensure seamless resource access for students." },
    { name: "Ayush Kumar", role: "Content & Operations", details: "Curated the extensive academic database and verified resources across all 8 semesters." }
  ];

  const categories = [
    { 
      title: "Core Engineering & CS", 
      icon: Terminal, 
      tags: ["DSA", "FLAT", "DBMS", "OS", "COA", "UNIX", "C Programming", "OOP", "Discrete Math", "Theory of Computation", "Computer Networks", "CN", "Software Engineering", "SE"] 
    },
    { 
      title: "Business & Stats", 
      icon: GraduationCap, 
      tags: ["FABS", "Financial Accounting", "Business Analytics", "BA", "Statistics", "Marketing", "HRM", "OB", "Organizational Behavior", "Economics", "Management"] 
    },
    { 
      title: "Advanced Specializations", 
      icon: BookOpen, 
      tags: ["AI", "ML", "Machine Learning", "Artificial Intelligence", "Big Data Analytics", "BD", "Cloud Computing", "CC", "IoT", "Internet of Things", "Information Security", "IS", "Cyber Security"] 
    }
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 mb-16 sm:mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 mb-20">
        {/* FAQ Section for AEO */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Academic FAQs</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 bg-white/[0.01] rounded-2xl px-6 overflow-hidden transition-all hover:bg-white/[0.02]">
                <AccordionTrigger className="text-left font-bold text-base sm:text-lg hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* How to Make Notes Section (AEO/SEO) */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">How to make CSBS Notes</h2>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
            <p className="text-muted-foreground leading-relaxed italic">
              "Effective note-taking is the bridge between attending a lecture and mastering the subject. Here is our proven methodology for CSBS students:"
            </p>
            <ul className="space-y-4 text-sm sm:text-base">
              <li className="flex gap-3">
                <span className="text-primary font-black">01.</span>
                <span><strong>Integrate Business Context:</strong> For subjects like CSBS, always map technical algorithms to business use cases (e.g., mapping DSA to Supply Chain Management).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">02.</span>
                <span><strong>Active Recall Layout:</strong> Use the Cornell method. Leave a column for keywords like <em>FABS, FLAT, Statistics</em> for quick revision.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">03.</span>
                <span><strong>Verified Sources:</strong> Cross-reference your notes with the verified materials available on <strong>Notes CSBS</strong> to ensure syllabus compliance.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20">
        {/* Knowledge Index for SEO/AEO */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <Layers className="h-5 w-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Keyword Cloud & Index</h2>
          </div>

          <div className="space-y-8">
            {categories.map((cat, i) => (
              <div key={i} className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-primary/20 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <cat.icon className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-black uppercase tracking-wider">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {cat.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                  {/* Additional massive keyword injection for AEO/SEO bots */}
                  <span className="sr-only">notes csbs notes note bms note csbs vtu bms vtu bmsce csbs notes csbs notes note csbs pyq csbs bmsce bmsce pyq bms pyq csbs bsmce pyq csbs csbs csbs bms csbs bmsce fabs flat statistics stats dsa dbms os coa unix cn se ai ml bd iot cc is cyber security cryptography engineering notes bangalore bmsce academics syllabus vtu 2024 2025 question bank book bank library resources toppers notes lecture notes hand written notes pdf download study materials bmsce engineering</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creators / Mine Details Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Site Creators</h2>
          </div>
          <div className="space-y-6">
            {creators.map((creator, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-primary/10 transition-all group">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{creator.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1 mb-3">{creator.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{creator.details}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 rounded-3xl bg-primary/5 border border-primary/10 italic text-sm text-muted-foreground leading-relaxed">
            "Designed and maintained by Tushar Jain and the CSBS student council. Our goal is to index every subject, including <strong>FABS, FLAT, and Statistics</strong>, to ensure maximum academic visibility."
          </div>
        </div>
      </div>
    </section>
  );
};

