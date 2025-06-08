"use client"
import styles from './CTF.module.css';
import PopUp from './PopUp';
import Banner from './banner';
import { useState, useEffect } from 'react';

export default function ChallengeCard({ challenge, userId }) {
  const [flag, setFlag] = useState('');
  const [verdict, setVerdict] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5007/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId,
          problem_id: challenge.id,
          user_flag: flag,
        })
      });

      const result = await response.json();
      setVerdict(result.data?.verdict || "Unknown response");
    } catch (err) {
      console.error("Submission error:", err);
      setVerdict("Error submitting flag");
    }
  };

  return (
    <div className={styles.container}>
      {verdict && (
        <PopUp
          message={verdict}
          type={verdict === "Accepted" ? "success" : "alert"}
        />
      )}

      <div className={styles.titleTag}>
        <span>Challenge<br />{challenge.name}</span>
      </div>

      <div className={styles.card}>
        <p className={styles.description}>
          {challenge.description}
        </p>
        <button className={styles.linkButton}>
          <a href={challenge.link} target='_blank' rel="noopener noreferrer">link</a>
        </button>
      </div>

      <div className={styles.flagInput}>
        <input
          type="text"
          placeholder="your flag goes here"
          className={styles.input}
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
        />
        <button className={styles.submit} onClick={handleSubmit}>
          <Banner text={'{submit}'} style1={{ borderTop: "20px solid transparent", borderBottom: "20px solid transparent", borderRight: "40px solid #fff9c4", zIndex: "2" }} />
        </button>
      </div>
    </div>
  );
}
