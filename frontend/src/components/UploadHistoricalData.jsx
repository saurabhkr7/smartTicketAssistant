import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

function UploadHistoricalData() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/historical-data/upload", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={5} textAlign="center">
      <Typography variant="h5">Upload Historical Data</Typography>
      <Box mt={3}>
        <input type="file" onChange={handleFileChange} />
      </Box>
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </Box>
      {message && (
        <Box mt={3}>
          <Typography color="error">{message}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default UploadHistoricalData;