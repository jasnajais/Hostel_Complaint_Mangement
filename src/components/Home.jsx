import { useNavigate } from "react-router-dom";
import "./Home.css";

const AdminIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="38"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <circle cx="12" cy="11" r="2.5" />
    <path d="M12 13.5V16" />
  </svg>
);

const StudentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="38"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
  </svg>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-card">
        <h1 className="home-title">Welcome Back</h1>
        <p className="home-subtitle">Select your portal to continue</p>

        <div className="portal-buttons">
          {/* Admin Login */}
          <button
            id="admin-portal-btn"
            className="portal-circle admin-circle"
            onClick={() => navigate("/admin-login")}
            aria-label="Admin Login"
          >
            <AdminIcon />
            <span className="portal-label">Admin Login</span>
          </button>

          {/* Student Login */}
          <button
            id="student-portal-btn"
            className="portal-circle student-circle"
            onClick={() => navigate("/student-login")}
            aria-label="Student Login"
          >
            <StudentIcon />
            <span className="portal-label">Student Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;