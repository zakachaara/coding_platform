"use client";
import { useParams } from "next/navigation";
import challengestyle from "../../cp/[challenge]/challenge.module.css";
import Banner from "@/components/banner";
import CodeEditor from "@/components/codeEditor";
import MarkdownViewer from "@/components/MarkdownViewer";
import TeamNameLeaderBoard from "@/components/teamNameLeaderBoard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Submissions from "@/components/submissions";

export default function challenge() {
  // const teamName = "test7357"; // change this when you get the actual data
  const { challenge } = useParams();

  // const userId = useSelector((state) => state.team.id); // this stores the id of the team
  const userId = localStorage.getItem("user_id"); // change this when you get the actual data
  console.log(userId)
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function fetchdata() {
  // setProblems([{id:1 , name:"A" , description : "The amgica" , timeLimit : 1 , memoryLimit : 256}])

      try {
        const res = await fetch("http://localhost:5006/api/problems/room/2");
        const data = await res.json();
        setProblems(data);
        // console.log(data)
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    }
    fetchdata();
  }, []);
  const problem_page = problems.find((problem) => problem.name == challenge);
  // setTimeout(()=> console.log(problem_page), 5000)
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
        <div>My Problem name for debug: {challenge}</div>
        <TeamNameLeaderBoard />
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
        <div style={{ display: "block" }}>
          {" "}
          {/*, marginTop: "10px"*/}
          <div className={challengestyle.tab_container}>
            <button
              className={`${challengestyle.tab_button} ${
                showDescription ? challengestyle.active : ""
              }`}
              onClick={() => affiche("desc")}
            >
              <span>✵</span> Description
            </button>
            <button
              className={`${challengestyle.tab_button} ${
                showSubmissions ? challengestyle.active : ""
              }`}
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
  {showDescription && <MarkdownViewer problem={challenge} link={`${process.env.NEXT_PUBLIC_PROBLEM_GETTER_CE_LINK}/readme`}/>}
            {/* {showIssues && <Issue/>} */}
            {showSubmissions && <Submissions userId={userId} isCE={true}/>}
          </div>
        </div>
        {problem_page ? (
          <CodeEditor problem={problem_page} userId={userId} isCE={true} SUBMIT_URL={process.env.NEXT_PUBLIC_SUBMIT_CE_LINK} />
        ) : (
          <div>Loading Code Editor...</div>
        )}
      </div>
    </>
  );
}
