const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const HistoricalIncident = require("../models/historicalIncident");

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, "../uploads/") });

// Match finder endpoint
router.post("/find-match", upload.single("file"), (req, res) => {
  try {
    const filePath = req.file.path;

    // Run Python script to find matches
    const python = spawn("python3", [process.env.PYTHON_SCRIPT_PATH + "/find_matches.py", filePath]);

    python.stdout.on("data", async (data) => {
      const matches = JSON.parse(data.toString());
      res.status(200).json({ matches });
    });

    python.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
      res.status(500).json({ error: "Failed to find matches." });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while finding matches." });
  }
});

module.exports = router;
