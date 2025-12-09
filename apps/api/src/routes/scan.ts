import { Router } from "express";
import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { Readable } from "stream";
import { buildSystemPrompt } from "../lib/prompts.js";
import { createTools } from "../lib/tools.js";
import { createScan } from "../lib/store.js";

export const scanRouter = Router();

