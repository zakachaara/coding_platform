import styles from '../home/home.module.css'
import Card from '../../components/card'
import TeamNameLeaderBoard from '@/components/teamNameLeaderBoard'
import Banner from '../../components/banner'
import Navigator from '../../components/Navigator'
export default function ctf() {
  const teamName = "test7357" // change this when you get the actual data

  return (
    <>
      <div style={{
          padding:"0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
      <Banner text={'{CTF Room}'}/>
      {/* <Navigator text={'Pb 1'}/>
      <Navigator text={'Pb 2'}/>
      <Navigator text={'Pb 3'}/> */}
      <TeamNameLeaderBoard teamName={teamName} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={styles.container}>
          <h1>Challenges</h1>
          <div className={styles.rooms}>
            <Card line1={"Challenge"} line2={"1"} solve={"{solve}"} href={"/ctf/challenge"}/>
            <Card line1={"Challenge"} line2={"2"} solve={"{solve}"} />
            <Card line1={"Challenge"} line2={"3"} solve={"{solve}"} />
            
          </div>
        </div>
      </div>
    </>
  );
}
