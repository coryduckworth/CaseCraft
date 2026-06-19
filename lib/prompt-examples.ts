export const SAMPLE_MOTION = "THBT universities should abolish grades";

export const MOTION_ANALYSIS_EXAMPLE = {
  actor: "Universities",
  action: "Abolish grades",
  stakeholders: [
    "Students",
    "Professors",
    "Employers",
    "Parents",
    "Society",
  ],
  coreClash: "Learning quality vs Measurement",
  contextNotes:
    "Grades are the primary tool universities use to measure student performance. This debate asks whether removing them would help students learn more deeply or remove accountability and harm hiring decisions.",
};

export const ARGUMENT_SET_EXAMPLE = {
  arguments: [
    {
      claim: "Grades distort learning incentives.",
      mechanism:
        "Because students optimize for marks rather than understanding, they choose easier courses, cram before exams, and forget material after tests.",
      impact: "Graduates leave with credentials but weaker actual knowledge and skills.",
      likelihood: "High",
      importance: "High",
    },
    {
      claim: "Grade pressure harms student mental health.",
      mechanism:
        "Competitive ranking creates constant comparison and fear of failure, leading to anxiety and burnout.",
      impact: "More students experience mental health crises and disengage from education.",
      likelihood: "High",
      importance: "Medium",
    },
    {
      claim: "Alternative assessment methods produce better outcomes.",
      mechanism:
        "Portfolio-based and project-based evaluation forces students to demonstrate applied understanding over time rather than one-off exam performance.",
      impact: "Students develop deeper mastery and more transferable skills.",
      likelihood: "Medium",
      importance: "High",
    },
  ],
};

export const CLASH_MAP_EXAMPLE = {
  government: {
    label: "Better Learning",
    points: [
      "Grades incentivize cramming over understanding",
      "Alternative assessments measure real skill",
      "Reduced stress improves engagement",
    ],
  },
  opposition: {
    label: "Accountability Matters",
    points: [
      "Employers need signals to compare candidates",
      "Without grades, standards become inconsistent",
      "Motivation drops without measurable targets",
    ],
  },
  mainClash: "Whether removing measurement improves learning or removes accountability",
};

export const REBUTTAL_EXAMPLE = {
  responses: [
    {
      response:
        "Even imperfect grades are poor predictors of job performance — meta-analyses show weak correlation between GPA and workplace success.",
      explanation:
        "This is a takeout: it challenges the premise that grades help employers by citing evidence they don't actually predict outcomes.",
      type: "takeout",
    },
    {
      response:
        "Employers already use interviews, portfolios, and internships — grades are one signal among many, not the only one.",
      explanation:
        "This is a weighing response: even if grades help somewhat, other methods already fill the gap.",
      type: "weighing",
    },
    {
      response:
        "If grades measure test-taking ability, abolishing them forces employers to evaluate actual competence through work samples.",
      explanation:
        "This is a turn: accepts that employers need information but flips to show abolishing grades leads to better evaluation.",
      type: "turn",
    },
  ],
};

export const JUDGE_EXAMPLE = {
  strengths: [
    "Clear claim-mechanism-impact structure in the constructive",
    "Identified the core clash between learning and measurement",
    "Used a specific example about cramming behavior",
  ],
  weaknesses: [
    "No comparative weighing against opposition impacts",
    "Missing stakeholder analysis beyond students",
    "Rebuttal did not engage with the employer accountability argument",
  ],
  score: 72,
  skillBreakdown: {
    logic: 78,
    rebuttal: 65,
    weighing: 55,
    analysis: 80,
    evidence: 60,
  },
  feedback:
    "Your constructive shows good logical structure. Focus next on weighing — explain why your learning-quality impact outweighs the opposition's accountability concerns. Engage directly with employer hiring arguments in rebuttal.",
};

function formatExample(label: string, example: unknown): string {
  return `${label}:\n${JSON.stringify(example, null, 2)}`;
}

export function motionAnalysisExampleBlock(): string {
  return formatExample(
    "Here is an example of correct output for a similar motion",
    MOTION_ANALYSIS_EXAMPLE
  );
}

export function argumentSetExampleBlock(): string {
  return formatExample(
    "Here is an example of correct output for a similar motion",
    ARGUMENT_SET_EXAMPLE
  );
}

export function clashMapExampleBlock(): string {
  return formatExample(
    "Here is an example of correct output for a similar motion",
    CLASH_MAP_EXAMPLE
  );
}

export function rebuttalExampleBlock(): string {
  return formatExample(
    "Here is an example of correct output for a similar task",
    REBUTTAL_EXAMPLE
  );
}

export function judgeExampleBlock(): string {
  return formatExample(
    "Here is an example of correct output for a similar task",
    JUDGE_EXAMPLE
  );
}
