import { Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
       
        <Typography variant="h4" fontWeight="bold">
          Welcome Back 👋
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 5, color: "gray" }}>
          Select your portal to continue
        </Typography>

      
        <Box sx={{ display: "flex", gap: 5 }}>

          
          <Box
            onClick={() => navigate("/admin-login")}
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "#1976d2",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: 3,
              "&:hover": {
                transform: "scale(1.05)",
                transition: "0.3s",
              },
            }}
          >
            Admin
          </Box>

         
          <Box
            onClick={() => navigate("/student-login")}
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "#2e7d32",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: 3,
              "&:hover": {
                transform: "scale(1.05)",
                transition: "0.3s",
              },
            }}
          >
            Student
          </Box>

        </Box>
      </Box>
    </Container>
  );
};

export default Home;