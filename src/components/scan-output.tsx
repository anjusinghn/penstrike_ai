"use client";

import { useEffect, useRef } from "react";
import type { OutputItem, Finding } from "@/app/page";

type Props = {
  items: OutputItem[];
  findings: Finding[];
  isRunning: boolean;
};

const SEVERITY_COLOR: Record<string, string> = {
  critical: "#ff3b3b",
  high: "#ff8c00",
  medium: "#ffd700",
  low: "#4a9eff",
  info: "#888888",
};

const SEVERITY_BG: Record<string, string> = {
  critical: "rgba(255, 59, 59, 0.07)",
  high: "rgba(255, 140, 0, 0.07)",
  medium: "rgba(255, 215, 0, 0.07)",
  low: "rgba(74, 158, 255, 0.07)",
  info: "rgba(136, 136, 136, 0.07)",
};

function ToolCallBlock({ item }: { item: OutputItem }) {
  let parsed: unknown = null;
  try {
    parsed = JSON.parse(item.content);
  } catch {
    parsed = item.content;
  }

  const isReportVuln = item.label === "report_vulnerability";

  return (
    <div
