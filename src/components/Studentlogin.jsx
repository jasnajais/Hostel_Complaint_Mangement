import { useState } from "react";
import {
  Alert,
  Button,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { EmailRounded, LockRounded, LoginRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";
import AuthLayout from "./AuthLayout";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (!email || !password) {
      setFeedback("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "student");
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        navigate("/student-dashboard");
      } else {
        setFeedback(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      setFeedback("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      badge="Student access"
      title="Welcome back, student."
      subtitle="Sign in to submit hostel complaints, track progress, and keep maintenance accountable."
      summary="One login gives you the full complaint workflow, from issue submission to resolution."
    >
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="overline" sx={{ letterSpacing: 1.4, color: "text.secondary" }}>
            Student portal
          </Typography>
          <Typography variant="h4">Sign in to continue</Typography>
          <Typography color="text.secondary">
            Use your hostel email and password to access your dashboard.
          </Typography>
        </Stack>

        {feedback && <Alert severity="error">{feedback}</Alert>}

        <form onSubmit={handleLogin}>
          <Stack spacing={2.5}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRounded fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" size="large" disabled={loading} endIcon={<LoginRounded />}>
              {loading ? "Signing in..." : "Enter dashboard"}
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          Need an account?{" "}
          <Link component="button" type="button" onClick={() => navigate("/student-register")} underline="hover">
            Register here
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}

export default StudentLogin;
