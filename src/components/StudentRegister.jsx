import { useState } from "react";
import {Container,Card,CardContent,Typography,TextField,Button,Stack,Link} from "@mui/material";

function StudentRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roomno, setRoomNo] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, password, roomno });
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
              />

              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />

              <TextField
                label="Room No"
                value={roomno}
                onChange={(e) => setRoomNo(e.target.value)}
                fullWidth
              />
              
              <Button type="submit" variant="contained" fullWidth>
                Register
              </Button>

              
              <Typography textAlign="center" variant="body2">
                <Link href="#" underline="none">
                  Forgot Password?
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