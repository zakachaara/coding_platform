import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { rust } from "@codemirror/lang-rust";
import PopUp from "./PopUp";
import {  useSelector } from 'react-redux';

// import { dracula } from "@uiw/codemirror-theme-dracula"; // Dark Theme

const CodeEditor = ({problem , userId}) => {
  

  const [code, setCode] = useState(""); // Store the user's code
  const [language, setLanguage] = useState("python"); // Default language

  // Function to handle language selection
  const getLanguageExtension = () => {
    if (language === "python") return python();
    if (language === "java") return java();
    if (language === "cpp") return cpp();
    if (language === "rust") return rust();
  };

  const language_ID = () => {
    if (language === "python") return 71;
    if (language === "java") return 62;
    if (language === "cpp") return 50;
    if (language === "cpp") return 73;
  };
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmission = async () => {
    setShowPopup(true);
    // Hide after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
    const language_id = language_ID();
    const encodedCode = new TextEncoder().encode(code);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUBMIT_LINK}`, {
        method: "POST",
        headers: { "Content-Type": "application/json ; charset=utf-8" },
        body: JSON.stringify({
          code: new TextDecoder().decode(encodedCode),
          language_id,
          userId : userId, 
          problemName : problem.name,
          problemId:problem.id,
          timeLimit:problem.time_limit,
          memoryLimit:problem.memory_limit,
        }),
      });

      const result = await response.json();
      setSubmissionResults(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [submissionResults, setSubmissionResults] = useState([]);

  // const calculateResults = () => {
  //   if (!submissionResults.length) return { status: null , percentage: 0 };

  //   const acceptedTests = submissionResults.filter((res) => res.status === "Accepted").length;
  //   const totalTests = submissionResults.length;

  //   // Find first non-Accepted status
  //   const firstFailedTest = submissionResults.find((res) => res.status !== "Accepted");
  //   // Resource usage :
  //   const maxTime = Math.max(...submissionResults.map(res => res.time));
  //   const maxMemory = Math.max(...submissionResults.map(res => res.memory));
  //   return {
  //     status: firstFailedTest ? firstFailedTest.status : "Accepted",
  //     percentage: ((acceptedTests / totalTests) * 100).toFixed(2),
  //     time : maxTime ,
  //     memory : maxMemory,
  //   };
  // };

  const { status, percentage, time, memory } = submissionResults;

  return (
    <div
      style={{
        padding: "20px",
        maxHeight: "calc(100vh - 100px)",
        border: "2px solid #f5f5f5",
        width: "60vw",
        marginTop: "30px",
      }}
    >
      {showPopup && <PopUp message={"Code submitted successfully!"} type="success" />}
      <div
        style={{
          width: "56vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <select
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            fontFamily: "JetBrains Mono, monospace",
            marginBottom: "0px",
            color: "#000",
            padding: "5px",
            backgroundColor: "#d9d9d9",
            border: "1px solid #000",
            width: "max-content",
            height: "max-content",
            fontSize: "16px",
          }}
        >
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="rust">Rust</option>
        </select>
        {status && (
          <h1
            style={{
              color: status === "Accepted" ? "#1BE229" : "#f00",
              fontSize: "24px",
              margin: "0",
            }}
          >
            {status}
          </h1>
        )}

        <button
          onClick={handleSubmission}
          style={{
            fontFamily: "JetBrains Mono, monospace",
            color: "#ffffff",
            padding: "5px",
            backgroundColor: "#1BE229",
            border: "1px solid #000",
            width: "max-content",
            height: "max-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          submit
        </button>
      </div>
      <CodeMirror
        value={code}
        height="350px"
        theme="dark" // Dark theme
        extensions={[getLanguageExtension()]} // Set the language syntax
        onChange={(value) => setCode(value)} // Update state on change
      />
      
      {status && (
        <div>
          {" "}
          <pre>
            {" "}
            Memory usage : <span style={{ color: "#00f" }}>{memory} </span>kb
            Used Time : <span style={{ color: "#1002ff" }}>{time} </span> ms{" "}
          </pre>{" "}
          <pre style={{ fontSize: "16px" }}>
            {" "}
            Percentage of accepted test cases{" "}
            <span style={{ color: status === "Accepted" ? "#1BE229" : "#f00" }}>
              {percentage} %
            </span>
          </pre>{" "}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
