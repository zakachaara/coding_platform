
const express = require('express');
const router = express.Router();
const {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
  submitFlag
} = require('../controllers/challengeController');

// CRUD routes for challenges
router.post('/', createChallenge);
router.get('/', getAllChallenges);
router.get('/:id', getChallengeById);
router.put('/:id', updateChallenge);
router.delete('/:id', deleteChallenge);

// Flag submission route
router.post('/:id/submit', submitFlag);

module.exports = router;
