import styles from '../home/home.module.css'
import Card from '../../components/card'
import Banner from '../../components/banner'
import TeamNameLeaderBoard from '@/components/teamNameLeaderBoard'
import Navigator from '../../components/Navigator'
export default function ce() {
  const teamName = "test7357" // change this when you get the actual data
  return (
    <>
      <div style={{
          padding:"0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
      <Banner text={'# CE Room'} style={{backgroundColor:'#0900FF' , color:"#ffffff"} }/>
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
            <Card line1={"Problem"} line2={"1"} solve={"# solve"} style={{backgroundColor:"#0900FF"}} />
            <Card line1={"Problem"} line2={"2"} solve={"# solve"} style={{backgroundColor:"#0900FF"}} />
            <Card line1={"Problem"} line2={"3"} solve={"# solve"} style={{backgroundColor:"#0900FF"}}/>
            
          </div>
        </div>
      </div>
    </>
  );
}
