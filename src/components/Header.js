import Image from "next/image";
import styles from "./header.module.css";
import CountDownTimer from "./CountDownTimer";
export default function CustomHeader (){
    const duration = "04:00";
    const startingdate = "05-31-2025 12:00";
    return (
        <>
        <div className={styles.header}> 
            <div className={styles.identity}>
            <Image 
                className={styles.logo}
                src="/logo.jpeg"
                alt="Coding Rooms logo"
                width={60}
                height ={60}
                priority
          />
          <h1 className={styles.competition}>Coding rooms</h1>
            </div>
            <span className={styles.timer}>
                <CountDownTimer startingDate={startingdate} duration={duration} />
            </span>
        </div>
        </>
    );
}
