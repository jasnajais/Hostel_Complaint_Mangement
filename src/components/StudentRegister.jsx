import { useState } from "react";


function StudentRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roomno, setRoomNo] = useState("");
    const [hostelName, setHostelName] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, password, roomno, hostelName });
    }
    return (
        <div>
            <h1>Student Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <br />
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />
                <br />
                <br />
                <label>Email</label>
                <br />
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />
                <br />
                <br />
                <label>Password</label>
                <br />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
                <br />
                <br />
                <label>Room No</label>
                <br />
                <input
                    type="text"
                    placeholder="Enter Room No"
                    value={roomno}
                    onChange={(e) =>
                        setRoomNo(e.target.value)
                    }
                />
                <br />
                <br />
                <label>Hostel Name</label>
                <br />
                <input
                    type="text"
                    placeholder="Enter Hostel Name"
                    value={hostelName}
                    onChange={(e) =>
                        setHostelName(e.target.value)
                    }
                />
                <br />
                <br />
                <button type="submit">Register</button>
                <p
                    style={{
                        textAlign: "center",
                        marginBottom: "15px"
                    }}
                >
                    <a href="#"
                        style={{
                            color: "#007bff",
                            textDecoration: "none"
                        }}
                    >
                        Forgot Password?
                    </a>
                </p>
            </form>
        </div>
    );
}

export default StudentRegister;
