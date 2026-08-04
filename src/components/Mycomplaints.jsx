import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  DeleteRounded,
  EditRounded,
  HistoryRounded,
  ImageRounded,
  PendingActionsRounded,
  SupportAgentRounded,
} from "@mui/icons-material";
import Navbar from "./Navbar";
import { API_BASE, getAuthHeaders, getImageUrl } from "../utils/api";
import { getStatusMeta } from "../utils/status";

const categories = [
  "Electrical",
  "WiFi",
  "Plumbing",
  "Furniture",
  "Cleaning",
  "Security",
  "Other",
];

function Mycomplaint() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const fetchComplaints = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/student-login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/complaints/my`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401 || response.status === 403) {
        navigate("/student-login");
        return;
      }

      const data = await response.json();
      setComplaints(Array.isArray(data) ? data : []);
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

  const summary = useMemo(() => {
    const counts = {
      total: complaints.length,
      pending: 0,
      assigned: 0,
      inProgress: 0,
      resolved: 0,
    };

    complaints.forEach((complaint) => {
      if (complaint.status === "Pending" || !complaint.status) counts.pending += 1;
      if (complaint.status === "Assigned") counts.assigned += 1;
      if (complaint.status === "In Progress") counts.inProgress += 1;
      if (complaint.status === "Resolved") counts.resolved += 1;
    });

    return counts;
  }, [complaints]);

  const openEdit = (complaint) => {
    setEditing(complaint);
    setTitle(complaint.title);
    setCategory(complaint.category);
    setDescription(complaint.description);
    setImage(null);
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!title || !category || !description) {
      alert("Please fill in all fields");
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const response = await fetch(`${API_BASE}/api/complaints/${editing._id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setEditOpen(false);
        fetchComplaints();
      } else {
        alert(data.message || "Failed to update complaint");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;

    try {
      const response = await fetch(`${API_BASE}/api/complaints/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        setComplaints((prev) => prev.filter((complaint) => complaint._id !== id));
      } else {
        alert(data.message || "Failed to delete complaint");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

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
                label="Complaint history"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "rgba(15, 118, 110, 0.12)",
                  color: "primary.main",
                  border: "1px solid rgba(15, 118, 110, 0.2)",
                }}
              />
              <Box>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  My complaints
                </Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 820, lineHeight: 1.8 }}>
                  Review the progress of every request you have raised, make small edits when needed,
                  and keep your complaint history organized.
                </Typography>
              </Box>
            </Stack>

            <Grid container spacing={2}>
              {[
                {
                  label: "Total",
                  value: summary.total,
                  icon: <HistoryRounded />,
                  tone: "rgba(36, 87, 214, 0.12)",
                },
                {
                  label: "Pending",
                  value: summary.pending,
                  icon: <PendingActionsRounded />,
                  tone: "rgba(245, 158, 11, 0.12)",
                },
                {
                  label: "Resolved",
                  value: summary.resolved,
                  icon: <SupportAgentRounded />,
                  tone: "rgba(21, 128, 61, 0.12)",
                },
              ].map((card) => (
                <Grid item xs={12} sm={4} key={card.label}>
                  <Paper sx={{ p: 2.25, borderRadius: 4, background: card.tone }}>
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
          </Stack>
        </Paper>

        {loading ? (
          <Box sx={{ display: "grid", placeItems: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : complaints.length === 0 ? (
          <Paper sx={{ p: 4, borderRadius: 5, textAlign: "center" }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              No complaints yet
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Submit your first complaint from the dashboard to start tracking it here.
            </Typography>
            <Button variant="contained" onClick={() => navigate("/submitcomplaint")}>
              Submit complaint
            </Button>
          </Paper>
        ) : (
          <Stack spacing={2.5}>
            {complaints.map((complaint) => {
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
                          Category: {complaint.category} | Room {complaint.roomno}
                        </Typography>
                      </Box>

                      <Chip
                        label={statusMeta.label}
                        color={statusMeta.color}
                        sx={{ fontWeight: 700 }}
                      />
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
                        startIcon={<EditRounded />}
                        onClick={() => openEdit(complaint)}
                        disabled={complaint.status === "Resolved"}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteRounded />}
                        onClick={() => handleDelete(complaint._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        )}
      </Container>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update complaint</DialogTitle>
        <DialogContent>
          <Stack spacing={2.25} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
            >
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Replace image if needed
              </Typography>
              <Button component="label" variant="outlined" startIcon={<ImageRounded />}>
                Upload new image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </Button>
              {image && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Selected: {image.name}
                </Typography>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Mycomplaint;
