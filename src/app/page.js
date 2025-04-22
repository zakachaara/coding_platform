"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      router.push("/home"); // Redirect on success
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <form action="" method="post" className={styles.userInfo}>
        <h1> Who are you?</h1>
        {error && <div className={styles.error}>{error}</div>}
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
        <h1 className={styles.titre}>What is next ?</h1>
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
