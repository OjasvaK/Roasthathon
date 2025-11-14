const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// ===== HARDCODED TEST CREDENTIALS =====
const HARDCODED_USERS = {
  // Admin user
  'admin@club.com': {
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    bio: 'Club Administrator'
  },
  // Regular member
  'user@club.com': {
    password: 'user123',
    name: 'Test Member',
    role: 'member',
    bio: 'Club Member'
  },
  // Moderator
  'mod@club.com': {
    password: 'mod123',
    name: 'Moderator',
    role: 'moderator',
    bio: 'Forum Moderator'
  }
};

// ===== QUICK TEST CREDENTIALS =====
// Email: admin@club.com | Password: admin123
// Email: user@club.com  | Password: user123
// Email: mod@club.com   | Password: mod123

// Register
router.post('/register', [
  body('name').trim().isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Login - With Hardcoded Credentials
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // ===== CHECK HARDCODED CREDENTIALS FIRST =====
    if (HARDCODED_USERS[email]) {
      const hardcodedUser = HARDCODED_USERS[email];
      
      // Simple password check (not hashed for testing)
      if (hardcodedUser.password === password) {
        // Generate token
        const token = jwt.sign(
          { 
            userId: email, 
            email: email,
            role: hardcodedUser.role 
          },
          process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production',
          { expiresIn: '7d' }
        );

        return res.json({
          token,
          user: {
            id: email,
            name: hardcodedUser.name,
            email: email,
            role: hardcodedUser.role,
            bio: hardcodedUser.bio
          }
        });
      } else {
        return res.status(400).json({ error: 'Invalid password' });
      }
    }

    // ===== FALLBACK: CHECK DATABASE =====
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get test credentials endpoint (for development only)
router.get('/test-credentials', (req, res) => {
  res.json({
    message: 'CIPHER SHOWCASE - Test Credentials (Development Only)',
    app: 'CIPHER SHOWCASE',
    credentials: [
      {
        email: 'admin@club.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User'
      },
      {
        email: 'user@club.com',
        password: 'user123',
        role: 'member',
        name: 'Test Member'
      },
      {
        email: 'mod@club.com',
        password: 'mod123',
        role: 'moderator',
        name: 'Moderator'
      }
    ]
  });
});

module.exports = router;
