import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Container, Card, CardContent, Typography, Button, Stack } from "@mui/material";

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 5 }}>

      <Card sx={{ p: 3, boxShadow: 4, borderRadius: 3 }}>

        <CardContent>

          <Typography variant="h4" textAlign="center" fontWeight="bold">
            Student Dashboard
          </Typography>

          <Typography textAlign="center" sx={{ mt: 1, mb: 3, color: "gray" }}>
            Welcome back! Choose an option
          </Typography>

          <Stack spacing={2}>

            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/submitcomplaint")}
            >
              Submit Complaint
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/mycomplaint")}
            >
              My Complaints
            </Button>

          </Stack>

        </CardContent>

      </Card>

    </Container>
  </>
  );
}

export default StudentDashboard;