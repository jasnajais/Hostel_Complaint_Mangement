import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDashboardClick = () => {
    const role = localStorage.getItem("userRole");

    if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/student-dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hostel Portal
        </Typography>

        <Box>

          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>

          <Button color="inherit" onClick={handleDashboardClick}>
            Dashboard
          </Button>

          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ ml: 2, border: "1px solid white", borderRadius: 1 }}
          >
            Logout
          </Button>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;