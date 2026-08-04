import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AdminPanelSettingsRounded,
  ArrowForwardRounded,
  CheckCircleRounded,
  SchoolRounded,
  SupportAgentRounded,
  TimelineRounded,
} from "@mui/icons-material";
import "./Home.css";

const portalCards = [
  {
    title: "Student Portal",
    description: "Raise complaints, attach photos, and follow updates without chasing staff manually.",
    icon: <SchoolRounded fontSize="large" />,
    action: "Continue as student",
    to: "/student-login",
    accent: "from-teal",
  },
  {
    title: "Admin Portal",
    description: "Review reports, assign work, and close the loop with a cleaner maintenance workflow.",
    icon: <AdminPanelSettingsRounded fontSize="large" />,
    action: "Continue as admin",
    to: "/admin-login",
    accent: "from-indigo",
  },
];

const highlights = [
  {
    icon: <SupportAgentRounded fontSize="small" />,
    label: "One inbox for every complaint",
  },
  {
    icon: <TimelineRounded fontSize="small" />,
    label: "Track status from pending to resolved",
  },
  {
    icon: <CheckCircleRounded fontSize="small" />,
    label: "Image attachments for faster triage",
  },
];

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const heroBackground = isDark
    ? "linear-gradient(145deg, rgba(9, 16, 30, 0.92), rgba(12, 21, 39, 0.78))"
    : "linear-gradient(145deg, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.68))";

  const metricBackground = isDark
    ? "rgba(10, 18, 34, 0.7)"
    : "rgba(255, 255, 255, 0.72)";

  return (
    <Box className="home-page">
      <Box className="home-glow home-glow--one" />
      <Box className="home-glow home-glow--two" />
      <Box className="home-grid-overlay" />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: { xs: 4, md: 6 } }}>
        <Stack spacing={4}>
          <Paper className="home-hero" elevation={0} sx={{ background: heroBackground }}>
            <Stack spacing={3} sx={{ maxWidth: 760 }}>
              <Chip
                label="Hostel complaint management"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "rgba(57, 197, 183, 0.14)",
                  color: "primary.main",
                  border: "1px solid rgba(57, 197, 183, 0.28)",
                  fontWeight: 700,
                }}
              />

              <Box>
                <Typography variant="h1" className="home-title">
                  A more professional way to handle hostel complaints.
                </Typography>
                <Typography className="home-subtitle" sx={{ color: "text.secondary" }}>
                  HostelFlow gives students a simple way to report issues and gives admins a
                  clean, modern workspace to resolve them quickly.
                </Typography>
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                flexWrap="wrap"
                useFlexGap
              >
                {highlights.map((item) => (
                  <Chip
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    sx={{
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      fontWeight: 600,
                      px: 0.5,
                    }}
                  />
                ))}
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  size="large"
                  variant="contained"
                  endIcon={<ArrowForwardRounded />}
                  onClick={() => navigate("/student-login")}
                >
                  Get started
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => navigate("/admin-login")}
                >
                  Admin access
                </Button>
              </Stack>
            </Stack>

            <Box className="home-metrics">
              <Paper className="home-metric" elevation={0} sx={{ background: metricBackground }}>
                <Typography variant="overline" sx={{ opacity: 0.72 }}>
                  Visibility
                </Typography>
                <Typography variant="h4">24/7</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Status updates available at every step.
                </Typography>
              </Paper>
              <Paper className="home-metric" elevation={0} sx={{ background: metricBackground }}>
                <Typography variant="overline" sx={{ opacity: 0.72 }}>
                  Workflow
                </Typography>
                <Typography variant="h4">2 roles</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Student reporting and admin resolution in one place.
                </Typography>
              </Paper>
            </Box>
          </Paper>

          <Box className="portal-grid">
            {portalCards.map((card) => (
              <ButtonBase
                key={card.title}
                className={`portal-card ${card.accent}`}
                onClick={() => navigate(card.to)}
                focusRipple
              >
                <Paper className="portal-surface" elevation={0}>
                  <Box className="portal-icon">{card.icon}</Box>
                  <Stack spacing={1.25}>
                    <Typography variant="h4" className="portal-title">
                      {card.title}
                    </Typography>
                    <Typography className="portal-description" sx={{ color: "text.secondary" }}>
                      {card.description}
                    </Typography>
                  </Stack>
                  <Box className="portal-action" sx={{ color: "primary.main" }}>
                    <Typography variant="button">{card.action}</Typography>
                    <ArrowForwardRounded fontSize="small" />
                  </Box>
                </Paper>
              </ButtonBase>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default Home;
