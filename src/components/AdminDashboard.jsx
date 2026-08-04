import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  DoneRounded,
  PendingActionsRounded,
  PlayArrowRounded,
  RefreshRounded,
  SearchRounded,
  SupportAgentRounded,
} from "@mui/icons-material";
import { API_BASE, getAuthHeaders, getImageUrl } from "../utils/api";
import { getStatusMeta } from "../utils/status";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  const fetchComplaints = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/complaints`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401 || response.status === 403) {
        navigate("/admin-login");
        return;
      }

      const data = await response.json();
      setComplaints(Array.isArray(data.complaints) ? data.complaints : []);
      setTotal(typeof data.total === "number" ? data.total : 0);
    } catch (error) {
      console.error(error);
      alert("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetches API data on mount
    fetchComplaints();
  }, [fetchComplaints]);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);

    try {
      const response = await fetch(`${API_BASE}/api/complaints/${id}/status`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (response.ok) {
        setComplaints((prev) =>
          prev.map((complaint) =>
            complaint._id === id ? { ...complaint, status } : complaint
          )
        );
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  const stats = useMemo(() => {
    const totals = {
      total: complaints.length,
      pending: 0,
      assigned: 0,
      inProgress: 0,
      resolved: 0,
    };

    complaints.forEach((complaint) => {
      if (complaint.status === "Pending" || !complaint.status) totals.pending += 1;
      if (complaint.status === "Assigned") totals.assigned += 1;
      if (complaint.status === "In Progress") totals.inProgress += 1;
      if (complaint.status === "Resolved") totals.resolved += 1;
    });

    return totals;
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return complaints.filter((complaint) => {
      const statusMatches = statusFilter === "All" || complaint.status === statusFilter;
      const searchable = [
        complaint.title,
        complaint.category,
        complaint.description,
        complaint.studentName,
        complaint.roomno,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return statusMatches && searchable.includes(query);
    });
  }, [complaints, searchTerm, statusFilter]);

  const statCards = [
    {
      label: "Total complaints",
      value: total || stats.total,
      icon: <SupportAgentRounded />,
      tone: "rgba(15, 118, 110, 0.12)",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: <PendingActionsRounded />,
      tone: "rgba(245, 158, 11, 0.12)",
    },
    {
      label: "In progress",
      value: stats.inProgress,
      icon: <PlayArrowRounded />,
      tone: "rgba(36, 87, 214, 0.12)",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      icon: <DoneRounded />,
      tone: "rgba(21, 128, 61, 0.12)",
    },
  ];

  return (
    <>
      <Navbar />

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 5,
            mb: 3,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.88), rgba(255,255,255,0.68))",
          }}
        >
          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Chip
                label="Admin command center"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "rgba(36, 87, 214, 0.12)",
                  color: "secondary.main",
                  border: "1px solid rgba(36, 87, 214, 0.2)",
                }}
              />
              <Box>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Complaint operations
                </Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 840, lineHeight: 1.8 }}>
                  Review all active complaints from one place, search by room or student, and move
                  each ticket through a clear resolution pipeline.
                </Typography>
              </Box>
            </Stack>

            <Grid container spacing={2}>
              {statCards.map((card) => (
                <Grid item xs={12} sm={6} lg={3} key={card.label}>
                  <Paper
                    sx={{
                      p: 2.25,
                      borderRadius: 4,
                      background: card.tone,
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
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
                        <Typography variant="body2" color="text.secondary">
                          {card.label}
                        </Typography>
                        <Typography variant="h4">{card.value}</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", md: "center" }}
            >
              <TextField
                placeholder="Search by title, room, student, or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                select
                label="Status filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ minWidth: { md: 220 } }}
              >
                {["All", "Pending", "Assigned", "In Progress", "Resolved"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                variant="outlined"
                startIcon={<RefreshRounded />}
                onClick={fetchComplaints}
                sx={{ alignSelf: { xs: "stretch", md: "center" } }}
              >
                Refresh
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {loading ? (
          <Box sx={{ display: "grid", placeItems: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : filteredComplaints.length === 0 ? (
          <Paper sx={{ p: 4, borderRadius: 5, textAlign: "center" }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              No matching complaints
            </Typography>
            <Typography color="text.secondary">
              Try a different search term or reset the status filter to view more tickets.
            </Typography>
          </Paper>
        ) : (
          <Stack spacing={2.5}>
            {filteredComplaints.map((complaint) => {
              const statusMeta = getStatusMeta(complaint.status);

              return (
                <Paper key={complaint._id} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 5 }}>
                  <Stack spacing={2.5}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1.5}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                    >
                      <Box>
                        <Typography variant="h5" sx={{ mb: 0.5 }}>
                          {complaint.title}
                        </Typography>
                        <Typography color="text.secondary">
                          {complaint.studentName} | Room {complaint.roomno}
                        </Typography>
                      </Box>

                      <Chip
                        label={statusMeta.label}
                        color={statusMeta.color}
                        sx={{ fontWeight: 700 }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip label={`Category: ${complaint.category}`} variant="outlined" />
                      <Chip label={`Room: ${complaint.roomno}`} variant="outlined" />
                      <Chip label={`Student: ${complaint.studentName}`} variant="outlined" />
                    </Stack>

                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {complaint.description}
                    </Typography>

                    {complaint.imageUrl && (
                      <Box
                        component="img"
                        src={getImageUrl(complaint.imageUrl)}
                        alt="Complaint evidence"
                        sx={{
                          width: "100%",
                          maxHeight: 280,
                          objectFit: "cover",
                          borderRadius: 3,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      />
                    )}

                    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                      <Button
                        variant="contained"
                        disabled={updatingId === complaint._id}
                        onClick={() => updateStatus(complaint._id, "Assigned")}
                      >
                        Assign staff
                      </Button>

                      <Button
                        variant="outlined"
                        disabled={updatingId === complaint._id}
                        onClick={() => updateStatus(complaint._id, "In Progress")}
                      >
                        Mark in progress
                      </Button>

                      <Button
                        variant="contained"
                        color="success"
                        disabled={updatingId === complaint._id}
                        onClick={() => updateStatus(complaint._id, "Resolved")}
                      >
                        Resolve ticket
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        )}
      </Container>
    </>
  );
}

export default AdminDashboard;
