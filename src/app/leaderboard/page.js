import styleshome from "../home/home.module.css";
import Banner from "../../components/banner";
import Navigator from "../../components/Navigator";
import Scoreboard from "../../components/Leader";
import Button from "@/components/Button";
import styles from "../leaderboard/leaderboard.module.css";

export default function LeaderBoard() {
  const teamName = "test7357" // change this when you get the actual data
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
        <Button contenu={teamName} name={"name"}/>
        </div>
      </div>
      <Scoreboard score={"total_score"} />
    </>
  );
}
