"use client";

import { useState, useCallback } from "react";
import ScanForm from "@/components/scan-form";
import ScanOutput from "@/components/scan-output";

export type OutputItem = {
  id: string;
  type: "text" | "tool_call" | "tool_result" | "error";
  content: string;
  label?: string;
};

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
};
