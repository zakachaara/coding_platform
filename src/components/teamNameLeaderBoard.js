"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import styles from "./button.module.css";
import Button from "./Button"
export default function teamNameLeaderBoard(){
//  Use this after you dispatch the data of team name 
  const [name, setName] = useState("");
  const router = useRouter();
  useEffect(() => {
    // setName(teamName)
    // This runs only in the browser
    const storedName = localStorage.getItem("teamName");
    if (storedName) {
      setName(storedName);
    } else {
      localStorage.setItem("teamName", "just7357");
      setName("just7357");
    }
  }, []);
  const handleDisconnect = () => {
    // Remove from localStorage
    localStorage.removeItem("teamName");

    // Clear all cookies (or just specific ones)
    document.cookie
      .split(";")
      .forEach((cookie) => {
        const name = cookie.split("=")[0].trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });

    // Redirect to home page
    router.push("/");
  };
    return (
        <div className={styles.navbar}>
        <a href="/leaderboard"><Button contenu={"Leader Board"}/></a>
        <Button contenu={name} name={"name"}/>
        <div className={styles.tooltipContainer}>
        <button onClick={handleDisconnect} className={styles.disconnectButton}>
        &#9999; 
      </button> 
      <span className={styles.tooltipText}>Click to disconnect </span>
      </div>
      </div>
      
    )
}