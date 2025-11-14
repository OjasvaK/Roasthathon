# Project Directory Structure

## Complete File Organization

```
Roastathon/
│
├── 📚 DOCUMENTATION FILES
│   ├── README.md                    # Main setup guide (comprehensive)
│   ├── QUICKSTART.md               # 5-minute quick start
│   ├── DATABASE_SCHEMA.md          # Database design & setup
│   ├── DEPLOYMENT.md               # Production deployment guide
│   ├── TESTING_GUIDE.md            # Testing checklist & procedures
│   ├── PROJECT_SUMMARY.md          # This project overview
│   └── .gitignore                  # Git ignore rules
│
├── 📦 BACKEND (Node.js + Express)
│   └── club-showcase-backend/
│       ├── models/
│       │   ├── User.js             # User schema (name, email, role, bio)
│       │   ├── Project.js          # Project schema (title, images, status)
│       │   └── Idea.js             # Idea schema (title, votes, comments)
│       │
│       ├── routes/
│       │   ├── auth.js             # Auth endpoints (register, login)
│       │   ├── projects.js         # Project endpoints (CRUD, approve, like)
│       │   ├── forum.js            # Forum endpoints (ideas, comments, votes)
│       │   └── users.js            # User endpoints (profiles, info)
│       │
│       ├── middleware/
│       │   └── auth.js             # JWT verification, role checking
│       │
│       ├── server.js               # Express app setup & routes
│       ├── package.json            # Dependencies
│       ├── .env.example            # Environment template
│       └── Procfile                # Heroku deployment config
│
├── 🎨 FRONTEND (React + Tailwind)
│   └── club-showcase-frontend/
│       ├── public/
│       │   └── index.html          # HTML template
│       │
│       ├── src/
│       │   ├── components/         # Reusable components
│       │   │   ├── Navbar.js       # Navigation bar
│       │   │   ├── ProjectCard.js  # Project display card
│       │   │   └── IdeaCard.js     # Idea discussion card
│       │   │
│       │   ├── pages/              # Page routes
│       │   │   ├── Home.js         # Landing page
│       │   │   ├── ProjectShowcase.js # Gallery with filters
│       │   │   ├── ForumPage.js    # Discussion forum
│       │   │   ├── UploadProject.js # Upload form
│       │   │   ├── AuthPage.js     # Login/Register
│       │   │   └── UserProfile.js  # User profile page
│       │   │
│       │   ├── App.js              # Main app wrapper & routing
│       │   ├── App.css             # Global styles
│       │   ├── index.js            # React entry point
│       │   └── index.css           # Tailwind setup
│       │
│       ├── package.json            # Dependencies
│       ├── tailwind.config.js      # Tailwind configuration
│       ├── postcss.config.js       # PostCSS configuration
│       └── .env.example            # Environment template
│
├── 🎨 LEGACY FILES (from Roastathon)
│   ├── index.html                  # Original HTML
│   ├── styles.css                  # Original CSS
│   ├── cipher (2).png              # Logo image
│   ├── cipher 1.png                # Alternate logo
│   ├── back.jpg                    # Background image
│   ├── back 2.jpg                  # Alternate background
│   ├── cybercec.html               # Additional page
│   └── Web3.html                   # Additional page
│
└── .git/                           # Git version control
```

---

## 📊 Component Hierarchy

```
App (Main Component)
│
├── Navbar
│   ├── Navigation Links
│   ├── User Menu (if logged in)
│   └── Mobile Hamburger
│
├── Routes
│   ├── Home Page
│   │   ├── Hero Section
│   │   ├── Features Section
│   │   └── Stats Section
│   │
│   ├── ProjectShowcase
│   │   ├── Filter Panel
│   │   │   ├── Type Filter
│   │   │   └── Status Filter
│   │   ├── ProjectCard (Grid)
│   │   │   ├── Image
│   │   │   ├── Title & Description
│   │   │   ├── Tags
│   │   │   ├── Upvote Button
│   │   │   └── Details Link
│   │   └── Pagination
│   │
│   ├── ForumPage
│   │   ├── Post Idea Form (if auth)
│   │   ├── Category Filter
│   │   └── IdeaCard (List)
│   │       ├── Title & Description
│   │       ├── Upvote/Downvote
│   │       ├── Comment Count
│   │       └── Voting Buttons
│   │
│   ├── UploadProject
│   │   ├── Title Input
│   │   ├── Description Textarea
│   │   ├── Type Selector
│   │   ├── Status Selector
│   │   ├── Image Upload
│   │   ├── Media URL Input
│   │   ├── Tags Input
│   │   └── Submit Button
│   │
│   ├── AuthPage
│   │   ├── Login Form
│   │   │   ├── Email Input
│   │   │   ├── Password Input
│   │   │   └── Login Button
│   │   └── Register Form
│   │       ├── Name Input
│   │       ├── Email Input
│   │       ├── Password Input
│   │       ├── Confirm Password
│   │       └── Register Button
│   │
│   └── UserProfile
│       ├── Profile Picture
│       ├── User Name
│       ├── User Role
│       ├── Bio
│       └── Member Since Date
```

