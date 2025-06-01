import styles from "./button.module.css";
export default function Button({ name, contenu }) {
  return <h2 className={`${styles.nav} ${styles[name]}`}> {contenu}</h2>;
}
