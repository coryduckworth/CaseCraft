import type { DebateFormat } from "./types";
import type { Locale } from "./i18n/types";
import { getFormatPromptContext, getCoachHandbook } from "./i18n/prompt-content";
import { FORMATS, getSideLabel } from "./format";
import {
  argumentSetExampleBlock,
  clashMapExampleBlock,
  judgeExampleBlock,
  motionAnalysisExampleBlock,
  rebuttalExampleBlock,
} from "./prompt-examples";

export function getCoachSystemPrompt(locale: Locale = "en"): string {
  return getCoachHandbook(locale);
}

// Backward-compatible export
export { COACH_HANDBOOK as COACH_SYSTEM_PROMPT } from "./coach-handbook";

function formatBlock(format: DebateFormat, locale: Locale): string {
  return getFormatPromptContext(format, locale);
}

const PROMPT_STRINGS = {
  en: {
    motionTask: "TASK: Analyze this debate motion and return JSON.",
    motionStyle: "Expected motion style",
    step1: "Step 1 - actor: Who is doing the action? Find the subject of the motion.",
    step2: "Step 2 - action: What are they proposing? Remove THBT/THW/THR/That prefix.",
    step3: "Step 3 - stakeholders: List 3-5 GROUPS affected (students, teachers, employers, etc.). Do NOT repeat the actor.",
    step4: 'Step 4 - coreClash: Write "Value A vs Value B" — the fundamental trade-off.',
    step5: "Step 5 - contextNotes: 2-3 sentences explaining why this debate matters.",
    wscInterpretation:
      'Step 6 (WSC only): Explain what "That [subject]" commits each side to defend. Define any ambiguous terms.',
    wsdcInterpretation:
      "Step 6 (WSDC only): Note whether the motion is THBT, THW, or THR and what burden that places on each side.",
    argumentTask: (side: string) =>
      `TASK: Generate exactly 3 structured arguments for the ${side} side. Return JSON.`,
    argumentSteps: (side: string) => `Now generate exactly 3 arguments for the ${side} side on the motion above.

For EACH of the 3 arguments:
- claim: One sentence. What does the ${side} side believe?
- mechanism: Because [cause], which leads to [effect]. Must be DIFFERENT from the claim. Explain HOW.
- impact: The real-world harm or benefit if this is true.
- likelihood: "High" if very probable, "Medium" if possible, "Low" if unlikely.
- importance: "High" if consequences are severe, "Medium" if moderate, "Low" if minor.`,
    evidenceWsc:
      "Draw evidence from WSC curriculum themes (Science, Literature, History, Social Studies, Art). Keep arguments concise for 4-minute speeches.",
    evidenceWsdc:
      "Draw evidence from elaborative research — cite real studies, statistics, and examples suitable for 8-minute speeches.",
    noFullSpeeches:
      "Do NOT write full speech paragraphs. Reasoning building blocks only.",
    clashTask: "TASK: Create a clash map. Return JSON.",
    clashRules: (aff: string, neg: string) => `Now create a clash map for the motion above.

JSON field rules:
- government = the ${aff} side (SUPPORTS the motion)
- opposition = the ${neg} side (OPPOSES the motion)
- Each side gets:
  - label: short position summary (3-5 words)
  - points: 2-4 key argument themes (plain strings)
- mainClash: ONE sentence — where do these sides directly contradict? Not a summary of both sides.`,
    rebuttalTask: "TASK: Provide 3 rebuttal coaching responses. Return JSON.",
    rebuttalContext: (userSide: string, opponent: string) =>
      `Student's side: ${userSide}\nOpponent argued: "${opponent}"`,
    rebuttalSteps: `Now provide exactly 3 rebuttal approaches for the student above.

For EACH response:
- response: A concise rebuttal the student could say
- explanation: WHY this rebuttal works (coaching insight)
- type: Pick ONE exactly — "turn", "takeout", "weighing", or "extension"`,
    rebuttalTimeWsc: "Keep responses punchy for a 4-minute speech.",
    rebuttalTimeWsdc: "Responses can be more developed for 8-minute WSDC speeches.",
    judgeWsc: (speechTime: string, prepTime: string) =>
      `TASK: Judge this WSC debate speech. Return JSON.

SPEECH (${speechTime}, after ${prepTime} prep):`,
    judgeWsdc: (speechTime: string, crystalTime: string) =>
      `TASK: Judge this WSDC debate performance. Return JSON.

CONSTRUCTIVE (${speechTime}):`,
    judgeRebuttal: "REBUTTAL:",
    judgeCrystal: (crystalTime: string) => `CRYSTALLIZATION (${crystalTime}):`,
    notProvided: "(not provided)",
    judgeRubric: `Score using the skill rubric (logic, rebuttal, weighing, analysis, evidence — each 0-100).
Give 2-3 specific strengths referencing the student's text.
Give 2-3 specific weaknesses with actionable fixes.
Overall score = average of the 5 skills, rounded to nearest integer.
Provide constructive coaching feedback in 2-3 sentences.`,
    judgeWscNote:
      "WSC: Evaluate as a single 4-minute speech. No separate crystallization.",
    fillFields: "Now fill in each JSON field for the motion above using these steps:",
    motionLabel: "Motion",
  },
  vi: {
    motionTask: "NHIỆM VỤ: Phân tích đề tranh biện này và trả về JSON.",
    motionStyle: "Kiểu đề bài mong đợi",
    step1:
      "Bước 1 - actor: Ai thực hiện hành động? Tìm chủ thể của đề bài.",
    step2:
      "Bước 2 - action: Họ đề xuất gì? Bỏ tiền tố THBT/THW/THR/That.",
    step3:
      "Bước 3 - stakeholders: Liệt kê 3-5 NHÓM bị ảnh hưởng (học sinh, giáo viên, nhà tuyển dụng...). KHÔNG lặp lại bên hành động.",
    step4:
      'Bước 4 - coreClash: Viết "Giá trị A vs Giá trị B" — sự đánh đổi cốt lõi.',
    step5:
      "Bước 5 - contextNotes: 2-3 câu giải thích vì sao cuộc tranh luận này quan trọng.",
    wscInterpretation:
      'Bước 6 (chỉ WSC): Giải thích "That [chủ thể]" buộc mỗi phe phải bảo vệ điều gì. Định nghĩa thuật ngữ mơ hồ.',
    wsdcInterpretation:
      "Bước 6 (chỉ WSDC): Ghi nhận đề là THBT, THW hay THR và gánh nặng chứng minh của mỗi phe.",
    argumentTask: (side: string) =>
      `NHIỆM VỤ: Tạo đúng 3 luận điểm có cấu trúc cho phe ${side}. Trả về JSON.`,
    argumentSteps: (side: string) => `Bây giờ tạo đúng 3 luận điểm cho phe ${side} với đề bài trên.

Với MỖI luận điểm:
- claim: Một câu. Phe ${side} tin điều gì?
- mechanism: Vì [nguyên nhân], dẫn đến [hệ quả]. Phải KHÁC claim. Giải thích CÁCH.
- impact: Tác hại hoặc lợi ích thực tế nếu điều này đúng.
- likelihood: "High" nếu rất có khả năng, "Medium" nếu có thể, "Low" nếu khó xảy ra.
- importance: "High" nếu hậu quả nghiêm trọng, "Medium" nếu vừa phải, "Low" nếu nhỏ.`,
    evidenceWsc:
      "Lấy bằng chứng từ chủ đề WSC (Khoa học, Văn học, Lịch sử, Xã hội, Nghệ thuật). Giữ luận điểm súc tích cho bài 4 phút.",
    evidenceWsdc:
      "Lấy bằng chứng từ nghiên cứu chuyên sâu — trích dẫn nghiên cứu, số liệu và ví dụ phù hợp bài 8 phút.",
    noFullSpeeches:
      "KHÔNG viết đoạn phát biểu hoàn chỉnh. Chỉ là khối lập luận.",
    clashTask: "NHIỆM VỤ: Tạo bản đồ xung đột. Trả về JSON.",
    clashRules: (aff: string, neg: string) => `Bây giờ tạo bản đồ xung đột cho đề bài trên.

Quy tắc trường JSON:
- government = phe ${aff} (ỦNG HỘ đề bài)
- opposition = phe ${neg} (PHẢN ĐỐI đề bài)
- Mỗi phe có:
  - label: tóm tắt lập trường ngắn (3-5 từ)
  - points: 2-4 chủ đề luận điểm chính (chuỗi thuần)
- mainClash: MỘT câu — hai phe mâu thuẫn trực tiếp ở đâu? Không tóm tắt cả hai phe.`,
    rebuttalTask: "NHIỆM VỤ: Đưa 3 hướng dẫn phản biện. Trả về JSON.",
    rebuttalContext: (userSide: string, opponent: string) =>
      `Phe học sinh: ${userSide}\nĐối thủ lập luận: "${opponent}"`,
    rebuttalSteps: `Bây giờ đưa đúng 3 cách phản biện cho học sinh ở trên.

Với MỖI phản hồi:
- response: Một phản biện súc tích học sinh có thể nói
- explanation: TẠI SAO phản biện này hiệu quả (góc huấn luyện)
- type: Chọn ĐÚNG MỘT — "turn", "takeout", "weighing", hoặc "extension"`,
    rebuttalTimeWsc: "Giữ phản hồi súc tích cho bài 4 phút.",
    rebuttalTimeWsdc: "Phản hồi có thể phát triển hơn cho bài WSDC 8 phút.",
    judgeWsc: (speechTime: string, prepTime: string) =>
      `NHIỆM VỤ: Chấm bài phát biểu tranh biện WSC. Trả về JSON.

BÀI PHÁT BIỂU (${speechTime}, sau ${prepTime} chuẩn bị):`,
    judgeWsdc: (speechTime: string, _crystalTime: string) =>
      `NHIỆM VỤ: Chấm phần thi WSDC. Trả về JSON.

XÂY DỰNG (${speechTime}):`,
    judgeRebuttal: "PHẢN BIỆN:",
    judgeCrystal: (crystalTime: string) => `TỔNG KẾT (${crystalTime}):`,
    notProvided: "(chưa cung cấp)",
    judgeRubric: `Chấm theo thang kỹ năng (logic, rebuttal, weighing, analysis, evidence — mỗi mục 0-100).
Đưa 2-3 điểm mạnh cụ thể tham chiếu văn bản học sinh.
Đưa 2-3 điểm yếu cụ thể với cách sửa hành động được.
Điểm tổng = trung bình 5 kỹ năng, làm tròn số nguyên.
Đưa phản hồi huấn luyện mang tính xây dựng trong 2-3 câu.`,
    judgeWscNote:
      "WSC: Chấm như một bài phát biểu 4 phút duy nhất. Không có tổng kết riêng.",
    fillFields:
      "Bây giờ điền từng trường JSON cho đề bài trên theo các bước:",
    motionLabel: "Đề bài",
  },
} as const;

