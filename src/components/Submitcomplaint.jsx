import { useState } from "react";
import Navbar from "./Navbar";
import { Container, Card, CardContent, Typography, Button } from "@mui/material";

function Submitcomplaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, category, description });
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