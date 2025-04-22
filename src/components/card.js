import React from 'react';
import styles from './card.module.css';

const Card = ({line1, line2 , solve, style , href}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card} style={style}>
        <div className={styles.banner} >
          <span>{line1} <br /> {line2} </span>
        </div>
        <div className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.lock}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6-6h-1V9a5 5 0 00-10 0v2H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2zM9 9a3 3 0 116 0v2H9V9z"
            />
          </svg>
        </div>
        <a href={href}> <button className={styles.solveBtn} >{solve}</button></a>
      </div>
    </div>
  );
};

export default Card;
