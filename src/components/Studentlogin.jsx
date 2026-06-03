import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Link
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function StudentLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // set role for navbar + routing
    localStorage.setItem("userRole", "student");

    navigate("/student-dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #e3f2fd, #ffffff)"
        }}
      >
        <Card
          sx={{
            width: "100%",
            p: 3,
            borderRadius: 3,
            boxShadow: 5
          }}
        >
          <CardContent>

            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Student Login
            </Typography>

            <Typography
              variant="body2"
              textAlign="center"
              sx={{ mb: 3, color: "gray" }}
            >
              Welcome back! Please login to continue
            </Typography>

            <Stack spacing={2}>

              <TextField
                label="Email / Username"
                variant="outlined"
                fullWidth
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
              />

              <Button
                variant="contained"
                size="large"
                onClick={handleLogin}
                sx={{ mt: 1, borderRadius: 2 }}
              >
                Login
              </Button>

              <Typography textAlign="center" variant="body2">
                Don’t have an account?{" "}
                <Link
                  component="button"
                  onClick={() => navigate("/student-register")}
                >
                  Register here
                </Link>
              </Typography>

            </Stack>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default StudentLogin;