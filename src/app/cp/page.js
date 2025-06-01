import styles from '../home/home.module.css'
import Card from '../../components/card'
import TeamNameLeaderBoard from '@/components/teamNameLeaderBoard'
import Banner from '../../components/banner'
import Navigator from '../../components/Navigator'
export default function cp() {
  const teamName = "test7357" // change this when you get the actual data
  return (
    <>
      <div style={{
          padding:"0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
      <Banner text={'</CP Room>'} style={{backgroundColor:'#33FF00'}}/>
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
            <Card line1={"Problem"} line2={"1"} solve={"</solve>"} style={{backgroundColor:"#33FF00"}} />
            <Card line1={"Problem"} line2={"2"} solve={"</solve>"} style={{backgroundColor:"#33FF00"}} />
            <Card line1={"Problem"} line2={"3"} solve={"</solve>"} style={{backgroundColor:"#33FF00"}}/>
            
          </div>
        </div>
      </div>
    </>
  );
}
