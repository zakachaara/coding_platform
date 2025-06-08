import styles from '../../home/home.module.css'
import ChallengeCard from '../../../components/CTF'
import TeamNameLeaderBoard from '@/components/teamNameLeaderBoard'
import Banner from '../../../components/banner'
import Navigator from '../../../components/Navigator'
export default function challenge(){

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
      <TeamNameLeaderBoard />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ChallengeCard />
      </div>
    </>
    )
}