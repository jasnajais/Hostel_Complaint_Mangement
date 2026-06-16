# 🏢 Hostel Complaint Management System

A production-ready, full-stack **MERN (MongoDB, Express, React, Node.js)** web application built to digitize, track, and resolve residential student complaints in university hostels.

🚀 **[Live Demo](https://hostel-complaint-mangement-2bgback43-jasnajais-projects.vercel.app/)** | ⚙️ **[Backend API Service](https://hostel-complaint-mangement.onrender.com)**

[![Frontend Deployment](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://hostel-complaint-mangement-2bgback43-jasnajais-projects.vercel.app/)
[![Backend Deployment](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://hostel-complaint-mangement.onrender.com)
[![Material-UI](https://img.shields.io/badge/UI-Material--UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## 🎯 Recruiter Takeaway

This repository demonstrates modern full-stack engineering principles and clean architecture:
1. **Separation of Concerns**: A clean mono-repository with completely decoupled frontend (React SPA) and backend (Node.js/Express) layers, enabling independent scaling and isolated deployment.
2. **Environment Variable Pipeline**: Robust environment configuration using Vite's `import.meta.env.VITE_API_BASE_URL` on Vercel and `process.env.MONGO_URI` on Render to eliminate hardcoded URLs.
3. **Single Page Application Routing**: Implemented fallback routing configuration (`vercel.json`) to handle client-side routing on Vercel and prevent `404` errors on refresh.
4. **Relational Document Mapping**: Uses Mongoose database references (`ref`) to link complaint records directly to Student accounts.

---

## ✨ Features

### 👨‍🎓 Student Portal
* **Secure Session Auth**: Registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
* **Lodge Complaint**: Raise a ticket containing title, description, category (e.g. Electricity, Plumbing, Cleaning), room number, and upload image evidence.
* **Track Status**: Monitor live complaint progress (`Pending`, `Assigned`, `In Progress`, `Resolved`) and review resolution notes left by administrators.

### 👮‍♂️ Admin Dashboard
* **Metrics Board**: Visual count tracking total, pending, and resolved complaints.
* **Data Table Filtering**: Instant client-side search and filtering across room numbers, categories, status, and reporting student.
* **Status Updates**: Update complaint workflow steps and write administrative resolution comments.

---

## 🛠️ Tech Stack & Architecture

### Backend (Express & MongoDB)
* **Express Router**: Structured API endpoints utilizing middleware for JWT verification and file uploading.
* **Multer**: Configured for storing attached images locally (with capability to scale to S3/Cloudinary).
* **Mongoose Models**:
  * `Student`: User profiles with unique email validation.
  * `Admin`: Administrator profile configuration.
  * `Complaint`: Tracks title, description, category, attached image URL, status, and holds a reference (`ObjectId`) to the submitting student.

### Frontend (React & Vite)
* **Vite**: Modern builder pipeline optimizing production bundles.
* **React 19 & React Router**: Client-side state orchestration and view routing.
* **Material-UI (MUI)**: Responsive, accessible component framework styled for all viewport dimensions.

---

## 📂 Codebase Structure

```text
Hostel_Complaint_Management/
│
├── backend/                   # Node.js/Express Server
│   ├── controllers/           # API request controllers (auth, complaints)
│   ├── middleware/            # JWT verification & Multer file handling
│   ├── models/                # MongoDB schemas (Admin, Student, Complaint)
│   ├── routes/                # Express API endpoint definitions
│   ├── uploads/               # Local folder storage for complaint attachments
│   ├── server.js              # Server entry point and database connection
│   └── package.json           # Backend dependency configurations
│
├── src/                       # Vite/React Frontend
│   ├── components/            # Student/Admin dashboards, login, and registration pages
│   ├── utils/                 # API configs & environment toggles (api.js)
│   ├── App.jsx                # Client-side routing declaration
│   ├── main.jsx               # React DOM bootstrapper
│   └── index.css              # Custom styled utility classes
│
├── vercel.json                # Vercel SPA rewrite settings
├── index.html                 # Main template base file
└── vite.config.js             # Vite building pipeline configs
```

---

## 🛰️ REST API Endpoints

### Authentication
* `POST /api/auth/register` - Register a student account
* `POST /api/auth/login/student` - Authenticates student and returns JWT
* `POST /api/auth/login/admin` - Authenticates admin and returns JWT

### Complaints
* `POST /api/complaints` - Submits a new complaint (supports multipart form-data for uploads)
* `GET /api/complaints` - Admin fetches all complaints
* `GET /api/complaints/my` - Student fetches their own complaints
* `PUT /api/complaints/:id` - Updates specific details of a complaint
* `PUT /api/complaints/:id/status` - Admin updates complaint state & appends admin notes
* `DELETE /api/complaints/:id` - Deletes a complaint

---

## ⚙️ Running Locally

### 1. Prerequisites
* Install **Node.js** (LTS)
* Have **MongoDB** running locally or a connection string to MongoDB Atlas.

### 2. Run Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hostel_complaints
JWT_SECRET=super_secret_signing_key_here
```
Run development server:
```bash
npm run dev
```

### 3. Run Frontend
Open a new terminal window at the project root directory:
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🤝 Contact / Connect

* **Author**: Jasna Jais
* **GitHub**: [github.com/jasnajais](https://github.com/jasnajais)
* **LinkedIn**: [linkedin.com/in/jasna-jais/](https://linkedin.com) *(Update with your exact profile link!)*
