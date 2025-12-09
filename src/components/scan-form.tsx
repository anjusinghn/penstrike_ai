"use client";

import { useState } from "react";

type Agent = "cyberstrike" | "web-application";

type Props = {
  onScan: (target: string, scope: string, agent: Agent) => void;
  isRunning: boolean;
};

const inputStyle = {
  backgroundColor: "var(--bg)",
