import { tool } from "ai";
import { z } from "zod";
import { exec } from "child_process";

function run(
  command: string,
  timeout = 30000,
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve) => {
    const proc = exec(
      command,
      { timeout, maxBuffer: 1024 * 1024 * 5 },
