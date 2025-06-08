"use client"
import { useState } from "react";
import styleshome from "../home/home.module.css";
import Banner from "../../components/banner";
import Navigator from "../../components/Navigator";
import Scoreboard from "../../components/Leader";
import Button from "@/components/Button";
import styles from "../leaderboard/leaderboard.module.css";
import TeamNameLeaderBoard from "@/components/teamNameLeaderBoard";

export default function LeaderBoard() {
  const [roomId, setRoomId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleNavigatorClick = (room, id) => {
    setRoomId(id);
    setSelectedRoom(room);
  };

  const handleBannerClick = () => {
    setRoomId(null);
    setSelectedRoom(null);
  };

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
          <div onClick={handleBannerClick} style={{ cursor: "pointer" }}>
            <Banner text={"Leader board "} />
          </div>
          <div className={styles.navigation}>
            <Navigator
              text={"CTF"}
              selected={selectedRoom === "CTF"}
              onClick={() => handleNavigatorClick("CTF", 3)}
            />
            <Navigator
              text={"CP"}
              selected={selectedRoom === "CP"}
              onClick={() => handleNavigatorClick("CP", 1)}
            />
            <Navigator
              text={"CE"}
              selected={selectedRoom === "CE"}
              onClick={() => handleNavigatorClick("CE", 2)}
            />
          </div>
        </div>
        <div className={`${styleshome.navbar} ${styles.team}`}>
          <TeamNameLeaderBoard />

        </div>
      </div>

      <Scoreboard roomId={roomId} />
    </>
  );
}
