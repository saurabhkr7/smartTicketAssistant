import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, AppBar, Typography, Toolbar } from "@mui/material";
import Dashboard from "./components/Dashboard";
import UploadHistoricalData from "./components/UploadHistoricalData";
import FindMatches from "./components/FindMatches";

function App() {
  return (
    <Router>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Smart Ticket Assistant</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload-historical" element={<UploadHistoricalData />} />
          <Route path="/find-matches" element={<FindMatches />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;