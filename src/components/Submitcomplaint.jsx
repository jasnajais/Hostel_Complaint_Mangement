import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  TextField,
  MenuItem
} from "@mui/material";
import { API_BASE } from "../utils/api";

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
      setError("Please fill in all required fields");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login as a student first");
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
        alert("Complaint submitted successfully!");

        setTitle("");
        setCategory("");
        setDescription("");
        setImage(null);

        navigate("/mycomplaint");
      } else {
        setError(data.message || "Failed to submit complaint");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card sx={{ p: 3, boxShadow: 5, borderRadius: 3 }}>
          <CardContent>
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
            >
              Submit Complaint
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                label="Complaint Title"
                placeholder="Enter complaint title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                disabled={loading}
              />

              <TextField
                select
                label="Complaint Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                margin="normal"
                disabled={loading}
              >
                <MenuItem value="Electrical">
                  Electrical
                </MenuItem>

                <MenuItem value="WiFi">
                  WiFi
                </MenuItem>

                <MenuItem value="Plumbing">
                  Plumbing
                </MenuItem>

                <MenuItem value="Furniture">
                  Furniture
                </MenuItem>

                <MenuItem value="Cleaning">
                  Cleaning
                </MenuItem>

                <MenuItem value="Other">
                  Other
                </MenuItem>
              </TextField>

              <TextField
                label="Complaint Description"
                placeholder="Enter complaint description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                disabled={loading}
              />

              <Typography sx={{ mt: 2, mb: 1 }}>
                Upload Image
              </Typography>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                disabled={loading}
              />

              {image && (
                <Typography sx={{ mt: 1 }}>
                  Selected: {image.name}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Submitcomplaint;