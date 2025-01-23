const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const HistoricalIncident = require("../models/historicalIncident");

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: path.join(__dirname, "../uploads/") });

// Upload and process historical data
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Run Python script to process historical data
    const python = spawn("python3", [process.env.PYTHON_SCRIPT_PATH + "/process_historical_data.py", filePath], {
        maxBuffer: 1024 * 1024 * 50, // Increase buffer size to 50MB
      });
      
    let output = "";
    let errorOccurred = false;

    python.stdout.on("data", (data) => {
      output += data.toString(); // Collect data in chunks
    });

    python.stderr.on("data", (data) => {
      errorOccurred = true;
      console.error(`Error from Python script: ${data}`);
    });

    python.on("close", async (code) => {
      if (errorOccurred) {
        res.status(500).json({ error: "Failed to process historical data." });
        return;
      }

      try {
        const incidents = JSON.parse(output); // Parse the collected data
        await HistoricalIncident.insertMany(incidents);
        res.status(200).json({ message: "Data processed and stored successfully.", incidents });
      } catch (err) {
        console.error("Error parsing JSON or saving data:", err.message);
        res.status(500).json({ error: "Invalid JSON received from Python script." });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "An error occurred while uploading historical data." });
  }
});

module.exports = router;
