import style from "./config.module.css";
import Configuration from "../../../components/Configuration";

export default function config() {
  return (
    <div className={style.container}>
      <Configuration />
      <div>
        <div>
          <div className={style.configwrapper}>
            <div className={style.discover} style={{border:"2px red solid" , backgroundColor:"#ff453553"} }>
              <div className={style.p_wrapper}>
                <h1 className={style.heading}>
                  <i> During competition </i>
                  <p className={style.p_heading}>Manage user requests</p>
                </h1>
              </div>
              <div style={{display:"flex" , justifyContent:"space-between", alignItems:"center" , width:"100%"}}>
              <a className={`${style.redirect}`} href="./config/during-competition/ctf"> <h1>CTF</h1></a>
              <a className={`${style.redirect}`} href="./config/during-competition/cp"> <h1>CP </h1></a>
              <a className={`${style.redirect}`} href="./config/during-competition/ce"> <h1>CE </h1></a>
              </div>            
            </div>
          </div>
          <div className={style.discover}>
            <div className={style.p_wrapper}>
              <h1 className={style.titre}> Room Configuration</h1>
              <p className={style.p_heading}>Configure your rooms here</p>
            </div>
            <a href="./config/ctf"><h1 className={style.info}>Capture the Flag       </h1></a>
            <a href="./config/cp"> <h1 className={style.info}>Competitive Programming</h1></a>
            <a href="./config/ce"> <h1 className={style.info}>Code Enhancement       </h1></a>
          </div>
        </div>
      </div>
    </div>
  );
}
