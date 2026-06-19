export const en = {
  meta: {
    title: "CaseCraft — AI Debate Coach",
    description:
      "An AI-powered debate and critical thinking workspace that helps students transform ideas into competition-ready cases.",
  },
  common: {
    cancel: "Cancel",
    create: "Create",
    generate: "Generate",
    regenerate: "Regenerate",
    reanalyze: "Re-analyze",
    prefix: "Prefix",
    format: "Format",
    score: "Score",
    vs: "vs",
  },
  language: {
    switch: "Language",
  },
  dashboard: {
    tagline: "Help me think better.",
    recentCases: "Recent Cases",
    welcomeTitle: "Welcome to CaseCraft",
    welcomeDescription:
      "Your AI debate coach — not a ghostwriter. Transform ideas into competition-ready cases through structured reasoning.",
    steps: {
      analyze: {
        title: "Analyze the Motion",
        description: "Break down actors, stakeholders, and core clashes",
      },
      forge: {
        title: "Forge Arguments",
        description: "Build structured claims with mechanisms and impacts",
      },
      practice: {
        title: "Practice & Reflect",
        description: "Rebut opponents and get judged on your skills",
      },
    },
    newMotion: "New Motion",
    newCaseTitle: "Start a New Case",
    newCaseDescription:
      "Choose your debate format and enter a motion. Each case becomes a coaching workspace for that format.",
    debateFormat: "Debate Format",
    motion: "Motion",
    createCase: "Create Case",
    badges: {
      analyzed: "Analyzed",
      arguments: "Arguments",
      clashMap: "Clash Map",
      newCase: "New case",
    },
    relativeTime: {
      justNow: "just now",
      minutesAgo: "{n}m ago",
      hoursAgo: "{n}h ago",
      daysAgo: "{n}d ago",
    },
  },
  case: {
    backToDashboard: "Back to Dashboard",
    tabs: {
      analysis: "Analysis",
      arguments: "Arguments",
      clash: "Clash Map",
      rebuttal: "Rebuttal",
      judge: "Judge",
    },
  },
  format: {
    wsdc: {
      description: "World Schools Debating Championship",
      affirmativeLabel: "Government",
      negativeLabel: "Opposition",
      motionPrefix: "THBT / THW / THR",
      motionPlaceholder: 'e.g. "THBT universities should abolish grades"',
      evidenceApproach:
        "Elaborative research — cite real-world data, studies, and examples",
      prepSpeechCrystal: "{prep} prep · {speech} speech, {crystal} crystallization",
      prepSpeechNoCrystal: "{prep} prep · {speech} speech, no crystallization",
    },
    wsc: {
      description: "World Scholar's Cup",
      affirmativeLabel: "Affirmative",
      negativeLabel: "Negative",
      motionPrefix: "That",
      motionPlaceholder: 'e.g. "That social media does more harm than good"',
      evidenceApproach:
        "WSC curriculum — draw from Scholar's Bowl themes and interdisciplinary knowledge",
      prepSpeechCrystal: "{prep} prep · {speech} speech, {crystal} crystallization",
      prepSpeechNoCrystal: "{prep} prep · {speech} speech, no crystallization",
    },
  },
  analysis: {
    title: "Motion Analysis",
    description: "Break down the motion into actors, stakeholders, and core clashes",
    descriptionWsc: " — with emphasis on motion interpretation",
    analyzeMotion: "Analyze Motion",
    actor: "Actor",
    action: "Action",
    stakeholders: "Stakeholders",
    coreClash: "Core Clash",
    context: "Context",
    empty: 'Click "Analyze Motion" to break down this debate motion',
  },
  arguments: {
    title: "Argument Forge",
    description: "Build structured arguments — claim, mechanism, impact",
    empty: "Select a side and click Generate to forge structured arguments",
    argumentN: "Argument {n}",
    claim: "Claim",
    mechanism: "Mechanism",
    impact: "Impact",
    likelihood: "Likelihood",
    importance: "Importance",
  },
  clash: {
    title: "Clash Map",
    description: "Visualize where the debate is actually happening",
    generateMap: "Generate Map",
    mainClash: "Main Clash",
    empty:
      "Generate a clash map to see where Government and Opposition collide",
    emptyWsc: "Generate a clash map to see where Affirmative and Negative collide",
  },
  rebuttal: {
    title: "Rebuttal Arena",
    description:
      "Enter an opponent argument and get coached on possible responses",
    yourSide: "Your side:",
    placeholder:
      "Paste your opponent's argument here... e.g. 'Grades help employers find talent.'",
    getCoaching: "Get Coaching",
    possibleResponses: "Possible Responses",
    pastSessions: "Past Sessions",
    responseN: "Response {n}",
    responsesCount: "{n} responses",
    hideExplanation: "Hide explanation",
    whyThisWorks: "Why does this work?",
    empty: "Enter an opponent argument to practice your rebuttals",
    types: {
      turn: "Turn",
      takeout: "Takeout",
      weighing: "Weighing",
      extension: "Extension",
    },
  },
  judge: {
    title: "Judge Simulator",
    descriptionWsc: "Submit your {speech} WSC speech (after {prep} prep)",
    descriptionWsdc:
      "Submit WSDC speeches — {speech} constructive, {crystal} crystallization",
    speech: "Speech ({time})",
    constructive: "Constructive ({time})",
    rebuttal: "Rebuttal",
    crystallization: "Crystallization ({time})",
    placeholderWsc: "Your 4-minute WSC debate speech...",
    placeholderConstructive: "Your 8-minute constructive speech...",
    placeholderRebuttal: "Your rebuttal speech...",
    placeholderCrystallization: "Your 4-minute reply / crystallization...",
    judgeMySpeech: "Judge My Speech",
    empty: "Submit your speech to get judged on debate skills",
    skillBreakdown: "Skill Breakdown",
    strengths: "Strengths",
    weaknesses: "Weaknesses",
    coachFeedback: "Coach Feedback",
    skills: {
      logic: "Logic",
      rebuttal: "Rebuttal",
      weighing: "Weighing",
      analysis: "Analysis",
      evidence: "Evidence",
    },
  },
  ratings: {
    High: "High",
    Medium: "Medium",
    Low: "Low",
  },
  toasts: {
    motionAnalyzed: "Motion analyzed successfully",
    argumentsGenerated: "{side} arguments generated",
    clashMapGenerated: "Clash map generated",
    rebuttalReady: "Rebuttal coaching ready",
    speechJudged: "Speech judged",
    enterOpponentArgument: "Enter your opponent's argument first",
    enterSpeechSection: "Enter at least one speech section to judge",
  },
  errors: {
    analyzeMotion: "Failed to analyze motion",
    generateArguments: "Failed to generate arguments",
    generateClashMap: "Failed to generate clash map",
    generateRebuttals: "Failed to generate rebuttals",
    judgeSpeech: "Failed to judge speech",
  },
} as const;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof en>;
