const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
require('dotenv').config();
const upload = require('express-fileupload');
const path = require('path'); // Import the path module

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(upload());

// Specify the path to the uploads directory
const uploadsDirectory = path.join(__dirname, 'uploads');

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDirectory));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// ---------------- Serve React frontend in production ----------------
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, 'build');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  app.get('/', async (req, res) => {
    res.send('Hello, TypeScript!');
  });
}

// Error Handlers
app.use(notFound);
app.use(errorHandler);

// Database & Server
connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => 
    console.log(`Server Started on port ${process.env.PORT}`)))
  .catch(error => console.error(error));
