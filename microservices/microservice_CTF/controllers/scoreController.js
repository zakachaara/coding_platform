const { UserScore, Submission, Problem, User } = require('../models');

function computeScore(S0, n, lambda) {
  return S0 * Math.exp(-lambda * (n - 1) );
}

async function updateScore(userId, problemId, initialScore) {
  const S0 = initialScore;
  const lambda = process.env.LAMBDA || 0.01;

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

    const score = computeScore(S0, attemptCount, lambda);

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
