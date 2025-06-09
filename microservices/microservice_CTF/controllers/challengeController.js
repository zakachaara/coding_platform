const db = require('../models');
const { encrypt, decrypt } = require('../utils/encryption');
const Problem = db.Problem;
const Submission = db.Submission;

// Create a new problem
const createChallenge = async (req, res) => {
  try {
    console.log('Creating problem with data:', req.body);
    const { url, description, flag, score, name } = req.body;
    
    // Validate required fields
    if (!url || !description || !flag) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: url, description, and flag are required'
      });
    }
    
    // Encrypt the flag before storing
    console.log('Encrypting flag...');
    const encryptedFlag = encrypt(flag);
    console.log('Flag encrypted successfully');
    
    const challengeData = {
      link:url,
      description,
      flag: encryptedFlag,
      initial_score: score,
      name
    };
    
    console.log('Creating problem in database...');
    const problem = await Problem.create(challengeData);
    console.log('Problem created successfully:', problem.id);
    
    res.status(201).json({
      success: true,
      data: {
        ...problem.toJSON(),
        flag: '[ENCRYPTED]' // Don't return the actual flag
      }
    });
  } catch (error) {
    console.error('Error creating problem:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating problem',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get all challenges
const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Problem.findAll({
      where: {
        room_id: 3
      }
    });
    
    // Hide the actual flags in the response
    const sanitizedChallenges = challenges.map(problem => ({
      ...problem.toJSON(),
      flag: '[ENCRYPTED]'
    }));
    
    res.json({
      success: true,
      data: sanitizedChallenges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching challenges',
      error: error.message
    });
  }
};

// Get problem by ID
const getChallengeById = async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id, {
      include: [{
        model: Submission,
        as: 'submissions',
        attributes: ['id', 'user_id', 'created_at', 'verdict']
      }]
    });
    
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        ...problem.toJSON(),
        flag: '[ENCRYPTED]' // Don't return the actual flag
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching problem',
      error: error.message
    });
  }
};

// Update problem
const updateChallenge = async (req, res) => {
  try {
    const { url, description, flag, score, is_active } = req.body;
    const problem = await Problem.findByPk(req.params.id);
    
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    const updateData = {
      url: url || problem.url,
      description: description || problem.description,
      score: score || problem.score,
      is_active: is_active !== undefined ? is_active : problem.is_active
    };
    
    // Only encrypt new flag if provided
    if (flag) {
      updateData.flag = encrypt(flag);
    }
    
    await problem.update(updateData);
    
    res.json({
      success: true,
      data: {
        ...problem.toJSON(),
        flag: '[ENCRYPTED]'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating problem',
      error: error.message
    });
  }
};

// Delete problem
const deleteChallenge = async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);
    
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    await problem.destroy();
    
    res.json({
      success: true,
      message: 'Problem deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting problem',
      error: error.message
    });
  }
};

// Submit flag for a problem
const submitFlag = async (req, res) => {
  try {
    const { user_flag, user_id } = req.body;
    const problemId = req.params.id;
    
    const problem = await Problem.findByPk(problemId);
    
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    // Decrypt the stored flag and compare
    const actualFlag = decrypt(problem.flag);
    const isCorrect = actualFlag === user_flag;
    
    // Create submission record
    const submission = await Submission.create({
      user_id: user_id || 1, // Default user for testing
      problem_id: challengeId,
      user_flag,
      verdict: isCorrect ? 'ACCEPTED' : 'WRONG_ANSWER',
      score_awarded: isCorrect ? problem.score : 0,
      problem_type: 'CTF'
    });
    
    res.json({
      success: true,
      correct: isCorrect,
      score_awarded: isCorrect ? problem.score : 0,
      message: isCorrect ? 'Correct flag!' : 'Incorrect flag. Try again!',
      submission_id: submission.id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting flag',
      error: error.message
    });
  }
};

module.exports = {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
  submitFlag
};
