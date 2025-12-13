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
