import type { DebateFormat, DebateSide } from "./types";
import type { Locale } from "./i18n/types";
import type { ExerciseDescriptor, TrainPromptId } from "./curriculum/types";
import { getFormatPromptContext } from "./i18n/prompt-content";
import { getSideLabel } from "./format";

// Per-exercise prompt content. Each coaching call is ONE narrow judgment with
// the criteria spelled out as plain rules + a few-shot example that echoes the
// exercise's real criterion ids — the combination that makes a 3B model reliable.

interface ExercisePromptContent {
  task: string;
  fields: Record<string, string>; // field id -> human label used in the prompt
  criteria: Record<string, string>; // criterion id -> grading rule
}

interface TrainPromptStrings {
  intro: string;
  motionLabel: string;
  sideLine: (side: string) => string;
  studentAnswerLabel: string;
  criteriaIntro: string;
  scoreInstruction: string;
  doNotAnswer: string;
  exampleIntro: string;
  exampleNoteMet: string;
  exampleNoteUnmet: string;
  exampleStrength: string;
  exampleFix: string;
  exampleMessage: string;
  exercises: Record<TrainPromptId, ExercisePromptContent>;
}

const TRAIN_PROMPTS: Record<Locale, TrainPromptStrings> = {
  en: {
    intro:
      "Grade the debate student's OWN work below. Be encouraging but honest.",
    motionLabel: "Motion",
    sideLine: (side) => `The student's side: ${side}`,
    studentAnswerLabel: "The student wrote:",
    criteriaIntro:
      "Grade ONLY these criteria. Return one entry in `criteria` for each, using the EXACT id. Set `met` true/false and write a one-sentence `note`:",
    scoreInstruction:
      "Then give an overall `score` (0-100), 1-3 `strengths`, 1-3 `fixes` (what to improve), and a 1-2 sentence `message`.",
    doNotAnswer:
      "IMPORTANT: Do NOT write or rewrite the answer for the student. Only point out what to fix and why.",
    exampleIntro:
      "Example of the JSON shape (these values are illustrative — judge the real answer above):",
    exampleNoteMet: "This part is handled well.",
    exampleNoteUnmet: "This is missing or too vague.",
    exampleStrength: "A specific thing the student did well.",
    exampleFix: "A concrete thing to improve, without giving the answer.",
    exampleMessage: "One or two sentences of encouragement and direction.",
    exercises: {
      interpretation: {
        task: "You are grading a 1st speaker's INTERPRETATION of the motion.",
        fields: {
          defendThis: "What your side must prove",
          keyTerms: "Key terms defined",
          scope: "What is in / out of scope",
        },
        criteria: {
          termsDefined:
            "The student clearly DEFINES the key/ambiguous terms in the motion (not just repeats them).",
          burdenCorrect:
            "The student correctly states what THEIR side must prove (the burden), consistent with the motion.",
          scopeBounded:
            "The student bounds the debate — names what is in scope and what is out of scope.",
        },
      },
      tradeoff: {
        task: "You are grading a 1st speaker's TRADE-OFF / ULTIMATE GOAL framing.",
        fields: {
          ultimateGoal: "What your side ultimately optimizes for",
          tradeoff: "The trade-off the side accepts (prioritise X over Y)",
        },
        criteria: {
          goalMatchesSide:
            "The ultimate goal is something the student's side would actually optimize for.",
          tradeoffIsRealTension:
            "The trade-off names a genuine tension — what is prioritized AND what is given up — not just a one-sided benefit.",
          notVague:
            "The goal and trade-off are specific and tied to this motion, not generic buzzwords.",
        },
      },
      stakeholders: {
        task: "You are grading a 1st speaker's STAKEHOLDER and its described traits.",
        fields: {
          stakeholder: "Stakeholder group",
          traits: "Traits — why they matter / what makes them affected",
        },
        criteria: {
          isGroupNotActor:
            "The stakeholder is a GROUP affected by the motion, NOT the actor who takes the action.",
          traitsExplainStake:
            "The traits explain WHY this group matters or what makes them vulnerable/affected.",
          relevantToMotion:
            "The stakeholder is genuinely relevant to THIS specific motion.",
        },
      },
      mechanism: {
        task: "You are grading a 1st speaker's MECHANISM (claim -> mechanism -> impact).",
        fields: {
          claim: "Claim (one sentence)",
          mechanism: "Mechanism (because -> so -> therefore)",
          impact: "Impact (real-world result)",
        },
        criteria: {
          mechanismDiffersFromClaim:
            "The mechanism is DIFFERENT from the claim — it explains HOW, not just restating it.",
          causalChainPresent:
            "There is a clear cause -> effect chain (because X, so Y, therefore Z).",
          impactConcrete:
            "The impact is a concrete real-world result, not an abstract restatement.",
        },
      },
    },
  },
  vi: {
    intro:
      "Chấm phần bài LÀM CỦA CHÍNH học sinh bên dưới. Khích lệ nhưng trung thực.",
    motionLabel: "Đề bài",
    sideLine: (side) => `Phe của học sinh: ${side}`,
    studentAnswerLabel: "Học sinh viết:",
    criteriaIntro:
      "CHỈ chấm các tiêu chí sau. Trả về một mục trong `criteria` cho mỗi tiêu chí, dùng ĐÚNG id. Đặt `met` true/false và viết một câu `note`:",
    scoreInstruction:
      "Sau đó cho `score` tổng (0-100), 1-3 `strengths`, 1-3 `fixes` (cần cải thiện gì), và `message` 1-2 câu.",
    doNotAnswer:
      "QUAN TRỌNG: KHÔNG viết hay viết lại câu trả lời hộ học sinh. Chỉ chỉ ra cần sửa gì và tại sao.",
    exampleIntro:
      "Ví dụ về cấu trúc JSON (các giá trị chỉ minh hoạ — hãy chấm câu trả lời thật ở trên):",
    exampleNoteMet: "Phần này được xử lý tốt.",
    exampleNoteUnmet: "Phần này thiếu hoặc còn mơ hồ.",
    exampleStrength: "Một điều cụ thể học sinh làm tốt.",
    exampleFix: "Một điều cụ thể cần cải thiện, không đưa đáp án.",
    exampleMessage: "Một hai câu khích lệ và định hướng.",
    exercises: {
      interpretation: {
        task: "Bạn đang chấm phần HIỂU ĐỀ của diễn giả thứ nhất.",
        fields: {
          defendThis: "Phe bạn phải chứng minh điều gì",
          keyTerms: "Định nghĩa thuật ngữ chính",
          scope: "Phạm vi trong / ngoài",
        },
        criteria: {
          termsDefined:
            "Học sinh ĐỊNH NGHĨA rõ các thuật ngữ chính/mơ hồ trong đề (không chỉ lặp lại).",
          burdenCorrect:
            "Học sinh nêu đúng điều PHE MÌNH phải chứng minh (gánh nặng), phù hợp với đề.",
          scopeBounded:
            "Học sinh giới hạn tranh luận — nêu cái gì trong và ngoài phạm vi.",
        },
      },
      tradeoff: {
        task: "Bạn đang chấm phần ĐÁNH ĐỔI / MỤC TIÊU TỐI THƯỢNG của diễn giả thứ nhất.",
        fields: {
          ultimateGoal: "Phe bạn tối ưu điều gì sau cùng",
          tradeoff: "Đánh đổi mà phe chấp nhận (ưu tiên X hơn Y)",
        },
        criteria: {
          goalMatchesSide:
            "Mục tiêu tối thượng là điều phe học sinh thực sự sẽ tối ưu.",
          tradeoffIsRealTension:
            "Đánh đổi nêu một sự căng thẳng thực sự — ưu tiên cái gì VÀ phải hi sinh cái gì — không chỉ là lợi ích một chiều.",
          notVague:
            "Mục tiêu và đánh đổi cụ thể, gắn với đề bài này, không phải khẩu hiệu chung chung.",
        },
      },
      stakeholders: {
        task: "Bạn đang chấm NHÓM LIÊN QUAN và các đặc điểm của diễn giả thứ nhất.",
        fields: {
          stakeholder: "Nhóm liên quan",
          traits: "Đặc điểm — vì sao họ quan trọng / bị ảnh hưởng",
        },
        criteria: {
          isGroupNotActor:
            "Nhóm liên quan là NHÓM bị ảnh hưởng bởi đề, KHÔNG phải bên hành động.",
          traitsExplainStake:
            "Các đặc điểm giải thích VÌ SAO nhóm này quan trọng hoặc bị ảnh hưởng.",
          relevantToMotion:
            "Nhóm liên quan thực sự liên quan đến đề bài CỤ THỂ này.",
        },
      },
      mechanism: {
        task: "Bạn đang chấm CƠ CHẾ (luận điểm -> cơ chế -> tác động) của diễn giả thứ nhất.",
        fields: {
          claim: "Luận điểm (một câu)",
          mechanism: "Cơ chế (vì -> nên -> do đó)",
          impact: "Tác động (kết quả thực tế)",
        },
        criteria: {
          mechanismDiffersFromClaim:
            "Cơ chế KHÁC luận điểm — giải thích CÁCH, không chỉ lặp lại.",
          causalChainPresent:
            "Có chuỗi nhân -> quả rõ ràng (vì X, nên Y, do đó Z).",
          impactConcrete:
            "Tác động là kết quả thực tế cụ thể, không phải diễn đạt trừu tượng.",
        },
      },
    },
  },
};

