"use client";
import React, { useState } from "react";
import CPForm from "@/components/CPForm";
import styles from "./cp.module.css";
import Navigator from "@/components/Navigator";
import PopUp from "@/components/PopUp";
import ProblemsTable from "@/components/ProblemsTable";

const CpSetup = () => {
  const numberOfChallenges = 3; // use from Redux/config
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [infoVisible, setInfoVisible] = useState(true);
  const [isSaving , setSaving] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [message , setMessage] = useState("");
  const [challengeData, setChallengeData] = useState(
    Array.from({ length: numberOfChallenges }, () => ({
      pseudoName: "",
      fullName: "",
      initialScore: "",
      timeLimit:"",
      memoryLimit:"",
      zipFile: null,
    }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...challengeData];
    updated[index][field] = value;
    setChallengeData(updated);
  };

  const handleFileChange = (index, file) => {
    handleChange(index, "zipFile", file);
  };

  const handleSubmit = async () => {
    setSaving(true)
    const formData = new FormData();
  
    // Append metadata as JSON (no need to include file field names now)
    const metadata = challengeData.map(({ pseudoName, fullName, initialScore, timeLimit ,memoryLimit }) => ({
      pseudoName,
      fullName,
      initialScore,
      timeLimit,
      memoryLimit,
    }));
    formData.append("metadata", JSON.stringify(metadata));
  
    // Use pseudoName as the key for each file
    challengeData.forEach(({ pseudoName, zipFile }) => {
      if (zipFile) {
        formData.append(pseudoName, zipFile);
      }
    });
  
    try {
      const res = await fetch("http://localhost:5005/api/problems/upload-all", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      console.log("Success:", data);
      setMessage(data.message)
      setSuccessPopup(true);
    // Hide after 3 seconds
      setTimeout(() => setSuccessPopup(false), 5000);
      setSaving(false);
    } catch (err) {
      setMessage(err)
      setShowPopup(true);
    // Hide after 3 seconds
      setTimeout(() => setShowPopup(false), 5000);
      console.error("Error uploading challenges:", err);
      setSaving(false)
    }
  };
  
  const [problems, setProblems] = useState([]);
  const [showProblems, setShowProblems] = useState(false);

  const handleGet = async () => {
    
      try {
        const res = await fetch('http://localhost:5005/api/problems/room/1');
        const data = await res.json();
        setShowProblems(true)
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    

  };

  const containerStyle = {
    padding: "20px",
    maxWidth: "700px",
    margin: "0 auto",
    fontFamily: "sans-serif",
  };

  const actionButton = {
    padding: "10px 16px",
    borderRadius: "4px",
    marginRight: "10px",
    border: "none",
    color: "white",
    cursor: "pointer",
  };
  
  return (
    <div style={containerStyle}>
      {/* Info Message */}
      {showPopup && <PopUp message={message} type="alert" />}
      {SuccessPopup && <PopUp message={message} type="success" />}
      {showProblems && <div
        className={styles.alertBox}
      ><ProblemsTable problems={problems} name="CP"/> <button
      className={styles.hide}
      onClick={() => setShowProblems(false)}
      title="Close"
    >
      Close
    </button> </div> }
      {infoVisible && (
        <div
        className={styles.alertBox}
      >
        <button
          className={styles.hideBtn}
          onClick={() => setInfoVisible(false)}
          title="Close"
        >
          ×
        </button>
      
        <h3 style={{ marginTop: 0, color: "#1d4ed8" }}>⚠️ Important Setup Instructions</h3>
      
        <p style={{ marginBottom: "8px" }}>
          For each challenge, make sure to provide the following:
        </p>
      
        <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
          <li><strong>Pseudo-name</strong> (must match the zip file name)</li>
          <li><strong>Full name</strong></li>
          <li><strong>Initial score</strong></li>
          <li><strong>Time Limit to not exceed (s)</strong></li>
          <li><strong>Memory Limit to not exceed(MB)</strong></li>
          <li><strong>Zip file</strong></li>
        </ul>
      
        <p style={{ marginBottom: "6px", fontWeight: "bold" }}>Expected Zip File Structure:</p>
        <pre style={{ background: "#f1f5f9", padding: "10px", borderRadius: "6px", overflowX: "auto" }}>
      {`|__ README.md               // Problem statement
      |__ Input/
          |__ test1.txt           // 1st test case
          |__ test2.txt           // 2nd test case
      |__ Expected/
          |__ expected_test1.txt  // Output for test1
          |__ expected_test2.txt  // Output for test2`}
        </pre>
      </div>
      
      )}

      {/* Navigation Buttons */}
      
      <div style={{ display: "flex", marginBottom: "16px" }}>
        {Array.from({ length: numberOfChallenges }).map((_, idx) => (
          <Navigator
            key={idx}
            text={`Challenge ${idx + 1}`}
            selected={idx === activeChallengeIndex}
            onClick={() => setActiveChallengeIndex(idx)}
          />
        ))}
      </div>

      {/* Active Challenge Form */}
      <CPForm
        index={activeChallengeIndex}
        data={challengeData[activeChallengeIndex]}
        onChange={handleChange}
        handleFileChange={handleFileChange}
      />

      {/* Save/Get Buttons */}
      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <button
          style={{ ...actionButton, backgroundColor: "#10B981" }}
          onClick={handleSubmit}
        >
          {isSaving ? <p> Saving ... </p> : <p>Save Changes</p>  }
        </button>
        <button
          style={{ ...actionButton, backgroundColor: "#4B5563" }}
          onClick={handleGet}
        >
          Get Data
        </button>
      </div>
    </div>
  );
};

export default CpSetup;
