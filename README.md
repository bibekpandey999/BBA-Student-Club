# BBA Student Club — Butwal Multiple Campus

The official website for the BBA Student Club at Butwal Multiple Campus (BUMC). It's a full-stack app that gives the club a real online presence — notices, results, faculty and alumni directories, and an admin dashboard so executives can update content without touching code.

**Live site:** https://bba-student-club.vercel.app

---

## Why this exists

Before this, club updates went out through Facebook posts and word of mouth — notices got buried, results were hard to find, and there was no single place students could check for anything official. This app fixes that: one site, one source of truth, and a dashboard the club's own team can manage.

## Features

- **Leadership messages** — dedicated sections for the Campus Chief, Program Director, and Club President, all editable from the dashboard instead of hardcoded into the frontend.
- **Notice board** — post academic announcements, deadlines, and department updates as they happen.
- **Results portal** — publish exam results and timelines in an organized, searchable format.
- **Board of Directors directory** — current executive team with roles, bios, and contact links.
- **Professor directory** — faculty profiles to make mentorship and outreach easier for students.
- **Alumni & history archive** — a record of the club's past, alumni achievements, and previous events.
- **Event gallery** — photos from past events, managed through Cloudinary.
- **Admin dashboard** — a protected, authenticated area where admins can create, edit, or delete any of the above without writing a single line of code.

## Tech stack

**Frontend**
- Next.js (App Router) + React
- Tailwind CSS
- Lucide React for icons

**Backend**
- Node.js + Express
- MongoDB Atlas with Mongoose
- Cloudinary for image storage and delivery

**Deployment**
- Frontend on Vercel
- Backend on Render

## Project structure

```
BBA-Student-Club/
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
│
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
    │   └── Professor.tsx
    ├── hooks/
    ├── lib/
    └── package.json
```

## Getting started

Clone the repo and set up both halves of the app.

```bash
git clone https://github.com/bibekpandey999/BBA-Student-Club.git
cd BBA-Student-Club
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000` by default and expects the backend API URL to be set via environment variable (see below).

## Environment variables

**backend/.env**
```
MONGODB_URI=your_mongodb_atlas_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
PORT=5000
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Roadmap

- [ ] Email notifications for new notices
- [ ] Pagination on the notice and results pages
- [ ] Role-based permissions in the admin dashboard (currently single-admin)
- [ ] Dark mode toggle

## Contributing

Issues and pull requests are welcome. If you're planning a larger change, open an issue first so we can talk through the approach.

## Author

**Bibek Pandey**
GitHub: [@bibekpandey999](https://github.com/bibekpandey999)

## License

This project is intended for use by the BBA Student Club, Butwal Multiple Campus. Reach out before reusing this codebase for another club or institution.