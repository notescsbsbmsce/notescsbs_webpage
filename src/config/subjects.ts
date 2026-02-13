/**
 * Subject Configuration for BMSCE CSBS
 * Easy to update when new subjects are added
 */

export interface SubjectConfig {
  code: string;
  name: string;
  isLab?: boolean;
}

export const SUBJECTS_BY_SEMESTER: Record<number, SubjectConfig[]> = {
  1: [
    { code: "MA1", name: "Mathematics I" },
    { code: "PHY1", name: "Engineering Physics" },
    { code: "CIV1", name: "Elements of Civil Engineering" },
    { code: "ME1", name: "Elements of Mechanical Engineering" },
    { code: "EE1", name: "Basic Electrical Engineering" },
    { code: "PHY1L", name: "Engineering Physics Lab", isLab: true },
    { code: "CIV1L", name: "Civil Engineering Lab", isLab: true },
  ],
  2: [
    { code: "MA2", name: "Mathematics II" },
    { code: "CHE2", name: "Engineering Chemistry" },
    { code: "PSP", name: "Problem Solving with C" },
    { code: "EE2", name: "Basic Electronics" },
    { code: "CCP", name: "Constitution of India & Professional Ethics" },
    { code: "PSPL", name: "C Programming Lab", isLab: true },
    { code: "CHE2L", name: "Chemistry Lab", isLab: true },
  ],
  3: [
    { code: "MA3", name: "Mathematics III" },
    { code: "DSA", name: "Data Structures and Algorithms" },
    { code: "OOP", name: "Object Oriented Programming with C++" },
    { code: "DE", name: "Digital Electronics" },
    { code: "UNIX", name: "Unix Programming" },
    { code: "DSAL", name: "DSA Lab", isLab: true },
    { code: "OOPL", name: "OOP Lab", isLab: true },
  ],
  4: [
    { code: "MA4", name: "Mathematics IV" },
    { code: "DBMS", name: "Database Management Systems" },
    { code: "COA", name: "Computer Organization and Architecture" },
    { code: "OS", name: "Operating Systems" },
    { code: "FABS", name: "Financial Accounting & Business Statistics" },
    { code: "DBMSL", name: "DBMS Lab", isLab: true },
    { code: "OSL", name: "OS Lab", isLab: true },
  ],
  5: [
    { code: "CN", name: "Computer Networks" },
    { code: "SE", name: "Software Engineering" },
    { code: "AI", name: "Artificial Intelligence" },
    { code: "WEB", name: "Web Technologies" },
    { code: "BA", name: "Business Analytics" },
    { code: "CNL", name: "CN Lab", isLab: true },
    { code: "WEBL", name: "Web Technologies Lab", isLab: true },
  ],
  6: [
    { code: "ML", name: "Machine Learning" },
    { code: "CC", name: "Cloud Computing" },
    { code: "IS", name: "Information Security" },
    { code: "MP", name: "Mini Project" },
    { code: "OB", name: "Organizational Behavior" },
    { code: "MLL", name: "ML Lab", isLab: true },
  ],
  7: [
    { code: "BD", name: "Big Data Analytics" },
    { code: "IOT", name: "Internet of Things" },
    { code: "PE1", name: "Professional Elective 1" },
    { code: "OE1", name: "Open Elective 1" },
    { code: "PRJ", name: "Project Phase 1" },
  ],
  8: [
    { code: "PE2", name: "Professional Elective 2" },
    { code: "PE3", name: "Professional Elective 3" },
    { code: "PRJF", name: "Project Phase 2" },
    { code: "INT", name: "Internship" },
    { code: "SEM", name: "Seminar" },
  ],
};

export const RESOURCE_TYPES = [
  "notes",
  "cie1",
  "cie2",
  "cie3",
  "see",
  "book",
] as const;

export const RESOURCE_TYPE_LABELS: Record<string, string> = {
  notes: "📝 Notes",
  cie1: "📋 CIE-1",
  cie2: "📋 CIE-2",
  cie3: "📋 CIE-3",
  see: "📊 SEE",
  book: "📚 Book",
};

export const UNITS = [1, 2, 3, 4, 5] as const;

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

/**
 * Get subjects for a specific semester
 */
export function getSubjectsForSemester(semester: number): SubjectConfig[] {
  return SUBJECTS_BY_SEMESTER[semester] || [];
}

/**
 * Get subject full name from code and semester
 */
export function getSubjectName(code: string, semester: number): string {
  const subjects = SUBJECTS_BY_SEMESTER[semester] || [];
  const subject = subjects.find((s) => s.code === code);
  return subject?.name || code;
}

/**
 * Get all theory subjects for a semester
 */
export function getTheorySubjects(semester: number): SubjectConfig[] {
  return getSubjectsForSemester(semester).filter((s) => !s.isLab);
}

/**
 * Get all lab subjects for a semester
 */
export function getLabSubjects(semester: number): SubjectConfig[] {
  return getSubjectsForSemester(semester).filter((s) => s.isLab);
}
