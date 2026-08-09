# 🎓 BBA Student Club - Butwal Multiple Campus (BUMC)

A modern, full-stack web application built for the **Bachelor of Business Administration (BBA) Student Club** at **Butwal Multiple Campus**. This platform serves as the central digital hub for the club, providing dynamic leadership directories, administrative messages, notices, alumni records, and professor profiles.

🔗 **Live Website:** [BBA Student Club Live Preview](https://bba-student-club.vercel.app)

---

## 📋 Table of Contents
1. [About the Project](#-about-the-project)
2. [Key Features](#-key-features)
3. [Tech Stack](#️-tech-stack)
4. [Project Directory Structure](#-project-directory-structure)
5. [Database Models](#-database-models)
6. [Getting Started Locally](#-getting-started-locally)
7. [Environment Variables](#-environment-variables)
8. [Author](#-author)

---

## 🌟 About the Project

The BBA Student Club website bridges the gap between students, campus administration, and the professional world. Designed with a clean, responsive, and sleek UI using Tailwind CSS, it allows administrators to effortlessly manage dynamic content—such as announcements, event updates, notices, student board members, and professor directories—via a secure dashboard.

---

## 🚀 Key Features

* **🏛️ Administrative Messaging:** Dedicated, dynamically fetched message boards for the **Campus Chief**, **Program Director**, and **Club President**.
* **👥 Board of Directors (BOD) Directory:** Showcases the student executive team with roles, bios, and links.
* **👨‍🏫 Professor Section:** Highlights the esteemed professors and academic mentors guiding the BBA program.
* **📢 Notices & Results System:** Live updates for student notices, exam results, and academic timelines.
* **🎓 Alumni & Past Events:** Tracking network growth, alumni achievements, and previous club events/galleries.
* **🔐 Secure Admin Dashboard:** Protected portal for managing all backend database records dynamically.
* **☁️ Cloudinary Image Integration:** Seamless image uploads and asset management.

---

## 🛠️ Tech Stack

### Frontend (`frontend/`)
* **Framework:** Next.js (App Router) / React
* **Styling:** Tailwind CSS
* **Icons:** Lucide React

### Backend (`backend/`)
* **Server Runtime:** Node.js, Express.js
* **Database & ODM:** MongoDB Atlas with Mongoose
* **Image Hosting:** Cloudinary
* **Deployment:** Vercel (Frontend) & Render (Backend)

---

## 📁 Project Directory Structure

```text
BBA Student Club/
├── backend/
│   ├── models/
│   │   ├── alumni.js
│   │   ├── bod.js
│   │   ├── event.js
│   │   ├── image.js
│   │   ├── login.js
│   │   ├── messageOfChief.js
│   │   ├── messageOfDirector.js
│   │   ├── messageOfPresident.js
│   │   ├── notice.js
│   │   ├── professor.js
│   │   └── result.js
│   ├── connectDb.js
│   ├── index.js
│   └── package.json
└── frontend/
    ├── app/
    │   ├── alumni/
    │   ├── api/
    │   ├── club/
    │   ├── dashboard/
    │   ├── login/
    │   ├── notices/
    │   ├── results/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── About.tsx
    │   ├── ChiefMessage.tsx
    │   ├── DirectorMessage.tsx
    │   ├── Footer.tsx
    │   ├── Gallery.tsx
    │   ├── Hero.tsx
    │   ├── History.tsx
    │   ├── Navbar.tsx
    │   ├── PastEvents.tsx
    │   ├── PresidentMessage.tsx
    │   ├── Professor.tsx
    │   └── Team.tsx
    └── package.json