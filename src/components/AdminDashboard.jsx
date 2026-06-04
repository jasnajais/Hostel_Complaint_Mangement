import { useState } from "react";
import Navbar from "./Navbar";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from "@mui/material";

function AdminDashboard() {
  const [status1, setStatus1] = useState("Pending");
  const [status2, setStatus2] = useState("Pending");

  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 4 }}>

        {/* Header */}
        <Card sx={{ mb: 3, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold">
              Admin Dashboard
            </Typography>

            <Typography variant="h6" sx={{ mt: 1 }}>
              Total Complaints: 2
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Status Flow: Pending → Assigned → In Progress → Resolved
            </Typography>
          </CardContent>
        </Card>

        {/* Complaint 1 */}
        <Card sx={{ mb: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6">
              Fan not working
            </Typography>

            <Typography>
              Category: Electrical
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Status: <b>{status1}</b>
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => setStatus1("Assigned")}
              >
                Assign Staff
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={() => setStatus1("In Progress")}
              >
                In Progress
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={() => setStatus1("Resolved")}
              >
                Resolve
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Complaint 2 */}
        <Card sx={{ mb: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6">
              WiFi connection problem
            </Typography>

            <Typography>
              Category: WiFi
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Status: <b>{status2}</b>
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => setStatus2("Assigned")}
              >
                Assign Staff
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={() => setStatus2("In Progress")}
              >
                In Progress
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={() => setStatus2("Resolved")}
              >
                Resolve
              </Button>
            </Stack>
          </CardContent>
        </Card>

      </Container>
    </>
  );
}

export default AdminDashboard;