---

## 🗂️ Database Schema Hierarchy

```
MongoDB (club-showcase)
│
├── users (User accounts)
│   └── Document:
│       ├── _id
│       ├── name
│       ├── email
│       ├── password (hashed)
│       ├── role (member/admin/moderator)
│       ├── profilePicture
│       ├── bio
│       ├── isVerified
│       └── createdAt
│
├── projects (Project submissions)
│   └── Document:
│       ├── _id
│       ├── title
│       ├── description
│       ├── author (reference to user._id)
│       ├── type (enum: Web Dev/AI/ML/...)
│       ├── status (ongoing/completed)
│       ├── images (array)
│       ├── mediaUrl
│       ├── tags (array)
│       ├── approved (boolean)
│       ├── upvotes (number)
│       ├── likedBy (array of user._id)
│       ├── createdAt
│       └── updatedAt
│
└── ideas (Forum discussions)
    └── Document:
        ├── _id
        ├── title
        ├── description
        ├── author (reference to user._id)
        ├── category (enum: Innovation/Events/...)
        ├── tags (array)
        ├── upvotes (number)
        ├── downvotes (number)
        ├── votedBy (array)
        │   └── { userId, voteType }
        ├── comments (array)
        │   └── { author, text, createdAt }
        ├── approved (boolean)
        ├── createdAt
        └── updatedAt
```

---

## 🔄 API Route Structure

```
/api
│
├── /auth
│   ├── POST /register
│   └── POST /login
│
├── /projects
│   ├── GET / (list with filters)
│   ├── GET /:id (single project)
│   ├── POST / (create, auth required)
│   ├── PATCH /:id/approve (admin only)
│   ├── PATCH /:id/like (auth required)
│   └── DELETE /:id (auth required)
│
├── /forum
│   ├── GET / (list ideas)
│   ├── GET /:id (single idea)
│   ├── POST / (create idea, auth required)
│   ├── PATCH /:id/approve (admin only)
│   ├── PATCH /:id/vote (auth required)
│   ├── POST /:id/comment (auth required)
│   └── DELETE /:id (auth required)
│
└── /users
    ├── GET / (all users)
    ├── GET /:id (single user)
    ├── GET /me (current user, auth required)
    └── PATCH /:id (update profile, auth required)
```

---

## 📱 Frontend Routes

```
/
├── /                   → Home (public)
├── /projects           → Project Showcase (public)
├── /forum              → Discussion Forum (public)
├── /upload             → Upload Project (auth required)
├── /auth               → Login/Register (public)
└── /profile/:id        → User Profile (public)
```

---

## 🔐 Authentication Flow

```
User Registration
├── User fills form
├── POST /api/auth/register
├── Server validates input
├── Hash password with bcryptjs
├── Create user in database
├── Generate JWT token
└── Return token + user data

User Login
├── User enters credentials
├── POST /api/auth/login
├── Server finds user
├── Compare passwords
├── Generate JWT token
├── Return token + user data

Protected Route
├── Client includes token in header
├── Server verifies JWT
├── Check user role if needed
├── Proceed or deny access
```

---

## 📦 Dependencies

### Backend (package.json)
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5",
  "express-validator": "^7.0.0"
}
```

### Frontend (package.json)
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.0.0",
  "axios": "^1.3.0",
  "tailwindcss": "^3.2.0",
  "react-icons": "^4.7.0"
}
```

---

## 🔧 Configuration Files

```
.env (Backend)
├── MONGODB_URI=mongodb://...
├── JWT_SECRET=...
├── PORT=5000
└── NODE_ENV=development

.env.production (Frontend)
├── REACT_APP_API_URL=https://api.example.com
└── REACT_APP_ANALYTICS_ID=...

tailwind.config.js (Frontend)
├── Content paths
└── Theme customization

server.js (Backend)
├── Express setup
├── Middleware
├── Route definitions
└── Error handling
```

---

## 📊 File Count Summary

| Category | Count |
|----------|-------|
| Backend Routes | 4 files |
| Backend Models | 3 files |
| Frontend Components | 3 files |
| Frontend Pages | 6 files |
| Config Files | 4 files |
| Documentation | 6 files |
| **Total** | **26+ files** |

---

## 🚀 Deployment Structure

```
GitHub Repository
├── club-showcase-backend/
│   ├── Heroku Procfile
│   └── package.json (start script)
│
└── club-showcase-frontend/
    ├── Vercel config
    └── package.json (build script)
```

---

This structure is:
- ✅ **Organized:** Clear separation of concerns
- ✅ **Scalable:** Easy to add new features
- ✅ **Maintainable:** Modular and documented
- ✅ **Professional:** Industry-standard structure
