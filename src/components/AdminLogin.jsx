import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  if (email && password) {
    console.log({ email, password });

    // ✅ SET ROLE HERE (MOST IMPORTANT FIX)
    localStorage.setItem("userRole", "admin");

    navigate("/admin-dashboard");
  } else {
    alert("Please fill all fields");
  }
};

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f5f7fb",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
        >
            <div
                style={{
                    padding: "30px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    backgroundColor: "#ffffff",
                    width: "100%",
                    maxWidth: "400px"
                }}
            >
                <h1 style={{ marginTop: 0, marginBottom: "10px", fontSize: "24px", color: "#333" }}>
                    Admin Login
                </h1>

                <p style={{ color: "#666", marginBottom: "20px" }}>
                    Sign in to manage hostel complaints
                </p>

                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        Login
                    </button>

                    <p style={{ textAlign: "center", marginTop: "15px" }}>
                        <a href="#" style={{ color: "#007bff", textDecoration: "none" }}>
                            Forgot Password?
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;