// src/middleware/commonMiddleware.js
const express = require('express');
const commonMiddleware = express();

// Middleware to log requests
commonMiddleware.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware for handling CORS (Cross-Origin Resource Sharing)
commonMiddleware.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Add more common middleware functionalities as needed

module.exports = commonMiddleware;

