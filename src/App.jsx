import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import StudentLogin from "./components/StudentLogin";

import StudentRegister from "./components/StudentRegister";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import SubmitComplaint from "./components/Submitcomplaint";
import Mycomplaint from "./components/Mycomplaints";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Portal Page */}
        <Route path="/" element={<Home />} />

        {/* Login Pages */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />

        {/* Register */}
        <Route path="/student-register" element={<StudentRegister />} />

        {/* Dashboards */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* Complaints */}
        <Route path="/submitcomplaint" element={<SubmitComplaint />} />
        <Route path="/mycomplaint" element={<Mycomplaint />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;