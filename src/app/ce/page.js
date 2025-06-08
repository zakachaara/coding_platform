"use client"
import {useState , useEffect} from "react";
import styles from '../home/home.module.css'
import Card from '../../components/card'
import Banner from '../../components/banner'
import TeamNameLeaderBoard from '@/components/teamNameLeaderBoard'
import Navigator from '../../components/Navigator'
export default function ce() {

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function fetchdata(){
      try {
        const res = await fetch('http://localhost:5006/api/problems/room/2');
        const data = await res.json();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };
    fetchdata()

  }, []);

  return (
    <>
      <div style={{
          padding:"0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
      <Banner text={'# CE Room'} style={{backgroundColor:'#0900FF' , color:"#ffffff"} }/>
      <TeamNameLeaderBoard  />
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
          {problems.map((problem, index) => (
              <Card line1={problem.name} line2={`score: ${problem.initial_score}`} line3={problem.description} href={`ce/${problem.name}`} solve={"# solve"} style={{backgroundColor:"#0900FF"}} />

            ))}
            {/* <Card line1={"Problem"} line2={"1"} solve={"# solve"} style={{backgroundColor:"#0900FF"}} />
            <Card line1={"Problem"} line2={"2"} solve={"# solve"} style={{backgroundColor:"#0900FF"}} />
            <Card line1={"Problem"} line2={"3"} solve={"# solve"} style={{backgroundColor:"#0900FF"}}/> */}
            
          </div>
        </div>
      </div>
    </>
  );
}
