# 🏢 Hostel Complaint Management System

A production-ready, full-stack **MERN (MongoDB, Express, React, Node.js)** application designed to digitize, manage, and accelerate the resolution of student complaints in university and hostel residences.

[![Frontend Deployment](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Backend Deployment](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)
[![Material-UI](https://img.shields.io/badge/UI-Material--UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## 🎯 Recruiter Takeaway

This repository demonstrates modern full-stack development best practices:
1. **Dynamic Environment Configuration**: No hardcoded production URLs. The application seamlessly detects running environments (development vs production cloud builds).
2. **Robust SPA Client Routing**: Handles Vercel hosting reload states with rewrite rules (`vercel.json`), preventing `404` errors common in client-side routed apps.
3. **Decoupled Monorepo Structure**: Independent frontend (Vite/React) and backend (Express API) folders, allowing them to scale and be deployed to separate hosts (Vercel & Render).
4. **Relational NoSQL Design**: Structured schemas mapping MongoDB ObjectIds dynamically across Student and Complaint documents.

---

## ✨ Features

### 👨‍🎓 Student Portal
* **Secure Authentication**: Register and log in securely utilizing JWT (JSON Web Tokens).
* **Complaint Lodging**: Raise structured issues detailing category (Electricity, Plumbing, Cleaning, etc.), title, descriptions, room details, and upload image evidence.
* **Tracking Dashboard**: View all personally filed complaints, track real-time resolution status (`Pending`, `Assigned`, `In Progress`, `Resolved`), and read resolution notes.

### 👮‍♂️ Admin Management Suite
* **Central Analytics Panel**: Track key metrics (e.g., pending issues count, active assignments, and resolved items).
* **Advanced Filters**: Instant filtering and sorting by hostel rooms, categories, status, and reporting date.
* **Resolution Control**: Update issue status in real-time and append administrative notes immediately viewable by students.

---

## 🛠️ Tech Stack & Architecture

### Backend Architecture
* **Node.js & Express.js**: RESTful API engine utilizing modular routes, controllers, and middlewares.
* **Mongoose**: Schemas defining structured data rules:
  * `Student`: User credentials and verification profiles.
  * `Admin`: Administrator roles and credentials.
  * `Complaint`: Tracks titles, descriptions, categories, attached image paths, status, room info, and references the reporting Student profile.
* **Multer**: Disk-based media storage allowing students to upload images directly.
* **Bcryptjs & JWT**: End-to-end password hashing and session auth verification.

### Frontend Architecture
* **React 19 & Vite**: Ultra-fast hot module replacement, client-side routing, and performance optimization.
* **Material-UI (MUI)**: Highly polished, responsive design suitable for mobile and desktop screens.
* **Axios/Fetch**: Custom configurations for communicating with the Express API.

---

## 📂 Codebase Structure

```text
Hostel_Complaint_Management/
│
├── backend/                   # Node.js/Express Server
│   ├── controllers/           # API request controllers (auth, complaints)
│   ├── middleware/            # JWT verification & Multer file handling
│   ├── models/                # MongoDB Mongoose schemas (Admin, Student, Complaint)
│   ├── routes/                # Express Route handlers
│   ├── uploads/               # Storehouse for attached files/images
│   ├── server.js              # Entrypoint server logic
│   └── package.json           # Node configuration and script tasks
│
├── src/                       # Vite/React Frontend
│   ├── components/            # Student/Admin dashboards, login, and registration pages
│   ├── utils/                 # Central API configs (api.js environment toggling)
│   ├── App.jsx                # SPA Client router declaration
│   ├── main.jsx               # Client initialization file
│   └── index.css              # Custom styled utility classes
│
├── vercel.json                # Single Page App URL rewrites for Vercel
├── index.html                 # Main template base file
└── vite.config.js             # Vite building pipeline configs
```

---

## 🛰️ REST API Endpoints

### Authentication APIs
* `POST /api/auth/register` - Registers a new student profile.
* `POST /api/auth/login/student` - Authenticates student credentials and returns JWT.
* `POST /api/auth/login/admin` - Authenticates admin credentials and returns JWT.

### Complaint Management APIs
* `POST /api/complaints` - Submits a new complaint (supports multipart form-data for image upload).
* `GET /api/complaints` - Admin fetches all complaints (supports filtering queries).
* `GET /api/complaints/my` - Student fetches their own complaints (requires Auth Header).
* `PUT /api/complaints/:id` - Updates specific details of a complaint.
* `PUT /api/complaints/:id/status` - Admin updates complaint state & appends admin notes.
* `DELETE /api/complaints/:id` - Cancels or deletes a complaint.

---

## ⚙️ Running Locally

### 1. Pre-requisites
* Install **Node.js** (LTS version)
* Install and run **MongoDB** locally, or have access to a cloud connection string.

### 2. Configure Backend
```bash
cd backend
npm install
```
Create a `.env` file inside the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hostel_complaints
JWT_SECRET=super_secret_signing_key_here
```
Start development backend:
```bash
npm run dev
```

### 3. Configure Frontend
Open a new terminal window back at the root directory:
```bash
npm install
```
Start development client:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---


