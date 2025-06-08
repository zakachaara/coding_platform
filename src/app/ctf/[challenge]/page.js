"use client";
import styles from "../../home/home.module.css";
import ChallengeCard from "../../../components/CTF";
import TeamNameLeaderBoard from "@/components/teamNameLeaderBoard";
import Banner from "../../../components/banner";
import Navigator from "../../../components/Navigator";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
export default function challenge() {
  const [problem, setProblem] = useState([]);
  const params = useParams();
  const challenge = params.challenge //
  const userId = localStorage.getItem("user_id"); // change this when you get the actual data
  console.log(userId);
  useEffect(() => {
    fetch("http://localhost:5007/api/challenges/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        
        // setChallenges(result.data);
        const problem_page = result.data.find(
          (problem) => problem.name == challenge
        );
        if (problem_page) {
          console.log("Found challenge:", problem_page);
        } else {
          console.warn("Challenge not found:", challenge);
        }
        console.log(problem_page); 
        setProblem(problem_page)// Store in state
        console.log("Challenges retrieved successfully:", result);
      })
      .catch((error) => {
        console.error("Error retrieving challenges:", error);
      });
  }, []);

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
        {/* <Navigator text={'Pb 1'}/>
      <Navigator text={'Pb 2'}/>
      <Navigator text={'Pb 3'}/> */}
        <TeamNameLeaderBoard />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {problem && <ChallengeCard challenge={problem} userId={userId} />}
      </div>
    </>
  );
}
