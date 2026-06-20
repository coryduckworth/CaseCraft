import type { RoleCurriculum } from "./types";

// The 1st-speaker path: framing the debate before building the case.
// Each exercise grades 3 narrow criteria so a 3B model judges one small
// thing at a time. Field and criterion ids are camelCase and are echoed
// verbatim by the model (see lib/prompts-train.ts) and looked up in i18n.
export const FIRST_SPEAKER: RoleCurriculum = {
  role: "first",
  exercises: [
    {
      id: "first-interpretation",
      order: 1,
      i18nKey: "interpretation",
      promptId: "interpretation",
      skill: "analysis",
      fields: [
        { id: "defendThis", multiline: true, rows: 3 },
        { id: "keyTerms", multiline: true, rows: 3 },
        { id: "scope", multiline: true, rows: 3 },
      ],
      criteria: ["termsDefined", "burdenCorrect", "scopeBounded"],
      passThreshold: 75,
    },
    {
      id: "first-tradeoff",
      order: 2,
      i18nKey: "tradeoff",
      promptId: "tradeoff",
      skill: "weighing",
      fields: [
        { id: "ultimateGoal", multiline: true, rows: 3 },
        { id: "tradeoff", multiline: true, rows: 3 },
      ],
      criteria: ["goalMatchesSide", "tradeoffIsRealTension", "notVague"],
      passThreshold: 75,
    },
    {
      id: "first-stakeholders",
      order: 3,
      i18nKey: "stakeholders",
      promptId: "stakeholders",
      skill: "analysis",
      fields: [
        { id: "stakeholder", multiline: false },
        { id: "traits", multiline: true, rows: 3 },
      ],
      criteria: ["isGroupNotActor", "traitsExplainStake", "relevantToMotion"],
      passThreshold: 75,
    },
    {
      id: "first-mechanism",
      order: 4,
      i18nKey: "mechanism",
      promptId: "mechanism",
      skill: "logic",
      fields: [
        { id: "claim", multiline: false },
        { id: "mechanism", multiline: true, rows: 4 },
        { id: "impact", multiline: true, rows: 3 },
      ],
      criteria: ["mechanismDiffersFromClaim", "causalChainPresent", "impactConcrete"],
      passThreshold: 75,
    },
  ],
};
