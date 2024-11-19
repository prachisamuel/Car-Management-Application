import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Box, Snackbar, Alert } from '@mui/material';

const CarForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { id } = useParams(); // Get car ID from route
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch car details for editing
      const fetchCarDetails = async () => {
        try {
          const response = await axios.get(`https://car-management-application-backend-yjz7.onrender.com/api/cars/${id}`);
          const { title, description, tags } = response.data;

          // Pre-fill form with existing car details
          setTitle(title);
          setDescription(description);
          setTags(tags.join(', ')); // Convert tags array to comma-separated string
        } catch (error) {
          console.error('Error fetching car details:', error);
        }
      };
      fetchCarDetails();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    images.forEach((image) => formData.append('images', image)); // Handle file uploads

    try {
      if (id) {
        // Update existing car
        await axios.put(
          `https://car-management-application-backend-yjz7.onrender.com/api/cars/${id}`,
          { title, description, tags: tags.split(','), images }, // Update payload
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust token if needed
            },
          }
        );
        setSuccessMessage('Car updated successfully!');
      } else {
        // Add a new car
        await axios.post(
          'https://car-management-application-backend-yjz7.onrender.com/api/cars',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust token if needed
            },
          }
        );
        setSuccessMessage('Car added successfully!');
        setTitle('');
        setDescription('');
        setTags('');
        setImages([]);
      }

      setOpenSnackbar(true);

      // Navigate to car list after a short delay
      setTimeout(() => navigate('/cars'), 1500);
    } catch (error) {
      console.error('Error saving car:', error);
      alert('Failed to save the car. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Car' : 'Add a New Car'}
        </Typography>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
            {successMessage}
          </Alert>
        </Snackbar>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title"
                fullWidth
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Description"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tags (comma-separated)"
                fullWidth
                variant="outlined"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Button variant="contained" color="primary" type="submit" size="large">
              {id ? 'Update Car' : 'Add Car'}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default CarForm;
