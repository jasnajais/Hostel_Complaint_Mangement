import { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and role
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "student");
        localStorage.setItem("userInfo", JSON.stringify(data.user));

        navigate("/student-dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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

            <form onSubmit={handleLogin}>
              <Stack spacing={2}>

                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  disabled={loading}
                />

                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  disabled={loading}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 1, borderRadius: 2 }}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <Typography textAlign="center" variant="body2">
                  Don’t have an account?{" "}
                  <Link
                    component="button"
                    type="button"
                    onClick={() => navigate("/student-register")}
                  >
                    Register here
                  </Link>
                </Typography>

              </Stack>
            </form>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default StudentLogin;