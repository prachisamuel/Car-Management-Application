const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if all fields are provided
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered. Please log in.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully. You can now log in.' });
    } catch (error) {
      console.error('Registration error:', error.message);
  
      // Handle specific error types
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid data format' });
      }
      if (error.code === 11000) { // MongoDB duplicate key error
        return res.status(400).json({ message: 'Email is already in use' });
      }
  
      res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
  };

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if all fields are provided
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      // console.log('Password comparison result:', isPasswordValid);
      if (!isPasswordValid) {
        console.log('Password mismatch for user:', email);
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
  
      res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
      console.error('Login error:', error.message);
  
      // Generic error message for unexpected issues
      res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
  };
  
  
