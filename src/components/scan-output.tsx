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
