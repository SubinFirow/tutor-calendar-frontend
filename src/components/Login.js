import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { loginUser } from "../service";

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sign in with Google to continue
        </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={loginUser}
          sx={{ mt: 2, bgcolor: "#333333", "&:hover": { bgcolor: "#666666" } }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
