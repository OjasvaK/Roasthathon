# Club Showcase Website - Complete Setup Guide

A full-stack MERN application for college clubs to showcase projects, enable member uploads, and facilitate idea discussions.

## 🚀 Features

### Project Showcase
- Gallery view with grid-based layout
- Filter by project type (Web Development, AI/ML, Hardware, Mobile App, Data Science)
- Filter by status (Ongoing, Completed)
- Upvote/like projects
- Approve/moderate projects
- Display author information

### Member Upload
- Members can upload new projects with details
- Support for multiple images
- Project links/URLs
- Tags and categorization
- Moderation queue before publishing

### Idea Discussion Forum
- Post, discuss, and vote on ideas
- Upvote/downvote system
- Comment threading
- Category organization (Innovation, Events, Project, Feature)
- Moderation system

### Authentication & Security
- JWT-based authentication
- User registration and login
- Role-based access control (Member, Admin, Moderator)
- Password hashing with bcrypt
- Input validation with express-validator

## 📋 Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation

**Frontend:**
- React 18
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- React Icons for icons

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd club-showcase-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```
   MONGODB_URI=mongodb://localhost:27017/club-showcase
   JWT_SECRET=your_secure_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

5. **Start MongoDB:**
   ```bash
   mongod
   ```

6. **Run backend server:**
   ```bash
   npm run dev
   ```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd club-showcase-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file (optional):**
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start development server:**
   ```bash
   npm start
   ```

Frontend runs on `http://localhost:3000`

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'member' | 'admin' | 'moderator',
  profilePicture: String,
  bio: String,
  isVerified: Boolean,
  createdAt: Date
}
```

### Project Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  author: ObjectId (ref User),
  type: 'Web Development' | 'AI/ML' | 'Hardware' | 'Mobile App' | 'Data Science' | 'Other',
  status: 'ongoing' | 'completed',
  images: [String],
  mediaUrl: String,
  tags: [String],
  approved: Boolean,
  upvotes: Number,
  likedBy: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Idea Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  author: ObjectId (ref User),
  category: 'Innovation' | 'Events' | 'Project' | 'Feature' | 'Other',
  tags: [String],
  upvotes: Number,
  downvotes: Number,
  votedBy: [{
    userId: ObjectId,
    voteType: 'upvote' | 'downvote'
  }],
  comments: [{
    author: ObjectId,
    text: String,
    createdAt: Date
  }],
  approved: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all approved projects (with filters)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project (auth required)
- `PATCH /api/projects/:id/approve` - Approve project (admin only)
- `PATCH /api/projects/:id/like` - Like/unlike project
- `DELETE /api/projects/:id` - Delete project (auth required)

### Forum/Ideas
- `GET /api/forum` - Get all approved ideas
- `GET /api/forum/:id` - Get single idea
- `POST /api/forum` - Create new idea (auth required)
- `PATCH /api/forum/:id/approve` - Approve idea (admin only)
- `PATCH /api/forum/:id/vote` - Vote on idea
- `POST /api/forum/:id/comment` - Add comment
- `DELETE /api/forum/:id` - Delete idea (auth required)

### Users
- `GET /api/users` - Get all verified users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/me` - Get current user (auth required)
- `PATCH /api/users/:id` - Update user profile

## 🎨 Frontend Routes

- `/` - Home page
- `/projects` - Project showcase with filters
- `/forum` - Idea discussion forum
- `/upload` - Upload new project (auth required)
- `/auth` - Login/Register page
- `/profile/:id` - User profile

## 🔐 Security Features

1. **Password Hashing:** bcryptjs with salt rounds
2. **JWT Tokens:** Secure token-based authentication
3. **Input Validation:** express-validator on all endpoints
4. **CORS:** Configured for frontend origin
5. **Authorization Checks:** Role-based access control
6. **Rate Limiting:** Recommended but not implemented (use express-rate-limit)

## 📦 Deployment

### Backend (Heroku)
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_url

# Deploy
git push heroku main
```

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and connect with Vercel/GitHub Pages.

## 🚀 Scaling Considerations

1. **Database Indexing:** Add indexes on frequently queried fields
   ```javascript
   db.projects.createIndex({ "author": 1 });
   db.ideas.createIndex({ "category": 1 });
   ```

2. **Caching:** Implement Redis for project/idea caching

3. **Image Storage:** Use AWS S3 or Cloudinary for image uploads

4. **Load Balancing:** Use nginx for multiple backend instances

5. **CDN:** Use Cloudflare for frontend static assets

## 🐛 Testing

### Backend Testing (recommended)
```bash
npm install --save-dev jest supertest
```

### Frontend Testing
```bash
npm test
```

## 📝 Sample Data

### Create Admin User (MongoDB)
```javascript
db.users.insertOne({
  name: "Admin",
  email: "admin@club.com",
  password: <hashed_password>,
  role: "admin",
  isVerified: true
})
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License

## 💡 Future Enhancements

- [ ] Real-time notifications with Socket.io
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social sharing features
- [ ] Advanced search with Elasticsearch
- [ ] Project collaboration features
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Video support
- [ ] AI-powered recommendations

## 🆘 Troubleshooting

**MongoDB connection error:**
- Ensure MongoDB is running
- Check connection string in .env

**CORS errors:**
- Verify frontend URL in backend CORS config
- Check proxy settings in frontend package.json

**JWT token invalid:**
- Regenerate token by logging in again
- Verify JWT_SECRET matches

## 📞 Support

For issues or questions, please create an issue on GitHub.

---

Built with ❤️ for college clubs
