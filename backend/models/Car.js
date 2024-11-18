const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Mark as required
  description: { type: String, required: true }, // Mark as required
  tags: { type: [String], default: [] }, // Default to empty array
  images: { type: [String], default: ['/placeholder.png'] }, // Default placeholder image
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Required
});

module.exports = mongoose.model('Car', carSchema);
