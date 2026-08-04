import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ShieldRounded, TimelineRounded, VerifiedRounded } from "@mui/icons-material";

const defaultHighlights = [
  {
    icon: <ShieldRounded fontSize="small" />,
    title: "Role-based access",
    description: "Separate experiences for students and administrators keep the workflow clear.",
  },
  {
    icon: <TimelineRounded fontSize="small" />,
    title: "Fast visibility",
    description: "Every complaint carries status updates so nothing gets lost in the queue.",
  },
  {
    icon: <VerifiedRounded fontSize="small" />,
    title: "Image evidence",
    description: "Attach photos to help maintenance staff understand the issue instantly.",
  },
];

function AuthLayout({
  badge,
  title,
  subtitle,
  summary,
  highlights = defaultHighlights,
  children,
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        py: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 10% 10%, rgba(36, 87, 214, 0.12), transparent 28%), radial-gradient(circle at 90% 18%, rgba(15, 118, 110, 0.16), transparent 24%), radial-gradient(circle at 50% 85%, rgba(245, 158, 11, 0.1), transparent 28%)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={5}>
            <Paper
              sx={{
                height: "100%",
                p: { xs: 3, md: 4 },
                borderRadius: 5,
                color: "common.white",
                background:
                  "linear-gradient(160deg, rgba(15, 23, 42, 0.94) 0%, rgba(12, 20, 37, 0.94) 50%, rgba(4, 29, 49, 0.94) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <Stack spacing={3}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      fontWeight: 800,
                    }}
                  >
                    HC
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ opacity: 0.75, letterSpacing: 1 }}>
                      HOSTEL COMPLAINT MANAGEMENT
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      HostelFlow
                    </Typography>
                  </Box>
                </Stack>

                <Box>
                  <Chip
                    label={badge}
                    sx={{
                      mb: 2,
                      bgcolor: "rgba(57, 197, 183, 0.18)",
                      color: "#bff5ef",
                      border: "1px solid rgba(57, 197, 183, 0.24)",
                    }}
                  />
                  <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.05, mb: 1.5 }}>
                    {title}
                  </Typography>
                  <Typography sx={{ color: "rgba(229, 238, 252, 0.76)", fontSize: 16 }}>
                    {subtitle}
                  </Typography>
                </Box>

                {summary && (
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      bgcolor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "rgba(229, 238, 252, 0.8)" }}>
                      {summary}
                    </Typography>
                  </Paper>
                )}

                <Stack spacing={1.5}>
                  {highlights.map((item) => (
                    <Box
                      key={item.title}
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        alignItems: "flex-start",
                        p: 1.5,
                        borderRadius: 3,
                        bgcolor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: "rgba(57, 197, 183, 0.18)",
                          color: "#aef3eb",
                        }}
                      >
                        {item.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(229, 238, 252, 0.72)" }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper
              sx={{
                minHeight: "100%",
                p: { xs: 3, md: 4 },
                borderRadius: 5,
                backgroundColor: "background.paper",
              }}
            >
              {children}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AuthLayout;
