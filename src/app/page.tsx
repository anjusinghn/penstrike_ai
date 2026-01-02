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
          ]);
          return;
        }

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            const colonIdx = trimmed.indexOf(":");
            if (colonIdx === -1) continue;

            const prefix = trimmed.slice(0, colonIdx);
            const rest = trimmed.slice(colonIdx + 1);

            try {
              if (prefix === "0") {
                const chunk: string = JSON.parse(rest);
                if (currentTextId) {
                  setItems((prev) =>
                    prev.map((item) =>
                      item.id === currentTextId
                        ? { ...item, content: item.content + chunk }
                        : item,
                    ),
                  );
                } else {
