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
    generateMotion: "Generate",
    motionTopic: "Topic (optional)",
    motionTopicPlaceholder: "e.g. technology, ethics, the environment",
    generating: "Generating...",
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
      train: "Train",
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
    review: "Review",
    strengths: "What went great",
    fixes: "Things to fix",
    principles: "Debate principles",
    skillBreakdown: "Skill Breakdown",
    showDetailed: "Show detailed feedback",
    hideDetailed: "Hide detailed feedback",
    detailedTitle: "Detailed feedback",
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
    motionGenerated: "Motion generated",
  },
  errors: {
    analyzeMotion: "Failed to analyze motion",
    generateArguments: "Failed to generate arguments",
    generateClashMap: "Failed to generate clash map",
    generateRebuttals: "Failed to generate rebuttals",
    judgeSpeech: "Failed to judge speech",
    coach: "Failed to get coaching",
    generateMotion: "Failed to generate motion",
  },
  train: {
    badge: "Training",
    setup: {
      title: "Train as a speaker",
      subtitle:
        "Pick your side and the speaker you main. You'll work through exercises step by step — you write, the coach gives feedback, you revise.",
      chooseSide: "Which side are you?",
      chooseRole: "Which speaker do you main?",
      comingSoon: "Coming soon",
      start: "Start Training",
      roles: {
        first: {
          label: "1st Speaker",
          blurb: "Framing: interpretation, trade-offs, stakeholders, mechanisms.",
        },
        second: {
          label: "2nd Speaker",
          blurb: "Arguments, reasoning, evidence, and rebuttal.",
        },
        third: {
          label: "3rd Speaker",
          blurb: "Clash, counter-rebuttal, and weighing.",
        },
      },
    },
    overview: {
      title: "Your training path",
      role: "Role",
      side: "Side",
      progressLabel: "{completed} / {total} exercises",
      skillGrowth: "Skill Growth",
      skillGrowthEmpty: "Complete exercises to see your skills grow.",
    },
    stepper: {
      lockedHint: "Complete the previous step to unlock this one.",
      bestScore: "Best {score}",
      locked: "Locked",
      inProgress: "In progress",
      complete: "Complete",
    },
    panel: {
      submit: "Get Coaching",
      resubmit: "Revise & Resubmit",
      markComplete: "Mark complete",
      continueNext: "Continue",
      history: "Previous attempts",
      attemptN: "Attempt {n}",
      blankGuard: "Fill in your answer before getting coaching.",
    },
    feedback: {
      score: "Score",
      checklist: "Checklist",
      strengths: "What's working",
      fixes: "What to fix",
      coaching: "Coach",
      passed: "Passed — nice work!",
      keepRefining: "Keep refining and resubmit.",
    },
    skills: {
      analysis: "Analysis",
      logic: "Logic",
      weighing: "Weighing",
      rebuttal: "Rebuttal",
      evidence: "Evidence",
    },
    toasts: {
      started: "Training started — let's go!",
      scored: "Feedback ready",
      complete: "Exercise complete!",
    },
    exercises: {
      interpretation: {
        title: "Interpret the Motion",
        blurb: "Define the terms, state your burden, and bound the debate.",
        fields: {
          defendThis: {
            label: "What must your side prove?",
            placeholder: "On this motion, our side has to show that...",
          },
          keyTerms: {
            label: "Define the key terms",
            placeholder: "By '...' we mean...",
          },
          scope: {
            label: "Scope — what's in and out?",
            placeholder: "This debate is about... It is NOT about...",
          },
        },
        criteria: {
          termsDefined: "Key terms are clearly defined",
          burdenCorrect: "States what your side must prove",
          scopeBounded: "Bounds what's in and out of scope",
        },
      },
      tradeoff: {
        title: "Frame the Trade-off",
        blurb:
          "Name what your side ultimately optimizes for and the trade-off it accepts to get there.",
        fields: {
          ultimateGoal: {
            label: "Your side's ultimate goal",
            placeholder: "Above all, our side protects / maximizes...",
          },
          tradeoff: {
            label: "The trade-off you accept",
            placeholder: "We prioritize ... even at the cost of ...",
          },
        },
        criteria: {
          goalMatchesSide: "Goal fits your side",
          tradeoffIsRealTension: "A real trade-off (gain vs cost)",
          notVague: "Specific, not generic",
        },
      },
      stakeholders: {
        title: "Build a Stakeholder",
        blurb:
          "Pick a group the motion affects and describe the traits that make them matter.",
        fields: {
          stakeholder: {
            label: "Stakeholder group",
            placeholder: "e.g. first-generation university students",
          },
          traits: {
            label: "Traits — why do they matter here?",
            placeholder: "They are... which means the motion affects them by...",
          },
        },
        criteria: {
          isGroupNotActor: "A group affected, not the actor",
          traitsExplainStake: "Traits explain why they matter",
          relevantToMotion: "Relevant to this motion",
        },
      },
      mechanism: {
        title: "Build a Mechanism",
        blurb:
          "Turn a claim into a cause-and-effect chain that lands a concrete impact.",
        fields: {
          claim: {
            label: "Claim (one sentence)",
            placeholder: "Our side believes that...",
          },
          mechanism: {
            label: "Mechanism (how does it happen?)",
            placeholder: "Because..., people..., which leads to...",
          },
          impact: {
            label: "Impact (real-world result)",
            placeholder: "As a result, in the real world...",
          },
        },
        criteria: {
          mechanismDiffersFromClaim: "Mechanism explains how, not a restated claim",
          causalChainPresent: "Clear cause and effect chain",
          impactConcrete: "Concrete real-world impact",
        },
      },
    },
  },
} as const;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof en>;
