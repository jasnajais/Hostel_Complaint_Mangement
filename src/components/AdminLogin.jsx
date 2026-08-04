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
import { LockRounded, LoginRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";
import AuthLayout from "./AuthLayout";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (!email || !password) {
      setFeedback("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        navigate("/admin-dashboard");
      } else {
        setFeedback(data.message || "Invalid credentials.");
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
      badge="Admin access"
      title="Operational control, without the clutter."
      subtitle="Sign in to manage complaint assignments, monitor progress, and keep the hostel workflow moving."
      summary="The admin workspace is designed for quick triage, clear accountability, and fewer missed follow-ups."
    >
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="overline" sx={{ letterSpacing: 1.4, color: "text.secondary" }}>
            Administrator portal
          </Typography>
          <Typography variant="h4">Sign in to manage complaints</Typography>
          <Typography color="text.secondary">
            Use your administrator credentials to review and resolve reports.
          </Typography>
        </Stack>

        {feedback && <Alert severity="error">{feedback}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
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

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              endIcon={<LoginRounded />}
            >
              {loading ? "Signing in..." : "Open dashboard"}
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          Need to go back?{" "}
          <Link component="button" type="button" onClick={() => navigate("/")} underline="hover">
            Return home
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}

export default AdminLogin;
