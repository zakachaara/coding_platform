import styles from '../home/home.module.css'
import Card from '../../components/card'
import Banner from '../../components/banner'
import Navigator from '../../components/Navigator'
export default function cp() {
  return (
    <>
      <div style={{
          padding:"0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
      <Banner text={'</CP Room>'} style={{backgroundColor:'#33FF00'}}/>
      <div className={styles.navbar}>
        
        <a href="/leaderboard"><h2 className={styles.nav}>Leader Board</h2></a>
        <h2 className={styles.nav}>team_name</h2>
      </div>
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
