import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import StudentLogin from "./components/Studentlogin";

import StudentRegister from "./components/StudentRegister";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import SubmitComplaint from "./components/Submitcomplaint";
import Mycomplaint from "./components/Mycomplaints";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/submitcomplaint" element={<SubmitComplaint />} />
        <Route path="/mycomplaint" element={<Mycomplaint />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