function buildExampleBlock(
  exercise: ExerciseDescriptor,
  s: TrainPromptStrings
): string {
  const criteria = exercise.criteria.map((id, i) => ({
    id,
    met: i === 0, // first met, rest unmet — shows both states
    note: i === 0 ? s.exampleNoteMet : s.exampleNoteUnmet,
  }));
  const example = {
    score: 68,
    criteria,
    strengths: [s.exampleStrength],
    fixes: [s.exampleFix],
    message: s.exampleMessage,
  };
  return `${s.exampleIntro}\n${JSON.stringify(example, null, 2)}`;
}

export interface CoachPromptContext {
  motion: string;
  side: DebateSide;
  format: DebateFormat;
  input: Record<string, string>;
  locale: Locale;
}

export function coachPrompt(
  exercise: ExerciseDescriptor,
  ctx: CoachPromptContext
): string {
  const s = TRAIN_PROMPTS[ctx.locale];
  const ex = s.exercises[exercise.promptId];
  const sideLabel = getSideLabel(ctx.side, ctx.format);

  const answerBlock = exercise.fields
    .map((f) => {
      const label = ex.fields[f.id] ?? f.id;
      const value = (ctx.input[f.id] ?? "").trim() || "(blank)";
      return `- ${label}: ${value}`;
    })
    .join("\n");

  const criteriaBlock = exercise.criteria
    .map((id, i) => `${i + 1}. [${id}] ${ex.criteria[id] ?? id}`)
    .join("\n");

  return `${getFormatPromptContext(ctx.format, ctx.locale)}

${s.intro}
${ex.task}

${s.motionLabel}: "${ctx.motion}"
${s.sideLine(sideLabel)}

${s.studentAnswerLabel}
${answerBlock}

${s.criteriaIntro}
${criteriaBlock}

${buildExampleBlock(exercise, s)}

${s.scoreInstruction}
${s.doNotAnswer}`;
}
