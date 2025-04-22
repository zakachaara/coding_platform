import styles from './CTF.module.css';
import Banner from './banner';
export default function ChallengeCard() {
  return (
    <div className={styles.container}>
      <div className={styles.titleTag}>
        <span>Name of<br />challenge</span>
      </div>

      <div className={styles.card}>
        <p className={styles.description}>
          description of the challenge goes here , with link to the challenge
        </p>
        <button className={styles.linkButton}>link</button>
      </div>

      <div className={styles.flagInput}>
        <button className={styles.submit}><Banner text={'{submit}'} style1={{borderTop:"20px solid transparent",borderBottom:"20px solid transparent",borderRight:"40px solid #fff9c4",zIndex:"2"}}/></button>
        <input
          type="text"
          placeholder="your flag goes here"
          className={styles.input}
        />
      </div>
    </div>
  );
}
