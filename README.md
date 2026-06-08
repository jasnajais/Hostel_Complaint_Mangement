# Hostel Complaint Management

A full-stack MERN application that streamlines hostel complaint handling with tracking, image uploads, status updates, and an admin dashboard.

## Features

- **Student portal**
  - Submit complaints with category, room/hostel details, and optional images
  - View complaint history and live status (Pending / In Progress / Resolved)
  - Edit or close complaints (based on status)

- **Admin dashboard**
  - View all complaints with filters (hostel, category, status, date)
  - Change status, assign staff, and add resolution notes
  - Analytics overview (open vs resolved, recent activity)

- **General**
  - Secure authentication and authorization for students/admins
  - Responsive UI suitable for desktop and mobile
  - RESTful API with validation and error handling

## Tech Stack

- **Frontend**: React, React Router, Axios, Tailwind CSS / CSS Modules (update if different)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT-based authentication
- **Other**: Multer / Cloud storage for file uploads (if used)

## Architecture

- **client/** – React SPA (student + admin views)
- **server/** – Express APIs, auth, and business logic
- **MongoDB** – stores users, complaints, and activity logs

High-level flow:
1. Students log in and create complaints.
2. Complaints are stored in MongoDB and visible in the admin dashboard.
3. Admins update status/notes; students see real-time progress on their portal.

## Getting Started

### Prerequisites

- Node.js (LTS)
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/jasnajais/Hostel-Complaint-Management.git
cd Hostel-Complaint-Management
Setup backend
cd server
npm install
Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
Run the server:

npm run dev
3. Setup frontend
In another terminal:

cd client
npm install
npm start
The app should now be available at http://localhost:3000.

Usage
Student

Sign up / log in
Submit a new complaint
Track status and view resolution details
Admin

Log in to the admin dashboard
Filter and manage complaints
Update status and add notes
Folder Structure (example)
Hostel-Complaint-Management/
  client/
    src/
      components/
      pages/
      hooks/
      services/
  server/
    src/
      controllers/
      models/
      routes/
      middleware/
      utils/
Future Improvements
Role-based access for wardens vs super admins
Email / SMS notifications on status change
Advanced analytics (monthly reports, export to CSV)
Multi-hostel / multi-campus support
License
This project is licensed under the MIT License. See LICENSE for details.

