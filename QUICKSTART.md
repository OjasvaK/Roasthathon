# Club Showcase - Quick Start Guide

## 🎯 Quick Setup (5 minutes)

### Step 1: Backend Setup
```bash
cd club-showcase-backend
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/club-showcase
JWT_SECRET=your_secret_key_123
PORT=5000
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

### Step 2: Frontend Setup
```bash
cd club-showcase-frontend
npm install
npm start
```

### Step 3: Create Your First Admin Account
- Go to http://localhost:3000/auth
- Register with email: `admin@club.com`
- Login
- Update role in MongoDB to "admin"

## 📱 Features at a Glance

| Feature | Path | Auth Required |
|---------|------|---------------|
| View Projects | `/projects` | No |
| View Ideas | `/forum` | No |
| Upload Project | `/upload` | Yes |
| Post Idea | `/forum` | Yes |
| View Profile | `/profile/:id` | No |
| Approve Content | Admin Panel | Yes (Admin) |

## 🔑 Key API Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@club.com",
    "password": "password123"
  }'
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI Chatbot",
    "description": "An intelligent chatbot using NLP",
    "type": "AI/ML",
    "status": "completed",
    "tags": ["python", "nlp", "ai"]
  }'
```

### Get Projects
```bash
curl http://localhost:5000/api/projects?type=Web%20Development&status=completed
```

## 📊 Default Data Structure

After setup, the following collections will be created:
- `users` - User accounts
- `projects` - Project submissions
- `ideas` - Forum ideas

## 🎨 Customization

### Change Colors
Edit `src/App.css` and component className colors:
- Primary: `purple-600` → Change to your color
- Secondary: `blue-600` → Change to your color
- Dark: `gray-900` → Change to your color

### Add Categories
Edit `projectTypes` in `ProjectShowcase.js`:
```javascript
const projectTypes = [
  'Web Development',
  'Your Category Here',
  // ...
];
```

### Change Site Title
Edit `club-showcase-frontend/public/index.html`

## 🚀 Deployment

### Deploy Backend to Heroku
```bash
cd club-showcase-backend
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy Frontend to Vercel
```bash
cd club-showcase-frontend
npm install -g vercel
vercel
```

## ⚠️ Common Issues

**"Cannot GET /api/projects"**
- Ensure backend is running on port 5000
- Check `proxy` in frontend `package.json`

**"JWT token is not valid"**
- Make sure JWT_SECRET in .env matches
- Try logging in again

**"MongoDB connection failed"**
- Check MongoDB is running
- Verify connection string

## 💾 Sample Data Script

Run in MongoDB to add sample projects:
```javascript
db.projects.insertMany([
  {
    title: "React Dashboard",
    description: "Beautiful admin dashboard built with React",
    type: "Web Development",
    status: "completed",
    author: ObjectId("..."),
    tags: ["react", "dashboard"],
    approved: true,
    upvotes: 12
  }
])
```

## 📝 Next Steps

1. ✅ Setup backend and frontend
2. ✅ Create admin account
3. ✅ Create a test project
4. ✅ Test upload functionality
5. ✅ Invite team members
6. ✅ Deploy to production

---

**Need help?** Check README.md for detailed documentation.
