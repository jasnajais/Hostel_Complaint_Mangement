import { useState } from "react";
import {
  Alert,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PersonAddAltRounded, SchoolRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";
import AuthLayout from "./AuthLayout";

function StudentRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roomno, setRoomNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (!name || !email || !password || !roomno) {
      setFeedback("Please complete every field before continuing.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, roomno }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/student-login");
      } else {
        setFeedback(data.message || "Registration failed.");
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
      badge="Create account"
      title="Set up your student account in minutes."
      subtitle="Create a secure profile so you can submit complaints, track updates, and manage your hostel room requests."
      summary="Registration stays lightweight while still capturing the room information needed for faster resolution."
      highlights={[
        {
          icon: <SchoolRounded fontSize="small" />,
          title: "Student identity",
          description: "Keep one verified profile linked to your room number and complaint history.",
        },
        {
          icon: <PersonAddAltRounded fontSize="small" />,
          title: "Quick setup",
          description: "Register once and reuse the same account for future hostel maintenance issues.",
        },
        {
          icon: <SchoolRounded fontSize="small" />,
          title: "Clear routing",
          description: "Your complaints go straight to the right admin workspace without extra steps.",
        },
      ]}
    >
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="overline" sx={{ letterSpacing: 1.4, color: "text.secondary" }}>
            Student registration
          </Typography>
          <Typography variant="h4">Create your account</Typography>
          <Typography color="text.secondary">
            Add your basic details and room number to get started.
          </Typography>
        </Stack>

        {feedback && <Alert severity="error">{feedback}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              autoComplete="name"
            />

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
              autoComplete="new-password"
            />

            <TextField
              label="Room number"
              value={roomno}
              onChange={(e) => setRoomNo(e.target.value)}
              disabled={loading}
              inputProps={{ inputMode: "numeric" }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              endIcon={<PersonAddAltRounded />}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          Already registered?{" "}
          <Link component="button" type="button" onClick={() => navigate("/student-login")} underline="hover">
            Sign in here
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}

export default StudentRegister;
