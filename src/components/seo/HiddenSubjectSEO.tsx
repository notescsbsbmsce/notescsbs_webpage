/**
 * HiddenSubjectSEO - Subject page hidden semantic content layer.
 * 
 * Generates up to 5000 words of invisible, keyword-rich content for subject pages,
 * unit-wise paths, important questions, and PYQ combinations.
 * 
 * Zero visual impact - fully hidden via sr-only CSS.
 */

import {
  SUBJECT_SEO,
  SEMESTER_SEO,
  generateSubjectParagraph,
  BASE_URL,
  COLLEGE_KEYWORDS,
  BRANCH_KEYWORDS,
  UNIVERSITY_KEYWORDS,
  SEARCH_INTENT_KEYWORDS
} from "@/config/seo-data";

interface Props {
  subjectCode: string;
  semester: number;
  subType?: "notes" | "pyq" | "questions" | "unit1" | "unit2" | "unit3" | "unit4" | "unit5";
}

export const HiddenSubjectSEO = ({ subjectCode, semester, subType = "notes" }: Props) => {
  const subj = SUBJECT_SEO[subjectCode];
  const semData = SEMESTER_SEO[semester];
  
  if (!subj) return null;

  const relatedSubjects = subj.relatedSubjects
    .map(code => SUBJECT_SEO[code])
    .filter(Boolean);

  const semesterSubjects = Object.values(SUBJECT_SEO)
    .filter(s => s.semester === semester && s.code !== subjectCode && !s.isLab);

  // Generates verbose description for a topic
  const getVerboseTopicText = (topic: string) => {
    return `${topic} is a cornerstone concept in ${subj.name} (${subj.code}) that CSBS students at BMS College of Engineering must master. In the Visvesvaraya Technological University (VTU) syllabus, examinations frequently ask comprehensive questions on ${topic}, requiring theoretical derivation, algorithm implementation, and analysis. In our downloadable study materials, we provide simplified diagrams, conceptual summaries, and step-by-step guides for ${topic} to aid in both Continuous Internal Evaluation (CIE) and Semester End Examination (SEE) preparation. Understanding ${topic} is also highly relevant for placement exams and practical lab modules.`;
  };

  // Generates verbose FAQ answer
  const getVerboseFaqText = (q: string, a: string) => {
    return `Regarding the question "${q}", here is the verified response: ${a} This explanation aligns with the academic guidelines of the BMSCE autonomous syllabus. Students are recommended to refer to standard textbooks and our class notes PDF for complete diagrams and derivations.`;
  };

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
      {/* ── SUBTYPE: MAIN NOTES (default) ── */}
      {subType === "notes" && (
        <article>
          <h1>{subj.fullName} ({subj.code}) Lecture Notes, Study Guide & PDF</h1>
          <p>{generateSubjectParagraph(subjectCode)}</p>
          <p>
            Welcome to the ultimate academic portal for {subj.fullName} at BMSCE. This page provides verified study materials,
            lecture notes, hand-written topper notes, and comprehensive resources for CSBS students. We have structured this
            resource library to ensure you can prepare effectively for your internal assessments (CIE 1, CIE 2, CIE 3) and VTU final semester exams.
          </p>
          <p>
            The subject {subj.name} plays a major role in integrating computer science algorithms with business system analysis, which is the core
            pillar of the CSBS curriculum. Throughout the academic term, you will study topics like: {subj.topics.join(", ")}.
            To help you grasp these principles, we provide unit-wise breakdowns and notes PDFs that you can access for offline study.
          </p>
          
          <h2>Unit-Wise Breakdown & Detailed Topic Guides</h2>
          {subj.units.map(unit => (
            <section key={unit.number}>
              <h3>Unit {unit.number}: {unit.title} notes</h3>
              <p>
                Unit {unit.number} of {subj.name} covers: {unit.topics.join(", ")}. 
                Download free PDF notes, solved examples, and previous year question papers for Unit {unit.number} ({unit.title}).
                Here is an in-depth summary of the topics covered in this unit:
              </p>
              {unit.topics.map((t, idx) => (
                <p key={idx}>{getVerboseTopicText(t)}</p>
              ))}
            </section>
          ))}

          <h2>Academic FAQs</h2>
          {subj.faqs.map((faq, idx) => (
            <div key={idx}>
              <h4>{faq.question}</h4>
              <p>{getVerboseFaqText(faq.question, faq.answer)}</p>
            </div>
          ))}
        </article>
      )}

      {/* ── SUBTYPE: PREVIOUS YEAR QUESTIONS (PYQ) ── */}
      {subType === "pyq" && (
        <article>
          <h1>{subj.name} ({subj.code}) Previous Year Question Papers & Solutions</h1>
          <p>
            Access the complete repository of {subj.fullName} previous year question papers (PYQs) for CIE and SEE.
            Solving these question papers is the most effective way to test your preparation level and understand the exam pattern
            of the BMSCE autonomous curriculum.
          </p>
          <p>
            Exam trend analysis shows that certain topics in {subj.name} are repeated frequently. Based on the past 5 years of exam papers,
            the most critical topics to prepare include: {subj.pyqTopics.join(", ")}.
          </p>
          
          <h2>CIE & SEE Exam Trend Analysis</h2>
          {subj.units.map(unit => (
            <section key={unit.number}>
              <h3>Unit {unit.number} Past Questions & Weightage</h3>
              <p>
                In Unit {unit.number} ({unit.title}), question papers generally focus on the following core concepts: {unit.topics.slice(0, 3).join(", ")}.
                Typically, questions worth 5, 10, or 15 marks are framed around these topics.
              </p>
              {unit.topics.map((t, idx) => (
                <p key={idx}>
                  For {t}, typical questions ask to "Derive/Explain/Implement {t} with neat diagrams." 
                  Refer to our solved PYQ answer sheets to see how to structure your answers to score maximum marks under VTU guidelines.
                </p>
              ))}
            </section>
          ))}

          <h2>List of Frequently Asked Exam Topics</h2>
          <ul>
            {subj.pyqTopics.map((topic, idx) => (
              <li key={idx}>
                <strong>{topic}</strong>: Exam occurrence rate is extremely high. Frequently asked in SEE paper sections. 
                Students should prepare both the mathematical derivation and pseudo-code implementations for {topic}.
              </li>
            ))}
          </ul>
        </article>
      )}

      {/* ── SUBTYPE: IMPORTANT QUESTIONS ── */}
      {subType === "questions" && (
        <article>
          <h1>{subj.name} ({subj.code}) Important Questions with Answers & Study Tips</h1>
          <p>
            Prepare for your examinations with our curated list of important questions for {subj.fullName} ({subj.code}) at BMSCE.
            These questions have been filtered by toppers and academic representatives to save your study time and maximize your scores.
          </p>
          
          <h2>Curated Question Bank</h2>
          <ol>
            {subj.importantQuestions.map((q, idx) => (
              <li key={idx}>
                <h4>{q}</h4>
                <p>
                  To answer the question "{q}" in your exams:
                  First, outline the basic definition of the concept. Draw a clean block diagram or flowchart. 
                  Next, write the mathematical equation or program code (if applicable). Conclude by listing the business advantages
                  or technological applications of this concept in CSBS. Refer to our class notes PDF for complete solved answer keys.
                </p>
              </li>
            ))}
          </ol>

          <h2>Syllabus Coverage & Mark Weightage</h2>
          <p>
            Make sure to cover all 5 units of the syllabus. Do not skip topics like {subj.topics.slice(-3).join(", ")} as they carry substantial
            weightage in the final examination. Practice drawing neat schematics and writing clean code comments for better presentation.
          </p>
        </article>
      )}

      {/* ── SUBTYPE: UNIT-SPECIFIC TUTORIALS ── */}
      {subType.startsWith("unit") && (
        <article>
          {(() => {
            const unitNum = parseInt(subType.replace("unit", ""));
            const unit = subj.units.find(u => u.number === unitNum);
            if (!unit) return <p>Unit study guide is loading...</p>;
            
            return (
              <>
                <h1>{subj.name} ({subj.code}) Unit {unit.number} Study Notes - {unit.title}</h1>
                <p>
                  This is the dedicated study guide for Unit {unit.number} ({unit.title}) of {subj.fullName} at BMS College of Engineering.
                  This module introduces the foundational concepts of {unit.title} and covers: {unit.topics.join(", ")}.
                </p>
                
                <h2>In-Depth Topic Explanations</h2>
                {unit.topics.map((t, idx) => (
                  <section key={idx}>
                    <h3>{t}</h3>
                    <p>{getVerboseTopicText(t)}</p>
                    <p>
                      In typical lecture sessions, professors emphasize the structural details of {t}. 
                      When revising, ensure you can define {t}, explain its working principles, and provide realistic examples of how it is used.
                      For instance, in Visvesvaraya Technological University (VTU) scheme question papers, questions on {t} often carry 10 marks.
                    </p>
                    <p>
                      Our PDF notes provide step-by-step algorithms, solved mathematical equations, and numerical problems related to {t}.
                      Reviewing these solved exercises will give you the confidence to tackle similar problems in your CIEs and final SEE.
                    </p>
                  </section>
                ))}

                <h2>Unit {unit.number} Study Tips & Revision Pointers</h2>
                <p>
                  To excel in Unit {unit.number}, we recommend making active recall notes on: {unit.topics.join(", ")}. 
                  Focus on repeating diagrams and derivations multiple times. Solve past question paper questions for {subj.code} Unit {unit.number}
                  to verify your conceptual accuracy.
                </p>
              </>
            );
          })()}
        </article>
      )}

      {/* ── CROSS LINKS & KEYWORD MESH (SEO / AEO) ── */}
      <section>
        <h2>Related Academic Subjects & Resources</h2>
        <ul>
          {relatedSubjects.map(rel => (
            <li key={rel.code}>
              <a href={`${BASE_URL}/${rel.slug}`}>
                {rel.name} ({rel.code}) Notes PDF, PYQ Papers & Important Questions
              </a>
            </li>
          ))}
          {semesterSubjects.map(s => (
            <li key={s.code}>
              <a href={`${BASE_URL}/${s.slug}`}>
                {s.name} ({s.code}) Lecture Notes & Class Slides
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Quick Site Directory</h2>
        <ul>
          <li><a href={BASE_URL}>Home - Notes CSBS BMSCE</a></li>
          <li><a href={`${BASE_URL}/semester/${semester}`}>Semester {semester} CSBS Study Material</a></li>
          {[1, 2, 3, 4, 5, 6, 7, 8].filter(s => s !== semester).map(s => (
            <li key={s}><a href={`${BASE_URL}/1st-sem-notes`.replace("1st", `${s}${s===1?'st':s===2?'nd':s===3?'rd':'th'}`)}>Semester {s} CSBS Notes PDF</a></li>
          ))}
          <li><a href={`${BASE_URL}/contributors`}>Student Contributors</a></li>
          <li><a href={`${BASE_URL}/keywords`}>Knowledge Index Directory</a></li>
        </ul>
      </section>

      <section>
        <h2>Semantic Keyword Density</h2>
        <p>{subj.keywords.join(", ")}.</p>
        <p>{subj.longTailKeywords.join(", ")}.</p>
        <p>{COLLEGE_KEYWORDS.join(", ")}.</p>
        <p>{BRANCH_KEYWORDS.join(", ")}.</p>
        <p>{UNIVERSITY_KEYWORDS.join(", ")}.</p>
        <p>{SEARCH_INTENT_KEYWORDS.join(", ")}.</p>
      </section>
    </div>
  );
};
