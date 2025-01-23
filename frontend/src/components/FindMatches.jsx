import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function FindMatches() {
  const [file, setFile] = useState(null);
  const [matches, setMatches] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFindMatches = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const response = await axios.post("https://smartticketassistant.onrender.com/api/match-finder/find-match", formData);
      setMatches(response.data);
    } catch (error) {
      setMessage("Error finding matches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={5} textAlign="center">
      <Typography variant="h5">Find Matches</Typography>
      <Box mt={3}>
        <input type="file" onChange={handleFileChange} />
      </Box>
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleFindMatches} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Find Matches"}
        </Button>
      </Box>
      {message && (
        <Box mt={3}>
          <Typography color="error">{message}</Typography>
        </Box>
      )}
      {matches && matches.matches && (
        <Box mt={3}>
          <Typography variant="h6">Match Found:</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{matches.matches.number}</TableCell>
                  <TableCell>{matches.matches.subject}</TableCell>
                  <TableCell>{matches.matches.description}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}

export default FindMatches;
