import React from "react";
import styles from "./banner.module.css";

const Banner = ({ text , style , style1}) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.triangle} style={style1}></div>
        <div className={styles.rectangle} style={style}>
          <span className={styles.text} style={style}>{text}</span>
        </div>
      </div>
    </>
  );
};

export default Banner;
