const express = require('express');
const router = express.Router();

// API documentation route
router.get('/docs', (req, res) => {
  res.redirect('https://www.postman.com/prachisamuel/workspace/public-workspace/collection/28694301-f8099ed8-f099-4917-9a39-b55409ad4dac?action=share&creator=28694301'); // Replace with your Postman link
});

module.exports = router;
