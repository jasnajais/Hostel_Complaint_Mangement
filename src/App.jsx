import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Home from "./components/Home";
import StudentRegister from "./components/StudentRegister";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import SubmitComplaint from "./components/Submitcomplaint";
import Mycomplaint from "./components/Mycomplaints";

// Protected Route Wrapper Component to prevent visual routing flashes
function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<Home defaultTab="admin" />} />
        <Route path="/student-login" element={<Home defaultTab="student" />} />
        <Route path="/student-register" element={<StudentRegister />} />
        
        {/* Protected Dashboard and Action Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submitcomplaint"
          element={
            <ProtectedRoute allowedRole="student">
              <SubmitComplaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mycomplaint"
          element={
            <ProtectedRoute allowedRole="student">
              <Mycomplaint />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
export { ProtectedRoute };
