import { Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import StudentRegister from "./components/StudentRegister";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import SubmitComplaint from "./components/Submitcomplaint";
import Mycomplaint from "./components/Mycomplaints";
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />

          <Route path="/student-register" element={<StudentRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/submitcomplaint" element={<SubmitComplaint />} />
          <Route path="/mycomplaint" element={<Mycomplaint/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
