"use client";

import { useState } from "react";

type Agent = "cyberstrike" | "web-application";

type Props = {
  onScan: (target: string, scope: string, agent: Agent) => void;
  isRunning: boolean;
};

const inputStyle = {
  backgroundColor: "var(--bg)",
  border: "1px solid var(--border)",
  color: "var(--fg)",
  fontFamily: "var(--font-jetbrains), monospace",
  borderRadius: "4px",
  padding: "8px 12px",
  fontSize: "13px",
  width: "100%",
  display: "block",
  transition: "border-color 0.15s",
};

const labelStyle = {
  display: "block",
  fontFamily: "var(--font-jetbrains), monospace",
  color: "var(--muted)",
  fontSize: "10px",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  marginBottom: "6px",
};

export default function ScanForm({ onScan, isRunning }: Props) {
  const [target, setTarget] = useState("");
  const [scope, setScope] = useState("");
  const [agent, setAgent] = useState<Agent>("cyberstrike");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!target.trim() || isRunning) return;
    onScan(target.trim(), scope.trim(), agent);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
