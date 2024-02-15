// src/routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const customMiddleware = require('../middleware/customMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const Blog = require('../models/Blog'); // Replace with your actual blog model

// Implement endpoint to retrieve all blogs
router.get('/', async (req, res) => {
  try {
    // Replace 'Blog.find()' with the actual query for fetching all blogs
    const blogs = await Blog.find();

    res.status(200).json({ blogs });
  } catch (error) {
    console.error('Fetch Blogs Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Implement endpoint for creating new blogs
router.post('/create', customMiddleware, async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    // Check if the authorId is a valid integer
    if (!Number.isInteger(authorId)) {
      return res.status(400).json({ error: 'Invalid authorId' });
    }

    // Create a new blog
    const newBlog = new Blog({ title, content, authorId });
    // Replace 'newBlog.save()' with the actual save method in your blog model
    await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error('Create Blog Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Implement endpoint to get a specific blog based on the author's ID
router.get('/:authorId', validationMiddleware, async (req, res) => {
  try {
    const authorId = parseInt(req.params.authorId);

    // Check if the authorId is a valid integer
    if (!Number.isInteger(authorId)) {
      return res.status(400).json({ error: 'Invalid authorId' });
    }

    // Replace 'Blog.findOne()' with the actual query for retrieving a specific blog based on author's ID
    const blog = await Blog.findOne({ authorId });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error('Retrieve Blog Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
