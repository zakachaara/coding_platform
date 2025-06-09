const db = require('../models');
const { encrypt, decrypt } = require('../utils/encryption');
const { updateScore } = require('./scoreController');
const Submission = db.Submission;
const Problem = db.Problem;
const User = db.User;

// Create a new submission
const createSubmission = async (req, res) => {
  const { user_id, problem_id, user_flag } = req.body;

  try {
    // Get the problem and its correct flag
    const problem = await Problem.findByPk(problem_id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    // Compare flags
    const isCorrect = decrypt(problem.flag.trim()) === (user_flag || '').trim();
    const verdict = isCorrect ? 'accepted' : 'wrong answer';

    // Create the submission
    const submission = await Submission.create({
      user_id,
      problem_id,
      user_flag,
      verdict
    });
    if (isCorrect) {
      updateScore(user_id,problem_id, problem.initial_score)
    }
    // Load additional details for response
    // const submissionWithDetails = await Submission.findByPk(submission.id, {
    //   include: [
    //     { model: Problem, as: 'problem', attributes: ['id', 'link', 'description', 'initial_score'] },
    //     { model: User, as: 'user', attributes: ['id', 'login'] }
    //   ]
    // });

    res.status(201).json({
      success: true,
      verdict,
      data: {id: submission.id}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating submission',
      error: error.message
    });
  }
};

// Get all submissions
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      include: [
        { model: Problem, as: 'problem', attributes: ['id', 'url', 'description', 'score'] },
        { model: User, as: 'user', attributes: ['id', 'login'] }
      ],
      order: [['submission_time', 'DESC']]
    });
    
    res.json({
      success: true,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: error.message
    });
  }
};

// Get submission by ID
const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id, {
      include: [
        { model: Problem, as: 'problem', attributes: ['id', 'url', 'description', 'score'] },
        { model: User, as: 'user', attributes: ['id', 'login'] }
      ]
    });
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.json({
      success: true,
      data: submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching submission',
      error: error.message
    });
  }
};

// Update submission
const updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    await submission.update(req.body);
    
    const updatedSubmission = await Submission.findByPk(req.params.id, {
      include: [
        { model: Problem, as: 'problem', attributes: ['id', 'url', 'description', 'score'] },
        { model: User, as: 'user', attributes: ['id', 'login'] }
      ]
    });
    
    res.json({
      success: true,
      data: updatedSubmission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating submission',
      error: error.message
    });
  }
};

// Delete submission
const deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    await submission.destroy();
    
    res.json({
      success: true,
      message: 'Submission deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting submission',
      error: error.message
    });
  }
};

// Get submissions by problem ID
const getSubmissionsByChallenge = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      where: { problem_id: req.params.problemId },
      include: [
        { model: User, as: 'user', attributes: ['id', 'login'] }
      ],
      order: [['created_at', 'DESC']]
    });
    
    res.json({
      success: true,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions for problem',
      error: error.message
    });
  }
};

module.exports = {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  getSubmissionsByChallenge
};
