const Car = require('../models/Car');

exports.createCar = async (req, res) => {
  try {
    // console.log('Request body:', req.body);
    // console.log('Request files:', req.files);

    const { title, description, tags } = req.body;
    const images = req.files?.map((file) => file.path) || [];

    const car = new Car({
      title,
      description,
      tags,
      images: images.length > 0 ? images : ['uploads/placeholder.png'], // Use correct path relative to the backend
      user: req.user.userId,
    });    

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.error('Error in createCar controller:', error);
    res.status(500).json({ message: 'Error creating car', error });
  }
};

exports.getCars = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract userId from req.user
    // console.log('Fetching cars for user ID:', userId); // Debugging log

    if (!userId) {
      return res.status(400).json({ message: 'User ID not provided' }); // Handle undefined userId
    }

    const cars = await Car.find({ user: userId }); // Fetch cars for the user
    // console.log('Cars fetched:', cars); // Debugging log

    if (!cars.length) {
      return res.status(404).json({ message: 'No cars found for this user' });
    }

    res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car', error });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const car = await Car.findById(req.params.id);

    if (!car) return res.status(404).json({ message: 'Car not found' });

    if (title) car.title = title;
    if (description) car.description = description;
    if (tags) car.tags = tags;

    await car.save();
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error updating car', error });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) return res.status(404).json({ message: 'Car not found' });

    await car.deleteOne();
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car', error });
  }
};

exports.searchCars = async (req, res) => {
  try {
    const { keyword } = req.query; // Extract the search keyword
    const userId = req.user.userId; // Extract the user ID from the authenticated user

    // console.log('Search keyword:', keyword);
    // console.log('User ID:', userId);

    if (!keyword) {
      console.error('Keyword is missing');
      return res.status(400).json({ message: 'Keyword is required for search' });
    }

    if (!userId) {
      console.error('User ID is missing in request');
      return res.status(401).json({ message: 'User ID not found in request' });
    }

    // Perform case-insensitive search in title, description, and tags
    const cars = await Car.find({
      user: userId,
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } },
      ],
    });

    // console.log('Matching cars:', cars); // Log the cars that match
    res.status(200).json(cars); // Return matching cars
  } catch (error) {
    console.error('Error in searchCars:', error.message, error.stack); // Log full error details
    res.status(500).json({ message: 'Server error while searching cars', error: error.message });
  }
};
