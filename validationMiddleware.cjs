// src/middleware/validationMiddleware.js
const express = require('express');
const validationMiddleware = express();

// Middleware for validating required fields
validationMiddleware.use((req, res, next) => {
  const requiredFields = ['email', 'password', 'title', 'content', 'authorId'];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
  }

  next();
});

// Middleware for validating authorId as an integer
validationMiddleware.use((req, res, next) => {
  const authorId = req.body.authorId;

  if (!Number.isInteger(authorId)) {
    return res.status(400).json({ error: 'Author ID must be an integer' });
  }

  next();
});

// Add more validation middleware functionalities as needed

module.exports = validationMiddleware;
