import { useNavigate } from "react-router-dom";
import {
  ArrowForwardRounded,
  DescriptionRounded,
  SupportAgentRounded,
  TimelineRounded,
} from "@mui/icons-material";
import { Box, Button, Container, Grid, Paper, Stack, Typography, Chip } from "@mui/material";
import Navbar from "./Navbar";

function StudentDashboard() {
  const navigate = useNavigate();
  const userInfoStr = localStorage.getItem("userInfo");

  let userInfo = null;
  try {
    userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
  } catch (error) {
    console.error("Error parsing userInfo", error);
  }

  const displayName = userInfo?.name || "Student";

  const actionCards = [
    {
      title: "Submit a complaint",
      description: "Create a new request for plumbing, WiFi, cleaning, or any other hostel issue.",
      icon: <SupportAgentRounded />,
      cta: "Raise ticket",
      onClick: () => navigate("/submitcomplaint"),
      accent: "linear-gradient(135deg, rgba(15, 118, 110, 0.14), rgba(20, 184, 166, 0.04))",
    },
    {
      title: "Review my complaints",
      description: "See what is pending, in progress, assigned, or resolved without leaving the app.",
      icon: <DescriptionRounded />,
      cta: "View complaints",
      onClick: () => navigate("/mycomplaint"),
      accent: "linear-gradient(135deg, rgba(36, 87, 214, 0.12), rgba(99, 102, 241, 0.04))",
    },
  ];

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 5,
            mb: 3,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.86), rgba(255,255,255,0.66))",
          }}
        >
          <Stack spacing={2.5}>
            <Chip
              label="Student dashboard"
              sx={{
                alignSelf: "flex-start",
                bgcolor: "rgba(57, 197, 183, 0.14)",
                color: "primary.main",
                border: "1px solid rgba(57, 197, 183, 0.28)",
              }}
            />

            <Box>
              <Typography variant="h3" sx={{ mb: 1 }}>
                Welcome back, {displayName}.
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 760, lineHeight: 1.8 }}>
                Your dashboard keeps every request in one place so you can submit issues, monitor
                resolution progress, and stay informed about what the hostel team is doing.
              </Typography>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap" useFlexGap>
              <Chip icon={<TimelineRounded fontSize="small" />} label="Live status tracking" />
              <Chip icon={<SupportAgentRounded fontSize="small" />} label="Direct maintenance routing" />
              <Chip icon={<DescriptionRounded fontSize="small" />} label="Complaint history at a glance" />
            </Stack>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          {actionCards.map((card) => (
            <Grid item xs={12} md={6} key={card.title}>
              <Paper
                sx={{
                  height: "100%",
                  p: 3,
                  borderRadius: 5,
                  background: card.accent,
                }}
              >
                <Stack spacing={2.5} sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "background.paper",
                      color: "primary.main",
                    }}
                  >
                    {card.icon}
                  </Box>

                  <Box>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                      {card.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {card.description}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: "auto" }}>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardRounded />}
                      onClick={card.onClick}
                    >
                      {card.cta}
                    </Button>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default StudentDashboard;
