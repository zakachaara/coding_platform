// routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

// router.post('/update', scoreController.updateScoreOnSuccess);
router.get('/user/:userId', scoreController.getUserScore);
router.get('/leaderboard', scoreController.getLeaderboard);

module.exports = router;
