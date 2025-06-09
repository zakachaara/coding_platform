// pages/api/problem/fetch.js
import path from "path";
import { fetchProblemFromRepo } from "@/utils/fetchProblemFromRepo";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { repoUri, problemName } = req.body;

  if (!repoUri || !problemName) {
    return res.status(400).json({ error: "repoUri and problemName are required" });
  }

  try {
    const targetPath = path.join(process.cwd(), "problem", problemName);
    const alreadyFetched = await fetchProblemFromRepo(repoUri, targetPath);

    res.status(200).json({
      message: alreadyFetched
        ? "Problem already fetched, using cached version."
        : "Problem fetched and extracted successfully.",
    });
  } catch (error) {
    console.error("Fetch failed:", error);
    res.status(500).json({ error: "Failed to fetch problem." });
  }
}
