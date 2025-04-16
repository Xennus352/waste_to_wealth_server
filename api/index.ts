// api/index.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import server from "../src/server";
import { createServer } from "http";

// Wrap your Express app into an HTTP server
const httpServer = createServer(server);

export default function handler(req: VercelRequest, res: VercelResponse) {
  httpServer.emit("request", req, res);
}
