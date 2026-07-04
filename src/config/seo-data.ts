/**
 * SEO Data Layer - The single source of truth for all hidden SEO content.
 * Contains keyword clusters, subject metadata, FAQs, important questions,
 * unit breakdowns, and semantic content generators.
 * 
 * This data is used by hidden SEO components to generate crawler-visible
 * content that is invisible to users (sr-only).
 */

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export interface SubjectSEO {
  code: string;
  name: string;
  slug: string;
  semester: number;
  fullName: string;
  abbreviation: string;
  description: string;
  isLab: boolean;
  units: UnitSEO[];
  keywords: string[];
  topics: string[];
  faqs: FAQ[];
  importantQuestions: string[];
  pyqTopics: string[];
  relatedSubjects: string[];
  longTailKeywords: string[];
}

export interface UnitSEO {
  number: number;
  title: string;
  topics: string[];
  keywords: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SemesterSEO {
  number: number;
  description: string;
  keywords: string[];
  longTailKeywords: string[];
  faqs: FAQ[];
}

// ─────────────────────────────────────────────
// GLOBAL KEYWORD CLUSTERS
// ─────────────────────────────────────────────

export const COLLEGE_KEYWORDS = [
  "BMSCE", "BMS College of Engineering", "BMS College Bangalore", "BMS Bangalore",
  "BMSCE CSBS", "BMSCE Notes", "BMSCE Study Material", "BMSCE Question Bank",
  "BMSCE PYQ", "BMSCE PDFs", "BMSCE Semester Notes", "BMSCE Handwritten Notes",
  "BMSCE Topper Notes", "BMSCE CIE Papers", "BMSCE SEE Papers",
  "BMS College of Engineering Bangalore", "BMSCE Hanumanthnagar",
  "BMSCE academic repository", "BMSCE digital library", "BMSCE resources",
  "BMSCE engineering notes", "BMSCE exam preparation", "BMSCE placement notes",
  // New: Protocol / expanded college combos
  "protocol BMSCE notes", "protocol BMSCE", "notes protocol BMSCE",
  "BMSCE best notes", "BMSCE notes website", "BMSCE notes app",
  "BMSCE notes online", "BMSCE free notes", "BMSCE notes 2024",
  "BMSCE notes 2025", "BMSCE notes 2026", "BMSCE notes download free",
  "BMS college notes download", "BMS engineering notes", "BMS notes PDF",
  "BMS college Bangalore notes", "BMS college study material",
  "BMS college question papers", "BMS college PYQ", "BMS college exam papers",
  "BMSCE CSE notes", "BMSCE ISE notes", "BMSCE ECE notes", "BMSCE EEE notes",
  "BMSCE ME notes", "BMSCE CV notes", "BMSCE AI ML notes",
  "BMSCE first year notes", "BMSCE second year notes",
  "BMSCE third year notes", "BMSCE fourth year notes",
  "best notes for BMSCE", "best notes website for BMSCE",
  "best study material BMSCE", "best PYQ collection BMSCE",
  "BMSCE autonomous notes", "BMSCE CBCS notes", "BMSCE OBE notes"
];

export const BRANCH_KEYWORDS = [
  "CSBS", "Computer Science and Business Systems", "CSBS Notes", "CSBS Study Material",
  "CSBS Question Bank", "CSBS PYQ", "CSBS PDFs", "CSBS Handwritten Notes",
  "CSBS Resources", "CSBS Important Questions", "CSBS BMSCE", "CSBS VTU",
  "CSBS syllabus", "CSBS curriculum", "CSBS exam pattern", "CSBS placement",
  "CSBS branch", "CSBS engineering", "CSBS department", "CSBS academic assets",
  "Computer Science Business Systems notes", "CSBS free notes", "CSBS topper notes",
  // New: Cross-branch discovery
  "CSE notes", "ISE notes", "ECE notes", "EEE notes", "ME notes", "CV notes",
  "AIML notes", "CS notes", "IT notes", "engineering notes",
  "CSBS vs CSE", "CSBS vs ISE", "CSBS placements", "CSBS salary",
  "CSBS scope", "CSBS jobs", "CSBS career", "CSBS companies",
  "best branch for engineering notes", "engineering branch notes",
  "computer science notes", "business systems notes", "CS and BS notes"
];

export const UNIVERSITY_KEYWORDS = [
  "VTU", "VTU Notes", "VTU CSBS", "VTU Notes PDF", "VTU Question Papers",
  "Visvesvaraya Technological University", "VTU Belagavi", "VTU syllabus",
  "VTU CSBS syllabus", "VTU exam pattern", "VTU 2022 scheme", "VTU 2021 scheme",
  "VTU model papers", "VTU previous year papers", "VTU notes download",
  "VTU engineering notes", "VTU CSBS notes 2024", "VTU CSBS notes 2025",
  "VTU CSBS notes 2026", "VTU autonomous",
  // New: VTU expanded combos
  "VTU notes free download", "VTU notes PDF download", "VTU solved papers",
  "VTU question bank", "VTU important questions", "VTU CIE papers",
  "VTU SEE papers", "VTU exam tips", "VTU passing tips",
  "VTU CSE notes", "VTU ISE notes", "VTU ECE notes", "VTU EEE notes",
  "VTU ME notes", "VTU CV notes", "VTU AIML notes",
  "VTU 1st sem notes", "VTU 2nd sem notes", "VTU 3rd sem notes",
  "VTU 4th sem notes", "VTU 5th sem notes", "VTU 6th sem notes",
  "VTU 7th sem notes", "VTU 8th sem notes",
  "VTU engineering notes PDF", "VTU handwritten notes",
  "VTU topper notes", "VTU revision notes", "VTU formula sheet",
  "VTU syllabus 2022 scheme notes", "VTU syllabus 2021 scheme notes",
  "VTU affiliated college notes", "VTU Bangalore college notes",
  "VTU Karnataka engineering notes", "best VTU notes website",
  "best website for VTU notes", "VTU notes app", "VTU notes online"
];

export const SEARCH_INTENT_KEYWORDS = [
  "Free Notes", "Notes PDF Download", "Topper Notes", "Handwritten Notes",
  "Question Bank PDF", "Important Questions with Answers", "Previous Year Question Papers",
  "PYQ with Solutions", "Internal Exam Questions", "SEE Preparation", "VTU Notes",
  "Quiz Questions", "Revision Notes", "Last Minute Notes", "Exam Preparation",
  "Study Material Free Download", "Engineering Notes Free PDF", "CIE Questions",
  "SEE Questions", "Lab Manual", "Lab Programs", "Viva Questions",
  // New: Best website / search intent
  "best notes website", "best notes website for BMS",
  "best notes website for BMSCE", "best notes website for VTU",
  "best notes website for engineering", "best notes website for CSBS",
  "best engineering notes website", "best study material website",
  "best PYQ website", "best question paper website",
  "free engineering notes download", "free notes for engineering students",
  "engineering notes free PDF download", "best free notes for engineering",
  "notes download free PDF", "study material free download PDF",
  "engineering study material download", "best app for engineering notes",
  "notes website for BMS college", "notes website for VTU students",
  "protocol notes", "notes protocol", "protocol notes PDF",
  "protocol notes download", "protocol notes engineering",
  "protocol notes VTU", "protocol notes BMSCE"
];

export const LONG_TAIL_KEYWORDS = [
  "BMSCE CSBS 1st sem notes", "BMSCE CSBS 2nd sem notes",
  "BMSCE CSBS 3rd sem notes", "BMSCE CSBS 4th sem notes",
  "BMSCE CSBS 5th sem notes", "BMSCE CSBS 6th sem notes",
  "BMSCE CSBS 7th sem notes", "BMSCE CSBS 8th sem notes",
  "VTU CSBS notes PDF", "CSBS important questions with answers",
  "Engineering notes free PDF", "BMS College Bangalore notes",
  "Topper handwritten notes PDF", "Semester wise engineering notes",
  "Unit wise notes PDF", "DBMS notes PDF VTU", "Operating system notes PDF",
  "Statistical methods notes PDF", "Computer networks notes PDF",
  "OOP notes PDF", "Python notes PDF", "Java notes PDF",
  "Software engineering notes PDF", "Financial management notes PDF",
  "CSBS notes for competitive exams", "GATE preparation notes for CSBS",
  "how to make csbs notes", "best notes for CSBS students",
  "CSBS notes telegram", "CSBS notes whatsapp group",
  // New: Long-tail expanded
  "how to study for VTU exams", "how to pass VTU exams easily",
  "how to score in VTU CIE", "how to score in VTU SEE",
  "best notes for VTU engineering students",
  "best engineering notes website in India",
  "best notes for BMS college students",
  "free notes for VTU students download",
  "where to find BMSCE notes online",
  "where to download VTU question papers",
  "BMSCE CSBS notes PDF free download",
  "VTU engineering notes PDF free download 2024",
  "VTU engineering notes PDF free download 2025",
  "VTU engineering notes PDF free download 2026",
  "best website for engineering notes in Bangalore",
  "best website for engineering notes in Karnataka",
  "best website for engineering notes in India",
  "protocol notes for VTU exams",
  "protocol notes for BMSCE students",
  "protocol notes engineering PDF",
  "engineering protocol notes download free"
];

// ── NEW: MASSIVE ENGINEERING BROAD KEYWORDS ──
// Targets students from ALL engineering branches searching for notes

export const ENGINEERING_BROAD_KEYWORDS = [
  // Core engineering subjects that ALL branches study
  "Engineering Mathematics notes", "Engineering Mathematics 1 notes", "Engineering Mathematics 2 notes",
  "Engineering Mathematics 3 notes", "Engineering Mathematics 4 notes",
  "Engineering Physics notes PDF", "Engineering Chemistry notes PDF",
  "Basic Electrical Engineering notes PDF", "Basic Electronics notes PDF",
  "Constitution of India notes PDF", "Professional Ethics notes PDF",
  "Elements of Civil Engineering notes", "Elements of Mechanical Engineering notes",
  "Engineering Graphics notes", "Engineering Drawing notes",
  "Environmental Studies notes", "Technical English notes",
  "Discrete Mathematics notes", "Theory of Computation notes",
  "Design and Analysis of Algorithms notes", "Compiler Design notes",
  "Computer Graphics notes", "Microprocessor notes", "Embedded Systems notes",

  // CSE / ISE / IT subjects
  "Data Structures notes PDF", "Algorithms notes PDF", "DSA notes PDF free download",
  "DBMS notes PDF free download", "Operating Systems notes PDF free",
  "Computer Networks notes PDF free", "Software Engineering notes PDF",
  "Artificial Intelligence notes PDF", "Machine Learning notes PDF free",
  "Web Technologies notes PDF", "Cloud Computing notes PDF",
  "Information Security notes PDF", "Cyber Security notes PDF",
  "Big Data Analytics notes PDF", "IoT notes PDF", "Internet of Things notes PDF",
  "Python programming notes PDF", "Java programming notes PDF",
  "C programming notes PDF", "C++ programming notes PDF",
  "Object Oriented Programming notes PDF", "Unix programming notes PDF",
  "Linux programming notes PDF", "Shell scripting notes",

  // ECE subjects
  "Analog Electronics notes", "Digital Electronics notes PDF",
  "Signals and Systems notes", "Control Systems notes",
  "Communication Systems notes", "Antenna notes",
  "Electromagnetic Theory notes", "VLSI Design notes",
  "Microcontroller notes", "ARM processor notes",
  "Electronic Circuits notes", "Network Analysis notes",
  "Digital Signal Processing notes", "DSP notes PDF",
  "Wireless Communication notes", "Satellite Communication notes",

  // EEE subjects
  "Power Systems notes", "Power Electronics notes",
  "Electrical Machines notes PDF", "Electric Circuits notes",
  "Control Engineering notes", "Switchgear Protection notes",
  "Transmission Distribution notes", "Renewable Energy notes",
  "Electrical Measurement notes", "High Voltage Engineering notes",

  // ME subjects
  "Thermodynamics notes PDF", "Fluid Mechanics notes PDF",
  "Strength of Materials notes PDF", "Manufacturing Technology notes",
  "Heat Transfer notes", "Machine Design notes",
  "Engineering Mechanics notes", "Kinematics of Machines notes",
  "Dynamics of Machines notes", "Refrigeration notes",
  "Automobile Engineering notes", "CAD CAM notes",

  // CV subjects
  "Structural Analysis notes", "Geotechnical Engineering notes",
  "Transportation Engineering notes", "Hydraulics notes",
  "Building Materials notes", "Surveying notes PDF",
  "Concrete Technology notes", "Steel Structures notes",
  "Foundation Engineering notes", "Highway Engineering notes",

  // Business / Management subjects
  "Financial Accounting notes", "Business Statistics notes",
  "Organizational Behavior notes PDF", "Business Analytics notes PDF",
  "Marketing Management notes", "Human Resource Management notes",
  "Supply Chain Management notes", "Project Management notes",
  "Economics for Engineers notes", "Entrepreneurship notes",
  "Management and Entrepreneurship notes",
  "Financial Management notes PDF", "Business Economics notes PDF"
];

// ── NEW: PROTOCOL / PATTERN KEYWORDS ──
// High-traffic variations people actually search

export const PROTOCOL_PATTERN_KEYWORDS = [
  // Protocol + subject combinations
  "protocol Data Structures notes", "protocol DBMS notes", "protocol OS notes",
  "protocol Computer Networks notes", "protocol Machine Learning notes",
  "protocol Artificial Intelligence notes", "protocol Software Engineering notes",
  "protocol Cloud Computing notes", "protocol Web Technologies notes",
  "protocol Mathematics notes", "protocol Physics notes", "protocol Chemistry notes",
  "protocol DSA", "protocol SQL", "protocol OOP", "protocol CN",
  "protocol engineering notes", "protocol VTU notes", "protocol BMSCE",
  "protocol notes download", "protocol notes PDF", "protocol notes free",

  // "Best" + institution combinations
  "best notes for BMS", "best notes for BMSCE students",
  "best notes for VTU students", "best notes for engineering students",
  "best notes for CSE students", "best notes for CSBS students",
  "best notes for ISE students", "best notes for ECE students",
  "best notes website for BMS", "best notes website for engineering",
  "best notes app for VTU", "best engineering notes app",
  "best free notes website", "best free engineering notes",
  "best notes for VTU exams", "best notes for CIE exam",
  "best notes for SEE exam", "best notes for internal exam",

  // "Notes + subject" pattern
  "notes DSA", "notes DBMS", "notes OS", "notes CN", "notes SE",
  "notes AI", "notes ML", "notes CC", "notes IS", "notes OB",
  "notes COA", "notes DE", "notes OOP", "notes FABS",
  "notes Mathematics", "notes Physics", "notes Chemistry",
  "notes Data Structures", "notes Database", "notes Networks",
  "notes Machine Learning", "notes Artificial Intelligence",

  // Subject + "notes" reverse pattern
  "Data Structures notes", "Database notes", "Operating System notes",
  "Computer Network notes", "Software Engineering notes",
  "Machine Learning notes", "Artificial Intelligence notes",
  "Cloud Computing notes", "Web Development notes",
  "Information Security notes", "Big Data notes",
  "Internet of Things notes", "Digital Electronics notes",
  "Computer Organization notes", "Financial Accounting notes",
  "Business Analytics notes", "Organizational Behavior notes"
];

// ── NEW: ALL ENGINEERING SUBJECTS KEYWORDS ──
// Every possible subject that engineering students search for

export const ALL_ENGINEERING_SUBJECTS = [
  // Programming Languages
  "C programming notes", "C++ notes", "Java notes", "Python notes",
  "JavaScript notes", "HTML CSS notes", "SQL notes", "R programming notes",
  "MATLAB notes", "Kotlin notes", "Swift notes", "Go programming notes",
  "Rust programming notes", "TypeScript notes", "PHP notes",
  "Ruby notes", "Perl notes", "Assembly language notes",
  "Shell scripting notes", "Bash programming notes",

  // Computer Science Core
  "Data Structures notes", "Algorithms notes", "Database Management notes",
  "Operating Systems notes", "Computer Networks notes", "Compiler Design notes",
  "Computer Graphics notes", "Computer Architecture notes",
  "Theory of Computation notes", "Formal Languages notes",
  "Automata Theory notes", "Discrete Mathematics notes",
  "Graph Theory notes", "Number Theory notes",
  "Numerical Methods notes", "Operations Research notes",
  "Parallel Computing notes", "Distributed Systems notes",
  "Real Time Systems notes", "System Software notes",

  // AI / ML / Data Science
  "Artificial Intelligence notes", "Machine Learning notes",
  "Deep Learning notes", "Neural Network notes", "NLP notes",
  "Natural Language Processing notes", "Computer Vision notes",
  "Reinforcement Learning notes", "Data Mining notes",
  "Data Science notes", "Data Analytics notes",
  "Big Data notes", "Hadoop notes", "Spark notes",
  "TensorFlow notes", "PyTorch notes", "Keras notes",
  "Scikit Learn notes", "Pandas notes", "NumPy notes",
  "Statistics for Data Science notes", "Linear Algebra for ML notes",
  "Probability for Machine Learning notes",

  // Web / Mobile / Cloud
  "Web Development notes", "Full Stack Development notes",
  "Frontend Development notes", "Backend Development notes",
  "React notes", "Angular notes", "Vue notes", "Node.js notes",
  "Express.js notes", "MongoDB notes", "REST API notes",
  "Android Development notes", "iOS Development notes",
  "Mobile Computing notes", "Cross Platform Development notes",
  "Cloud Computing notes", "AWS notes", "Azure notes", "GCP notes",
  "Docker notes", "Kubernetes notes", "DevOps notes",
  "CI CD notes", "Microservices notes", "Serverless notes",

  // Security
  "Information Security notes", "Cyber Security notes",
  "Network Security notes", "Cryptography notes",
  "Ethical Hacking notes", "Penetration Testing notes",
  "Digital Forensics notes", "Malware Analysis notes",
  "Blockchain notes", "Smart Contracts notes",
  "Firewall notes", "VPN notes", "SSL TLS notes",

  // IoT / Embedded
  "Internet of Things notes", "Embedded Systems notes",
  "Arduino notes", "Raspberry Pi notes", "Sensor notes",
  "MQTT notes", "CoAP notes", "Edge Computing notes",
  "Fog Computing notes", "Robotics notes",
  "8051 Microcontroller notes", "8086 Microprocessor notes",
  "ARM Processor notes", "PIC Microcontroller notes",

  // Mathematics
  "Calculus notes", "Linear Algebra notes", "Differential Equations notes",
  "Complex Analysis notes", "Probability notes", "Statistics notes",
  "Transforms notes", "Fourier Series notes", "Laplace Transform notes",
  "Z Transform notes", "Vector Calculus notes", "Numerical Analysis notes",
  "Boolean Algebra notes", "Set Theory notes",

  // Physics / Chemistry / Science
  "Engineering Physics notes", "Modern Physics notes",
  "Quantum Mechanics notes", "Optics notes", "Laser notes",
  "Semiconductor Physics notes", "Solid State Physics notes",
  "Engineering Chemistry notes", "Organic Chemistry notes",
  "Electrochemistry notes", "Polymer Chemistry notes",
  "Environmental Science notes", "Material Science notes",

  // Business / Management
  "Financial Accounting notes", "Cost Accounting notes",
  "Management Accounting notes", "Business Statistics notes",
  "Business Analytics notes", "Marketing Management notes",
  "Human Resource Management notes", "Organizational Behavior notes",
  "Supply Chain Management notes", "Operations Management notes",
  "Project Management notes", "Strategic Management notes",
  "Entrepreneurship notes", "Innovation Management notes",
  "Economics for Engineers notes", "Engineering Economics notes",
  "Business Communication notes", "Corporate Finance notes"
];

// ── NEW: BEST WEBSITE KEYWORDS ──
// People searching for "best notes website" variations

export const BEST_WEBSITE_KEYWORDS = [
  "best notes website", "best notes website for engineering",
  "best notes website for BMS", "best notes website for BMSCE",
  "best notes website for VTU", "best notes website for VTU students",
  "best notes website for CSBS", "best notes website for CSE",
  "best notes website in India", "best notes website for Bangalore colleges",
  "best notes website for Karnataka engineering",
  "best engineering notes website India",
  "best free engineering notes website",
  "best notes app for engineering", "best notes app for VTU",
  "best study material website for engineering",
  "best PYQ website for VTU", "best question papers website",
  "best notes for VTU exams", "best notes for engineering exams",
  "best notes for CIE exams", "best notes for SEE exams",
  "best free notes for engineering students India",
  "top notes website for engineering", "top engineering notes India",
  "number 1 notes website engineering", "#1 notes website for VTU",
  "most popular notes website engineering",
  "most used notes website BMSCE", "recommended notes website VTU",
  "trusted notes website engineering", "verified notes website",
  "reliable notes website for VTU students",
  "best website to download engineering notes",
  "best website to download VTU notes",
  "best website to download BMSCE notes",
  "best website for engineering PDF notes",
  "best website for engineering study material",
  "best website for engineering question papers",
  "best website for VTU question papers",
  "best website for VTU previous year papers"
];

// ── NEW: EXAM & COMPETITIVE KEYWORDS ──

export const EXAM_PATTERN_KEYWORDS = [
  // CIE / SEE patterns
  "VTU CIE 1 question papers", "VTU CIE 2 question papers", "VTU CIE 3 question papers",
  "VTU SEE question papers", "VTU model question papers",
  "VTU blueprint", "VTU marking scheme", "VTU passing marks",
  "VTU CIE pattern", "VTU SEE pattern", "VTU exam schedule",
  "how to pass CIE VTU", "how to score in CIE VTU",
  "how to pass SEE VTU", "how to score in SEE VTU",
  "VTU exam preparation tips", "VTU exam strategy",
  "VTU last minute preparation", "VTU revision notes",
  "VTU crash course notes", "VTU one day before exam notes",

  // GATE / Competitive
  "GATE CSE notes", "GATE preparation notes", "GATE CS notes PDF",
  "GATE Data Structures notes", "GATE DBMS notes", "GATE OS notes",
  "GATE Networks notes", "GATE Algorithms notes",
  "GATE previous year papers", "GATE practice problems",
  "placement preparation notes", "TCS placement notes",
  "Infosys placement notes", "Wipro placement notes",
  "Cognizant placement notes", "Accenture placement notes",
  "campus placement notes", "aptitude notes for placement",
  "coding interview notes", "DSA for interviews",
  "system design notes", "LLD notes", "HLD notes"
];

// ── NEW: COMPETITOR DISPLACEMENT KEYWORDS ──

export const COMPETITIVE_KEYWORDS = [
  // Other platforms people search for
  "engineering notes like Studocu", "better than Studocu engineering",
  "engineering notes like GeeksforGeeks", "notes like GFG",
  "engineering notes like Scribd", "free alternative to Scribd",
  "engineering notes like CourseHero", "free CourseHero alternative",
  "notes like Unacademy engineering", "free Unacademy alternative",
  "VTU notes like LastMomentTuitions", "VTU notes free no login",
  "engineering notes no signup required", "engineering notes without login",
  "engineering notes without registration", "free notes no paywall",
  "best free alternative for engineering notes",
  "free engineering notes India 2024", "free engineering notes India 2025",
  "free engineering notes India 2026"
];


// ─────────────────────────────────────────────
// SEMESTER SEO DATA
// ─────────────────────────────────────────────

export const SEMESTER_SEO: Record<number, SemesterSEO> = {
  1: {
    number: 1,
    description: "First semester CSBS notes at BMSCE covering foundational engineering subjects including Mathematics I, Engineering Physics, Elements of Civil Engineering, Elements of Mechanical Engineering, and Basic Electrical Engineering. Access comprehensive lecture notes, previous year question papers (PYQs), CIE papers, SEE papers, and verified study materials for Semester 1 of Computer Science and Business Systems at BMS College of Engineering, Bengaluru. VTU syllabus compliant notes with unit-wise breakdown and important questions.",
    keywords: ["1st sem notes", "semester 1 notes", "first semester CSBS", "BMSCE sem 1", "VTU 1st sem", "Mathematics I notes", "Engineering Physics notes", "Civil Engineering notes", "Mechanical Engineering notes", "Electrical Engineering notes", "CSBS first year notes"],
    longTailKeywords: ["BMSCE CSBS 1st semester notes PDF download", "VTU first semester CSBS study material", "Mathematics I BMSCE notes handwritten", "Engineering Physics CSBS PYQ with solutions", "how to pass 1st sem CSBS VTU"],
    faqs: [
      { question: "What subjects are in CSBS 1st semester at BMSCE?", answer: "CSBS 1st semester at BMSCE includes Mathematics I (Calculus and Linear Algebra), Engineering Physics, Elements of Civil Engineering, Elements of Mechanical Engineering, and Basic Electrical Engineering. Lab courses include Engineering Physics Lab and Civil Engineering Lab." },
      { question: "Where can I download 1st semester CSBS notes for free?", answer: "You can download free, verified 1st semester CSBS notes at Notes CSBS (notescsbs.vercel.app). We provide comprehensive lecture notes, PYQs, CIE papers, and study materials for all subjects organized unit-wise." },
      { question: "How to prepare for 1st semester CSBS exams at BMSCE?", answer: "Focus on solving previous year question papers (PYQs) available on Notes CSBS, understand core concepts from verified lecture notes, practice numerical problems for Mathematics I and Physics, and review CIE patterns. Our repository provides exam-ready study material." }
    ]
  },
  2: {
    number: 2,
    description: "Second semester CSBS notes at BMSCE covering Mathematics II, Engineering Chemistry, Problem Solving with C Programming, Basic Electronics, and Constitution of India & Professional Ethics. Complete study materials including lab manuals for C Programming Lab and Chemistry Lab. Download free PDF notes, PYQs, question banks, and handwritten notes for VTU CSBS Semester 2.",
    keywords: ["2nd sem notes", "semester 2 notes", "second semester CSBS", "BMSCE sem 2", "VTU 2nd sem", "Mathematics II notes", "C Programming notes", "Engineering Chemistry notes", "Basic Electronics notes", "Constitution of India notes"],
    longTailKeywords: ["BMSCE CSBS 2nd semester notes PDF", "C programming CSBS lab manual", "Engineering Chemistry VTU notes", "Basic Electronics BMSCE PYQ", "Mathematics II CSBS important questions"],
    faqs: [
      { question: "What subjects are in CSBS 2nd semester at BMSCE?", answer: "CSBS 2nd semester includes Mathematics II (Advanced Calculus and Numerical Methods), Engineering Chemistry, Problem Solving with C, Basic Electronics, and Constitution of India & Professional Ethics. Labs include C Programming Lab and Chemistry Lab." },
      { question: "Where can I find C Programming notes for CSBS?", answer: "Notes CSBS provides comprehensive C Programming notes including lab programs, viva questions, and PYQs. Visit notescsbs.vercel.app/subject/PSP for complete study materials organized by units." },
      { question: "Are Chemistry Lab manuals available for CSBS?", answer: "Yes, Notes CSBS provides verified Chemistry Lab manuals with experimental procedures, observations, and viva questions for BMSCE CSBS students." }
    ]
  },
  3: {
    number: 3,
    description: "Third semester CSBS notes at BMSCE covering core computer science subjects: Mathematics III (Transform Calculus, Fourier Series, and Numerical Techniques), Data Structures and Algorithms (DSA), Object Oriented Programming with C++ (OOP), Digital Electronics, and Unix Programming. Includes DSA Lab and OOP Lab manuals. Download comprehensive notes, PYQs, important questions, and handwritten study materials for VTU CSBS Semester 3.",
    keywords: ["3rd sem notes", "semester 3 notes", "third semester CSBS", "BMSCE sem 3", "VTU 3rd sem", "DSA notes", "Data Structures notes", "OOP notes", "C++ notes", "Digital Electronics notes", "Unix Programming notes", "DSA Lab manual"],
    longTailKeywords: ["Data Structures and Algorithms CSBS notes PDF", "OOP with C++ BMSCE notes", "Digital Electronics VTU PYQ", "Unix Programming lab manual CSBS", "DSA important questions BMSCE"],
    faqs: [
      { question: "What are the core subjects in CSBS 3rd semester?", answer: "CSBS 3rd semester includes Mathematics III, Data Structures and Algorithms (DSA), Object Oriented Programming with C++ (OOP), Digital Electronics, and Unix Programming. Lab subjects are DSA Lab and OOP Lab." },
      { question: "How to prepare for DSA exam in CSBS?", answer: "For DSA, focus on implementing Stack, Queue, Linked List, Trees, and Graph algorithms. Practice coding problems, study time complexity analysis, and solve PYQs from Notes CSBS. Our verified notes cover all 5 units with examples." },
      { question: "Where can I find OOP with C++ notes for BMSCE CSBS?", answer: "Complete OOP with C++ notes including Inheritance, Polymorphism, Templates, Virtual Functions, and STL are available at Notes CSBS. Visit notescsbs.vercel.app/subject/OOP for unit-wise notes and PYQs." }
    ]
  },
  4: {
    number: 4,
    description: "Fourth semester CSBS notes at BMSCE covering critical subjects: Mathematics IV (Complex Analysis, Probability and Statistics), Database Management Systems (DBMS), Computer Organization and Architecture (COA), Operating Systems (OS), and Financial Accounting & Business Statistics (FABS). Includes DBMS Lab and OS Lab manuals. This is a crucial semester combining core CS with business fundamentals. Download verified notes, PYQs, and study materials.",
    keywords: ["4th sem notes", "semester 4 notes", "fourth semester CSBS", "BMSCE sem 4", "VTU 4th sem", "DBMS notes", "Operating Systems notes", "OS notes", "COA notes", "FABS notes", "Financial Accounting notes", "Business Statistics notes"],
    longTailKeywords: ["DBMS notes PDF VTU CSBS", "Operating Systems BMSCE PYQ", "COA Computer Organization notes", "FABS Financial Accounting CSBS notes", "DBMS Lab manual SQL programs BMSCE"],
    faqs: [
      { question: "What subjects are in CSBS 4th semester at BMSCE?", answer: "CSBS 4th semester includes Mathematics IV, Database Management Systems (DBMS), Computer Organization and Architecture (COA), Operating Systems (OS), and Financial Accounting & Business Statistics (FABS). Labs include DBMS Lab and OS Lab." },
      { question: "How to score well in DBMS for CSBS?", answer: "Focus on ER diagrams, Normalization (1NF to BCNF), SQL queries, Transaction Management, and Concurrency Control. Practice SQL programs from the lab manual and solve PYQs available on Notes CSBS for guaranteed exam preparation." },
      { question: "Where can I find FABS notes for CSBS?", answer: "Financial Accounting & Business Statistics (FABS) notes are available at Notes CSBS. Our verified notes cover financial statements, ratio analysis, probability distributions, and statistical methods tailored for CSBS students." }
    ]
  },
  5: {
    number: 5,
    description: "Fifth semester CSBS notes at BMSCE covering advanced subjects: Computer Networks (CN), Software Engineering (SE), Artificial Intelligence (AI), Web Technologies, and Business Analytics (BA). Includes CN Lab and Web Technologies Lab manuals. This semester bridges theoretical CS with practical application and business intelligence. Download comprehensive notes, PYQs, important questions, and handwritten materials.",
    keywords: ["5th sem notes", "semester 5 notes", "fifth semester CSBS", "BMSCE sem 5", "VTU 5th sem", "Computer Networks notes", "CN notes", "Software Engineering notes", "AI notes", "Artificial Intelligence notes", "Web Technologies notes", "Business Analytics notes"],
    longTailKeywords: ["Computer Networks CSBS notes PDF", "Software Engineering BMSCE PYQ", "Artificial Intelligence VTU notes", "Web Technologies lab manual", "Business Analytics CSBS important questions"],
    faqs: [
      { question: "What are the subjects in CSBS 5th semester?", answer: "CSBS 5th semester includes Computer Networks (CN), Software Engineering (SE), Artificial Intelligence (AI), Web Technologies, and Business Analytics (BA). Lab courses include CN Lab and Web Technologies Lab." },
      { question: "How to prepare for Computer Networks in CSBS?", answer: "Study the OSI and TCP/IP models thoroughly, understand routing algorithms, learn about the network, transport, and application layers. Practice subnetting and solve PYQs from Notes CSBS for comprehensive preparation." },
      { question: "Where can I find AI notes for BMSCE CSBS?", answer: "Artificial Intelligence notes covering search algorithms, knowledge representation, machine learning basics, and expert systems are available at Notes CSBS. Visit notescsbs.vercel.app/subject/AI for verified study materials." }
    ]
  },
  6: {
    number: 6,
    description: "Sixth semester CSBS notes at BMSCE covering cutting-edge subjects: Machine Learning (ML), Cloud Computing (CC), Information Security (IS), Mini Project (MP), and Organizational Behavior (OB). Includes ML Lab manual. This semester focuses on emerging technologies and management skills essential for industry readiness. Download verified notes, PYQs, project ideas, and study materials.",
    keywords: ["6th sem notes", "semester 6 notes", "sixth semester CSBS", "BMSCE sem 6", "VTU 6th sem", "Machine Learning notes", "ML notes", "Cloud Computing notes", "Information Security notes", "Organizational Behavior notes", "Mini Project ideas"],
    longTailKeywords: ["Machine Learning CSBS notes PDF", "Cloud Computing BMSCE PYQ", "Information Security VTU notes", "Organizational Behavior CSBS notes", "ML Lab programs BMSCE CSBS"],
    faqs: [
      { question: "What subjects are in CSBS 6th semester?", answer: "CSBS 6th semester includes Machine Learning (ML), Cloud Computing (CC), Information Security (IS), Mini Project (MP), and Organizational Behavior (OB). Lab course includes ML Lab." },
      { question: "How to prepare for Machine Learning in CSBS?", answer: "Focus on supervised and unsupervised learning algorithms, regression, classification, clustering, and neural networks. Practice implementations in Python and solve PYQs from Notes CSBS." },
      { question: "Where can I find Cloud Computing notes for CSBS?", answer: "Cloud Computing notes covering virtualization, AWS/Azure basics, cloud architecture, and deployment models are available at Notes CSBS. Our verified materials are aligned with the VTU CSBS syllabus." }
    ]
  },
  7: {
    number: 7,
    description: "Seventh semester CSBS notes at BMSCE covering advanced specializations: Big Data Analytics (BD), Internet of Things (IoT), Professional Elective 1, Open Elective 1, and Project Phase 1. This semester prepares students for industry with hands-on project experience and specialization knowledge. Download comprehensive notes, PYQs, project reports, and study materials.",
    keywords: ["7th sem notes", "semester 7 notes", "seventh semester CSBS", "BMSCE sem 7", "VTU 7th sem", "Big Data Analytics notes", "IoT notes", "Internet of Things notes", "Professional Elective notes", "Project Phase 1"],
    longTailKeywords: ["Big Data Analytics CSBS notes PDF", "Internet of Things BMSCE PYQ", "CSBS 7th sem project ideas", "Professional Elective VTU notes", "IoT lab programs CSBS"],
    faqs: [
      { question: "What subjects are in CSBS 7th semester?", answer: "CSBS 7th semester includes Big Data Analytics, Internet of Things (IoT), Professional Elective 1, Open Elective 1, and Project Phase 1." },
      { question: "How to choose a good project for CSBS?", answer: "Choose projects combining CS and business domains - data analytics dashboards, ML-based business tools, IoT solutions, or web applications with business impact. Notes CSBS provides project ideas and report templates." }
    ]
  },
  8: {
    number: 8,
    description: "Eighth semester CSBS notes at BMSCE covering final year requirements: Professional Elective 2, Professional Elective 3, Project Phase 2, Internship, and Seminar. This is the culminating semester focused on specialization, industry exposure, and project completion. Access project report templates, seminar presentation guides, and internship resources.",
    keywords: ["8th sem notes", "semester 8 notes", "eighth semester CSBS", "BMSCE sem 8", "VTU 8th sem", "Professional Elective notes", "Final Year Project", "Internship CSBS", "Seminar CSBS", "Project Phase 2"],
    longTailKeywords: ["CSBS 8th semester project report format", "BMSCE final year project ideas CSBS", "CSBS internship report template", "seminar topics for CSBS students", "VTU 8th sem CSBS notes"],
    faqs: [
      { question: "What are the requirements for CSBS 8th semester?", answer: "CSBS 8th semester includes Professional Elective 2, Professional Elective 3, Project Phase 2 (final submission), Internship, and Seminar. Focus is on completing the capstone project and gaining industry experience." },
      { question: "How to write a good project report for CSBS?", answer: "Follow VTU guidelines: include abstract, literature survey, system design, implementation, results, and conclusion. Notes CSBS provides project report templates and sample reports from BMSCE toppers." }
    ]
  }
};

// ─────────────────────────────────────────────
// SUBJECT SEO DATA
// ─────────────────────────────────────────────

export const SUBJECT_SEO: Record<string, SubjectSEO> = {
  // ── SEMESTER 1 ──
  MA1: {
    code: "MA1", name: "Mathematics I", slug: "mathematics-1-notes", semester: 1,
    fullName: "Mathematics I - Calculus and Linear Algebra", abbreviation: "M1",
    description: "Comprehensive Mathematics I notes for CSBS students at BMSCE covering Differential Calculus, Integral Calculus, Vector Calculus, Differential Equations, and Linear Algebra. Download free PDF notes, solved examples, PYQs, CIE papers, and SEE papers for VTU Mathematics I.",
    isLab: false,
    units: [
      { number: 1, title: "Differential Calculus", topics: ["Successive Differentiation", "Taylor's Series", "Maclaurin's Series", "Polar Curves", "Curvature", "Radius of Curvature"], keywords: ["differential calculus notes", "Taylor series examples", "curvature problems"] },
      { number: 2, title: "Integral Calculus", topics: ["Reduction Formulae", "Definite Integrals", "Beta and Gamma Functions", "Area Under Curves", "Volume of Revolution"], keywords: ["integral calculus notes", "beta gamma functions", "reduction formulae"] },
      { number: 3, title: "Vector Calculus", topics: ["Gradient", "Divergence", "Curl", "Green's Theorem", "Stokes' Theorem", "Gauss Divergence Theorem"], keywords: ["vector calculus notes", "Green's theorem proof", "Stokes theorem"] },
      { number: 4, title: "Differential Equations", topics: ["First Order ODE", "Higher Order ODE", "Linear Differential Equations", "Bernoulli's Equation", "Exact Equations"], keywords: ["differential equations notes", "ODE solved problems", "Bernoulli equation"] },
      { number: 5, title: "Linear Algebra", topics: ["Matrix Operations", "Eigenvalues", "Eigenvectors", "Diagonalization", "Cayley-Hamilton Theorem", "Rank of Matrix"], keywords: ["linear algebra notes", "eigenvalue problems", "Cayley Hamilton theorem"] }
    ],
    keywords: ["Mathematics I notes", "M1 notes CSBS", "Calculus notes VTU", "Linear Algebra notes BMSCE", "M1 PYQ", "Mathematics 1 question bank"],
    topics: ["Calculus", "Linear Algebra", "Differential Equations", "Vector Calculus", "Matrix Theory"],
    faqs: [
      { question: "What topics are covered in Mathematics I for CSBS?", answer: "Mathematics I covers Differential Calculus, Integral Calculus, Vector Calculus, Differential Equations, and Linear Algebra. These form the mathematical foundation for engineering." },
      { question: "How to score well in M1 at BMSCE?", answer: "Practice solved examples for each unit, solve at least 5 years of PYQs, master Beta-Gamma functions and Eigenvalue problems. Notes CSBS provides complete solved examples and PYQ solutions." },
      { question: "Where can I download Mathematics I notes for CSBS?", answer: "Download verified Mathematics I notes from Notes CSBS at notescsbs.vercel.app/subject/MA1. We provide unit-wise notes, solved problems, and PYQ papers." }
    ],
    importantQuestions: ["Find the radius of curvature", "Evaluate using Beta and Gamma functions", "Verify Green's theorem", "Solve the differential equation", "Find eigenvalues and eigenvectors"],
    pyqTopics: ["Taylor's Series expansion", "Beta Gamma Functions", "Green's Theorem verification", "Eigenvalue problems", "Reduction formula derivation"],
    relatedSubjects: ["MA2", "MA3", "MA4"],
    longTailKeywords: ["Mathematics I CSBS BMSCE notes PDF", "M1 VTU solved papers", "calculus notes for engineering PDF"]
  },
  PHY1: {
    code: "PHY1", name: "Engineering Physics", slug: "engineering-physics-notes", semester: 1,
    fullName: "Engineering Physics - Modern Physics and Quantum Mechanics", abbreviation: "PHY",
    description: "Engineering Physics notes for CSBS at BMSCE covering Laser, Optical Fibers, Quantum Mechanics, Semiconductors, and Modern Physics. Download verified lecture notes, PYQ papers, and CIE/SEE study materials.",
    isLab: false,
    units: [
      { number: 1, title: "Laser and Optical Fibers", topics: ["Einstein's Coefficients", "Types of Lasers", "Optical Fiber Principle", "Numerical Aperture", "Applications"], keywords: ["laser notes", "optical fiber notes", "Einstein coefficients"] },
      { number: 2, title: "Quantum Mechanics", topics: ["de Broglie Hypothesis", "Heisenberg Uncertainty Principle", "Schrödinger Equation", "Wave Function", "Particle in a Box"], keywords: ["quantum mechanics notes", "Schrodinger equation", "de Broglie wavelength"] },
      { number: 3, title: "Electrical Properties", topics: ["Classical Free Electron Theory", "Quantum Free Electron Theory", "Band Theory of Solids", "Semiconductors", "Hall Effect"], keywords: ["semiconductor physics notes", "band theory", "Hall effect"] },
      { number: 4, title: "Modern Physics", topics: ["Photoelectric Effect", "Compton Effect", "Matter Waves", "X-rays", "Crystal Structure"], keywords: ["modern physics notes", "photoelectric effect", "Compton scattering"] },
      { number: 5, title: "Superconductivity and Nanomaterials", topics: ["BCS Theory", "Meissner Effect", "Types of Superconductors", "Nanomaterials", "Carbon Nanotubes"], keywords: ["superconductivity notes", "nanomaterials notes", "BCS theory"] }
    ],
    keywords: ["Engineering Physics notes", "Physics notes CSBS", "VTU physics notes", "BMSCE physics PYQ", "quantum mechanics notes"],
    topics: ["Laser", "Quantum Mechanics", "Semiconductors", "Superconductivity", "Nanomaterials"],
    faqs: [
      { question: "What topics are covered in Engineering Physics for CSBS?", answer: "Engineering Physics covers Laser & Optical Fibers, Quantum Mechanics, Electrical Properties of Materials, Modern Physics, and Superconductivity & Nanomaterials." },
      { question: "How to prepare for Physics exam in CSBS?", answer: "Focus on derivations and numerical problems. Key topics include Laser principles, Schrödinger equation, Hall Effect, and BCS Theory. Use Notes CSBS PYQs for practice." }
    ],
    importantQuestions: ["Derive Einstein's A and B coefficients", "Solve Schrödinger equation for particle in a box", "Explain Hall Effect", "Describe BCS Theory", "Calculate numerical aperture"],
    pyqTopics: ["Laser types and applications", "Quantum mechanics derivations", "Semiconductor problems", "Superconductivity"],
    relatedSubjects: ["PHY1L", "CHE2"],
    longTailKeywords: ["Engineering Physics BMSCE notes PDF", "VTU physics PYQ CSBS", "quantum mechanics notes engineering"]
  },
  CIV1: {
    code: "CIV1", name: "Elements of Civil Engineering", slug: "civil-engineering-notes", semester: 1,
    fullName: "Elements of Civil Engineering", abbreviation: "CIV",
    description: "Elements of Civil Engineering notes for CSBS covering Surveying, Building Materials, Construction Technology, and Environmental Engineering basics. VTU compliant study materials for BMSCE students.",
    isLab: false,
    units: [
      { number: 1, title: "Introduction to Civil Engineering", topics: ["Scope of Civil Engineering", "Infrastructure", "Types of Buildings"], keywords: ["civil engineering basics"] },
      { number: 2, title: "Surveying", topics: ["Chain Surveying", "Compass Surveying", "Levelling", "Contouring"], keywords: ["surveying notes"] },
      { number: 3, title: "Building Materials", topics: ["Cement", "Concrete", "Steel", "Timber", "Bricks"], keywords: ["building materials notes"] },
      { number: 4, title: "Construction Technology", topics: ["Foundations", "Walls", "Roofs", "Floors"], keywords: ["construction technology notes"] },
      { number: 5, title: "Environmental Engineering", topics: ["Water Supply", "Sewage Treatment", "Solid Waste Management"], keywords: ["environmental engineering basics"] }
    ],
    keywords: ["Civil Engineering notes CSBS", "CIV notes BMSCE", "surveying notes VTU"],
    topics: ["Surveying", "Building Materials", "Construction", "Environment"],
    faqs: [
      { question: "Why do CSBS students study Civil Engineering?", answer: "Elements of Civil Engineering provides foundational knowledge about infrastructure and construction that is essential for engineers to understand the built environment and project management." }
    ],
    importantQuestions: ["Explain chain surveying", "Describe types of cement", "Explain foundation types"],
    pyqTopics: ["Surveying methods", "Building materials properties", "Environmental engineering"],
    relatedSubjects: ["CIV1L", "ME1"],
    longTailKeywords: ["Civil Engineering CSBS notes PDF", "elements of civil engineering VTU notes"]
  },
  ME1: {
    code: "ME1", name: "Elements of Mechanical Engineering", slug: "mechanical-engineering-notes", semester: 1,
    fullName: "Elements of Mechanical Engineering", abbreviation: "ME",
    description: "Elements of Mechanical Engineering notes for CSBS covering Energy Sources, Steam Boilers, IC Engines, Hydraulic Machines, and Power Transmission. VTU notes for BMSCE CSBS.",
    isLab: false,
    units: [
      { number: 1, title: "Energy Sources", topics: ["Conventional Energy", "Renewable Energy", "Solar Energy", "Wind Energy"], keywords: ["energy sources notes"] },
      { number: 2, title: "Steam Boilers", topics: ["Types of Boilers", "Boiler Mountings", "Boiler Accessories"], keywords: ["steam boilers notes"] },
      { number: 3, title: "IC Engines", topics: ["Two Stroke", "Four Stroke", "Diesel Cycle", "Otto Cycle"], keywords: ["IC engine notes"] },
      { number: 4, title: "Hydraulic Machines", topics: ["Pumps", "Turbines", "Hydraulic Press"], keywords: ["hydraulic machines notes"] },
      { number: 5, title: "Power Transmission", topics: ["Belt Drive", "Gear Drive", "Chain Drive"], keywords: ["power transmission notes"] }
    ],
    keywords: ["Mechanical Engineering notes CSBS", "ME notes BMSCE"],
    topics: ["Energy", "Boilers", "IC Engines", "Hydraulics", "Power Transmission"],
    faqs: [{ question: "What is covered in Elements of Mechanical Engineering for CSBS?", answer: "The subject covers Energy Sources, Steam Boilers, IC Engines, Hydraulic Machines, and Power Transmission systems." }],
    importantQuestions: ["Compare Otto and Diesel cycles", "Explain boiler mountings", "Types of turbines"],
    pyqTopics: ["IC Engines", "Boilers", "Power Transmission"],
    relatedSubjects: ["CIV1", "EE1"],
    longTailKeywords: ["Mechanical Engineering CSBS notes", "ME VTU notes PDF"]
  },
  EE1: {
    code: "EE1", name: "Basic Electrical Engineering", slug: "electrical-engineering-notes", semester: 1,
    fullName: "Basic Electrical Engineering", abbreviation: "BEE",
    description: "Basic Electrical Engineering notes for CSBS covering DC Circuits, AC Circuits, Transformers, Electrical Machines, and Domestic Wiring. Complete VTU study materials for BMSCE.",
    isLab: false,
    units: [
      { number: 1, title: "DC Circuits", topics: ["Ohm's Law", "KVL", "KCL", "Thevenin's Theorem", "Norton's Theorem"], keywords: ["DC circuits notes", "KVL KCL problems"] },
      { number: 2, title: "AC Circuits", topics: ["Phasors", "Impedance", "Power Factor", "Resonance"], keywords: ["AC circuits notes", "phasor diagrams"] },
      { number: 3, title: "Transformers", topics: ["Working Principle", "EMF Equation", "Losses", "Efficiency"], keywords: ["transformer notes"] },
      { number: 4, title: "Electrical Machines", topics: ["DC Motor", "DC Generator", "Induction Motor"], keywords: ["electrical machines notes"] },
      { number: 5, title: "Domestic Wiring", topics: ["Wiring Systems", "Earthing", "Safety"], keywords: ["domestic wiring notes"] }
    ],
    keywords: ["Electrical Engineering notes CSBS", "BEE notes BMSCE", "DC AC circuits notes VTU"],
    topics: ["DC Circuits", "AC Circuits", "Transformers", "Motors", "Wiring"],
    faqs: [{ question: "What topics are in Basic Electrical Engineering for CSBS?", answer: "BEE covers DC Circuits (KVL, KCL, Thevenin), AC Circuits (Phasors, Resonance), Transformers, Electrical Machines, and Domestic Wiring." }],
    importantQuestions: ["Apply Thevenin's theorem", "Calculate power factor", "Derive EMF equation of transformer"],
    pyqTopics: ["Network theorems", "AC circuit analysis", "Transformer problems"],
    relatedSubjects: ["EE2", "PHY1"],
    longTailKeywords: ["Basic Electrical Engineering CSBS notes PDF", "BEE VTU PYQ solutions"]
  },

  // ── SEMESTER 2 ──
  MA2: {
    code: "MA2", name: "Mathematics II", slug: "mathematics-2-notes", semester: 2,
    fullName: "Mathematics II - Advanced Calculus and Numerical Methods", abbreviation: "M2",
    description: "Mathematics II notes for CSBS at BMSCE covering Laplace Transforms, Fourier Series, Partial Differential Equations, Numerical Methods, and Probability. Complete VTU compliant study materials with solved examples.",
    isLab: false,
    units: [
      { number: 1, title: "Laplace Transforms", topics: ["Definition", "Properties", "Inverse Laplace", "Convolution Theorem", "Applications to ODE"], keywords: ["Laplace transform notes", "inverse Laplace"] },
      { number: 2, title: "Fourier Series", topics: ["Fourier Series", "Half Range Series", "Fourier Transform", "Parseval's Identity"], keywords: ["Fourier series notes", "half range expansion"] },
      { number: 3, title: "Partial Differential Equations", topics: ["Formation of PDE", "Solution Methods", "Wave Equation", "Heat Equation"], keywords: ["PDE notes", "wave equation solution"] },
      { number: 4, title: "Numerical Methods", topics: ["Newton-Raphson Method", "Gauss Elimination", "Interpolation", "Numerical Integration"], keywords: ["numerical methods notes", "Newton Raphson"] },
      { number: 5, title: "Probability", topics: ["Random Variables", "Probability Distributions", "Binomial Distribution", "Normal Distribution", "Poisson Distribution"], keywords: ["probability notes", "probability distributions"] }
    ],
    keywords: ["Mathematics II notes", "M2 notes CSBS", "Laplace transform notes VTU", "Fourier series notes BMSCE"],
    topics: ["Laplace Transforms", "Fourier Series", "PDE", "Numerical Methods", "Probability"],
    faqs: [
      { question: "What is covered in Mathematics II for CSBS?", answer: "Mathematics II covers Laplace Transforms, Fourier Series, Partial Differential Equations, Numerical Methods, and Probability & Statistics." }
    ],
    importantQuestions: ["Find Laplace transform", "Expand Fourier series", "Solve PDE", "Apply Newton-Raphson method"],
    pyqTopics: ["Laplace transforms", "Fourier series expansions", "Numerical methods problems"],
    relatedSubjects: ["MA1", "MA3"],
    longTailKeywords: ["Mathematics II CSBS BMSCE notes PDF", "M2 VTU solved papers"]
  },
  CHE2: {
    code: "CHE2", name: "Engineering Chemistry", slug: "engineering-chemistry-notes", semester: 2,
    fullName: "Engineering Chemistry", abbreviation: "CHEM",
    description: "Engineering Chemistry notes for CSBS at BMSCE covering Electrochemistry, Corrosion, Polymers, Water Technology, and Fuels. Lab manual included.",
    isLab: false,
    units: [
      { number: 1, title: "Electrochemistry", topics: ["Electrodes", "Batteries", "Fuel Cells", "Nernst Equation"], keywords: ["electrochemistry notes"] },
      { number: 2, title: "Corrosion", topics: ["Types of Corrosion", "Corrosion Control", "Galvanic Corrosion"], keywords: ["corrosion notes"] },
      { number: 3, title: "Polymers", topics: ["Types of Polymers", "Polymerization", "Conducting Polymers"], keywords: ["polymer chemistry notes"] },
      { number: 4, title: "Water Technology", topics: ["Water Treatment", "Softening", "Desalination", "BOD COD"], keywords: ["water technology notes"] },
      { number: 5, title: "Fuels", topics: ["Calorific Value", "Types of Fuels", "Combustion"], keywords: ["fuels and combustion notes"] }
    ],
    keywords: ["Engineering Chemistry notes CSBS", "Chemistry notes BMSCE", "VTU chemistry PYQ"],
    topics: ["Electrochemistry", "Corrosion", "Polymers", "Water Technology", "Fuels"],
    faqs: [{ question: "What topics are in Engineering Chemistry for CSBS?", answer: "Engineering Chemistry covers Electrochemistry, Corrosion Science, Polymers, Water Technology, and Fuels & Combustion." }],
    importantQuestions: ["Derive Nernst equation", "Explain types of corrosion", "Water treatment methods"],
    pyqTopics: ["Electrochemistry", "Corrosion", "Water treatment"],
    relatedSubjects: ["CHE2L", "PHY1"],
    longTailKeywords: ["Engineering Chemistry CSBS notes PDF", "chemistry VTU PYQ CSBS"]
  },
  PSP: {
    code: "PSP", name: "Problem Solving with C", slug: "c-programming-notes", semester: 2,
    fullName: "Problem Solving with C Programming", abbreviation: "C",
    description: "Problem Solving with C Programming notes for CSBS at BMSCE. Learn C programming from basics to advanced concepts including pointers, arrays, structures, file handling, and dynamic memory allocation. Includes lab programs and PYQs.",
    isLab: false,
    units: [
      { number: 1, title: "Introduction to C", topics: ["Data Types", "Variables", "Operators", "Control Statements", "if-else", "switch"], keywords: ["C programming basics", "C data types"] },
      { number: 2, title: "Arrays and Strings", topics: ["1D Arrays", "2D Arrays", "String Functions", "String Operations"], keywords: ["C arrays notes", "string handling in C"] },
      { number: 3, title: "Functions", topics: ["Function Declaration", "Call by Value", "Call by Reference", "Recursion"], keywords: ["C functions notes", "recursion in C"] },
      { number: 4, title: "Pointers and Structures", topics: ["Pointers", "Pointer Arithmetic", "Structures", "Unions", "typedef"], keywords: ["C pointers notes", "structures in C"] },
      { number: 5, title: "File Handling", topics: ["File Operations", "fprintf", "fscanf", "Dynamic Memory Allocation", "malloc", "calloc"], keywords: ["C file handling notes", "dynamic memory allocation"] }
    ],
    keywords: ["C Programming notes CSBS", "C language notes BMSCE", "PSP notes VTU", "C programming lab programs"],
    topics: ["C Basics", "Arrays", "Functions", "Pointers", "Structures", "File Handling"],
    faqs: [
      { question: "What is covered in Problem Solving with C for CSBS?", answer: "PSP covers C programming fundamentals, arrays, strings, functions, recursion, pointers, structures, unions, file handling, and dynamic memory allocation." },
      { question: "Where can I find C Programming lab programs for BMSCE?", answer: "C Programming lab programs with solutions are available at Notes CSBS. We provide complete lab manual programs, viva questions, and practice problems." }
    ],
    importantQuestions: ["Write a program using pointers", "Implement recursion", "File operations in C", "Structure programs"],
    pyqTopics: ["Pointers", "Arrays", "Recursion", "File handling", "Structures"],
    relatedSubjects: ["PSPL", "DSA", "OOP"],
    longTailKeywords: ["C programming CSBS notes PDF", "PSP VTU lab programs", "C language notes for engineering"]
  },
  EE2: {
    code: "EE2", name: "Basic Electronics", slug: "basic-electronics-notes", semester: 2,
    fullName: "Basic Electronics Engineering", abbreviation: "BE",
    description: "Basic Electronics notes for CSBS at BMSCE covering Semiconductor Diodes, Transistors, Amplifiers, Digital Electronics basics, and Communication Systems.",
    isLab: false,
    units: [
      { number: 1, title: "Semiconductor Diodes", topics: ["PN Junction", "Zener Diode", "Rectifiers", "Filters"], keywords: ["diode notes", "rectifier circuits"] },
      { number: 2, title: "Transistors", topics: ["BJT", "FET", "MOSFET", "Biasing Circuits"], keywords: ["transistor notes", "BJT biasing"] },
      { number: 3, title: "Amplifiers", topics: ["CE Amplifier", "CC Amplifier", "Feedback Amplifiers", "Oscillators"], keywords: ["amplifier notes", "oscillator circuits"] },
      { number: 4, title: "Digital Electronics Basics", topics: ["Number Systems", "Logic Gates", "Boolean Algebra", "K-Map"], keywords: ["digital electronics basics", "logic gates notes"] },
      { number: 5, title: "Communication Systems", topics: ["Modulation", "AM", "FM", "Antenna Basics"], keywords: ["communication systems notes", "modulation"] }
    ],
    keywords: ["Basic Electronics notes CSBS", "Electronics notes BMSCE", "VTU electronics PYQ"],
    topics: ["Diodes", "Transistors", "Amplifiers", "Digital Electronics", "Communication"],
    faqs: [{ question: "What is covered in Basic Electronics for CSBS?", answer: "Basic Electronics covers Semiconductor Diodes, Transistors, Amplifiers, Digital Electronics Basics, and Communication Systems." }],
    importantQuestions: ["Explain PN junction diode", "BJT biasing", "CE amplifier analysis", "Boolean algebra simplification"],
    pyqTopics: ["Rectifiers", "Transistor biasing", "Amplifiers", "Logic gates"],
    relatedSubjects: ["EE1", "DE"],
    longTailKeywords: ["Basic Electronics CSBS notes PDF", "electronics VTU notes"]
  },
  CCP: {
    code: "CCP", name: "Constitution of India & Professional Ethics", slug: "constitution-notes", semester: 2,
    fullName: "Constitution of India, Professional Ethics & Cyber Law", abbreviation: "COI",
    description: "Constitution of India and Professional Ethics notes for CSBS at BMSCE covering Fundamental Rights, Directive Principles, Parliamentary System, Professional Ethics, and Cyber Law.",
    isLab: false,
    units: [
      { number: 1, title: "Indian Constitution", topics: ["Preamble", "Fundamental Rights", "DPSP", "Fundamental Duties"], keywords: ["Indian constitution notes"] },
      { number: 2, title: "Union Government", topics: ["Parliament", "President", "Prime Minister", "Supreme Court"], keywords: ["union government notes"] },
      { number: 3, title: "State Government", topics: ["Governor", "Chief Minister", "High Court", "Legislature"], keywords: ["state government notes"] },
      { number: 4, title: "Professional Ethics", topics: ["Engineering Ethics", "Code of Conduct", "Moral Values"], keywords: ["professional ethics notes"] },
      { number: 5, title: "Cyber Law", topics: ["IT Act 2000", "Cyber Crime", "Digital Signatures", "E-Commerce Law"], keywords: ["cyber law notes", "IT Act notes"] }
    ],
    keywords: ["Constitution notes CSBS", "Professional Ethics notes BMSCE", "Cyber Law notes VTU"],
    topics: ["Constitution", "Fundamental Rights", "Professional Ethics", "Cyber Law"],
    faqs: [{ question: "What is covered in Constitution of India for CSBS?", answer: "The subject covers the Indian Constitution, Union and State Governments, Professional Ethics, and Cyber Law including the IT Act 2000." }],
    importantQuestions: ["Explain Fundamental Rights", "Describe the Parliamentary system", "IT Act 2000 provisions"],
    pyqTopics: ["Fundamental Rights", "DPSP", "Professional Ethics", "Cyber Law"],
    relatedSubjects: [],
    longTailKeywords: ["Constitution of India CSBS notes", "professional ethics engineering notes"]
  },

  // ── SEMESTER 3 ──
  MA3: {
    code: "MA3", name: "Mathematics III", slug: "mathematics-3-notes", semester: 3,
    fullName: "Mathematics III - Transform Calculus and Numerical Techniques", abbreviation: "M3",
    description: "Mathematics III notes for CSBS covering Transform Calculus, Z-Transforms, Statistical Methods, Curve Fitting, and Complex Analysis. Essential mathematical tools for computer science applications.",
    isLab: false,
    units: [
      { number: 1, title: "Fourier Transforms", topics: ["Fourier Transform", "Inverse Fourier Transform", "Properties", "Convolution"], keywords: ["Fourier transform notes"] },
      { number: 2, title: "Z-Transforms", topics: ["Z-Transform", "Inverse Z-Transform", "Properties", "Applications"], keywords: ["Z transform notes"] },
      { number: 3, title: "Statistical Methods", topics: ["Correlation", "Regression", "Curve Fitting", "Least Squares"], keywords: ["statistics notes", "correlation regression"] },
      { number: 4, title: "Probability Theory", topics: ["Joint Probability", "Sampling Theory", "Hypothesis Testing", "Chi-Square Test"], keywords: ["probability theory notes", "hypothesis testing"] },
      { number: 5, title: "Complex Analysis", topics: ["Analytic Functions", "Cauchy-Riemann Equations", "Conformal Mapping", "Residue Theorem"], keywords: ["complex analysis notes", "Cauchy Riemann"] }
    ],
    keywords: ["Mathematics III notes", "M3 notes CSBS", "Statistics notes VTU", "Complex Analysis BMSCE"],
    topics: ["Transforms", "Z-Transform", "Statistics", "Probability", "Complex Analysis"],
    faqs: [
      { question: "What is covered in Mathematics III for CSBS?", answer: "M3 covers Fourier Transforms, Z-Transforms, Statistical Methods including Correlation and Regression, Probability Theory, and Complex Analysis." },
      { question: "How important is Statistics in M3 for CSBS?", answer: "Statistics is crucial for CSBS as it bridges mathematics with Business Analytics and Machine Learning. Topics like Correlation, Regression, and Curve Fitting are directly applicable." }
    ],
    importantQuestions: ["Find Fourier transform", "Solve using Z-transform", "Fit a curve using least squares", "Verify Cauchy-Riemann equations"],
    pyqTopics: ["Z-transforms", "Curve fitting", "Statistical methods", "Complex analysis"],
    relatedSubjects: ["MA2", "MA4"],
    longTailKeywords: ["Mathematics III CSBS notes PDF", "statistical methods notes VTU", "Z transform solved problems"]
  },
  DSA: {
    code: "DSA", name: "Data Structures and Algorithms", slug: "dsa-notes", semester: 3,
    fullName: "Data Structures and Algorithms", abbreviation: "DSA",
    description: "Comprehensive Data Structures and Algorithms (DSA) notes for CSBS students at BMSCE. Covers Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Searching, Sorting, and Hashing with complexity analysis. Includes lab programs, PYQs, important questions, and handwritten notes for VTU DSA.",
    isLab: false,
    units: [
      { number: 1, title: "Arrays and Searching/Sorting", topics: ["Arrays", "Linear Search", "Binary Search", "Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Complexity Analysis", "Big O Notation"], keywords: ["DSA arrays notes", "sorting algorithms notes", "binary search notes", "Big O notation"] },
      { number: 2, title: "Stacks and Queues", topics: ["Stack Operations", "Stack Applications", "Infix to Postfix", "Queue Operations", "Circular Queue", "Priority Queue", "Deque"], keywords: ["stack notes", "queue notes", "infix postfix conversion"] },
      { number: 3, title: "Linked Lists", topics: ["Singly Linked List", "Doubly Linked List", "Circular Linked List", "Operations", "Applications"], keywords: ["linked list notes", "doubly linked list implementation"] },
      { number: 4, title: "Trees", topics: ["Binary Tree", "BST", "AVL Tree", "Tree Traversals", "Heap", "B-Tree", "Expression Trees"], keywords: ["binary tree notes", "AVL tree notes", "BST operations", "tree traversals"] },
      { number: 5, title: "Graphs and Hashing", topics: ["Graph Representation", "BFS", "DFS", "Shortest Path", "MST", "Hashing", "Collision Resolution"], keywords: ["graph algorithms notes", "BFS DFS notes", "hashing notes", "Dijkstra algorithm"] }
    ],
    keywords: ["DSA notes", "Data Structures notes CSBS", "algorithms notes BMSCE", "DSA PYQ VTU", "DSA question bank", "DSA handwritten notes", "DSA important questions"],
    topics: ["Arrays", "Stack", "Queue", "Linked List", "Trees", "Graphs", "Searching", "Sorting", "Hashing", "Complexity Analysis"],
    faqs: [
      { question: "What is covered in DSA for CSBS?", answer: "DSA covers Arrays, Searching & Sorting algorithms, Stacks, Queues, Linked Lists, Trees (Binary, BST, AVL), Graphs (BFS, DFS, Shortest Path), and Hashing with complexity analysis using Big O notation." },
      { question: "How to prepare for DSA exam at BMSCE?", answer: "Focus on implementing data structures from scratch, understand time/space complexity, practice tree traversals and graph algorithms, and solve PYQs from Notes CSBS. Lab programs are essential for practical understanding." },
      { question: "Where can I find DSA lab programs for CSBS?", answer: "Complete DSA lab programs with solutions, including stack, queue, linked list, tree, and graph implementations, are available at Notes CSBS (notescsbs.vercel.app/subject/DSAL)." },
      { question: "What is the difference between DSA in CSBS and CSE?", answer: "CSBS DSA covers the same core data structures and algorithms as CSE, with equal emphasis on implementation and problem-solving. CSBS students additionally learn to apply these concepts in business contexts." }
    ],
    importantQuestions: ["Implement binary search tree operations", "Write BFS and DFS algorithms", "Implement AVL tree rotation", "Compare sorting algorithms", "Hash table with collision resolution"],
    pyqTopics: ["BST operations", "Tree traversals", "Graph algorithms", "Sorting complexity", "Hashing techniques"],
    relatedSubjects: ["DSAL", "OOP", "PSP"],
    longTailKeywords: ["DSA notes CSBS BMSCE PDF", "data structures VTU solved papers", "DSA lab programs CSBS", "DSA important questions VTU"]
  },
  OOP: {
    code: "OOP", name: "Object Oriented Programming with C++", slug: "oop-notes", semester: 3,
    fullName: "Object Oriented Programming with C++", abbreviation: "OOP",
    description: "OOP with C++ notes for CSBS at BMSCE. Complete coverage of Classes, Objects, Inheritance, Polymorphism, Encapsulation, Abstraction, Templates, Exception Handling, STL, and File I/O. Lab programs and PYQs included.",
    isLab: false,
    units: [
      { number: 1, title: "Classes and Objects", topics: ["Classes", "Objects", "Constructors", "Destructors", "Friend Functions", "this Pointer"], keywords: ["C++ classes notes", "constructors destructors"] },
      { number: 2, title: "Inheritance", topics: ["Single Inheritance", "Multiple Inheritance", "Multilevel Inheritance", "Hierarchical Inheritance", "Virtual Base Class"], keywords: ["inheritance notes", "C++ inheritance types"] },
      { number: 3, title: "Polymorphism", topics: ["Function Overloading", "Operator Overloading", "Virtual Functions", "Pure Virtual Functions", "Abstract Classes"], keywords: ["polymorphism notes", "virtual functions C++", "operator overloading"] },
      { number: 4, title: "Templates and Exception Handling", topics: ["Function Templates", "Class Templates", "try-catch", "throw", "Custom Exceptions"], keywords: ["C++ templates notes", "exception handling notes"] },
      { number: 5, title: "STL and File I/O", topics: ["Vectors", "Lists", "Maps", "Sets", "Iterators", "File Streams", "fstream"], keywords: ["STL notes", "C++ file handling", "vector map set"] }
    ],
    keywords: ["OOP notes", "C++ notes CSBS", "OOP BMSCE PYQ", "object oriented programming notes", "C++ programs CSBS"],
    topics: ["Classes", "Inheritance", "Polymorphism", "Encapsulation", "Abstraction", "Templates", "STL"],
    faqs: [
      { question: "What is covered in OOP with C++ for CSBS?", answer: "OOP covers Classes & Objects, Inheritance (all types), Polymorphism (function/operator overloading, virtual functions), Templates, Exception Handling, STL, and File I/O." },
      { question: "How to prepare for OOP exam?", answer: "Practice writing C++ programs for each OOP concept, understand virtual function mechanism, master STL containers, and solve PYQs from Notes CSBS." }
    ],
    importantQuestions: ["Implement multiple inheritance", "Demonstrate operator overloading", "Virtual function example", "Template class implementation", "STL programs"],
    pyqTopics: ["Inheritance programs", "Virtual functions", "Operator overloading", "Templates", "STL"],
    relatedSubjects: ["OOPL", "PSP", "DSA"],
    longTailKeywords: ["OOP with C++ CSBS notes PDF", "C++ programming BMSCE notes", "OOP VTU lab programs"]
  },
  DE: {
    code: "DE", name: "Digital Electronics", slug: "digital-electronics-notes", semester: 3,
    fullName: "Digital Electronics and Logic Design", abbreviation: "DE",
    description: "Digital Electronics notes for CSBS at BMSCE covering Number Systems, Logic Gates, Boolean Algebra, Combinational Circuits, Sequential Circuits, and Programmable Logic Devices.",
    isLab: false,
    units: [
      { number: 1, title: "Number Systems and Codes", topics: ["Binary", "Octal", "Hexadecimal", "BCD", "Gray Code", "Error Detection"], keywords: ["number systems notes", "binary conversions"] },
      { number: 2, title: "Logic Gates and Boolean Algebra", topics: ["AND", "OR", "NOT", "NAND", "NOR", "XOR", "Boolean Theorems", "K-Map"], keywords: ["logic gates notes", "Boolean algebra", "K-map simplification"] },
      { number: 3, title: "Combinational Circuits", topics: ["Adders", "Subtractors", "Multiplexers", "Demultiplexers", "Encoders", "Decoders"], keywords: ["combinational circuits notes", "multiplexer notes"] },
      { number: 4, title: "Sequential Circuits", topics: ["Flip-Flops", "SR", "JK", "D", "T", "Counters", "Registers", "Shift Registers"], keywords: ["sequential circuits notes", "flip-flop notes", "counters"] },
      { number: 5, title: "Programmable Logic Devices", topics: ["PLA", "PAL", "FPGA", "Memory Devices"], keywords: ["PLD notes", "FPGA basics"] }
    ],
    keywords: ["Digital Electronics notes CSBS", "DE notes BMSCE", "logic design notes VTU"],
    topics: ["Number Systems", "Logic Gates", "Boolean Algebra", "K-Map", "Flip-Flops", "Counters"],
    faqs: [{ question: "What is covered in Digital Electronics for CSBS?", answer: "DE covers Number Systems, Logic Gates, Boolean Algebra, K-Map simplification, Combinational Circuits, Sequential Circuits (Flip-Flops, Counters), and Programmable Logic Devices." }],
    importantQuestions: ["Simplify using K-map", "Design a counter", "Implement multiplexer", "Flip-flop conversions"],
    pyqTopics: ["K-Map simplification", "Counter design", "Flip-flop conversions", "Combinational circuits"],
    relatedSubjects: ["COA", "EE2"],
    longTailKeywords: ["Digital Electronics CSBS notes PDF", "logic design VTU notes"]
  },
  UNIX: {
    code: "UNIX", name: "Unix Programming", slug: "unix-programming-notes", semester: 3,
    fullName: "Unix Programming and Shell Scripting", abbreviation: "UNIX",
    description: "Unix Programming notes for CSBS at BMSCE covering Unix commands, Shell Scripting, File System, Process Management, and System Administration basics.",
    isLab: false,
    units: [
      { number: 1, title: "Unix Fundamentals", topics: ["Unix Architecture", "File System", "Basic Commands", "File Permissions"], keywords: ["Unix basics notes", "Unix commands"] },
      { number: 2, title: "Shell Programming", topics: ["Shell Variables", "Control Structures", "Loops", "Functions", "Shell Scripts"], keywords: ["shell scripting notes", "bash programming"] },
      { number: 3, title: "Filters and Text Processing", topics: ["grep", "sed", "awk", "sort", "cut", "Regular Expressions"], keywords: ["Unix filters notes", "grep sed awk notes"] },
      { number: 4, title: "Process Management", topics: ["Process Creation", "fork", "exec", "wait", "Signals", "IPC"], keywords: ["Unix process management", "fork exec"] },
      { number: 5, title: "System Administration", topics: ["User Management", "Backup", "Cron Jobs", "Networking Commands"], keywords: ["Unix admin notes", "cron jobs"] }
    ],
    keywords: ["Unix Programming notes CSBS", "Shell Scripting notes BMSCE", "Unix commands VTU"],
    topics: ["Unix Commands", "Shell Scripting", "Filters", "Process Management", "Administration"],
    faqs: [{ question: "What is covered in Unix Programming for CSBS?", answer: "Unix Programming covers Unix Fundamentals, Shell Programming (bash), Text Processing filters (grep, sed, awk), Process Management (fork, exec), and System Administration." }],
    importantQuestions: ["Write shell scripts", "Explain file permissions", "Process management using fork", "Text processing with awk"],
    pyqTopics: ["Shell scripts", "Unix commands", "Process management", "Text processing"],
    relatedSubjects: ["OS", "PSP"],
    longTailKeywords: ["Unix Programming CSBS notes PDF", "shell scripting VTU notes"]
  },

  // ── SEMESTER 4 ──
  MA4: {
    code: "MA4", name: "Mathematics IV", slug: "mathematics-4-notes", semester: 4,
    fullName: "Mathematics IV - Complex Analysis, Probability and Statistics", abbreviation: "M4",
    description: "Mathematics IV notes for CSBS covering Complex Analysis, Probability Distributions, Sampling Theory, Statistical Inference, and Stochastic Processes.",
    isLab: false,
    units: [
      { number: 1, title: "Complex Integration", topics: ["Cauchy's Integral Theorem", "Cauchy's Integral Formula", "Taylor Series", "Laurent Series"], keywords: ["complex integration notes"] },
      { number: 2, title: "Residue Calculus", topics: ["Residues", "Poles", "Contour Integration", "Applications"], keywords: ["residue theorem notes"] },
      { number: 3, title: "Probability Distributions", topics: ["Binomial", "Poisson", "Normal", "Exponential", "Uniform"], keywords: ["probability distributions notes"] },
      { number: 4, title: "Sampling and Estimation", topics: ["Sampling Theory", "Central Limit Theorem", "Confidence Intervals", "Point Estimation"], keywords: ["sampling theory notes"] },
      { number: 5, title: "Testing of Hypothesis", topics: ["t-test", "Chi-Square Test", "F-test", "ANOVA", "Significance Tests"], keywords: ["hypothesis testing notes", "t-test chi-square"] }
    ],
    keywords: ["Mathematics IV notes CSBS", "M4 notes BMSCE", "Statistics notes VTU", "Probability notes CSBS"],
    topics: ["Complex Integration", "Residues", "Probability", "Sampling", "Hypothesis Testing"],
    faqs: [{ question: "What is covered in Mathematics IV for CSBS?", answer: "M4 covers Complex Integration, Residue Calculus, Probability Distributions, Sampling & Estimation, and Hypothesis Testing." }],
    importantQuestions: ["Evaluate using Cauchy's integral formula", "Find residues", "Hypothesis testing problems", "Probability distribution problems"],
    pyqTopics: ["Complex integration", "Probability distributions", "Hypothesis testing"],
    relatedSubjects: ["MA3"],
    longTailKeywords: ["Mathematics IV CSBS notes PDF", "statistics VTU solved papers"]
  },
  DBMS: {
    code: "DBMS", name: "Database Management Systems", slug: "dbms-notes", semester: 4,
    fullName: "Database Management Systems", abbreviation: "DBMS",
    description: "Comprehensive Database Management Systems (DBMS) notes for CSBS at BMSCE. Covers ER Model, Relational Algebra, SQL, Normalization, Transaction Management, Concurrency Control, and Recovery. Includes lab programs with SQL queries, PYQs, important questions, and handwritten notes for VTU DBMS.",
    isLab: false,
    units: [
      { number: 1, title: "Introduction and ER Model", topics: ["Database Concepts", "DBMS Architecture", "Data Models", "ER Diagram", "Enhanced ER Model", "Schema Mapping"], keywords: ["DBMS introduction notes", "ER model notes", "ER diagram examples"] },
      { number: 2, title: "Relational Model and SQL", topics: ["Relational Algebra", "Relational Calculus", "SQL Queries", "DDL", "DML", "DCL", "Joins", "Subqueries", "Views"], keywords: ["SQL notes", "relational algebra notes", "SQL joins", "SQL queries examples"] },
      { number: 3, title: "Normalization", topics: ["Functional Dependencies", "1NF", "2NF", "3NF", "BCNF", "4NF", "5NF", "Decomposition", "Lossless Join"], keywords: ["normalization notes", "BCNF notes", "functional dependencies"] },
      { number: 4, title: "Transaction Management", topics: ["ACID Properties", "Serializability", "Concurrency Control", "Two-Phase Locking", "Timestamp Ordering", "Deadlock"], keywords: ["transaction management notes", "ACID properties", "concurrency control", "deadlock handling"] },
      { number: 5, title: "Recovery and Storage", topics: ["Recovery Techniques", "Log-Based Recovery", "Checkpoints", "File Organization", "Indexing", "B+ Tree"], keywords: ["DBMS recovery notes", "B+ tree indexing", "file organization"] }
    ],
    keywords: ["DBMS notes", "Database notes CSBS", "DBMS BMSCE PYQ", "SQL notes VTU", "DBMS question bank", "DBMS handwritten notes", "DBMS important questions", "DBMS lab programs"],
    topics: ["ER Model", "SQL", "Normalization", "Transactions", "Concurrency", "Recovery", "Indexing", "ACID Properties"],
    faqs: [
      { question: "What is covered in DBMS for CSBS?", answer: "DBMS covers ER Model, Relational Model, SQL (DDL, DML, DCL), Normalization (1NF to BCNF), Transaction Management (ACID Properties), Concurrency Control, Recovery, and Indexing (B+ Trees)." },
      { question: "How to prepare for DBMS exam at BMSCE?", answer: "Master ER diagrams, practice SQL queries extensively, understand normalization with examples, study ACID properties and concurrency control protocols. Lab SQL programs are very important for both CIE and SEE." },
      { question: "Where can I find DBMS lab programs for CSBS?", answer: "Complete DBMS lab programs including table creation, SQL queries, joins, views, triggers, and PL/SQL are available at Notes CSBS (notescsbs.vercel.app/subject/DBMSL)." },
      { question: "What is normalization in DBMS?", answer: "Normalization is the process of organizing database tables to minimize redundancy. It involves converting tables to 1NF, 2NF, 3NF, and BCNF by identifying and removing partial and transitive dependencies." }
    ],
    importantQuestions: ["Draw ER diagram for given scenario", "Write SQL queries with joins", "Normalize a relation to BCNF", "Explain ACID properties with examples", "B+ Tree insertion and deletion"],
    pyqTopics: ["ER diagram drawing", "SQL queries", "Normalization", "ACID properties", "Concurrency control", "B+ Tree"],
    relatedSubjects: ["DBMSL", "OS"],
    longTailKeywords: ["DBMS notes CSBS BMSCE PDF", "DBMS VTU solved papers", "SQL notes for CSBS", "DBMS important questions with answers", "DBMS notes PDF VTU download"]
  },
  COA: {
    code: "COA", name: "Computer Organization and Architecture", slug: "coa-notes", semester: 4,
    fullName: "Computer Organization and Architecture", abbreviation: "COA",
    description: "Computer Organization and Architecture notes for CSBS at BMSCE covering CPU Design, Memory Organization, I/O Systems, Pipelining, and Instruction Set Architecture.",
    isLab: false,
    units: [
      { number: 1, title: "Basic Computer Organization", topics: ["Von Neumann Architecture", "Instruction Cycle", "Bus Structure", "Register Organization"], keywords: ["computer organization notes", "Von Neumann architecture"] },
      { number: 2, title: "CPU Design", topics: ["ALU Design", "Control Unit", "Microprogramming", "Hardwired Control"], keywords: ["CPU design notes", "ALU design"] },
      { number: 3, title: "Memory Organization", topics: ["Cache Memory", "Virtual Memory", "Memory Hierarchy", "Associative Memory"], keywords: ["memory organization notes", "cache memory", "virtual memory"] },
      { number: 4, title: "I/O Organization", topics: ["I/O Interface", "DMA", "Interrupts", "I/O Processor"], keywords: ["I/O organization notes", "DMA"] },
      { number: 5, title: "Pipelining", topics: ["Instruction Pipelining", "Hazards", "RISC vs CISC", "Parallel Processing"], keywords: ["pipelining notes", "RISC CISC comparison"] }
    ],
    keywords: ["COA notes CSBS", "Computer Organization notes BMSCE", "CPU architecture notes VTU"],
    topics: ["CPU Design", "Memory", "I/O", "Pipelining", "RISC CISC"],
    faqs: [{ question: "What is covered in COA for CSBS?", answer: "COA covers Basic Computer Organization, CPU Design, Memory Organization (Cache, Virtual Memory), I/O Organization, and Pipelining." }],
    importantQuestions: ["Cache memory mapping", "Pipeline hazards", "RISC vs CISC comparison", "DMA transfer"],
    pyqTopics: ["Cache memory", "Pipelining", "Memory mapping", "I/O"],
    relatedSubjects: ["DE", "OS"],
    longTailKeywords: ["COA CSBS notes PDF", "computer organization VTU notes"]
  },
  OS: {
    code: "OS", name: "Operating Systems", slug: "os-notes", semester: 4,
    fullName: "Operating Systems", abbreviation: "OS",
    description: "Operating Systems notes for CSBS at BMSCE covering Process Management, CPU Scheduling, Deadlock, Memory Management, Paging, Segmentation, Virtual Memory, File Systems, and Disk Scheduling. Lab manual with scheduling and memory management programs included.",
    isLab: false,
    units: [
      { number: 1, title: "Process Management", topics: ["Process Concepts", "Process States", "PCB", "Threads", "Multithreading Models", "IPC"], keywords: ["OS process management notes", "process states", "threads notes", "IPC mechanisms"] },
      { number: 2, title: "CPU Scheduling", topics: ["FCFS", "SJF", "Priority", "Round Robin", "Multilevel Queue", "Scheduling Criteria", "Gantt Charts"], keywords: ["CPU scheduling notes", "round robin scheduling", "SJF algorithm", "scheduling algorithms"] },
      { number: 3, title: "Deadlock", topics: ["Deadlock Conditions", "Resource Allocation Graph", "Banker's Algorithm", "Deadlock Detection", "Deadlock Prevention", "Deadlock Avoidance"], keywords: ["deadlock notes", "Banker's algorithm", "deadlock prevention"] },
      { number: 4, title: "Memory Management", topics: ["Paging", "Segmentation", "Virtual Memory", "Page Replacement", "FIFO", "LRU", "Optimal", "Thrashing"], keywords: ["memory management notes", "paging notes", "virtual memory", "page replacement algorithms", "LRU FIFO"] },
      { number: 5, title: "File and Disk Management", topics: ["File System", "Directory Structure", "File Allocation", "Disk Scheduling", "FCFS", "SCAN", "C-SCAN", "LOOK"], keywords: ["file system notes", "disk scheduling algorithms", "SCAN algorithm"] }
    ],
    keywords: ["Operating Systems notes", "OS notes CSBS", "OS BMSCE PYQ", "CPU scheduling notes VTU", "deadlock notes", "memory management notes", "OS lab programs"],
    topics: ["Process Management", "CPU Scheduling", "Deadlock", "Memory Management", "Paging", "Virtual Memory", "File Systems"],
    faqs: [
      { question: "What is covered in Operating Systems for CSBS?", answer: "OS covers Process Management, CPU Scheduling algorithms, Deadlock handling (Banker's Algorithm), Memory Management (Paging, Segmentation, Virtual Memory), and File/Disk Management." },
      { question: "How to prepare for OS exam?", answer: "Practice scheduling algorithms with Gantt charts, solve Banker's algorithm problems, understand page replacement algorithms (FIFO, LRU, Optimal), and solve PYQs from Notes CSBS." },
      { question: "Where can I find OS lab programs for CSBS?", answer: "OS lab programs including CPU scheduling, page replacement, and disk scheduling implementations are available at Notes CSBS (notescsbs.vercel.app/subject/OSL)." }
    ],
    importantQuestions: ["Solve CPU scheduling problems", "Apply Banker's algorithm", "Calculate page faults", "Disk scheduling algorithms", "Process synchronization"],
    pyqTopics: ["CPU scheduling", "Banker's algorithm", "Page replacement", "Disk scheduling", "Deadlock"],
    relatedSubjects: ["OSL", "COA", "UNIX"],
    longTailKeywords: ["Operating Systems CSBS notes PDF", "OS VTU solved papers", "CPU scheduling notes PDF", "deadlock notes CSBS"]
  },
  FABS: {
    code: "FABS", name: "Financial Accounting & Business Statistics", slug: "fabs-notes", semester: 4,
    fullName: "Financial Accounting and Business Statistics", abbreviation: "FABS",
    description: "Financial Accounting and Business Statistics (FABS) notes for CSBS at BMSCE. Covers Financial Statements, Ratio Analysis, Cost Accounting, Budgeting, Probability, and Statistical Analysis. Essential business fundamentals for CSBS.",
    isLab: false,
    units: [
      { number: 1, title: "Financial Accounting", topics: ["Double Entry System", "Journal Entries", "Ledger", "Trial Balance", "Financial Statements"], keywords: ["financial accounting notes", "journal entries"] },
      { number: 2, title: "Financial Statement Analysis", topics: ["Ratio Analysis", "Liquidity Ratios", "Profitability Ratios", "Leverage Ratios", "Balance Sheet Analysis"], keywords: ["ratio analysis notes", "financial statement analysis"] },
      { number: 3, title: "Cost Accounting", topics: ["Cost Classification", "Cost Sheet", "Marginal Costing", "Break-Even Analysis"], keywords: ["cost accounting notes", "break-even analysis"] },
      { number: 4, title: "Business Statistics", topics: ["Measures of Central Tendency", "Dispersion", "Skewness", "Kurtosis", "Correlation"], keywords: ["business statistics notes", "measures of central tendency"] },
      { number: 5, title: "Statistical Analysis", topics: ["Regression Analysis", "Time Series", "Index Numbers", "Probability", "Decision Theory"], keywords: ["regression analysis notes", "time series analysis"] }
    ],
    keywords: ["FABS notes CSBS", "Financial Accounting notes BMSCE", "Business Statistics notes VTU", "FABS PYQ"],
    topics: ["Financial Accounting", "Ratio Analysis", "Cost Accounting", "Business Statistics", "Regression"],
    faqs: [
      { question: "What is FABS in CSBS?", answer: "FABS (Financial Accounting and Business Statistics) is a unique CSBS subject combining Financial Accounting, Statement Analysis, Cost Accounting, Business Statistics, and Regression Analysis. It bridges CS and business domains." },
      { question: "Why do CSBS students study Financial Accounting?", answer: "CSBS (Computer Science and Business Systems) integrates business knowledge with CS. FABS provides essential understanding of financial statements, cost analysis, and statistical methods used in business decision-making." }
    ],
    importantQuestions: ["Prepare financial statements", "Calculate financial ratios", "Break-even analysis", "Regression analysis problems"],
    pyqTopics: ["Financial statements", "Ratio analysis", "Cost sheet", "Statistical measures", "Regression"],
    relatedSubjects: ["BA", "OB"],
    longTailKeywords: ["FABS notes CSBS PDF", "Financial Accounting BMSCE notes", "Business Statistics VTU notes"]
  },

  // ── SEMESTER 5 ──
  CN: {
    code: "CN", name: "Computer Networks", slug: "computer-networks-notes", semester: 5,
    fullName: "Computer Networks", abbreviation: "CN",
    description: "Computer Networks notes for CSBS at BMSCE covering OSI Model, TCP/IP, Physical Layer, Data Link Layer, Network Layer, Transport Layer, Application Layer, Routing Algorithms, and Network Security. Lab programs included.",
    isLab: false,
    units: [
      { number: 1, title: "Introduction and Physical Layer", topics: ["OSI Model", "TCP/IP Model", "Network Topologies", "Transmission Media", "Switching", "Multiplexing"], keywords: ["OSI model notes", "TCP IP model", "network topologies", "switching techniques"] },
      { number: 2, title: "Data Link Layer", topics: ["Error Detection", "Error Correction", "Flow Control", "Sliding Window", "HDLC", "PPP", "MAC Protocols"], keywords: ["data link layer notes", "sliding window protocol", "error detection"] },
      { number: 3, title: "Network Layer", topics: ["IP Addressing", "Subnetting", "Routing Algorithms", "OSPF", "BGP", "RIP", "IPv6", "ICMP"], keywords: ["network layer notes", "subnetting notes", "routing algorithms", "OSPF BGP"] },
      { number: 4, title: "Transport Layer", topics: ["TCP", "UDP", "Congestion Control", "Flow Control", "Connection Management", "Socket Programming"], keywords: ["transport layer notes", "TCP UDP notes", "congestion control"] },
      { number: 5, title: "Application Layer", topics: ["DNS", "HTTP", "HTTPS", "FTP", "SMTP", "DHCP", "Network Security Basics"], keywords: ["application layer notes", "DNS HTTP notes", "network security"] }
    ],
    keywords: ["Computer Networks notes", "CN notes CSBS", "CN BMSCE PYQ", "networking notes VTU", "OSI model notes", "TCP IP notes"],
    topics: ["OSI Model", "TCP/IP", "Routing", "Subnetting", "Congestion Control", "DNS", "HTTP"],
    faqs: [
      { question: "What is covered in Computer Networks for CSBS?", answer: "CN covers OSI and TCP/IP models, Physical Layer, Data Link Layer, Network Layer (Routing, Subnetting), Transport Layer (TCP, UDP), and Application Layer (DNS, HTTP)." },
      { question: "How to prepare for CN exam?", answer: "Understand the OSI model layers thoroughly, practice subnetting problems, study routing algorithms (OSPF, RIP), and understand TCP congestion control mechanisms. PYQs from Notes CSBS are essential." }
    ],
    importantQuestions: ["Explain OSI model layers", "Solve subnetting problems", "Compare TCP and UDP", "Explain routing algorithms", "DNS resolution process"],
    pyqTopics: ["OSI model", "Subnetting", "TCP vs UDP", "Routing", "Congestion control"],
    relatedSubjects: ["CNL", "IS"],
    longTailKeywords: ["Computer Networks CSBS notes PDF", "CN VTU solved papers", "networking notes BMSCE"]
  },
  SE: {
    code: "SE", name: "Software Engineering", slug: "software-engineering-notes", semester: 5,
    fullName: "Software Engineering", abbreviation: "SE",
    description: "Software Engineering notes for CSBS at BMSCE covering SDLC, Agile, Requirements Engineering, System Design, Testing, and Software Project Management.",
    isLab: false,
    units: [
      { number: 1, title: "Introduction to SE", topics: ["Software Process", "SDLC Models", "Waterfall", "Spiral", "Agile", "Scrum"], keywords: ["SDLC models notes", "Agile methodology", "Scrum"] },
      { number: 2, title: "Requirements Engineering", topics: ["SRS", "Functional Requirements", "Non-Functional Requirements", "Use Case Diagrams"], keywords: ["requirements engineering notes", "SRS document"] },
      { number: 3, title: "Design", topics: ["Software Architecture", "Design Patterns", "UML Diagrams", "Class Diagrams", "Sequence Diagrams"], keywords: ["software design notes", "UML diagrams", "design patterns"] },
      { number: 4, title: "Testing", topics: ["Unit Testing", "Integration Testing", "System Testing", "Black Box", "White Box", "Test Cases"], keywords: ["software testing notes", "black box white box testing"] },
      { number: 5, title: "Project Management", topics: ["Project Planning", "Risk Management", "COCOMO Model", "Estimation", "Quality Assurance"], keywords: ["project management notes", "COCOMO model", "risk management"] }
    ],
    keywords: ["Software Engineering notes CSBS", "SE notes BMSCE", "SDLC notes VTU", "Agile notes"],
    topics: ["SDLC", "Agile", "Requirements", "Design", "Testing", "Project Management"],
    faqs: [{ question: "What is covered in Software Engineering for CSBS?", answer: "SE covers Software Process Models (Waterfall, Agile, Scrum), Requirements Engineering, System Design (UML), Software Testing, and Project Management (COCOMO)." }],
    importantQuestions: ["Compare SDLC models", "Draw UML diagrams", "Explain testing techniques", "COCOMO model calculation"],
    pyqTopics: ["SDLC models", "UML diagrams", "Testing", "COCOMO"],
    relatedSubjects: ["WEB", "AI"],
    longTailKeywords: ["Software Engineering CSBS notes PDF", "SE VTU notes", "Agile Scrum notes"]
  },
  AI: {
    code: "AI", name: "Artificial Intelligence", slug: "ai-notes", semester: 5,
    fullName: "Artificial Intelligence", abbreviation: "AI",
    description: "Artificial Intelligence notes for CSBS at BMSCE covering Search Algorithms, Knowledge Representation, Machine Learning basics, Expert Systems, Natural Language Processing, and Game Playing.",
    isLab: false,
    units: [
      { number: 1, title: "Introduction to AI", topics: ["AI History", "Intelligent Agents", "Problem Formulation", "State Space"], keywords: ["AI introduction notes", "intelligent agents"] },
      { number: 2, title: "Search Algorithms", topics: ["BFS", "DFS", "A* Algorithm", "Hill Climbing", "Simulated Annealing", "Minimax"], keywords: ["AI search algorithms", "A star algorithm", "minimax"] },
      { number: 3, title: "Knowledge Representation", topics: ["Propositional Logic", "Predicate Logic", "Semantic Networks", "Frames", "Ontologies"], keywords: ["knowledge representation notes", "predicate logic"] },
      { number: 4, title: "Machine Learning Basics", topics: ["Supervised Learning", "Unsupervised Learning", "Decision Trees", "Neural Networks"], keywords: ["AI machine learning basics", "decision trees"] },
      { number: 5, title: "Expert Systems and NLP", topics: ["Expert System Architecture", "Rule-Based Systems", "NLP Basics", "Game Playing"], keywords: ["expert systems notes", "NLP basics"] }
    ],
    keywords: ["Artificial Intelligence notes CSBS", "AI notes BMSCE", "AI PYQ VTU", "search algorithms notes"],
    topics: ["Search Algorithms", "Knowledge Representation", "ML Basics", "Expert Systems", "NLP"],
    faqs: [{ question: "What is covered in AI for CSBS?", answer: "AI covers Intelligent Agents, Search Algorithms (BFS, DFS, A*), Knowledge Representation, Machine Learning Basics, Expert Systems, and NLP." }],
    importantQuestions: ["Solve using A* algorithm", "Minimax with alpha-beta pruning", "Knowledge representation using predicate logic"],
    pyqTopics: ["A* algorithm", "Minimax", "Knowledge representation", "Decision trees"],
    relatedSubjects: ["ML", "BA"],
    longTailKeywords: ["Artificial Intelligence CSBS notes PDF", "AI VTU notes", "search algorithms notes"]
  },
  WEB: {
    code: "WEB", name: "Web Technologies", slug: "web-technologies-notes", semester: 5,
    fullName: "Web Technologies", abbreviation: "WT",
    description: "Web Technologies notes for CSBS at BMSCE covering HTML, CSS, JavaScript, PHP, Node.js, React, Database Connectivity, and Web Security.",
    isLab: false,
    units: [
      { number: 1, title: "HTML and CSS", topics: ["HTML5", "Semantic HTML", "CSS3", "Flexbox", "Grid", "Responsive Design"], keywords: ["HTML CSS notes", "responsive design"] },
      { number: 2, title: "JavaScript", topics: ["DOM", "Events", "AJAX", "ES6", "Promises", "Async/Await"], keywords: ["JavaScript notes", "DOM manipulation", "AJAX"] },
      { number: 3, title: "Server-Side Programming", topics: ["PHP", "Node.js", "Express", "REST API", "MVC Pattern"], keywords: ["PHP notes", "Node.js notes", "REST API"] },
      { number: 4, title: "Database Connectivity", topics: ["MySQL", "MongoDB", "CRUD Operations", "ORM"], keywords: ["database connectivity notes", "MySQL PHP"] },
      { number: 5, title: "Frameworks and Security", topics: ["React", "Angular", "Web Security", "HTTPS", "Authentication"], keywords: ["React notes", "web security notes"] }
    ],
    keywords: ["Web Technologies notes CSBS", "HTML CSS notes BMSCE", "JavaScript notes VTU"],
    topics: ["HTML", "CSS", "JavaScript", "PHP", "Node.js", "React", "Web Security"],
    faqs: [{ question: "What is covered in Web Technologies for CSBS?", answer: "Web Tech covers HTML5/CSS3, JavaScript (ES6, AJAX), Server-Side Programming (PHP, Node.js), Database Connectivity, and Web Frameworks (React) with Security." }],
    importantQuestions: ["Build responsive webpage", "AJAX implementation", "REST API design", "Database CRUD operations"],
    pyqTopics: ["HTML CSS", "JavaScript DOM", "PHP programs", "REST API"],
    relatedSubjects: ["WEBL", "SE"],
    longTailKeywords: ["Web Technologies CSBS notes PDF", "HTML CSS JavaScript notes VTU"]
  },
  BA: {
    code: "BA", name: "Business Analytics", slug: "business-analytics-notes", semester: 5,
    fullName: "Business Analytics", abbreviation: "BA",
    description: "Business Analytics notes for CSBS at BMSCE covering Data Analytics, Visualization, Predictive Analytics, Decision Making, and Business Intelligence tools.",
    isLab: false,
    units: [
      { number: 1, title: "Introduction to Business Analytics", topics: ["Analytics Overview", "Types of Analytics", "Data-Driven Decision Making", "Business Intelligence"], keywords: ["business analytics introduction", "BI notes"] },
      { number: 2, title: "Data Visualization", topics: ["Charts", "Graphs", "Dashboards", "Tableau", "Power BI"], keywords: ["data visualization notes", "Tableau notes"] },
      { number: 3, title: "Descriptive Analytics", topics: ["Statistical Analysis", "Data Mining", "Clustering", "Association Rules"], keywords: ["descriptive analytics notes", "data mining"] },
      { number: 4, title: "Predictive Analytics", topics: ["Regression Models", "Time Series", "Forecasting", "Classification"], keywords: ["predictive analytics notes", "forecasting"] },
      { number: 5, title: "Prescriptive Analytics", topics: ["Optimization", "Simulation", "Decision Trees", "Linear Programming"], keywords: ["prescriptive analytics notes", "optimization"] }
    ],
    keywords: ["Business Analytics notes CSBS", "BA notes BMSCE", "analytics notes VTU", "data visualization notes"],
    topics: ["Data Analytics", "Visualization", "Predictive Analytics", "Decision Making", "BI"],
    faqs: [{ question: "What is Business Analytics in CSBS?", answer: "BA covers Data Analytics fundamentals, Data Visualization (Tableau, Power BI), Descriptive Analytics, Predictive Analytics (Regression, Forecasting), and Prescriptive Analytics (Optimization)." }],
    importantQuestions: ["Types of analytics with examples", "Data visualization techniques", "Regression analysis", "Decision tree analysis"],
    pyqTopics: ["Analytics types", "Visualization", "Regression", "Decision trees"],
    relatedSubjects: ["FABS", "ML"],
    longTailKeywords: ["Business Analytics CSBS notes PDF", "BA VTU notes", "data analytics notes engineering"]
  },

  // ── SEMESTER 6 ──
  ML: {
    code: "ML", name: "Machine Learning", slug: "machine-learning-notes", semester: 6,
    fullName: "Machine Learning", abbreviation: "ML",
    description: "Machine Learning notes for CSBS at BMSCE covering Supervised Learning, Unsupervised Learning, Regression, Classification, Clustering, Neural Networks, Deep Learning basics, and Evaluation Metrics. Lab programs with Python implementations included.",
    isLab: false,
    units: [
      { number: 1, title: "Introduction to ML", topics: ["ML Types", "Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Bias-Variance Tradeoff"], keywords: ["machine learning introduction", "supervised unsupervised learning"] },
      { number: 2, title: "Regression and Classification", topics: ["Linear Regression", "Logistic Regression", "Decision Trees", "Random Forest", "SVM", "KNN"], keywords: ["regression notes", "classification algorithms", "SVM notes", "decision tree"] },
      { number: 3, title: "Clustering and Dimensionality Reduction", topics: ["K-Means", "Hierarchical Clustering", "DBSCAN", "PCA", "t-SNE"], keywords: ["clustering notes", "K-means algorithm", "PCA notes"] },
      { number: 4, title: "Neural Networks", topics: ["Perceptron", "MLP", "Backpropagation", "Activation Functions", "CNN basics", "RNN basics"], keywords: ["neural networks notes", "backpropagation", "deep learning basics"] },
      { number: 5, title: "Evaluation and Applications", topics: ["Confusion Matrix", "ROC Curve", "Cross Validation", "Feature Engineering", "ML Applications"], keywords: ["ML evaluation metrics", "confusion matrix", "cross validation"] }
    ],
    keywords: ["Machine Learning notes CSBS", "ML notes BMSCE", "ML PYQ VTU", "neural networks notes", "Python ML programs"],
    topics: ["Regression", "Classification", "Clustering", "Neural Networks", "Deep Learning", "Evaluation"],
    faqs: [
      { question: "What is covered in Machine Learning for CSBS?", answer: "ML covers Supervised Learning (Regression, Classification), Unsupervised Learning (Clustering, PCA), Neural Networks (Perceptron, MLP, CNN, RNN), and Model Evaluation (Confusion Matrix, ROC, Cross Validation)." },
      { question: "Where can I find ML lab programs for CSBS?", answer: "ML lab programs with Python implementations (scikit-learn, TensorFlow) are available at Notes CSBS (notescsbs.vercel.app/subject/MLL)." }
    ],
    importantQuestions: ["Implement linear regression", "K-means clustering algorithm", "Neural network backpropagation", "SVM classification", "Evaluate model using confusion matrix"],
    pyqTopics: ["Linear regression", "Decision trees", "K-means", "Neural networks", "Evaluation metrics"],
    relatedSubjects: ["MLL", "AI", "BA"],
    longTailKeywords: ["Machine Learning CSBS notes PDF", "ML VTU notes", "neural networks notes CSBS", "Python ML programs BMSCE"]
  },
  CC: {
    code: "CC", name: "Cloud Computing", slug: "cloud-computing-notes", semester: 6,
    fullName: "Cloud Computing", abbreviation: "CC",
    description: "Cloud Computing notes for CSBS at BMSCE covering Cloud Architecture, Virtualization, AWS, Azure, GCP, Service Models (IaaS, PaaS, SaaS), Deployment Models, and Cloud Security.",
    isLab: false,
    units: [
      { number: 1, title: "Cloud Fundamentals", topics: ["Cloud Definition", "Characteristics", "Service Models", "Deployment Models"], keywords: ["cloud computing basics", "IaaS PaaS SaaS"] },
      { number: 2, title: "Virtualization", topics: ["Types of Virtualization", "Hypervisors", "Containers", "Docker"], keywords: ["virtualization notes", "Docker containers"] },
      { number: 3, title: "Cloud Architecture", topics: ["Cloud Reference Architecture", "SLA", "QoS", "Cloud Storage"], keywords: ["cloud architecture notes", "SLA"] },
      { number: 4, title: "Cloud Platforms", topics: ["AWS", "Azure", "Google Cloud", "Cloud Services"], keywords: ["AWS notes", "Azure notes", "GCP notes"] },
      { number: 5, title: "Cloud Security", topics: ["Security Threats", "Identity Management", "Encryption", "Compliance"], keywords: ["cloud security notes", "encryption"] }
    ],
    keywords: ["Cloud Computing notes CSBS", "CC notes BMSCE", "cloud notes VTU", "AWS Azure notes"],
    topics: ["Cloud Architecture", "Virtualization", "AWS", "Azure", "Security", "SaaS PaaS IaaS"],
    faqs: [{ question: "What is covered in Cloud Computing for CSBS?", answer: "CC covers Cloud Fundamentals, Virtualization (Docker), Cloud Architecture, Cloud Platforms (AWS, Azure, GCP), and Cloud Security." }],
    importantQuestions: ["Compare IaaS PaaS SaaS", "Explain virtualization types", "Cloud security mechanisms"],
    pyqTopics: ["Service models", "Virtualization", "Cloud platforms", "Security"],
    relatedSubjects: ["IS", "ML"],
    longTailKeywords: ["Cloud Computing CSBS notes PDF", "CC VTU notes", "AWS Azure notes engineering"]
  },
  IS: {
    code: "IS", name: "Information Security", slug: "information-security-notes", semester: 6,
    fullName: "Information Security", abbreviation: "IS",
    description: "Information Security notes for CSBS at BMSCE covering Cryptography, Network Security, Web Security, Digital Signatures, Firewalls, and Cyber Security fundamentals.",
    isLab: false,
    units: [
      { number: 1, title: "Security Fundamentals", topics: ["CIA Triad", "Security Attacks", "Security Services", "Security Mechanisms"], keywords: ["information security basics", "CIA triad"] },
      { number: 2, title: "Cryptography", topics: ["Symmetric Encryption", "AES", "DES", "Asymmetric Encryption", "RSA", "Diffie-Hellman"], keywords: ["cryptography notes", "AES DES RSA", "encryption"] },
      { number: 3, title: "Authentication and Hashing", topics: ["Hash Functions", "SHA", "MD5", "Digital Signatures", "Certificates", "PKI"], keywords: ["digital signatures notes", "hashing algorithms"] },
      { number: 4, title: "Network Security", topics: ["Firewalls", "IDS", "IPS", "VPN", "SSL/TLS", "IPSec"], keywords: ["network security notes", "firewall IDS"] },
      { number: 5, title: "Web and Application Security", topics: ["SQL Injection", "XSS", "CSRF", "OWASP", "Security Auditing"], keywords: ["web security notes", "SQL injection", "OWASP"] }
    ],
    keywords: ["Information Security notes CSBS", "IS notes BMSCE", "cryptography notes VTU", "cyber security notes"],
    topics: ["Cryptography", "Network Security", "Web Security", "Digital Signatures", "Firewalls"],
    faqs: [{ question: "What is covered in Information Security for CSBS?", answer: "IS covers Security Fundamentals (CIA Triad), Cryptography (AES, RSA), Authentication & Hashing, Network Security (Firewalls, VPN), and Web Security (SQL Injection, XSS)." }],
    importantQuestions: ["RSA algorithm example", "AES encryption process", "Firewall types", "Digital signature mechanism"],
    pyqTopics: ["RSA algorithm", "AES DES", "Firewalls", "Digital signatures", "Web security"],
    relatedSubjects: ["CN", "CC"],
    longTailKeywords: ["Information Security CSBS notes PDF", "cryptography VTU notes", "cyber security notes CSBS"]
  },
  OB: {
    code: "OB", name: "Organizational Behavior", slug: "organizational-behavior-notes", semester: 6,
    fullName: "Organizational Behavior", abbreviation: "OB",
    description: "Organizational Behavior notes for CSBS at BMSCE covering Individual Behavior, Group Dynamics, Leadership, Motivation, Communication, Organizational Culture, and Change Management.",
    isLab: false,
    units: [
      { number: 1, title: "Introduction to OB", topics: ["OB Concepts", "Individual Behavior", "Personality", "Perception", "Attitudes"], keywords: ["organizational behavior basics", "personality types"] },
      { number: 2, title: "Motivation and Learning", topics: ["Maslow's Hierarchy", "Herzberg's Theory", "McClelland's Theory", "Learning Theories"], keywords: ["motivation theories notes", "Maslow hierarchy"] },
      { number: 3, title: "Group Dynamics", topics: ["Group Formation", "Team Building", "Group Decision Making", "Conflict Management"], keywords: ["group dynamics notes", "team building"] },
      { number: 4, title: "Leadership", topics: ["Leadership Styles", "Transformational Leadership", "Situational Leadership", "Power and Politics"], keywords: ["leadership theories notes", "leadership styles"] },
      { number: 5, title: "Organizational Culture", topics: ["Culture Types", "Change Management", "Organizational Development", "Stress Management"], keywords: ["organizational culture notes", "change management"] }
    ],
    keywords: ["Organizational Behavior notes CSBS", "OB notes BMSCE", "management notes VTU", "leadership notes"],
    topics: ["Individual Behavior", "Motivation", "Group Dynamics", "Leadership", "Organizational Culture"],
    faqs: [{ question: "What is covered in Organizational Behavior for CSBS?", answer: "OB covers Individual Behavior, Motivation Theories (Maslow, Herzberg), Group Dynamics, Leadership Styles, and Organizational Culture & Change Management." }],
    importantQuestions: ["Explain Maslow's hierarchy", "Leadership styles comparison", "Conflict management strategies", "Change management models"],
    pyqTopics: ["Motivation theories", "Leadership", "Group dynamics", "Organizational culture"],
    relatedSubjects: ["FABS", "BA"],
    longTailKeywords: ["Organizational Behavior CSBS notes PDF", "OB VTU notes", "management notes CSBS"]
  },
  MP: {
    code: "MP", name: "Mini Project", slug: "mini-project", semester: 6,
    fullName: "Mini Project", abbreviation: "MP",
    description: "Mini Project resources for CSBS at BMSCE including project ideas, report templates, presentation guides, and evaluation criteria.",
    isLab: true,
    units: [{ number: 1, title: "Project Work", topics: ["Project Selection", "Literature Survey", "Implementation", "Report Writing", "Presentation"], keywords: ["mini project ideas CSBS"] }],
    keywords: ["Mini Project CSBS", "project ideas BMSCE", "CSBS project report"],
    topics: ["Project Ideas", "Report Writing", "Presentation"],
    faqs: [{ question: "How to choose a mini project for CSBS?", answer: "Choose projects that combine CS and business domains. Popular ideas include ML-based analytics tools, web applications, IoT projects, and data visualization dashboards." }],
    importantQuestions: [],
    pyqTopics: [],
    relatedSubjects: ["PRJ", "PRJF"],
    longTailKeywords: ["CSBS mini project ideas BMSCE", "mini project report template"]
  },

  // ── SEMESTER 7 ──
  BD: {
    code: "BD", name: "Big Data Analytics", slug: "big-data-notes", semester: 7,
    fullName: "Big Data Analytics", abbreviation: "BDA",
    description: "Big Data Analytics notes for CSBS at BMSCE covering Hadoop, MapReduce, HDFS, Spark, NoSQL databases, and Big Data processing techniques.",
    isLab: false,
    units: [
      { number: 1, title: "Big Data Fundamentals", topics: ["5 V's of Big Data", "Big Data Ecosystem", "Challenges"], keywords: ["big data introduction", "5 V's of big data"] },
      { number: 2, title: "Hadoop Ecosystem", topics: ["Hadoop Architecture", "HDFS", "YARN", "MapReduce", "Hive", "Pig"], keywords: ["Hadoop notes", "HDFS notes", "MapReduce"] },
      { number: 3, title: "Apache Spark", topics: ["Spark Architecture", "RDD", "DataFrames", "Spark SQL", "Spark Streaming"], keywords: ["Apache Spark notes", "RDD notes"] },
      { number: 4, title: "NoSQL Databases", topics: ["MongoDB", "Cassandra", "HBase", "Key-Value Stores", "Document Stores"], keywords: ["NoSQL notes", "MongoDB notes"] },
      { number: 5, title: "Big Data Analytics", topics: ["Data Mining", "Predictive Analytics", "Real-Time Analytics", "Visualization"], keywords: ["big data analytics notes", "real-time analytics"] }
    ],
    keywords: ["Big Data notes CSBS", "Hadoop notes BMSCE", "Spark notes VTU", "MapReduce notes"],
    topics: ["Hadoop", "MapReduce", "Spark", "NoSQL", "HDFS", "Data Mining"],
    faqs: [{ question: "What is covered in Big Data Analytics for CSBS?", answer: "BDA covers Big Data Fundamentals, Hadoop (HDFS, MapReduce), Apache Spark (RDD, DataFrames), NoSQL Databases (MongoDB, Cassandra), and Analytics techniques." }],
    importantQuestions: ["Explain Hadoop architecture", "MapReduce word count example", "Compare SQL and NoSQL", "Spark RDD operations"],
    pyqTopics: ["Hadoop architecture", "MapReduce", "Spark", "NoSQL comparison"],
    relatedSubjects: ["ML", "BA"],
    longTailKeywords: ["Big Data Analytics CSBS notes PDF", "Hadoop MapReduce notes VTU"]
  },
  IOT: {
    code: "IOT", name: "Internet of Things", slug: "iot-notes", semester: 7,
    fullName: "Internet of Things", abbreviation: "IoT",
    description: "Internet of Things (IoT) notes for CSBS at BMSCE covering IoT Architecture, Sensors, Arduino, Raspberry Pi, Communication Protocols, Cloud Integration, and IoT Security.",
    isLab: false,
    units: [
      { number: 1, title: "IoT Fundamentals", topics: ["IoT Architecture", "IoT Reference Model", "Design Principles", "IoT Applications"], keywords: ["IoT introduction notes", "IoT architecture"] },
      { number: 2, title: "Sensors and Actuators", topics: ["Types of Sensors", "Actuators", "Signal Conditioning", "ADC DAC"], keywords: ["sensors actuators notes", "IoT sensors"] },
      { number: 3, title: "IoT Platforms", topics: ["Arduino", "Raspberry Pi", "ESP32", "IoT Development Boards"], keywords: ["Arduino notes", "Raspberry Pi notes"] },
      { number: 4, title: "Communication Protocols", topics: ["MQTT", "CoAP", "Bluetooth", "Zigbee", "LoRa", "WiFi"], keywords: ["MQTT notes", "IoT protocols"] },
      { number: 5, title: "IoT Cloud and Security", topics: ["Cloud Integration", "AWS IoT", "Azure IoT", "IoT Security", "Privacy"], keywords: ["IoT cloud notes", "IoT security"] }
    ],
    keywords: ["IoT notes CSBS", "Internet of Things notes BMSCE", "Arduino notes VTU", "IoT PYQ"],
    topics: ["IoT Architecture", "Sensors", "Arduino", "Raspberry Pi", "MQTT", "Cloud IoT"],
    faqs: [{ question: "What is covered in IoT for CSBS?", answer: "IoT covers IoT Architecture, Sensors & Actuators, IoT Platforms (Arduino, Raspberry Pi), Communication Protocols (MQTT, CoAP), and Cloud Integration with Security." }],
    importantQuestions: ["IoT architecture layers", "Compare IoT protocols", "Arduino programming", "IoT security challenges"],
    pyqTopics: ["IoT architecture", "Protocols", "Arduino programs", "IoT applications"],
    relatedSubjects: ["BD", "CC"],
    longTailKeywords: ["Internet of Things CSBS notes PDF", "IoT VTU notes", "Arduino Raspberry Pi notes"]
  },

  // ── LAB SUBJECTS ──
  PHY1L: { code: "PHY1L", name: "Engineering Physics Lab", slug: "physics-lab", semester: 1, fullName: "Engineering Physics Laboratory", abbreviation: "PHY LAB", description: "Engineering Physics Lab manual for CSBS at BMSCE with experiments on Laser, Fiber Optics, and Semiconductor devices.", isLab: true, units: [{ number: 1, title: "Lab Experiments", topics: ["Laser Wavelength", "Optical Fiber NA", "Semiconductor Band Gap", "Diffraction"], keywords: ["physics lab manual CSBS"] }], keywords: ["Physics Lab CSBS", "physics experiments BMSCE"], topics: ["Laser", "Fiber Optics", "Semiconductor"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["PHY1"], longTailKeywords: ["physics lab manual CSBS PDF"] },
  CIV1L: { code: "CIV1L", name: "Civil Engineering Lab", slug: "civil-lab", semester: 1, fullName: "Civil Engineering Laboratory", abbreviation: "CIV LAB", description: "Civil Engineering Lab manual for CSBS at BMSCE.", isLab: true, units: [{ number: 1, title: "Lab Experiments", topics: ["Surveying Experiments", "Material Testing"], keywords: ["civil lab manual CSBS"] }], keywords: ["Civil Lab CSBS", "civil experiments BMSCE"], topics: ["Surveying", "Material Testing"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["CIV1"], longTailKeywords: ["civil lab manual CSBS PDF"] },
  PSPL: { code: "PSPL", name: "C Programming Lab", slug: "c-programming-lab", semester: 2, fullName: "C Programming Laboratory", abbreviation: "C LAB", description: "C Programming Lab manual for CSBS at BMSCE with complete lab programs, solutions, and viva questions.", isLab: true, units: [{ number: 1, title: "Lab Programs", topics: ["Arrays", "Strings", "Functions", "Pointers", "Structures", "File Handling"], keywords: ["C lab programs CSBS"] }], keywords: ["C Programming Lab CSBS", "C lab programs BMSCE", "C programs VTU"], topics: ["C Programs", "Lab Manual"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["PSP"], longTailKeywords: ["C programming lab manual CSBS PDF"] },
  CHE2L: { code: "CHE2L", name: "Chemistry Lab", slug: "chemistry-lab", semester: 2, fullName: "Engineering Chemistry Laboratory", abbreviation: "CHEM LAB", description: "Engineering Chemistry Lab manual for CSBS at BMSCE.", isLab: true, units: [{ number: 1, title: "Lab Experiments", topics: ["Electrochemistry", "Water Analysis", "Polymer Experiments"], keywords: ["chemistry lab manual CSBS"] }], keywords: ["Chemistry Lab CSBS", "chemistry experiments BMSCE"], topics: ["Electrochemistry", "Water Analysis"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["CHE2"], longTailKeywords: ["chemistry lab manual CSBS PDF"] },
  DSAL: { code: "DSAL", name: "DSA Lab", slug: "dsa-lab", semester: 3, fullName: "Data Structures and Algorithms Laboratory", abbreviation: "DSA LAB", description: "DSA Lab manual for CSBS at BMSCE with implementations of Stack, Queue, Linked List, Trees, Graphs, Searching, and Sorting algorithms.", isLab: true, units: [{ number: 1, title: "Lab Programs", topics: ["Stack", "Queue", "Linked List", "BST", "BFS DFS", "Sorting", "Searching"], keywords: ["DSA lab programs CSBS", "data structures lab manual"] }], keywords: ["DSA Lab CSBS", "DSA programs BMSCE", "data structures lab VTU"], topics: ["Stack", "Queue", "Linked List", "Trees", "Graphs"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["DSA"], longTailKeywords: ["DSA lab programs CSBS PDF", "data structures lab manual BMSCE"] },
  OOPL: { code: "OOPL", name: "OOP Lab", slug: "oop-lab", semester: 3, fullName: "Object Oriented Programming Laboratory", abbreviation: "OOP LAB", description: "OOP Lab manual for CSBS at BMSCE with C++ programs for Inheritance, Polymorphism, Templates, and STL.", isLab: true, units: [{ number: 1, title: "Lab Programs", topics: ["Classes", "Inheritance", "Polymorphism", "Templates", "File I/O", "STL"], keywords: ["OOP lab programs CSBS", "C++ lab manual"] }], keywords: ["OOP Lab CSBS", "C++ programs BMSCE", "OOP lab VTU"], topics: ["C++ Programs", "OOP Concepts"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["OOP"], longTailKeywords: ["OOP lab programs CSBS PDF", "C++ lab manual BMSCE"] },
  DBMSL: { code: "DBMSL", name: "DBMS Lab", slug: "dbms-lab", semester: 4, fullName: "Database Management Systems Laboratory", abbreviation: "DBMS LAB", description: "DBMS Lab manual for CSBS at BMSCE with SQL programs, table creation, joins, views, triggers, PL/SQL, and cursor programs.", isLab: true, units: [{ number: 1, title: "Lab Programs", topics: ["SQL DDL DML", "Joins", "Views", "Triggers", "PL/SQL", "Cursors", "Stored Procedures"], keywords: ["DBMS lab programs CSBS", "SQL lab manual", "PL/SQL programs"] }], keywords: ["DBMS Lab CSBS", "SQL programs BMSCE", "DBMS lab VTU"], topics: ["SQL", "PL/SQL", "Triggers", "Cursors"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["DBMS"], longTailKeywords: ["DBMS lab programs CSBS PDF", "SQL lab manual BMSCE"] },
  OSL: { code: "OSL", name: "OS Lab", slug: "os-lab", semester: 4, fullName: "Operating Systems Laboratory", abbreviation: "OS LAB", description: "OS Lab manual for CSBS at BMSCE with programs for CPU scheduling, page replacement, disk scheduling, and process synchronization.", isLab: true, units: [{ number: 1, title: "Lab Programs", topics: ["CPU Scheduling", "Page Replacement", "Disk Scheduling", "Producer Consumer", "Banker's Algorithm"], keywords: ["OS lab programs CSBS", "scheduling lab programs"] }], keywords: ["OS Lab CSBS", "OS programs BMSCE", "OS lab VTU"], topics: ["Scheduling", "Memory Management", "Disk"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["OS"], longTailKeywords: ["OS lab programs CSBS PDF", "scheduling algorithms lab manual"] },
  CNL: { code: "CNL", name: "CN Lab", slug: "cn-lab", semester: 5, fullName: "Computer Networks Laboratory", abbreviation: "CN LAB", description: "CN Lab manual for CSBS at BMSCE with socket programming, routing protocols, and network simulation programs.", isLab: true, units: [{ number: 1, title: "Lab Programs", topics: ["Socket Programming", "TCP UDP", "Routing Protocols", "Network Simulation", "Wireshark"], keywords: ["CN lab programs CSBS", "socket programming lab"] }], keywords: ["CN Lab CSBS", "networking programs BMSCE", "CN lab VTU"], topics: ["Socket Programming", "Routing", "Simulation"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["CN"], longTailKeywords: ["CN lab programs CSBS PDF", "socket programming lab manual"] },
  WEBL: { code: "WEBL", name: "Web Technologies Lab", slug: "web-tech-lab", semester: 5, fullName: "Web Technologies Laboratory", abbreviation: "WT LAB", description: "Web Technologies Lab manual for CSBS at BMSCE with HTML, CSS, JavaScript, PHP, and MySQL programs.", isLab: true, units: [{ number: 1, title: "Lab Programs", topics: ["HTML Pages", "CSS Styling", "JavaScript Programs", "PHP Programs", "MySQL Integration"], keywords: ["web tech lab programs CSBS", "HTML CSS lab"] }], keywords: ["Web Lab CSBS", "web programs BMSCE", "web lab VTU"], topics: ["HTML", "CSS", "JS", "PHP", "MySQL"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["WEB"], longTailKeywords: ["web technologies lab programs CSBS PDF"] },
  MLL: { code: "MLL", name: "ML Lab", slug: "ml-lab", semester: 6, fullName: "Machine Learning Laboratory", abbreviation: "ML LAB", description: "ML Lab manual for CSBS at BMSCE with Python implementations of regression, classification, clustering, and neural network algorithms.", isLab: true, units: [{ number: 1, title: "Lab Programs", topics: ["Linear Regression", "KNN", "SVM", "Decision Tree", "K-Means", "Neural Network", "scikit-learn"], keywords: ["ML lab programs CSBS", "Python ML programs"] }], keywords: ["ML Lab CSBS", "ML programs BMSCE", "ML lab VTU", "Python ML programs"], topics: ["Python ML", "scikit-learn", "Classification", "Clustering"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["ML"], longTailKeywords: ["ML lab programs CSBS PDF", "machine learning lab manual Python"] },

  // Remaining semester 7 & 8 subjects
  PE1: { code: "PE1", name: "Professional Elective 1", slug: "professional-elective-1", semester: 7, fullName: "Professional Elective 1", abbreviation: "PE1", description: "Professional Elective 1 notes for CSBS at BMSCE.", isLab: false, units: [{ number: 1, title: "Elective Topics", topics: ["Domain Specific Topics"], keywords: ["professional elective CSBS"] }], keywords: ["Professional Elective CSBS", "PE1 BMSCE"], topics: ["Elective"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["PE2", "PE3"], longTailKeywords: ["professional elective CSBS notes"] },
  OE1: { code: "OE1", name: "Open Elective 1", slug: "open-elective-1", semester: 7, fullName: "Open Elective 1", abbreviation: "OE1", description: "Open Elective 1 notes for CSBS at BMSCE.", isLab: false, units: [{ number: 1, title: "Elective Topics", topics: ["Interdisciplinary Topics"], keywords: ["open elective CSBS"] }], keywords: ["Open Elective CSBS", "OE1 BMSCE"], topics: ["Elective"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: [], longTailKeywords: ["open elective CSBS notes"] },
  PRJ: { code: "PRJ", name: "Project Phase 1", slug: "project-phase-1", semester: 7, fullName: "Project Phase 1", abbreviation: "PRJ", description: "Project Phase 1 resources for CSBS at BMSCE.", isLab: true, units: [{ number: 1, title: "Project Work", topics: ["Project Proposal", "Literature Survey", "System Design"], keywords: ["CSBS project phase 1"] }], keywords: ["Project Phase 1 CSBS", "CSBS project BMSCE"], topics: ["Project"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["PRJF", "MP"], longTailKeywords: ["CSBS project report BMSCE"] },
  PE2: { code: "PE2", name: "Professional Elective 2", slug: "professional-elective-2", semester: 8, fullName: "Professional Elective 2", abbreviation: "PE2", description: "Professional Elective 2 notes for CSBS at BMSCE.", isLab: false, units: [{ number: 1, title: "Elective Topics", topics: ["Advanced Topics"], keywords: ["professional elective 2 CSBS"] }], keywords: ["Professional Elective 2 CSBS"], topics: ["Elective"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["PE1", "PE3"], longTailKeywords: ["PE2 CSBS notes"] },
  PE3: { code: "PE3", name: "Professional Elective 3", slug: "professional-elective-3", semester: 8, fullName: "Professional Elective 3", abbreviation: "PE3", description: "Professional Elective 3 notes for CSBS at BMSCE.", isLab: false, units: [{ number: 1, title: "Elective Topics", topics: ["Specialization Topics"], keywords: ["professional elective 3 CSBS"] }], keywords: ["Professional Elective 3 CSBS"], topics: ["Elective"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["PE1", "PE2"], longTailKeywords: ["PE3 CSBS notes"] },
  PRJF: { code: "PRJF", name: "Project Phase 2", slug: "project-phase-2", semester: 8, fullName: "Project Phase 2 (Final)", abbreviation: "PRJ2", description: "Final Project resources for CSBS at BMSCE.", isLab: true, units: [{ number: 1, title: "Project Work", topics: ["Implementation", "Testing", "Documentation", "Presentation"], keywords: ["CSBS final project"] }], keywords: ["Project Phase 2 CSBS", "final project BMSCE"], topics: ["Project"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: ["PRJ", "MP"], longTailKeywords: ["CSBS final project report"] },
  INT: { code: "INT", name: "Internship", slug: "internship", semester: 8, fullName: "Internship", abbreviation: "INT", description: "Internship resources for CSBS at BMSCE.", isLab: true, units: [{ number: 1, title: "Internship", topics: ["Industry Experience", "Report Writing", "Presentation"], keywords: ["CSBS internship BMSCE"] }], keywords: ["Internship CSBS", "CSBS internship BMSCE"], topics: ["Internship"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: [], longTailKeywords: ["CSBS internship report template BMSCE"] },
  SEM: { code: "SEM", name: "Seminar", slug: "seminar", semester: 8, fullName: "Seminar", abbreviation: "SEM", description: "Seminar resources for CSBS at BMSCE.", isLab: true, units: [{ number: 1, title: "Seminar", topics: ["Topic Selection", "Research", "Presentation"], keywords: ["CSBS seminar topics"] }], keywords: ["Seminar CSBS", "seminar topics BMSCE"], topics: ["Seminar"], faqs: [], importantQuestions: [], pyqTopics: [], relatedSubjects: [], longTailKeywords: ["CSBS seminar topics BMSCE"] },
};

// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────

export function getSubjectSEO(code: string): SubjectSEO | undefined {
  return SUBJECT_SEO[code];
}

export function getSubjectsBySemester(sem: number): SubjectSEO[] {
  return Object.values(SUBJECT_SEO).filter(s => s.semester === sem);
}

export function getSemesterSEO(sem: number): SemesterSEO | undefined {
  return SEMESTER_SEO[sem];
}

export function getAllSubjectCodes(): string[] {
  return Object.keys(SUBJECT_SEO);
}

export function getAllKeywords(): string[] {
  return [
    ...COLLEGE_KEYWORDS,
    ...BRANCH_KEYWORDS,
    ...UNIVERSITY_KEYWORDS,
    ...SEARCH_INTENT_KEYWORDS,
    ...LONG_TAIL_KEYWORDS,
    ...ENGINEERING_BROAD_KEYWORDS,
    ...PROTOCOL_PATTERN_KEYWORDS,
    ...ALL_ENGINEERING_SUBJECTS,
    ...BEST_WEBSITE_KEYWORDS,
    ...EXAM_PATTERN_KEYWORDS,
    ...COMPETITIVE_KEYWORDS,
  ];
}

/** Generate a massive semantic paragraph for a given subject */
export function generateSubjectParagraph(code: string): string {
  const subj = SUBJECT_SEO[code];
  if (!subj) return "";
  const unitTopics = subj.units.map(u => `Unit ${u.number} (${u.title}): ${u.topics.join(", ")}`).join(". ");
  return `${subj.fullName} (${subj.code}) is a ${subj.isLab ? "laboratory" : "core theory"} subject offered in Semester ${subj.semester} of the Computer Science and Business Systems (CSBS) program at BMS College of Engineering (BMSCE), Bengaluru, affiliated to Visvesvaraya Technological University (VTU). ${subj.description} The syllabus covers: ${unitTopics}. Students can access free PDF notes, handwritten notes, topper notes, previous year question papers (PYQs), CIE (Continuous Internal Evaluation) papers, SEE (Semester End Examination) papers, question banks, important questions with answers, and lab manuals for ${subj.name} at Notes CSBS (notescsbs.vercel.app). Topics include ${subj.topics.join(", ")}. Related subjects: ${subj.relatedSubjects.join(", ") || "None"}. Keywords: ${subj.keywords.join(", ")}.`;
}

/** Generate massive semantic content for a semester */
export function generateSemesterParagraph(sem: number): string {
  const semData = SEMESTER_SEO[sem];
  if (!semData) return "";
  const subjects = getSubjectsBySemester(sem);
  const subjectNames = subjects.filter(s => !s.isLab).map(s => `${s.name} (${s.code})`).join(", ");
  const labNames = subjects.filter(s => s.isLab).map(s => `${s.name} (${s.code})`).join(", ");
  return `Semester ${sem} of the Computer Science and Business Systems (CSBS) program at BMS College of Engineering (BMSCE), Bengaluru, VTU. ${semData.description} Theory subjects include: ${subjectNames}. Laboratory courses: ${labNames || "None"}. Download free PDF notes, handwritten notes, topper notes, previous year question papers (PYQs), CIE papers, SEE papers, question banks, important questions with answers, lab manuals, and study materials for all Semester ${sem} subjects at Notes CSBS (notescsbs.vercel.app/semester/${sem}). Keywords: ${semData.keywords.join(", ")}.`;
}

export const BASE_URL = "https://notescsbs.vercel.app";
