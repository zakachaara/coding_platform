const axios = require("axios");
// const {fetch} = require("node-fetch");
const pool = require("../models/db");
const loadTestCases = require("../utils/loadTestCases");

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || "http://10.0.0.30:2358";

const submitCode = async (req, res) => {
  const { userId, code, language_id ,problemName ,initialScore, problemId , timeLimit , memoryLimit } = req.body; // jib 7ta problemid , timelimite , memeory limit 
  const testCases = loadTestCases(problemName);
  console.log("Transfered data, separated by / :   "+ userId +"_/_" + code +"_/_" + language_id +"_/_" + problemName)
  const submissions = testCases.map((testCase) => ({
    language_id,
    source_code: code,
    stdin: testCase.input,
    expected_output: testCase.expected,
    wall_time_limit: timeLimit, 
    memory_limit: memoryLimit*1000, // this in kilobytes
    enable_per_process_and_thread_time_limit: true,
    enable_per_process_and_thread_memory_limit: true,
  }));
  console.log(submissions)
  console.log("link : " + JUDGE0_API_URL)
  try {
    const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissions }),
    });

    const submissionData = await submissionResponse.json();
    const tokens = submissionData.map((item) => item.token);

    let results = [];
    let completed = 0;

    const calculateResults = (submissionResults) => {
      if (!submissionResults.length) return { status: null, percentage: 0 };
      const acceptedTests = submissionResults.filter(res => res.status === "Accepted").length;
      const totalTests = submissionResults.length;
      const firstFailedTest = submissionResults.find(res => res.status !== "Accepted");
      const maxTime = Math.max(...submissionResults.map(res => res.time));
      const maxMemory = Math.max(...submissionResults.map(res => res.memory));
      return {
        status: firstFailedTest ? firstFailedTest.status : "Accepted",
        percentage: ((acceptedTests / totalTests) * 100).toFixed(2),
        time: maxTime,
        memory: maxMemory
      };
    };

    const checkResults = async () => {
      for (const token of tokens) {
        // console.log("my token : "+ token)
        const resultResponse = await axios.get(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`);
        const resultData = resultResponse.data;

        if (resultData.status.id !== 1 && resultData.status.id !== 2 && completed < tokens.length) {
          results.push({
            status: resultData.status.description,
            time: resultData.time * 1000,
            memory: resultData.memory,
            passed: resultData.status.description === "Accepted"
          });
          completed++;
        }
      }

      if (completed < tokens.length) {
        setTimeout(checkResults, 1000);
      } else {
        results = calculateResults(results);


        // Controllers are up-to-date only scoreController has problems with data persistent , the schema does not fit with the content

        await pool.query(
            `INSERT INTO "submissions" (user_id, problem_id, code , memory_usage, execution_time, verdict , accept_percent) values
             ($1, $2, $3, $4, $5, $6, $7)`,
            [userId, problemId, code, results.memory , results.time,results.status, results.percentage]
          );
          
          if (results.status === "Accepted") {
            const { updateScore } = require("../controllers/scoreController");
            await updateScore(userId, problemId , initialScore);
          }
          
        res.json(results);
      }
    };

    checkResults();
  } catch (error) {
    console.error("Error submitting code:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getSubmissions =  async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM submissions WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    res.json(result.rows);
    console.log("Submissions fetched")
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { submitCode , getSubmissions};
