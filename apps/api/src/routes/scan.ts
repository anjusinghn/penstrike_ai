import { Router } from "express";
import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { Readable } from "stream";
import { buildSystemPrompt } from "../lib/prompts.js";
import { createTools } from "../lib/tools.js";
import { createScan } from "../lib/store.js";

export const scanRouter = Router();

function getModel() {
  const provider = process.env.AI_PROVIDER ?? "anthropic";
  const modelId = process.env.AI_MODEL ?? "claude-sonnet-4-20250514";
  if (provider === "openai") return openai(modelId);
  return anthropic(modelId);
}

scanRouter.post("/", async (req, res) => {
  const target: string = req.body.target;
  const scope: string = req.body.scope ?? target;