function strings(locale: Locale) {
  return PROMPT_STRINGS[locale];
}

export function motionAnalysisPrompt(
  motion: string,
  format: DebateFormat = "wsdc",
  locale: Locale = "en"
): string {
  const config = FORMATS[format];
  const s = strings(locale);
  const interpretationNote =
    format === "wsc" ? s.wscInterpretation : s.wsdcInterpretation;

  return `${formatBlock(format, locale)}

${s.motionTask}

${s.motionLabel}: "${motion}"
${s.motionStyle}: ${config.motionPrefix}

${motionAnalysisExampleBlock()}

${s.fillFields}

${s.step1}
${s.step2}
${s.step3}
${s.step4}
${s.step5}
${interpretationNote}`;
}

export function argumentForgePrompt(
  motion: string,
  side: "government" | "opposition",
  format: DebateFormat = "wsdc",
  locale: Locale = "en"
): string {
  const sideLabel = getSideLabel(side, format);
  const s = strings(locale);
  const evidenceNote = format === "wsc" ? s.evidenceWsc : s.evidenceWsdc;

  return `${formatBlock(format, locale)}

${s.argumentTask(sideLabel)}

${s.motionLabel}: "${motion}"

${argumentSetExampleBlock()}

${s.argumentSteps(sideLabel)}

Evidence guidance: ${evidenceNote}

${s.noFullSpeeches}`;
}

