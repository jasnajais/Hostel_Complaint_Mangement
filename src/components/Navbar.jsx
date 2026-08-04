import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettingsRounded,
  DarkModeRounded,
  DashboardRounded,
  HomeRounded,
  LightModeRounded,
  LogoutRounded,
  PersonRounded,
  SchoolRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "./themeModeContext";

function Navbar() {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();
  const role = localStorage.getItem("userRole");
  const userInfoStr = localStorage.getItem("userInfo");

  let userInfo = null;
  try {
    userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
  } catch (error) {
    console.error("Error parsing userInfo", error);
  }

  const isLoggedIn = Boolean(role);
  const displayName =
    userInfo?.name ||
    userInfo?.email ||
    (role === "admin" ? "Administrator" : "Student");

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const handleDashboardClick = () => {
    navigate(role === "admin" ? "/admin-dashboard" : "/student-dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <AppBar position="sticky" elevation={0} color="transparent">
      <Toolbar
        sx={{
          minHeight: { xs: 72, md: 84 },
          px: { xs: 2, md: 4 },
          gap: 2,
        }}
      >
        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
            flex: 1,
            minWidth: 0,
          }}
        >
          <Avatar
            sx={{
              width: 44,
              height: 44,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontWeight: 800,
            }}
          >
            HF
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              HostelFlow
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", display: { xs: "none", sm: "block" } }}
            >
              {isLoggedIn
                ? role === "admin"
                  ? "Admin workspace"
                  : "Student workspace"
                : "Complaint management made simple"}
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" justifyContent="flex-end">
          <Tooltip title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}>
            <IconButton
              onClick={toggleMode}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              {mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
            </IconButton>
          </Tooltip>

          {isLoggedIn ? (
            <>
              <Chip
                avatar={<Avatar>{initials || <PersonRounded fontSize="small" />}</Avatar>}
                label={displayName}
                variant="outlined"
                sx={{ display: { xs: "none", md: "inline-flex" }, maxWidth: 220 }}
              />
              <Button
                startIcon={<DashboardRounded />}
                variant="outlined"
                onClick={handleDashboardClick}
              >
                Dashboard
              </Button>
              <Button startIcon={<LogoutRounded />} variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button startIcon={<HomeRounded />} variant="text" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button
                startIcon={<SchoolRounded />}
                variant="text"
                onClick={() => navigate("/student-login")}
              >
                Student
              </Button>
              <Button
                startIcon={<AdminPanelSettingsRounded />}
                variant="text"
                onClick={() => navigate("/admin-login")}
              >
                Admin
              </Button>
              <Button variant="contained" onClick={() => navigate("/student-register")}>
                Register
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
