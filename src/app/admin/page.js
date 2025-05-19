"use client";
import { useState } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import style from "./admin.module.css";
export default function admin() {
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
      const response = await fetch("http://localhost:8080/api/user/login", { // "user" to be changed by "admin"
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

      router.push("/admin/config"); // Redirect on success
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={style.container}>
      <form action="" method="post" className={styles.userInfo}>
        <h1> Pre-competition configurations</h1>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.field}>
          <label> Login </label>
          <input
            type="text"
            required={true}
            className={styles.input}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          ></input>
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
        <button
          type="submit"
          onClick={handleSubmit}
          className={style.button}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Goooo!"}
        </button>
      </form>
      <div >
        <h1 className={style.heading}> <i> During competition </i></h1>
        <div className={style.discover}>
          <h1 className={style.info}>Capture the Flag</h1>
          <h1 className={style.info}>Competitive Programming</h1>
          <h1 className={style.info}>Code Enhancement</h1>
        </div>
      </div>
    </div>
  );
}
