// components/Navigator.js
import React from "react";
import styles from "./navigator.module.css";

const Navigator = ({ text, selected, onClick }) => {
  return (
    <div
      className={`${styles.wrapper} ${selected ? styles.active : ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.triangle}></div>
      <div className={styles.rectangle}>
        <span className={styles.text}>{text}</span>
      </div>
      <div className={styles.triangle1}></div>
    </div>
  );
};

export default Navigator;
