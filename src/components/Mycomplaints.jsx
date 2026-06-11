import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";
import Navbar from "./Navbar";
import { API_BASE, getAuthHeaders, getImageUrl } from "../utils/api";

const statusColor = (status) => {
  switch (status) {
    case "Resolved":
      return "green";
    case "In Progress":
      return "#ed6c02";
    case "Assigned":
      return "#0288d1";
    default:
      return "orange";
  }
};

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

  const fetchComplaints = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/student-login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/complaints/my`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        navigate("/student-login");
        return;
      }

      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

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
    } catch (err) {
      console.error(err);
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
        setComplaints((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert(data.message || "Failed to delete complaint");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
          My Complaints
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : complaints.length === 0 ? (
          <Typography color="text.secondary">No complaints yet. Submit one from the dashboard.</Typography>
        ) : (
          complaints.map((complaint) => (
            <Card key={complaint._id} sx={{ mb: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{complaint.title}</Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Category: {complaint.category}
                </Typography>

                <Typography sx={{ mt: 1 }}>{complaint.description}</Typography>

                {complaint.imageUrl && (
                  <Box sx={{ mt: 2 }}>
                    <img
                      src={getImageUrl(complaint.imageUrl)}
                      alt="Complaint"
                      style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
                    />
                  </Box>
                )}

                <Typography sx={{ mt: 1 }}>
                  Status: <b style={{ color: statusColor(complaint.status) }}>{complaint.status}</b>
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => openEdit(complaint)}
                    disabled={complaint.status === "Resolved"}
                  >
                    Update
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(complaint._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Container>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update Complaint</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Replace image (optional)</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Mycomplaint;
