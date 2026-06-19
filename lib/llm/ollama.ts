import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  buildRepairPrompt,
  parseAndValidate,
} from "./parse-json";

const DEFAULT_URL = "http://localhost:11434/v1";
const DEFAULT_MODEL = "llama3.2:3b";
const MAX_ATTEMPTS = 3;

function getConfig() {
  return {
    baseUrl: process.env.LOCAL_LLM_URL ?? DEFAULT_URL,
    model: process.env.LOCAL_LLM_MODEL ?? DEFAULT_MODEL,
  };
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionResponse {
  choices?: Array<{
    message?: { content?: string };
  }>;
  error?: { message?: string };
}

async function callOllama(messages: ChatMessage[]): Promise<string> {
  const { baseUrl, model } = getConfig();
  const url = `${baseUrl.replace(/\/$/, "")}/chat/completions`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2,
        stream: false,
        format: "json",
        options: {
          num_ctx: 8192,
        },
      }),
    });
  } catch {
    throw new Error(
      `Cannot reach Ollama at ${url}. Make sure Ollama is running (ollama serve) and the model is pulled (ollama pull ${model}).`
    );
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Ollama request failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as ChatCompletionResponse;

  if (data.error?.message) {
    throw new Error(`Ollama error: ${data.error.message}`);
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("No response from Ollama");
  }

  return content;
}

export async function generateStructured<T>(
  prompt: string,
  schema: z.ZodType<T>,
  systemPrompt: string
): Promise<T> {
  const jsonSchema = zodToJsonSchema(
    schema as unknown as Parameters<typeof zodToJsonSchema>[0]
  );

  const systemWithSchema = `${systemPrompt}

Return valid JSON only. No markdown, no explanation. Match this schema exactly:
${JSON.stringify(jsonSchema, null, 2)}`;

  const messages: ChatMessage[] = [
    { role: "system", content: systemWithSchema },
    { role: "user", content: prompt },
  ];

  let lastRaw = "";
  let lastError = "";

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const raw = await callOllama(messages);
    lastRaw = raw;

    const result = parseAndValidate(raw, schema);
    if (result.success) {
      return result.data;
    }

    lastError = result.error;

    if (attempt < MAX_ATTEMPTS - 1) {
      messages.push({ role: "assistant", content: raw });
      messages.push({
        role: "user",
        content: buildRepairPrompt(result.error, result.raw),
      });
    }
  }

  throw new Error(
    `Failed to get valid JSON after ${MAX_ATTEMPTS} attempts: ${lastError}\nLast raw output: ${lastRaw.slice(0, 500)}`
  );
}
