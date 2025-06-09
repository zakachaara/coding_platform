const { UserScore, Submission, Problem, User } = require('../models');

function computeScore(S0, k, n, lambda) {
  return S0 * Math.exp(-k * (n - 1) * 0.1) * Math.exp(-lambda * n);
}

async function updateScore(userId, problemId, initialScore) {
  const S0 = initialScore;
  const lambda = 0.01;
  const k = 0.3;

  try {
    const existing = await UserScore.findOne({
      where: { user_id: userId, problem_id: problemId },
    });

    if (existing) {
      console.log(`User ${userId} already solved problem ${problemId}. Skipping score update.`);
      return;
    }

    const attemptCount = await Submission.count({
      where: { user_id: userId, problem_id: problemId },
    });

    const score = computeScore(S0, k, attemptCount, lambda);

    await UserScore.upsert({
      user_id: userId,
      problem_id: problemId,
      score: parseInt(score),
    });

  } catch (err) {
    console.error(err);
    throw new Error('Failed to update score');
  }
}

module.exports = { updateScore };
