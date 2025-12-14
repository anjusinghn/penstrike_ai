import "dotenv/config";
import express from "express";
import cors from "cors";
import { scanRouter } from "./routes/scan.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(
  cors({
    origin: process.env.WEB_URL ?? "http://localhost:3000",
    exposedHeaders: ["X-Scan-ID"],
  }),
);
