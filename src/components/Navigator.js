import React from "react";
import styles from "./navigator.module.css";

const Navigator = ({ text }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.triangle}></div>
        <div className={styles.rectangle}>
          <span className={styles.text}>{text}</span>
        </div>
        <div className={styles.triangle1}></div>
      </div>
    </>
  );
};

export default Navigator;
