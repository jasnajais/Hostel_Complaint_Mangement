import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const userInfoStr = localStorage.getItem("userInfo");
  
  let userInfo = null;
  try {
    userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
  } catch (e) {
    console.error("Error parsing userInfo", e);
  }

  const isLoggedIn = !!role;

  const handleDashboardClick = () => {
    if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/student-dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        
        <Typography 
          variant="h6" 
          sx={{ fontWeight: "bold", cursor: "pointer", userSelect: "none" }} 
          onClick={() => navigate("/")}
        >
          {isLoggedIn ? (role === "admin" ? "Admin Portal" : "Student Portal") : "Hostel Portal"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isLoggedIn ? (
            <>
              <Typography 
                variant="body2" 
                sx={{ mr: 2, display: { xs: "none", sm: "block" }, opacity: 0.9, fontWeight: 500 }}
              >
                Logged in as: <strong>{userInfo?.name || userInfo?.email || role}</strong>
              </Typography>

              <Button color="inherit" onClick={handleDashboardClick} sx={{ borderRadius: 2 }}>
                Dashboard
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogout}
                sx={{
                  ml: 1,
                  borderRadius: 2,
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  "&:hover": { 
                    borderColor: "white", 
                    backgroundColor: "rgba(255, 255, 255, 0.1)" 
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/")} sx={{ borderRadius: 2 }}>
                Home
              </Button>
              <Button color="inherit" onClick={() => navigate("/student-login")} sx={{ borderRadius: 2 }}>
                Student Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/admin-login")} sx={{ borderRadius: 2 }}>
                Admin Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/student-register")}
                sx={{
                  ml: 1,
                  borderRadius: 2,
                  backgroundColor: "white",
                  color: "#1976d2",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#f5f5f5" }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;