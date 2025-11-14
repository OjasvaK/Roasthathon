const express = require('express');
const Idea = require('../models/Idea');
const { auth, adminOnly } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all approved ideas with filters
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = { approved: true };

    if (category) query.category = category;

    const skip = (page - 1) * limit;
    const ideas = await Idea.find(query)
      .populate('author', 'name profilePicture email')
      .populate('comments.author', 'name profilePicture email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ upvotes: -1, createdAt: -1 });

    const total = await Idea.countDocuments(query);

    res.json({
      ideas,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate('author', 'name profilePicture email bio')
      .populate('comments.author', 'name profilePicture email');

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    res.json(idea);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Create idea (authenticated users)
router.post('/', auth, [
  body('title').trim().isLength({ min: 3 }),
  body('description').trim().isLength({ min: 10 }),
  body('category').isIn(['Innovation', 'Events', 'Project', 'Feature', 'Other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, category, tags } = req.body;

    const idea = new Idea({
      title,
      description,
      author: req.userId,
      category,
      tags: tags || [],
      approved: false
    });

    await idea.save();
    await idea.populate('author', 'name profilePicture email');

    res.status(201).json({
      message: 'Idea created and pending approval',
      idea
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Approve idea (admin/moderator only)
router.patch('/:id/approve', auth, adminOnly, async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { approved: true, updatedAt: Date.now() },
      { new: true }
    );

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    res.json({ message: 'Idea approved', idea });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Vote on idea
router.patch('/:id/vote', auth, async (req, res) => {
  try {
    const { voteType } = req.body; // 'upvote' or 'downvote'

    if (!['upvote', 'downvote'].includes(voteType)) {
      return res.status(400).json({ error: 'Invalid vote type' });
    }

    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    const existingVote = idea.votedBy.find(v => v.userId.toString() === req.userId);

    if (existingVote) {
      if (existingVote.voteType === 'upvote') idea.upvotes = Math.max(0, idea.upvotes - 1);
      if (existingVote.voteType === 'downvote') idea.downvotes = Math.max(0, idea.downvotes - 1);
      idea.votedBy = idea.votedBy.filter(v => v.userId.toString() !== req.userId);
    }

    if (voteType === 'upvote') idea.upvotes += 1;
    if (voteType === 'downvote') idea.downvotes += 1;

    idea.votedBy.push({ userId: req.userId, voteType });
    await idea.save();

    res.json({ message: 'Vote recorded', idea });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Add comment
router.post('/:id/comment', auth, [
  body('text').trim().isLength({ min: 1, max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;

    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            author: req.userId,
            text,
            createdAt: Date.now()
          }
        }
      },
      { new: true }
    ).populate('comments.author', 'name profilePicture email');

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    res.json({ message: 'Comment added', idea });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Delete idea (author or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    if (idea.author.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this idea' });
    }

    await Idea.findByIdAndDelete(req.params.id);
    res.json({ message: 'Idea deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

module.exports = router;
