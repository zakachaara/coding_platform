// controllers/scoreController.js
const db = require('../models/db');

function computeScore(S0, n, lambda) {
  return S0 * Math.exp(-lambda * (n - 1));
}

async function updateScore(userId, problemId , initialScore) {
  const S0 = initialScore;
  const lambda = process.env.LAMBDA || 0.23; // decay rate global
  try {
    // Check if the user already solved the problem
    const { rows: acceptedRows } = await db.query(
      'SELECT * FROM user_problem_score WHERE user_id = $1 AND problem_id = $2 LIMIT 1',
      [userId, problemId]
    );
  
    if (acceptedRows.length > 0) {
      // User has already solved the problem — skip updating score
      console.log(`User ${userId} already solved problem ${problemId}. Skipping score update.`);
      return;
    }
  
    // Count attempts by this user for this problem
    const { rows: attemptRows } = await db.query(
      'SELECT COUNT(*) FROM submissions WHERE user_id = $1 AND problem_id = $2',
      [userId, problemId]
    );
    const n = parseInt(attemptRows[0].count); 
    console.log("n", n)
    // Count unique users who attempted the problem
    
    const score = computeScore(S0, n, lambda);
  
    // Upsert into user_problem_score
    await db.query(
      `INSERT INTO user_problem_score (user_id, problem_id, score)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, problem_id) DO UPDATE SET score = EXCLUDED.score`,
      [userId, problemId, parseInt(score)]
    );
  
  }catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update score' });
  }
}
exports.updateScore = updateScore;


// exports.updateScoreOnSuccess = async (req, res) => {
//   const { userId, problemId , initialScore } = req.body;

//   try {
//     await updateScore(userId, problemId, initialScore);
//     res.status(200).json({ message: "Score updated" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error updating score" });
//   }
// };

exports.getUserScore = async (req, res) => {
  const { userId } = req.params;

  try {
    const { rows } = await db.query(
      'SELECT problem_id, score FROM user_problem_score WHERE user_id = $1',
      [userId]
    );

    res.status(200).json({ scores: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
};


