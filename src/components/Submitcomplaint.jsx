import { useState } from "react";
import Navbar from "./Navbar";
import { Container, Card, CardContent, Typography, Button } from "@mui/material";

function Submitcomplaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, category, description, image });
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

          <form onSubmit={handleSubmit}>

            <label>Complaint Title</label>
            <br />
            <input
              type="text"
              placeholder="Enter your complaint title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
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
            />

            <br /><br />
            <label>Upload Image</label>
            <br />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
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
            >
              Submit Complaint
            </Button>

          </form>

        </CardContent>

      </Card>

    </Container>
  </>
  );
}

export default Submitcomplaint;