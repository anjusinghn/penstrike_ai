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
      (error, stdout, stderr) => {
        resolve({
          stdout: stdout?.toString().slice(0, 10000) ?? "",
          stderr: stderr?.toString().slice(0, 5000) ?? "",
          exitCode: error?.code ?? proc.exitCode ?? 0,
        });
      },
    );
  });
}

export function createTools(scope: string) {
  void scope;
  return {
    execute_command: tool({
      description: `Execute a shell command on the server. Use for running security tools like nmap, curl, nikto, nuclei, gobuster, dig, whois, openssl, whatweb, subfinder, httpx, etc. Output is truncated to 10KB. Timeout: 60 seconds.`,
      parameters: z.object({
        command: z.string().describe("The shell command to execute"),
        timeout: z
          .number()
          .optional()
          .describe("Timeout in ms (default 30000, max 120000)"),
      }),
      execute: async ({ command, timeout }) => {
        const ms = Math.min(timeout ?? 30000, 120000);
        console.log(`[TOOL] execute_command: ${command}`);
        const result = await run(command, ms);
        return {
          stdout: result.stdout || "(no output)",
          stderr: result.stderr || "",
          exit_code: result.exitCode,
        };
      },
    }),

    http_request: tool({
