const express = require('express');
const multer = require('multer');
const { createCar, getCars, getCarById, updateCar, deleteCar, searchCars } = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Directory for storing images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Car routes
router.get('/search', authMiddleware, searchCars);
router.post('/', authMiddleware, upload.array('images'), createCar); // POST with image upload
router.get('/', authMiddleware, getCars);
router.get('/:id', authMiddleware, getCarById);
router.put('/:id', authMiddleware, updateCar);
router.delete('/:id', authMiddleware, deleteCar);

module.exports = router;
