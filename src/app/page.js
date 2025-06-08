"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import PopUp from "../components/PopUp";
import { useDispatch } from 'react-redux';
import { setId } from '../store/slices/teamSlice';
import { NextResponse } from 'next/server';

export default function Home() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const form = e.target;
    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`, { //use the endpoint of the auth service
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        // const errorData = await response.json();
        throw new Error("Login failed");
      }
      const {token , id} = await response.json();
      //  We are encoutering problems with the use of Store ( Redux)
      dispatch(setId(id));
      localStorage.setItem('user_id', id); 

      console.log(id)

      localStorage.setItem('Authorization', token); 
      router.push('/home');
      localStorage.setItem("teamName", login);
      setSuccessPopup(true);
    // Hide after 3 seconds
      setTimeout(() => setSuccessPopup(false), 5000);
      router.push("/home"); // Redirect on success
    } catch (err) {
      setShowPopup(true);
    // Hide after 3 seconds
      setTimeout(() => setShowPopup(false), 5000);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <form action="" method="post" className={styles.userInfo}>
        <h1> Who are you?</h1>
        {/* {error && <div className={styles.error}>{error}</div>} */}
        {showPopup && <PopUp message={error} type="alert" />}
        {SuccessPopup && <PopUp message="Login Successfully, Please wait!" type="success" />}

        <div className={styles.field}>
          <label> Login </label>
          <input type="text" required={true} className={styles.input} value={login}
            onChange={(e) => setLogin(e.target.value)}></input>
        </div>
        <div className={styles.field}>
          <label> Password </label>
          <input
            type="password"
            required={true}
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit" onClick={handleSubmit} className={styles.button}
        disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Join Us"}
        </button>
      </form>
      <div className={styles.discover}>
        <h1 className={styles.titre}>Discover what is next ?</h1>
        <h1 className={styles.info}>
          <a
            href="https://dcs.leicester.gov.uk/media/1858/capture-the-flag.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Capture the Flag
          </a>
        </h1>
        <h1 className={styles.info}>
          <a
            href="https://codeforces.com/blog/entry/66909"
            target="_blank"
            rel="noopener noreferrer"
          >
            Competitive Programming
          </a>
        </h1>
        <h1 className={styles.info}>
          <a
            href="https://claritychallenge.org/clarity2025-workshop/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code Enhancement
          </a>
        </h1>
      </div>
    </div>
  );
}
