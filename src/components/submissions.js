"use client";
import { useState, useEffect } from 'react';
import styles from './submissions.module.css';

// Mock API function - replace with your actual API call
const fetchSubmissions = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data - replace with real data from your backend
  return [
    {
      id: '123',
      problemId: '456',
      date: new Date('2023-05-15T10:30:00'),
      memory: '45 MB',
      time: '120 ms',
      verdict: 'Accepted',
      percentage: '100%'
    },
    {
      id: '124',
      problemId: '457',
      date: new Date('2023-05-14T14:45:00'),
      memory: '60 MB',
      time: '250 ms',
      verdict: 'Time Limit Exceeded',
      percentage: '50%'
    },
    {
      id: '125',
      problemId: '456',
      date: new Date('2023-05-16T09:15:00'),
      memory: '40 MB',
      time: '110 ms',
      verdict: 'Accepted',
      percentage: '100%'
    }
  ];
};

export default function Submissions({ newSubmissionAdded }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchSubmissions();
      // Sort by date in descending order (newest first)
      const sortedData = data.sort((a, b) => b.date - a.date);
      setSubmissions(sortedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Refetch when a new submission is added
  useEffect(() => {
    if (newSubmissionAdded) {
      fetchData();
    }
  }, [newSubmissionAdded]);

  const getVerdictClass = (verdict) => {
    if (verdict === 'Accepted') return styles.verdictAccepted;
    if (verdict === 'Time Limit Exceeded') return styles.verdictPending;
    return styles.verdictRejected;
  };

  const getSymbol = (verdict) => {
    if (verdict === 'Accepted') return '✓';
    if (verdict === 'Time Limit Exceeded') return '⏱️';
    return '✗';
  };

  if (loading && submissions.length === 0) {
    return <div className={styles.loading}>Loading submissions...</div>;
  }

  if (error) {
    return <div className={styles.loading}>Error: {error}</div>;
  }

  return (
    <div style={{fontFamily:"JetBrains Mono"}} className={styles.submissionsContainer}>
      <h1 className={styles.title}>Your Entire Submissions</h1>
      <button onClick={fetchData} className={styles.refreshButton}>
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
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.date.toLocaleString()}</td>
              <td>{submission.id}</td>
              <td>{submission.problemId}</td>
              <td>{submission.memory}</td>
              <td>{submission.time}</td>
              <td className={getVerdictClass(submission.verdict)}>
                {submission.verdict}
              </td>
              <td>{submission.percentage}</td>
              <td className={styles.symbol}>
                {getSymbol(submission.verdict)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}