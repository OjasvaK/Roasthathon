const express = require('express');
const Project = require('../models/Project');
const { auth, adminOnly } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all approved projects with filters
router.get('/', async (req, res) => {
  try {
    const { type, author, status, page = 1, limit = 10 } = req.query;
    const query = { approved: true };

    if (type) query.type = type;
    if (author) query.author = author;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const projects = await Project.find(query)
      .populate('author', 'name profilePicture email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Project.countDocuments(query);

    res.json({
      projects,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('author', 'name profilePicture email bio')
      .populate('likedBy', 'name email');

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Create project (authenticated users)
router.post('/', auth, [
  body('title').trim().isLength({ min: 3 }),
  body('description').trim().isLength({ min: 10 }),
  body('type').isIn(['Web Development', 'AI/ML', 'Hardware', 'Mobile App', 'Data Science', 'Other']),
  body('status').isIn(['ongoing', 'completed'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, type, status, images, mediaUrl, tags } = req.body;

    const project = new Project({
      title,
      description,
      author: req.userId,
      type,
      status,
      images: images || [],
      mediaUrl,
      tags: tags || [],
      approved: false
    });

    await project.save();
    await project.populate('author', 'name profilePicture email');

    res.status(201).json({
      message: 'Project created and pending approval',
      project
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Approve project (admin/moderator only)
router.patch('/:id/approve', auth, adminOnly, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { approved: true, updatedAt: Date.now() },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project approved', project });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Like/unlike project
router.patch('/:id/like', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const alreadyLiked = project.likedBy.includes(req.userId);

    if (alreadyLiked) {
      project.likedBy = project.likedBy.filter(id => id.toString() !== req.userId);
      project.upvotes = Math.max(0, project.upvotes - 1);
    } else {
      project.likedBy.push(req.userId);
      project.upvotes += 1;
    }

    await project.save();
    res.json({ message: alreadyLiked ? 'Unliked' : 'Liked', project });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Delete project (author or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.author.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

module.exports = router;
