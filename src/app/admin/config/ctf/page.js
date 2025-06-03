"use client";
import React, { useState } from "react";
import CTFForm from "@/components/CTFForm";
import styles from "../cp/cp.module.css";
import Navigator from "@/components/Navigator";
const CtfSetup = () => {
  const numberOfChallenges = 3; // or use from Redux/config
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [infoVisible, setInfoVisible] = useState(true);
  const [challengeData, setChallengeData] = useState(
    Array.from({ length: numberOfChallenges }, () => ({
      pseudoName: "",
      description: "",
      initialScore: "",
      flag: "",
      link:"",
    }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...challengeData];
    updated[index][field] = value;
    setChallengeData(updated);
  };

  const handleSave = () => {
    console.log("Saved:", challengeData);
  };

  const handleGet = () => {
    alert(JSON.stringify(challengeData, null, 2));
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
          <li><strong>Pseudo-name</strong> </li>
          <li><strong>Full name</strong></li>
          <li><strong>Initial score</strong></li>
          <li><strong>The Flag</strong></li>
          <li><strong>Link to the Live Application </strong>(May be edited as needed)</li>
        </ul>
      
        <p style={{ marginBottom: "6px", fontWeight: "bold" }}>Example :</p>
        <pre style={{ background: "#f1f5f9", padding: "10px", borderRadius: "6px", overflowX: "auto" }}>
      {`    |__ Pseudo-name : A               // Problem name
    |__ Full name : Injection at a high level
    |__ Initial score : 300          // will be dynamic - first to solve > high score
    |__ The Flag : ASEDS{Th15_Fl46_15_4_t3ST}           
    |__ Link :
        |__ http://docker-container-application.demo:3030/  // the application running on a container on the serveur
        |__ http://172.18.01.01:3030/  // IP Adress specific to the container`}
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
      <CTFForm
        index={activeChallengeIndex}
        data={challengeData[activeChallengeIndex]}
        onChange={handleChange}
      />

      {/* Save/Get Buttons */}
      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <button
          style={{ ...actionButton, backgroundColor: "#10B981" }}
          onClick={handleSave}
        >
          Save Changes
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

export default CtfSetup;
