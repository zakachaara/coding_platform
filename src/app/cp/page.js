"use client"
import styles from '../home/home.module.css'
import Card from '../../components/card'
import TeamNameLeaderBoard from '@/components/teamNameLeaderBoard'
import Banner from '../../components/banner'
import {useState, useEffect } from 'react'

export default function cp() {
  
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function fetchdata(){
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CP_SERVICE}/api/problems/room/1`);
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
      <Banner text={'</CP Room>'} style={{backgroundColor:'#33FF00'}}/>
      <TeamNameLeaderBoard />
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
              <Card line1={problem.name} line2={`score: ${problem.initial_score}`} line3={problem.description} href={`cp/${problem.name}`} solve={"</solve>"} style={{backgroundColor:"#33FF00"}} />

            ))}
            
            
          </div>
        </div>
      </div>
    </>
  );
}
