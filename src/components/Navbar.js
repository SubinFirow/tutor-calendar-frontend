import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logout } from "../service";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    logout();
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#f2f2f2", color: "black" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Dashboard
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">About</Button>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{ bgcolor: "#333333", "&:hover": { bgcolor: "#666666" } }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
