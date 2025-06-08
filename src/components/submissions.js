"use client";
import { useState, useEffect } from "react";
import styles from "./submissions.module.css";

// Mock API function - replace with your actual API call
const fetchSubmissions = async (userId, isCE) => {
  try {
    let fetching_URL = `http://localhost:5005/user/${userId}/submissions`
    if (isCE) {
      fetching_URL = `http://localhost:5006/user/${userId}/submissions`
    }
    const response = await fetch(fetching_URL); 

    if (!response.ok) {
      throw new Error("Failed to fetch submissions");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default function Submissions({ userId, newSubmissionAdded , isCE }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (userId, isCE) => {
    try {
      setLoading(true);
      const data = await fetchSubmissions(userId , isCE);
      console.log(data)
      setSubmissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(userId ,isCE);
  }, []);

  // Refetch when a new submission is added
  useEffect(() => {
    if (newSubmissionAdded) {
      fetchData(userId);
    }
  }, [newSubmissionAdded]);

  const getVerdictClass = (verdict) => {
    if (verdict === "Accepted") return styles.verdictAccepted;
    if (verdict === "Time Limit Exceeded") return styles.verdictPending;
    return styles.verdictRejected;
  };

  const getSymbol = (verdict) => {
    if (verdict === "Accepted") return "✓";
    if (verdict === "Time Limit Exceeded") return "⏱️";
    return "✗";
  };

  if (loading && submissions.length === 0) {
    return <div className={styles.loading}>Loading submissions...</div>;
  }

  if (error) {
    return <div className={styles.loading}>Error: {error}</div>;
  }

  return (
    <div
      style={{ fontFamily: "JetBrains Mono" }}
      className={styles.submissionsContainer}
    >
      <h1 className={styles.title}>Your Entire Submissions</h1>
      <button onClick={()=> fetchData(userId)} className={styles.refreshButton}>
        Refresh Submissions
      </button>

      <table className={styles.submissionsTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sub ID</th>
            <th>Pb ID</th>
            <th>Memory</th>
            <th>Time</th>
            <th>Verdict</th>
            <th>Acc%</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {submissions?.length > 0 ? (
            submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{new Date(submission.created_at).toLocaleString()}</td>
                <td>{submission.id}</td>
                <td>{submission.problem_id}</td>
                <td>{submission.memory_usage} Kb</td>
                <td>{parseInt(submission.execution_time)} ms</td>
                <td className={getVerdictClass(submission.verdict)}>
                  {submission.verdict}
                </td>
                <td>{submission.accept_percent}</td>
                <td className={styles.symbol}>
                  {getSymbol(submission.verdict)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td >No submissions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
