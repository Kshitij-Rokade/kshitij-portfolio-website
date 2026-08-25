# Kshitij Rokade — Full Stack Portfolio

A production-quality, full-stack MERN personal portfolio website that tells the complete evolution of a software engineer's journey — from learning programming fundamentals through PHP/MySQL development, into modern React and MERN stack development.

> **"Building ideas into working software."**

## 🚀 Overview

This is not a static portfolio template. It is a fully dynamic, data-driven web application with:

- **Public Portfolio** — Premium responsive website with 3D hero scene, animated journey timeline, project case studies, and contact form
- **Admin Dashboard** — Complete content management system for dynamically managing all portfolio content
- **REST API** — 40+ endpoints with JWT authentication, role-based authorization, and input validation
- **MongoDB Database** — 11 Mongoose models with proper indexes and relationships

## ✨ Features

### Public Portfolio
- 🎨 Premium dark/light mode design with glass morphism
- 🌐 Interactive 3D hero scene (React Three Fiber / Three.js)
- 📱 Fully responsive (320px — 1920px)
- ⚡ Smooth Framer Motion animations (respects reduced-motion)
- 📊 Dynamic skills grouped by category
- 🗺️ Engineering journey timeline
- 📋 FuelSense case study with architecture diagram
- 📬 Contact form with validation
- 🔍 SEO optimized (meta tags, Open Graph, sitemap, semantic HTML)
- ♿ Accessible (ARIA labels, keyboard navigation, focus states)

### Admin Dashboard
- 🔐 Secure JWT authentication with bcrypt
- 📊 Dashboard with live statistics and Recharts charts
- 📝 Full CRUD for: Profile, Journey, Skills, Projects, Experience, Education, Certifications
- 📨 Contact message management (search, filter, status workflow)
- 📤 File upload (resume, profile image, project images, certificates)
- ⚙️ Site settings management

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6 |
| 3D | React Three Fiber, Three.js, @react-three/drei |
| Animation | Framer Motion |
| Charts | Recharts |
| Styling | Vanilla CSS (custom properties design system) |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| Security | Helmet, CORS, Rate Limiting |
| File Upload | Multer |
| Fonts | Inter, Space Grotesk, JetBrains Mono |

## 📁 Architecture

```
portfolio-project/
├── client/                    # React + Vite Frontend
│   ├── src/
│   │   ├── api/               # API client + service layer
│   │   ├── components/
│   │   │   ├── layout/        # Navbar, Footer, AdminLayout
│   │   │   ├── sections/      # 12 homepage sections
│   │   │   └── three/         # 3D hero scene
│   │   ├── context/           # Auth + Theme providers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/
│   │   │   ├── public/        # Home, ProjectDetail
│   │   │   └── admin/         # Login + 10 CRUD pages
│   │   └── utils/             # Animations, helpers
│   └── public/                # SEO files
├── server/                    # Express.js Backend
│   ├── config/                # DB connection
│   ├── controllers/           # 10 resource controllers
│   ├── middleware/             # Auth, error, upload, validate
│   ├── models/                # 11 Mongoose models
│   ├── routes/                # 10 route files
│   └── utils/                 # Seed script
├── .env.example
├── .gitignore
└── package.json               # Root scripts
```

## 🗄️ Database Models

| Model | Purpose |
|-------|---------|
| User | Admin authentication (bcrypt password hashing) |
| Profile | Personal info, hero content, about, social links, resume |
| Journey | Engineering timeline milestones |
| Skill | Technical skills with categories and proficiency levels |
| Project | Projects with case study, slug routing, featured toggle |
| Experience | Work/internship experience |
| Education | Academic timeline |
| Certification | Professional certificates with verification |
| ContactMessage | Contact form submissions with status workflow |
| SiteSettings | Global configuration, SEO, maintenance mode |

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` — Admin login
- `GET /api/auth/me` — Get current user (protected)
- `POST /api/auth/logout` — Logout

### Resources (Public GET, Protected CRUD)
- `/api/profile` — Profile management + file uploads
- `/api/journey` — Journey milestones
- `/api/skills` — Skills
- `/api/projects` — Projects (slug-based GET)
- `/api/experience` — Work experience
- `/api/education` — Education
- `/api/certifications` — Certifications + image upload
- `/api/contact` — Contact messages (public POST, protected management)
- `/api/settings` — Site settings + dashboard statistics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd portfolio-project

# Install all dependencies
npm run install:all

# Create .env file (copy from example)
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed the database with initial data
npm run seed

# Start development (frontend + backend concurrently)
npm run dev
```

## 🎯 Key Design Decisions

1. **Data-driven architecture** — All portfolio content comes from MongoDB via REST APIs. No hardcoded content.
2. **Backend-first build** — Models → API → Frontend ensures every UI connects to real data.
3. **Vanilla CSS design system** — CSS custom properties for full control, no utility framework lock-in.
4. **Reusable CRUD pattern** — Single `AdminCrudPage` component powers all admin resource pages.
5. **Performance-conscious 3D** — Lazy-loaded, reduced on mobile, graceful degradation.

## 📄 License

MIT

---

*Built by Kshitij Rokade — Full Stack Developer*
