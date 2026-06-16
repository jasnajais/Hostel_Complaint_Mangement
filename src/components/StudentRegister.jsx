import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Container,Card,CardContent,Typography,TextField,Button,Stack,Link} from "@mui/material";
import { API_BASE } from "../utils/api";

function StudentRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roomno, setRoomNo] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !roomno) {
      alert("Please fill all fields");
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
        alert("Registration successful! Please login.");
        navigate("/student-login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>

      <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
        <CardContent>

          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Student Register
          </Typography>

          <Typography variant="body2" textAlign="center" sx={{ mb: 3, color: "gray" }}>
            Create your account to continue
          </Typography>

          
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>

              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                disabled={loading}
              />

              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                disabled={loading}
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                disabled={loading}
              />

              <TextField
                label="Room No"
                value={roomno}
                onChange={(e) => setRoomNo(e.target.value)}
                fullWidth
                disabled={loading}
              />
              
              <Button type="submit" variant="contained" fullWidth disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>

              
              <Typography textAlign="center" variant="body2">
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate("/student-login")}
                  underline="none"
                >
                  Already have an account? Login here
                </Link>
              </Typography>

            </Stack>
          </form>

        </CardContent>
      </Card>

    </Container>
  );
}

export default StudentRegister;