import {Container,Card,CardContent,Typography,Divider,Box} from "@mui/material";
import Navbar from "./Navbar";

function Mycomplaint() {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>

      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        My Complaints
      </Typography>

      <Card sx={{ mb: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">
            Fan not working in my room
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Status: <b style={{ color: "orange" }}>Pending</b>
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">
            WiFi connection problem in my room
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Status: <b style={{ color: "green" }}>Resolved</b>
          </Typography>
        </CardContent>
      </Card>

    </Container>
  </>
  );
}

export default Mycomplaint;