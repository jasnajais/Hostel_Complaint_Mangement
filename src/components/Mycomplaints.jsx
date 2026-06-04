import { Container, Card, CardContent, Typography, Box, Button } from "@mui/material";
import Navbar from "./Navbar";

function Mycomplaint() {
  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 4 }}>

        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
          My Complaints
        </Typography>

        {/* Complaint 1 */}
        <Card sx={{ mb: 2, boxShadow: 3 }}>
          <CardContent>

            <Typography variant="h6">
              Fan not working in my room
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Status: <b style={{ color: "orange" }}>Pending</b>
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                size="small"
                sx={{ mr: 1 }}
              >
                Update
              </Button>

              <Button
                variant="outlined"
                color="error"
                size="small"
              >
                Delete
              </Button>
            </Box>

          </CardContent>
        </Card>

        {/* Complaint 2 */}
        <Card sx={{ mb: 2, boxShadow: 3 }}>
          <CardContent>

            <Typography variant="h6">
              WiFi connection problem in my room
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Status: <b style={{ color: "green" }}>Resolved</b>
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                size="small"
                sx={{ mr: 1 }}
              >
                Update
              </Button>

              <Button
                variant="outlined"
                color="error"
                size="small"
              >
                Delete
              </Button>
            </Box>

          </CardContent>
        </Card>

      </Container>
    </>
  );
}

export default Mycomplaint;