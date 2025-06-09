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
    } 
  }, []);


const handleDisconnect = async () => {
  try {
    // Call the logout API to clear server-side cookie
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    // Clear localStorage
    localStorage.clear();

    // Clear accessible cookies (only non-HttpOnly cookies)
    document.cookie
      .split(";")
      .forEach((cookie) => {
        const name = cookie.split("=")[0].trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });

    // Redirect to home/login
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
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