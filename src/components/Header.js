import Image from "next/image";
import styles from "./header.module.css";

export default function CustomHeader (){
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
                TIMER STARTS
            </span>
        </div>
        </>
    );
}
