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
      style={{
        margin: "10px 0",
        borderLeft: `2px solid ${isReportVuln ? "#ff8c00" : "#4a9eff"}`,
        paddingLeft: "12px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          color: isReportVuln ? "#ff8c00" : "#4a9eff",
          fontSize: "10px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "4px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ opacity: 0.6 }}>&gt;</span>
        {item.label}
      </div>
      <pre
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          color: "var(--muted)",
          fontSize: "11px",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          margin: 0,
          lineHeight: "1.5",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {typeof parsed === "object"
          ? JSON.stringify(parsed, null, 2)
          : String(parsed)}
