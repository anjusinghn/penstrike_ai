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
  remediation: string;
  cvss_score?: number;
  cwe_id?: string;
  timestamp: number;
};

export type Scan = {
  id: string;
  target: string;
  scope: string;
  agent: "cyberstrike" | "web-application";
  status: ScanStatus;
  findings: Finding[];
