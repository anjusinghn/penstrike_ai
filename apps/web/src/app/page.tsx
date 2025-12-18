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

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function Home() {
  const [items, setItems] = useState<OutputItem[]>([]);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [scanId, setScanId] = useState<string | null>(null);

