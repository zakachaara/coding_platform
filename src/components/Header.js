import Image from "next/image";
import styles from "./header.module.css";
import { useSelector } from 'react-redux';
import CountDownTimer from "./CountDownTimer";
export default function CustomHeader (){
    const config = useSelector((state)=> state.config);
    const {duration , startingDate} = config ;
    // const duration = "04:00";
    // const startingdate = "06-01-2025 20:00";
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
                <CountDownTimer startingDate={startingDate} duration={duration} />
            </span>
        </div>
        </>
    );
}
