const path = require('path');
const fs = require('fs-extra');
const AdmZip = require('adm-zip');
const multer = require('multer');
const { marked } = require('marked');
const pool = require("../models/db");

// Configure multer for ZIP file uploads
const upload = multer({ dest: 'uploads/' });



const uploadAllChallenges = async (req, res) => {
  const files = req.files; // handled by multer
  const metadata = JSON.parse(req.body.metadata); // array of challenge info

  const challengeDir = path.join(__dirname, '..', 'problems');
  await fs.ensureDir(challengeDir);

  try {
    for (const challenge of metadata) {
      const { pseudoName, fullName, initialScore , timeLimit , memoryLimit } = challenge;

      // Find file by its fieldname (which is pseudoName)
      const file = files.find(f => f.fieldname === pseudoName);

      if (!file) {
        return res.status(400).json({ error: `Missing file for challenge "${pseudoName}"` });
      }

      // Validate: ensure file name matches pseudoName
      const originalFileName = path.parse(file.originalname).name;
      if (originalFileName !== pseudoName) {
        return res.status(400).json({ error: `ZIP file name must match pseudo-name "${pseudoName}"` });
      }

      // Extract ZIP
      const zipPath = file.path;
      // const challengeDir = path.join(problemsDir, pseudoName);
      await fs.ensureDir(challengeDir) ;

      const zip = new AdmZip(zipPath);
      zip.extractAllTo(challengeDir, true);
      await fs.remove(zipPath);

      // Insert into DB
      await pool.query(
        `INSERT INTO problems (name,  description, initial_score, time_limit, memory_limit ,room_id) VALUES ($1, $2 ,$3 ,$4, $5 ,2 )`,
        [pseudoName, fullName, parseInt(initialScore) , parseInt(timeLimit),parseInt(memoryLimit) ]
      );
    }

    res.status(200).json({ message: 'All challenges uploaded successfully.' });
    console.log("L2omor ta7t saytara")
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: 'Internal server error while uploading challenges.' });
  }
};




// Upload and unzip endpoint
const uploadZip = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No ZIP file uploaded.' });
  }

  const zipPath = file.path;
  const problemsDir = path.join(__dirname, '..', 'problems');

  try {
    await fs.ensureDir(problemsDir);

    const zip = new AdmZip(zipPath);
    zip.extractAllTo(problemsDir, true);

    // Optionally delete the uploaded zip file
    await fs.remove(zipPath);

    res.status(200).json({ message: 'ZIP uploaded and extracted successfully.' });
  } catch (error) {
    console.error('Extraction error:', error);
    res.status(500).json({ error: 'Failed to extract ZIP file.' });
  }
};

// Utility to create tree-like directory listing
const getFolderTree = (dirPath, prefix = '') => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries.map((entry, index) => {
    const isLast = index === entries.length - 1;
    const pointer = isLast ? '└── ' : '├── ';
    const childPath = path.join(dirPath, entry.name);
    let result = `${prefix}${pointer}${entry.name}`;

    if (entry.isDirectory()) {
      const deeper = getFolderTree(childPath, prefix + (isLast ? '    ' : '│   '));
      result += '\n' + deeper.join('\n');
    }

    return result;
  });
};
// List of problems endpoint;
const getProblemsForRoom = async (req, res) => {
  const roomId = parseInt(req.params.id, 10);

  if (isNaN(roomId)) {
    return res.status(400).json({ error: 'Invalid room ID' });
  }

  try {
    const query = `
      SELECT id, name, description, time_limit, memory_limit, initial_score 
      FROM problems 
      WHERE room_id = $1
    `;
    const { rows } = await pool.query(query, [roomId]);
    res.json(rows);
    console.log("Problems Retrieved with Success")
  } catch (error) {
    console.error('Error retrieving problems:', error);
    res.status(500).json({ error: 'Failed to retrieve problems' });
  }
};

// Tree endpoint
const getProblemsTree = (req, res) => {
  const problemsDir = path.join(__dirname, '..', 'problems');

  if (!fs.existsSync(problemsDir)) {
    return res.status(404).json({ error: 'Problems directory not found.' });
  }

  try {
    const tree = getFolderTree(problemsDir).join('\n');
    res.type('text/plain').send(tree);
  } catch (error) {
    console.error('Error generating tree:', error);
    res.status(500).json({ error: 'Failed to generate directory tree.' });
  }
};

const getReadme = (req, res) => {
  const problemName = req.headers['x-problem-name'];

  if (!problemName) {
    return res.status(400).json({ error: 'Missing x-problem-name header' });
  }

  const readmePath = path.join(__dirname, '..', 'problems', problemName, 'readme.md');

  if (!fs.existsSync(readmePath)) {
    return res.status(404).json({ error: 'readme.md not found for this problem' });
  }

  try {
    const content = fs.readFileSync(readmePath, 'utf-8');
    
    const html = marked(content);  // convert to HTML
  
    res.type('text/html').send(html);
    // res.type('text/markdown').send(content); // or 'text/plain'
  } catch (err) {
    console.error('Error reading readme.md:', err);
    res.status(500).json({ error: 'Failed to read readme.md' });
  }
};
const getInitialCode = (req, res) => {
  const problemName = req.headers['x-problem-name'];
  const language = req.query.language

  if (!problemName) {
    return res.status(400).json({ error: 'Missing x-problem-name header' });
  }

  const codePath = path.join(__dirname, '..', 'problems', problemName , "BaseCode", `${language}.txt`);

  if (!fs.existsSync(codePath)) {
    return res.status(404).json({ error: `${language}.txt not found for this problem` });
  }

  try {
    const content = fs.readFileSync(codePath, 'utf-8');
    
  
    res.type('text/html').send(content);
  } catch (err) {
    console.error('Error reading readme.md:', err);
    res.status(500).json({ error: 'Failed to read readme.md' });
  }
};

module.exports = {
  upload,
  uploadZip,
  getProblemsTree,
  getReadme,
  uploadAllChallenges,
  getProblemsForRoom,
  getInitialCode
};
