const express = require('express');
const router = express.Router();
const problemsController = require('../controllers/problemsController');

router.get('/room/:id', problemsController.getProblemsForRoom);
router.post('/upload-all', problemsController.upload.any(), problemsController.uploadAllChallenges);
router.post('/upload', problemsController.upload.single('file'), problemsController.uploadZip);
router.get('/tree', problemsController.getProblemsTree);
router.get('/readme', problemsController.getReadme);


module.exports = router;
