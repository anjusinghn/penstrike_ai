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

