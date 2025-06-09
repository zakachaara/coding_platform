// pages/api/problem/readme.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { problem } = req.query;
  if (!problem) return res.status(400).json({ error: "Problem name required" });

  const readmePath = path.join(process.cwd(), "problem", problem, "README.md");

  try {
    if (!fs.existsSync(readmePath)) {
      return res.status(404).json({ error: "README not found" });
    }

    const content = fs.readFileSync(readmePath, "utf-8");
    res.status(200).json({ content });
  } catch (err) {
    res.status(500).json({ error: "Failed to load README" });
  }
}
