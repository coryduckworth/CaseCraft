# CaseCraft

AI-powered debate coach — not a ghostwriter. CaseCraft helps students think better through structured motion analysis, argument construction, clash mapping, rebuttal practice, and speech judging.

## Debate Formats

Each case supports **WSDC** or **WSC** format:

| | WSDC | WSC |
|---|---|---|
| Sides | Government vs Opposition | Affirmative vs Negative |
| Speeches | 8 min + 4 min crystallization | 4 min (15 min prep) |
| Motions | THBT / THW / THR | That [subject] |
| Evidence | Elaborative research | WSC curriculum |

Switch format when creating a case or from the case workspace header.

## Features

- **Dashboard** — Create and manage debate cases (motions as projects)
- **Motion Analysis** — Break down actors, stakeholders, and core clashes
- **Argument Forge** — Generate structured claims with mechanisms and impacts
- **Clash Map** — Visualize where Government and Opposition actually collide
- **Rebuttal Arena** — Get coached on responses to opponent arguments
- **Judge Simulator** — Submit speeches and get scored on debate skills

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Local Llama 3.2 3B via Ollama with structured JSON outputs
- Debate coach handbook — glossary, few-shot examples, field checklists for reliable coaching
- localStorage for case persistence (no auth/database in prototype)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Ollama and pull the model

```bash
# Install Ollama: https://ollama.com
ollama pull llama3.2:3b
ollama serve   # if not already running
```

Verify the model works:

```bash
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"llama3.2:3b","messages":[{"role":"user","content":"Say hello"}],"stream":false}'
```

### 3. Set up environment

```bash
cp .env.example .env.local
```

Defaults (usually no changes needed):

```bash
LOCAL_LLM_URL=http://localhost:11434/v1
LOCAL_LLM_MODEL=llama3.2:3b
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Note:** Local inference may take 30–60 seconds per request on CPU. First request after cold start may be slower.

## Philosophy

CaseCraft is a **coach**, not a ghostwriter:

```
Motion → Research → Argument construction → Counterarguments → Rebuttals → Practice → Reflection
```

The AI teaches reasoning structure — claims, mechanisms, impacts — not full speeches.

## Project Structure

```
app/
  page.tsx                  # Dashboard
  case/[id]/page.tsx        # Case workspace
  api/                      # Ollama-powered API routes
components/
  dashboard/                # Dashboard components
  case/                     # Feature panels
lib/
  llm/                      # Ollama client + JSON parsing
  coach-handbook.ts         # Glossary and rubric for the local model
  prompt-examples.ts        # Few-shot JSON examples
  prompts.ts                # Per-feature prompts with checklists
  storage.ts                # localStorage helpers
  schemas/                  # Zod schemas for structured AI output
```

## Limitations (Prototype)

- No user authentication — data stored in browser localStorage only
- No Crossfire Mode, Evidence Vault, or WSC Mode yet
- Requires Ollama running locally for AI features
- Local 3B model is less capable than cloud models — prompts include a coaching handbook to compensate

## License

Private — prototype build.
