// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const commonMiddleware = require('./middleware/commonMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(commonMiddleware);

// Include your route files
const authRoutes = require('./routes/authRoutes.cjs');
const blogRoutes = require('./routes/blogRoutes.cjs');

app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
