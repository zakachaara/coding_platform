"use client";
import { useParams } from 'next/navigation';
import styles from "../../home/home.module.css";
import challengestyle from "./challenge.module.css";
import Banner from "../../../components/banner";
import Navigator from "../../../components/Navigator";
import CodeEditor from "@/components/codeEditor";
import MarkdownViewer from "@/components/MarkdownViewer";
import TeamNameLeaderBoard from '@/components/teamNameLeaderBoard'
import { useState } from "react";
import Issue from "@/components/Issue";
import Submissions from "@/components/submissions";

export default function challenge() {
  const teamName = "test7357" // change this when you get the actual data
  const { challenge } = useParams()
  const userId = 1 // change this when you get the actual data
  const [showDescription, setShowDescription] = useState(true);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [showIssues, setShowIssues] = useState(false);
  const affiche = (topic) => {
    if (topic === "issue") {
      setShowDescription(false);
      setShowIssues(true);
      setShowSubmissions(false);
    } else if (topic === "subm") {
      setShowDescription(false);
      setShowIssues(false);
      setShowSubmissions(true);
    } else if (topic === "desc") {
      setShowDescription(true);
      setShowIssues(false);
      setShowSubmissions(false);
    }
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
        <Banner style={{ backgroundColor: "#33FF00" }} text={"</CP Room> "} />
        {/* <Navigator text={'Pb 1'}/>
      <Navigator text={'Pb 2'}/>
      <Navigator text={'Pb 3'}/> */}
      <div>My Problem name for debug: {challenge}</div>
        <TeamNameLeaderBoard teamName={teamName} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          // alignItems: "flex-end",
          // gap: "20px", // Optional: Add spacing between elements
          height: "100vh",
        }}
      >
        <div style={{ display: "block"}}> {/*, marginTop: "10px"*/ } 
          <div className={challengestyle.tab_container}>
            <button
              className={`${challengestyle.tab_button} ${showDescription ? challengestyle.active : ""}`}
              onClick={() => affiche("desc")}
            >
              <span>✵</span> Description
            </button>
            <button
              className={`${challengestyle.tab_button} ${showSubmissions ? challengestyle.active : ""}`}
              onClick={() => affiche("subm")}
            >
              <span>✓</span> Submissions
            </button>
            {/* <button
              className={`${challengestyle.tab_button} ${showIssues ? challengestyle.active : ""}`}
              onClick={() => affiche("issue")}
            >
              <span>⚑</span> Issues
            </button> */}
          </div>
          <div className={challengestyle.tab_content}>
            {showDescription && <MarkdownViewer problem={challenge}/>}
            {/* {showIssues && <Issue/>} */}
            {showSubmissions && <Submissions />}
          </div>
        </div>

        <CodeEditor problem={challenge} userId={userId} /> 
      </div>
    </>
  );
}
