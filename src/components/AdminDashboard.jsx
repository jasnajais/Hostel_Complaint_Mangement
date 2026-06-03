import { useState } from "react";
function AdminDashboard(){
    const[status1,setStatus1]=useState("pending");
    const[status2,setStatus2]=useState("pending");
    return(
        <div className="page">
            <div className="card">
            <h1>Admin Dashboard</h1>

            <h2>Total complaints:2</h2>
            </div>
            <hr />
            <div>
                <h3>Fan not working</h3>
                <p>category: Electrical</p>
                <p>Status: {status1}</p>
                <button onClick={()=> setStatus1("Assigned to staff")}>Assign staff</button>
            </div>
            <hr />
            <div>
                <h3>Fan not working</h3>
                <p>category: wifi</p>
                <p>Status: {status2}</p>
                <button onClick={()=> setStatus2("Resolved")}>Mark as Resolved</button>
            </div>
        </div>
    );
}

export default AdminDashboard;