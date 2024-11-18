const express = require('express');
const router = express.Router();

// API documentation route
router.get('/docs', (req, res) => {
  res.redirect('https://www.postman.com/prachisamuel/workspace/public-workspace/collection/28694301-9583ec24-ef42-4a50-9c13-230a60509659?action=share&creator=28694301'); // Replace with your Postman link
});

module.exports = router;