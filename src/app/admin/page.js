"use client";
import { useState } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import PopUp from "@/components/PopUp";
import style from "./admin.module.css";
export default function admin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [SuccessPopup, setSuccessPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3000/api/auth/admin/login`, { // "user" to be changed by "admin"
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        // const errorData = await response.json();
        throw new Error( "Login failed");
      }
      const {token} = await response.json()
      localStorage.setItem("Admin-Auth" , token )
      setSuccessPopup(true);
      setTimeout(() => setSuccessPopup(false), 5000);

      router.push("/admin/config"); // Redirect on success

    } catch (err) {
      setShowPopup(true);
    // Hide after 3 seconds
      setTimeout(() => setShowPopup(false), 5000);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={style.container}>
       {showPopup && <PopUp message={error} type="alert" />}
       {SuccessPopup && <PopUp message="Login Successfully, Please wait!" type="success" />}
      <form action="" method="post" className={styles.userInfo} >
     
        <h1> Pre-competition configurations</h1>
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
    </div>
  );
}
