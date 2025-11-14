const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('../../club-showcase-backend/routes/auth');
const projectRoutes = require('../../club-showcase-backend/routes/projects');
const forumRoutes = require('../../club-showcase-backend/routes/forum');
const userRoutes = require('../../club-showcase-backend/routes/users');

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch(err => console.error('MongoDB connection error:', err));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Club Showcase Backend API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      forum: '/api/forum',
      users: '/api/users'
    }
  });
});

// Export for Vercel
module.exports = app;
