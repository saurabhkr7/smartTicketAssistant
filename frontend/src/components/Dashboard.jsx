import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

function Dashboard() {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4">Welcome to Smart Ticket Assistant</Typography>
      <Box mt={3}>
        <Button component={Link} to="/upload-historical" variant="contained" color="primary">
          Upload Historical Data
        </Button>
      </Box>
      <Box mt={3}>
        <Button component={Link} to="/find-matches" variant="contained" color="secondary">
          Find Matches
        </Button>
      </Box>
    </Box>
  );
}

export default Dashboard;