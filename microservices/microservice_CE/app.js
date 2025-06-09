const express = require("express");
const cors = require("cors");
require("dotenv").config();

const submissionRoutes = require("./routes/submissionRoutes");
// const scoreRoutes = require("./routes/scoreRoutes");
const problemRoutes = require('./routes/problemRoutes');
const app = express();
app.use(cors());
app.use(express.json({ type: "application/json", encoding: "latin-1" }));

app.use('/api/problems', problemRoutes);
// app.use("/api", scoreRoutes);
app.use("/", submissionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
