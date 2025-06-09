"use client";
import styles from "../../home/home.module.css";
import ChallengeCard from "../../../components/CTF";
import TeamNameLeaderBoard from "@/components/teamNameLeaderBoard";
import Banner from "../../../components/banner";
import Navigator from "../../../components/Navigator";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const getVerdictStyle = (verdict) => {
  return { color: verdict === "accepted" ? "green" : "red", fontWeight: "bold" };
};

export default function ChallengePage() {
  const [problem, setProblem] = useState(null);
  const [showSubmission, setShowSubmission] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const challenge = params.challenge;
  const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

  useEffect(() => {
    fetch("http://localhost:5007/api/challenges/")
      .then((response) => response.json())
      .then((result) => {
        const problem_page = result.data.find((problem) => problem.name === challenge);
        if (problem_page) {
          setProblem(problem_page);
        } else {
          console.warn("Challenge not found:", challenge);
        }
      })
      .catch((error) => console.error("Error retrieving challenges:", error));
  }, [challenge]);

  const fetchSubmissions = async () => {
    if (!problem?.id) return;
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5007/api/submissions/challenge/${problem.id}`);
      if (!res.ok) throw new Error("Failed to fetch submissions");
      const data = await res.json();
      setSubmissions(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubmissions = async () => {
    const newState = !showSubmission;
    setShowSubmission(newState);
    if (newState) await fetchSubmissions();
  };
  return (
    <>
      <div
        style={{
          padding: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Banner text={"{CTF Room}"} />
        <Navigator
          text={"Submissions"}
          onClick={toggleSubmissions}
          selected={showSubmission}
        />

        <TeamNameLeaderBoard />
      </div>
      <div >
        {problem && <ChallengeCard challenge={problem} userId={userId} />}
      </div>

      {showSubmission && (
        <div style={{ marginTop: "2rem", marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
          {loading ? (
            <p>Loading Submissions...</p>
          ) : (
            <table
              style={{
                borderCollapse: "collapse",
                width: "80%",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              }}
            >
              <thead style={{ backgroundColor: "#333", color: "#fff" }}>
                <tr>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Sub ID</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Pb ID</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Verdict</th>
                </tr>
              </thead>
              <tbody>
                {submissions.filter((s) => s.user_id == userId).length > 0 ? (
                  submissions
                    .filter((s) => s.user_id == userId)
                    .map((submission) => (
                      <tr key={submission.id}>
                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                          {new Date(submission.created_at).toLocaleString()}
                        </td>
                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>{submission.id}</td>
                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>{submission.problem_id}</td>
                        <td style={{ padding: "10px", border: "1px solid #ddd", ...getVerdictStyle(submission.verdict) }}>
                          {submission.verdict}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: "10px", textAlign: "center" }}>
                      No submissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
}
