
const express = require('express');
const router = express.Router();
const {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  getSubmissionsByChallenge
} = require('../controllers/submissionController');

// CRUD routes for submissions
router.post('/', createSubmission);
router.get('/', getAllSubmissions);
router.get('/:id', getSubmissionById);
router.put('/:id', updateSubmission);
router.delete('/:id', deleteSubmission);

// Get submissions by challenge
router.get('/challenge/:problemId', getSubmissionsByChallenge);

module.exports = router;
