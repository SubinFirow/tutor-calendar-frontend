import { Box } from "@mui/material";
import "./App.css";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Box sx={{ height: "100vh", padding: 4 }}>
        <Calendar />
      </Box>
    </React.Fragment>
  );
}

export default App;
