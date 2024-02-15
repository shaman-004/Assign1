// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();// src/routes/authRoutes.js
const express = require('express');
// Remove the duplicate declaration of 'router'
// const router = express.Router();
const validationMiddleware = require('../middleware/validationMiddleware');
const User = require('../models/User'); // Replace with your actual user model

// Implement 'Login' endpoint with validation
router.post('/login', validationMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided password matches the stored hash
    // Replace 'user.password' with the actual field in your user model
    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // TODO: Generate and return a token for user authentication

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Implement 'Register' endpoint with validation
router.post('/register', validationMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password });
    // Replace 'user.save()' with the actual save method in your user model
    await newUser.save();

    // TODO: Generate and return a token for user authentication

    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

const validationMiddleware = require('../middleware/validationMiddleware');

// Implement 'Login' endpoint with validation
router.post('/login', validationMiddleware, (req, res) => {
  // Handle login logic
});

// Implement 'Register' endpoint with validation
router.post('/register', validationMiddleware, (req, res) => {
  // Handle registration logic
});

module.exports = router;
