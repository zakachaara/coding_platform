'use client';
import styles from "./home.module.css";
import Card from "../../components/card";
import TeamNameLeaderBoard from "../../components/teamNameLeaderBoard";
import { useSelector } from 'react-redux';
export default function Home() {
  return (
    <>
\      <TeamNameLeaderBoard />
      <div style={{marginTop:"10px", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <div className={styles.container}>
          <h1>Rooms</h1>
          <div className={styles.rooms}>
            <Card line1={"Capture the"} line2={"Flag"} solve={"{solve}"} href={"/ctf"} /> 
            <Card line1={"Competitive"} line2={"Programming"} solve={"</solve>"} style={{backgroundColor:"#33FF00"}} href={"/cp"} /> 
            <Card line1={"Code"} line2={"Enhancement"} solve={"#solve"} style={{backgroundColor:"#0900FF"}} href={"/ce"} /> 

          </div>
        </div>
      </div>
    </>
  );
}