export function clashMapPrompt(
  motion: string,
  format: DebateFormat = "wsdc",
  locale: Locale = "en"
): string {
  const config = FORMATS[format];
  const s = strings(locale);

  return `${formatBlock(format, locale)}

${s.clashTask}

${s.motionLabel}: "${motion}"

${clashMapExampleBlock()}

${s.clashRules(config.affirmativeLabel, config.negativeLabel)}`;
}

export function rebuttalPrompt(
  motion: string,
  opponentArgument: string,
  side: "government" | "opposition",
  format: DebateFormat = "wsdc",
  locale: Locale = "en"
): string {
  const userSide = getSideLabel(side, format);
  const s = strings(locale);
  const timeNote = format === "wsc" ? s.rebuttalTimeWsc : s.rebuttalTimeWsdc;

  return `${formatBlock(format, locale)}

${s.rebuttalTask}

${s.motionLabel}: "${motion}"
${s.rebuttalContext(userSide, opponentArgument)}

${rebuttalExampleBlock()}

${s.rebuttalSteps}

${timeNote}`;
}

export function judgePrompt(
  motion: string,
  caseText: string,
  rebuttalText: string,
  summaryText: string,
  format: DebateFormat = "wsdc",
  locale: Locale = "en"
): string {
  const config = FORMATS[format];
  const s = strings(locale);

  if (format === "wsc") {
    return `${formatBlock(format, locale)}

${s.judgeWsc(config.speechTime, config.prepTime)}

${caseText || rebuttalText || s.notProvided}

${judgeExampleBlock()}

${s.judgeRubric}

${s.judgeWscNote}`;
  }

  return `${formatBlock(format, locale)}

${s.judgeWsdc(config.speechTime, config.crystallizationTime ?? "")}
${caseText || s.notProvided}

${s.judgeRebuttal}
${rebuttalText || s.notProvided}

${s.judgeCrystal(config.crystallizationTime!)}
${summaryText || s.notProvided}

${judgeExampleBlock()}

${s.judgeRubric}`;
}

