import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Box,
} from "@mui/material";
import { API_BASE, getAuthHeaders, getImageUrl } from "../utils/api";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/complaints`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401 || response.status === 403) {
        navigate("/admin-login");
        return;
      }

      const data = await response.json();
      setComplaints(data.complaints);
      setTotal(data.total);
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
          prev.map((c) => (c._id === id ? { ...c, status } : c))
        );
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card sx={{ mb: 3, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold">
              Admin Dashboard
            </Typography>

            <Typography variant="h6" sx={{ mt: 1 }}>
              Total Complaints: {total}
            </Typography>
          </CardContent>
        </Card>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : complaints.length === 0 ? (
          <Typography color="text.secondary">No complaints submitted yet.</Typography>
        ) : (
          complaints.map((complaint) => (
            <Card key={complaint._id} sx={{ mb: 3, p: 2 }}>
              <CardContent>
                <Typography variant="h6">{complaint.title}</Typography>

                <Typography>Category: {complaint.category}</Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Submitted by: {complaint.studentName} (Room {complaint.roomno})
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
                  Status: <b>{complaint.status}</b>
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
                  <Button
                    variant="contained"
                    disabled={updatingId === complaint._id}
                    onClick={() => updateStatus(complaint._id, "Assigned")}
                  >
                    Assign Staff
                  </Button>

                  <Button
                    variant="contained"
                    color="warning"
                    disabled={updatingId === complaint._id}
                    onClick={() => updateStatus(complaint._id, "In Progress")}
                  >
                    In Progress
                  </Button>

                  <Button
                    variant="contained"
                    color="success"
                    disabled={updatingId === complaint._id}
                    onClick={() => updateStatus(complaint._id, "Resolved")}
                  >
                    Resolve
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </>
  );
}

export default AdminDashboard;

