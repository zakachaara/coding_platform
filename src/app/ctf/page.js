"use client";
import styles from '../home/home.module.css'
import Card from '../../components/card'
import TeamNameLeaderBoard from '@/components/teamNameLeaderBoard'
import Banner from '../../components/banner'
import Navigator from '../../components/Navigator'
import { useState , useEffect } from 'react';

export default function ctf() {
   // change this when you get the actual data
   
   const [challenges, setChallenges] = useState([]);

useEffect( () => {
  fetch("http://localhost:5007/api/challenges/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => response.json())
  .then((result) => {
    setChallenges(result.data);  // Store in state
    console.log("Challenges retrieved successfully:", result);
  })
  .catch((error) => {
    console.error("Error retrieving challenges:", error);
  });
},[]);
  return (
    <>
      <div style={{
          padding:"0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
      <Banner text={'{CTF Room}'}/>
      {/* <Navigator text={'Pb 1'}/>
      <Navigator text={'Pb 2'}/>
      <Navigator text={'Pb 3'}/> */}
      <TeamNameLeaderBoard  /> {/*teamName={teamName}*/}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={styles.container}>
          <h1>Challenges</h1>
          <div className={styles.rooms}>
          {/* {Array.from({ length: numberOfChallenges }, (_, index) => (
          <Card
            key={index}
            line1={"Challenge"}
            line2={index+1}
            solve={"{solve}"}
            href={`/ctf/challenge`}
          />
        ))} */}
        {challenges.map((problem, index) => (
              <Card line1={problem.name} line2={`score: ${problem.initial_score}`} line3={problem.description} href={`ctf/${problem.name}`} solve={"{solve}"} />

            ))}
            {/* <Card line1={"Challenge"} line2={"1"} solve={"{solve}"} href={"/ctf/challenge"}/>
            <Card line1={"Challenge"} line2={"2"} solve={"{solve}"} />
            <Card line1={"Challenge"} line2={"3"} solve={"{solve}"} />
             */}
          </div>
        </div>
      </div>
    </>
  );
}
