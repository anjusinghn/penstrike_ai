import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { buildSystemPrompt } from "@/lib/prompts";
import { createTools } from "@/lib/tools";
import { createScan } from "@/lib/store";

function getModel() {
  const provider = process.env.AI_PROVIDER ?? "anthropic";
  const modelId = process.env.AI_MODEL ?? "claude-sonnet-4-20250514";

  if (provider === "openai") return openai(modelId);
