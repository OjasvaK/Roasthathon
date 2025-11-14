const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Update user profile
router.patch('/:id', auth, async (req, res) => {
  try {
    if (req.params.id !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this profile' });
    }

    const { name, bio, profilePicture } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (bio) updateData.bio = bio;
    if (profilePicture) updateData.profilePicture = profilePicture;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get all users (for display purposes)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ isVerified: true }).select('name email profilePicture bio');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

module.exports = router;
