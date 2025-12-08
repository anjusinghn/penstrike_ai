export type ScanStatus = "idle" | "running" | "completed" | "error";

export type Finding = {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  category: string;
  description: string;
  affected_url: string;
  evidence: string;
  reproduction_steps: string;
