import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  CloudUploadRounded,
  DescriptionRounded,
  ImageRounded,
  SupportAgentRounded,
  VerifiedRounded,
} from "@mui/icons-material";
import { API_BASE } from "../utils/api";

const categories = [
  "Electrical",
  "WiFi",
  "Plumbing",
  "Furniture",
  "Cleaning",
  "Security",
  "Other",
];

function Submitcomplaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !category || !description) {
      setError("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/student-login");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${API_BASE}/api/complaints`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setTitle("");
        setCategory("");
        setDescription("");
        setImage(null);
        navigate("/mycomplaint");
      } else {
        setError(data.message || "Failed to submit complaint.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 5,
                height: "100%",
                background:
                  "linear-gradient(145deg, rgba(15, 118, 110, 0.12), rgba(36, 87, 214, 0.08))",
              }}
            >
              <Stack spacing={2.5}>
                <Chip
                  label="New ticket"
                  sx={{
                    alignSelf: "flex-start",
                    bgcolor: "background.paper",
                    fontWeight: 700,
                  }}
                />

                <Box>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    Raise a clear complaint.
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Add the issue title, choose a category, and attach a photo when possible so the
                    hostel team can act faster.
                  </Typography>
                </Box>

                <Stack spacing={1.5}>
                  <Chip icon={<SupportAgentRounded fontSize="small" />} label="Direct routing" />
                  <Chip icon={<VerifiedRounded fontSize="small" />} label="Clear evidence" />
                  <Chip icon={<DescriptionRounded fontSize="small" />} label="Trackable history" />
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    Submit Complaint
                  </Typography>
                  <Typography color="text.secondary">
                    Keep it short, specific, and include a picture if the issue is visible.
                  </Typography>
                </Box>

                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                  <Stack spacing={2.5}>
                    <TextField
                      label="Complaint title"
                      placeholder="Example: Broken study light"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={loading}
                    />

                    <TextField
                      select
                      label="Complaint category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      disabled={loading}
                    >
                      {categories.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      label="Complaint description"
                      placeholder="Describe the issue, where it is, and how it affects you."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      multiline
                      rows={5}
                      disabled={loading}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 1.5,
                        alignItems: { xs: "stretch", sm: "center" },
                      }}
                    >
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadRounded />}
                        disabled={loading}
                      >
                        {image ? "Replace image" : "Upload image"}
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files?.[0] || null)}
                        />
                      </Button>

                      {image ? (
                        <Chip icon={<ImageRounded fontSize="small" />} label={image.name} />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Optional but useful when the issue needs visual proof.
                        </Typography>
                      )}
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit complaint"}
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Submitcomplaint;
