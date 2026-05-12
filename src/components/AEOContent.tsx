import { HelpCircle, Terminal, BookOpen, GraduationCap, Layers } from "lucide-react";
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

      <div className="sr-only" aria-label="SEO and AEO Context">
        Notes CSBS offers comprehensive study materials, previous year question papers (PYQs), and lecture notes for Core Engineering & CS subjects like DSA, FLAT, DBMS, OS, COA, UNIX, C Programming, OOP, Discrete Math, Theory of Computation, Computer Networks (CN), and Software Engineering (SE). We also cover Business & Stats topics including FABS, Financial Accounting, Business Analytics (BA), Statistics, Marketing, HRM, Organizational Behavior (OB), Economics, and Management. For advanced learners, we provide resources on AI, Machine Learning, Big Data Analytics (BD), Cloud Computing (CC), IoT, Information Security (IS), Cryptography, and Cyber Security. Our verified academic repository caters to BMSCE students following the VTU syllabus (2024-2025), offering top-tier lecture notes, question banks, and library resources for all semesters in Bangalore.
      </div>

    </section>
  );
};

