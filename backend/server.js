require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const docsRoutes = require('./routes/docsRoutes');
const app = express();
const path = require('path');

app.use(
  cors({
    origin: 'https://car-management-app-ecru.vercel.app', // Frontend URL
    credentials: true, // Allow cookies and auth headers
  })
);

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();
app.use(express.json());

// User and Car routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

// Documentation route
app.use('/api', docsRoutes);

// Handle React routing, return index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));