import style from "./config.module.css";
import Configuration from "../../../components/Configuration";

export default function config() {
  return (
    <div className={style.container}>
      <Configuration />
      <div>
        <div className={style.discover}>
          <div className={style.p_wrapper}>
            <h1 className={style.titre}> Room Configuration</h1>
            <p className={style.p_heading}>Configure your rooms here</p>
          </div>
          <h1 className={style.info}>Capture the Flag</h1>
          <h1 className={style.info}>Competitive Programming</h1>
          <h1 className={style.info}>Code Enhancement</h1>
        </div>
      </div>
    </div>
  );
}
