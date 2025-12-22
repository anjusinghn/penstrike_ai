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

export default function Home() {
  const [items, setItems] = useState<OutputItem[]>([]);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [scanId, setScanId] = useState<string | null>(null);

  const startScan = useCallback(
    async (target: string, scope: string, agent: string) => {
      setIsRunning(true);
      setItems([]);
      setFindings([]);
      setScanId(null);

      const toolCallNames: Record<string, string> = {};
      let currentTextId: string | null = null;

      try {
        const resp = await fetch("/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ target, scope: scope || target, agent }),
        });

        const sid = resp.headers.get("x-scan-id");
        if (sid) setScanId(sid);

        if (!resp.ok || !resp.body) {
          const errText = await resp.text().catch(() => resp.statusText);
          setItems([
            {
              id: uid(),
              type: "error",
              content: `HTTP ${resp.status}: ${errText}`,
            },
