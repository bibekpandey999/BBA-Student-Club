# 🎓 BBA Student Club - Butwal Multiple Campus (BUMC)

A modern, full-stack web application built for the **Bachelor of Business Administration (BBA) Student Club** at **Butwal Multiple Campus**. This platform serves as the central digital hub for the club, providing dynamic leadership directories, administrative messages, and academic profiles for students, professors, and visitors.

🔗 **Live Website:** [BBA Student Club Live Preview](https://bba-student-club.vercel.app)

---

## 📋 Table of Contents
1. [About the Project](#-about-the-project)
2. [Key Features](#-key-features)
3. [Tech Stack](#️-tech-stack)
4. [Database Schemas & Models](#-database-schemas--models)
5. [API Endpoints Reference](#-api-endpoints-reference)
6. [Project Directory Structure](#-project-directory-structure)
7. [Getting Started Locally](#-getting-started-locally)
8. [Environment Variables](#-environment-variables)
9. [Author](#-author)

---

## 🌟 About the Project

The BBA Student Club website bridges the gap between students, campus administration, and the professional world. Designed with a clean, responsive, and sleek UI using Tailwind CSS, it allows administrators to effortlessly manage dynamic content—such as leadership changes, structural announcements, and professor directories—without touching the frontend code.

---

## 🚀 Key Features

* **🏛️ Administrative Messaging:** Dedicated, dynamically fetched message boards for the **Campus Chief**, **Program Director**, and **Club President**.
* **👥 Board of Directors (BOD) Directory:** Showcases the student executive team complete with custom roles, biographies, email links, and social media handles (LinkedIn, GitHub, Instagram).
* **👨‍🏫 Professors Section:** Highlights the esteemed professors and academic mentors guiding the BBA program at Butwal Multiple Campus.
* **☁️ Cloudinary Image Integration:** Seamless image uploads with automated cleanup routines for old assets during record updates or deletions.
* **📱 Fully Responsive Layout:** Mobile-first approach optimized flawlessly for smartphones, tablets, and desktop computers.
* **⚡ Robust Error Handling & Loading States:** Graceful fallbacks, loading spinners, and error alerts for smooth user experience.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js (App Router) / React
* **Language:** TypeScript / JavaScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React

### Backend & Database
* **Server Runtime:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **ODM:** Mongoose
* **Image Hosting:** Cloudinary
* **Deployment:** Vercel (Frontend) & Render (Backend)

---

## 📊 Database Schemas & Models

The backend utilizes MongoDB via Mongoose schemas with built-in timestamps (`createdAt`, `updatedAt`):

1. **President Message Schema** (`name`, `description`, `image`)
2. **Chief Message Schema** (`name`, `description`, `image`)
3. **Director Message Schema** (`name`, `description`, `image`)
4. **BOD Schema** (`name`, `role`, `description`, `image`, `email`, `socialLinks: { linkedin, github, instagram }`)
5. **Professor Schema** (`name`, `role`, `description`, `image`, `email`, `socialLinks: { linkedin, github, instagram }`)

---

## 🔌 API Endpoints Reference

The backend provides complete RESTful CRUD support across all entities:

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **President** | `GET` / `POST` / `PUT` / `DELETE` | `/api/president-message` (/:id) | Manage president's message |
| **Campus Chief** | `GET` / `POST` / `PUT` / `DELETE` | `/api/chief-message` (/:id) | Manage campus chief's message |
| **Director** | `GET` / `POST` / `PUT` / `DELETE` | `/api/director-message` (/:id) | Manage program director's message |
| **BOD Team** | `GET` / `POST` / `PUT` / `DELETE` | `/api/bod` (/:id) | Manage student leadership board |
| **Professors** | `GET` / `POST` / `PUT` / `DELETE` | `/api/professor` (/:id) | Manage professor profiles |

---

## 📁 Project Directory Structure

```text
bba-student-club/
├── models/
│   ├── chiefMessageModel.js
│   ├── directorMessageModel.js
│   ├── presidentMessageModel.js
│   ├── bodModel.js
│   └── professorModel.js
├── routes/
│   └── [API route handlers for Express]
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       ├── PresidentMessage.tsx
│       ├── ChiefMessage.tsx
│       ├── DirectorMessage.tsx
│       ├── Team.tsx (BOD)
│       └── Professors.tsx
├── package.json
└── README.md