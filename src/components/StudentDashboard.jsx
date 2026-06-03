import { Link } from "react-router-dom";
function StudentDashboard(){
    return(
        <div>
            <h1>Student Dashboard</h1>
            <Link to="/submitcomplaint">
            <button>Submit Complaint</button>
            </Link>
            <br /><br />
            <Link to="/mycomplaint">
            <button>My Complaint</button>
            </Link>
        </div>
    );
}

export default StudentDashboard;