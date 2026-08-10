# Doctor On Call — Online Doctor Appointment System

A full-stack doctor appointment web application that allows patients to find doctors, book appointments, manage their appointments, and access prescriptions and invoices. Doctors can manage schedules, appointments, patients, and prescriptions, while administrators can manage the overall system.

## 📌 Project Overview

Doctor On Call is designed to provide a complete online healthcare appointment experience.

The application has three main types of users:

- **Patients** — Search for doctors, book appointments, manage appointments, view prescriptions and invoices.
- **Doctors** — Manage appointments, availability, patients, prescriptions, reviews, and profiles.
- **Administrators** — Manage doctors, patients, appointments, specialties, reviews, and other system information.

The project contains a React frontend and a Node.js/Express backend using TypeScript, Prisma, and PostgreSQL.

---

## ✨ Features

### 👤 Patient

- User registration and login
- Browse and search doctors
- Filter doctors by specialization
- View doctor details
- Book appointments
- Select appointment date and time
- View and manage appointments
- Track appointments using tracking information
- View prescriptions
- View invoices
- Manage favourite doctors

### 👨‍⚕️ Doctor

- Doctor registration and authentication
- Doctor dashboard
- Manage available schedules
- View appointments
- View patients
- Create prescriptions
- Manage doctor profile
- View reviews
- Manage invoices and related information

### 🛠️ Admin

- Admin dashboard
- Manage doctors
- Manage patients
- Manage appointments
- Manage specialties
- Manage reviews
- View transactions
- Manage system information

---

## 🖥️ Screenshots

### Appointment Booking

The application provides a multi-step appointment booking process:

1. Select Doctor
2. Select Date & Time
3. Enter Patient Information
4. Complete Payment

---

## 🧰 Tech Stack

### Frontend

- React.js
- Redux Toolkit
- React Router
- Ant Design
- Axios
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- TypeScript
- REST API
- JWT Authentication
- bcrypt

### Database

- PostgreSQL
- Prisma ORM

### Other Technologies

- Cloudinary
- Nodemailer / Gmail
- Vercel
- Git & GitHub

---

## 📂 Project Structure

```text
Doctor-Appointment-master/
│
├── api/                         # Backend
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── modules/         # Application modules
│   │   │   └── routes/          # API routes
│   │   ├── config/              # Environment configuration
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   └── package.json
│
├── public/                      # React public files
├── src/                         # React frontend
├── .env                         # Frontend environment variables
├── package.json
└── README.md
```
