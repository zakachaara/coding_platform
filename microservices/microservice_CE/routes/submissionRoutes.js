const express = require("express");
const { submitCode , getSubmissions } = require("../controllers/submissionController");

const router = express.Router();
router.post("/submit", submitCode);
router.get('/user/:userId/submissions', getSubmissions);
module.exports = router;
