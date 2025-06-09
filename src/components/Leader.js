"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
import styles from "./Leader.module.css"; // Note the capital L if your file is Leader.module.css

const userColors = ["#FF5733", "#33FF57", "#337BFF", "#FF33A8", "#FFC300", "#353F57", "#3FEE4F", "#FEA3D8"];
const medalColors = ["gold", "silver", "#cd7f32"];

export default function Scoreboard({ roomId }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [top3, setTop3] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        let fetching_url = `${process.env.NEXT_PUBLIC_CP_SERVICE}/api/leaderboard`;
        if(roomId) {
          fetching_url = `${process.env.NEXT_PUBLIC_CP_SERVICE}/api/leaderboard?roomId=${encodeURIComponent(roomId)}`
        }
        const response = await fetch(fetching_url);
        const {data} = await response.json();
        setScores(data);
        console.log(fetching_url , data)
        const scores_copie = [...data];
        const sortedScores = scores_copie.sort((a, b) => b.total_score - a.total_score);
        
        const top3Scores = sortedScores.slice(0, 3);
        setTop3(top3Scores);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching scores:", error);
        setLoading(false);
      }
    };

    fetchScores();
    const interval = setInterval(fetchScores, 5000);
    return () => clearInterval(interval);
  }, [roomId]);

  return (
    <div style={{
      margin: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className={styles.leader}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              layout="vertical"
              data={scores}
              margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
            >
              <YAxis dataKey="team" type="category" width={100} />
              <XAxis type="number" domain={[0, "dataMax + 10"]} />
              <Tooltip />
              <Bar dataKey="total_score">
                {scores  && scores.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={userColors[index % userColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className={styles.discover}>
        <h1 className={styles.titre}>Podium</h1>
        {top3.map((user, index) => (
          <h1 
            key={user.user_id} 
            className={styles.info} 
            style={{ backgroundColor: medalColors[index] }}
          >
            {user.team}
          </h1>
        ))} 
      </div>
    </div>
  );
};

;