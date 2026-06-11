import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Container, Card, CardContent, Typography, Button, Alert } from "@mui/material";
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
      if (image) formData.append("image", image);

      const response = await fetch(`${API_BASE}/api/complaints`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
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
            <Typography variant="h5" textAlign="center" fontWeight="bold">
              Submit Complaint
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <label>Complaint Title</label>
              <br />
              <input
                type="text"
                placeholder="Enter your complaint title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                disabled={loading}
              />

              <br /><br />

              <label>Complaint Category</label>
              <br />
              <input
                type="text"
                placeholder="Enter your complaint category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                disabled={loading}
              />

              <br /><br />

              <label>Complaint Description</label>
              <br />
              <textarea
                placeholder="Enter your complaint description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  height: "100px",
                  marginTop: "5px"
                }}
                disabled={loading}
              />

              <br /><br />
              <label>Upload Image</label>
              <br />
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
              <br /><br />

              <Button
                type="submit"
                variant="contained"
                fullWidth
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
