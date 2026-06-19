/**
 * HiddenSemesterSEO - Semester page hidden semantic content layer.
 * 
 * Generates 1500+ words of invisible, keyword-rich content for each semester page.
 * Includes subject listings, FAQs, internal links, and keyword clusters.
 * 
 * ZERO visual impact - fully hidden via sr-only CSS.
 */

import {
  SEMESTER_SEO,
  SUBJECT_SEO,
  generateSemesterParagraph,
  generateSubjectParagraph,
  BASE_URL,
  COLLEGE_KEYWORDS,
  BRANCH_KEYWORDS,
} from "@/config/seo-data";

interface Props {
  semester: number;
}

export const HiddenSemesterSEO = ({ semester }: Props) => {
  const semData = SEMESTER_SEO[semester];
  const subjects = Object.values(SUBJECT_SEO).filter(s => s.semester === semester);
  const theorySubjects = subjects.filter(s => !s.isLab);
  const labSubjects = subjects.filter(s => s.isLab);

  if (!semData) return null;

  return (
    <div
      className="sr-only"
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: 0,
      }}
    >
      {/* ── SEMESTER OVERVIEW ── */}
      <article>
        <h2>Semester {semester} - CSBS Notes BMSCE VTU</h2>
        <p>{generateSemesterParagraph(semester)}</p>
        <p>
          Welcome to the Semester {semester} section of Notes CSBS, the definitive academic
          repository for Computer Science and Business Systems (CSBS) students at BMS College
          of Engineering (BMSCE), Bengaluru. Here you will find comprehensive, verified, and
          free study materials including lecture notes, previous year question papers (PYQs),
          CIE papers, SEE papers, question banks, important questions with answers, handwritten
          notes, topper notes, revision notes, and lab manuals for all Semester {semester} subjects.
          All materials are aligned with the latest VTU syllabus (2022 scheme).
        </p>
      </article>

      {/* ── SUBJECT-WISE CONTENT ── */}
      <section>
        <h2>Semester {semester} Subjects - Theory</h2>
        {theorySubjects.map(subj => (
          <article key={subj.code}>
            <h3>
              <a href={`${BASE_URL}/subject/${subj.code}`}>
                {subj.fullName} ({subj.code}) - Notes, PYQ, Important Questions
              </a>
            </h3>
            <p>{generateSubjectParagraph(subj.code)}</p>
            {subj.units.length > 1 && (
              <div>
                <h4>Unit-Wise Topics - {subj.name}</h4>
                <ul>
                  {subj.units.map(unit => (
                    <li key={unit.number}>
                      <strong>Unit {unit.number}: {unit.title}</strong> - {unit.topics.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {subj.importantQuestions.length > 0 && (
              <div>
                <h4>Important Questions - {subj.name}</h4>
                <ol>
                  {subj.importantQuestions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
              </div>
            )}
          </article>
        ))}

        {labSubjects.length > 0 && (
          <div>
            <h2>Semester {semester} - Laboratory Courses</h2>
            {labSubjects.map(subj => (
              <article key={subj.code}>
                <h3>
                  <a href={`${BASE_URL}/subject/${subj.code}`}>
                    {subj.fullName} ({subj.code}) - Lab Manual, Programs, Viva Questions
                  </a>
                </h3>
                <p>{subj.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── SEMESTER FAQs ── */}
      <section>
        <h2>Frequently Asked Questions - Semester {semester} CSBS</h2>
        {semData.faqs.map((faq, i) => (
          <div key={i}>
            <h4>{faq.question}</h4>
            <p>{faq.answer}</p>
          </div>
        ))}
        <div>
          <h4>How to download Semester {semester} notes for CSBS?</h4>
          <p>
            Visit Notes CSBS (notescsbs.vercel.app/semester/{semester}) and select your
            subject. All notes are available as free PDF downloads, organized unit-wise
            for easy access. We provide lecture notes, handwritten notes, topper notes,
            and verified study materials for all Semester {semester} subjects.
          </p>
        </div>
        <div>
          <h4>Are Semester {semester} PYQs available on Notes CSBS?</h4>
          <p>
            Yes, previous year question papers (PYQs) for all Semester {semester} subjects
            are available with solutions. We provide CIE (internal exam) papers and SEE
            (semester end exam) papers from multiple years.
          </p>
        </div>
      </section>

      {/* ── SUBJECT MATRIX TABLE ── */}
      <section>
        <h2>Semester {semester} Subject Overview</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th><th>Subject</th><th>Type</th><th>Notes</th>
              <th>PYQ</th><th>Question Bank</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(subj => (
              <tr key={subj.code}>
                <td>{subj.code}</td>
                <td><a href={`${BASE_URL}/subject/${subj.code}`}>{subj.name}</a></td>
                <td>{subj.isLab ? "Laboratory" : "Theory"}</td>
                <td>Available</td><td>Available</td><td>Available</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── NAVIGATION LINKS ── */}
      <nav>
        <h2>Navigate to Other Semesters</h2>
        <ul>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
            <li key={s}>
              <a href={`${BASE_URL}/semester/${s}`}>
                Semester {s} Notes - CSBS BMSCE VTU
              </a>
            </li>
          ))}
          <li><a href={BASE_URL}>Home - Notes CSBS</a></li>
          <li><a href={`${BASE_URL}/contributors`}>Contributors</a></li>
          <li><a href={`${BASE_URL}/keywords`}>Knowledge Index</a></li>
        </ul>
      </nav>

      {/* ── KEYWORD CLUSTERS ── */}
      <section>
        <p>
          Semester {semester} CSBS BMSCE notes, VTU semester {semester} CSBS study material,
          {theorySubjects.map(s => `${s.name} notes PDF`).join(", ")},
          {theorySubjects.map(s => `${s.name} PYQ`).join(", ")},
          {theorySubjects.map(s => `${s.name} important questions`).join(", ")},
          {theorySubjects.map(s => `${s.name} unit wise notes`).join(", ")},
          {theorySubjects.map(s => `${s.name} question bank`).join(", ")},
          {theorySubjects.map(s => `${s.name} handwritten notes`).join(", ")},
          BMSCE semester {semester} exam preparation, VTU CSBS semester {semester} PYQ with solutions,
          free notes download semester {semester} CSBS, topper notes PDF semester {semester}.
        </p>
        <p>{COLLEGE_KEYWORDS.slice(0, 12).join(", ")}.</p>
        <p>{BRANCH_KEYWORDS.slice(0, 12).join(", ")}.</p>
        <p>{semData.keywords.join(", ")}.</p>
        <p>{semData.longTailKeywords.join(", ")}.</p>
      </section>
    </div>
  );
};
