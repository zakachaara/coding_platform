import styleshome from "../home/home.module.css";
import Banner from "../../components/banner";
import Navigator from "../../components/Navigator";
import Scoreboard from "../../components/Leader";
import styles from "../leaderboard/leaderboard.module.css";

export default function LeaderBoard() {
  return (
    <>
      <div
        style={{
          margin: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className={styles.leaderboards}>
          <Banner text={"Leader board "} />
          <div className={styles.navigation}>
            <Navigator text={"CTF"} />
            <Navigator text={"CP "} />
            <Navigator text={"CE "} />
          </div>
        </div>
        <div className={`${styleshome.navbar} ${styles.team}`}>
          <h2 className={styleshome.nav}>team_name</h2>
        </div>
      </div>
      <Scoreboard score={"total_score"} />
    </>
  );
}
