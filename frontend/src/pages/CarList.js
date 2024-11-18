import React, { useState, useEffect } from 'react';
import { getCars, searchCars } from '../services/api';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Container, Grid, Card, CardContent, Typography, Button, TextField } from '@mui/material';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found. Please log in.');
        }
        const fetchedCars = await getCars(); // Fetch cars
        setCars(fetchedCars); // Update state with fetched cars
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchCars();
  }, []);

  const handleSearch = async () => {
    try {
      if (!searchTerm) {
        const fetchedCars = await getCars();
        setCars(fetchedCars || []); // Ensure it falls back to an empty array
        return;
      }
  
      const fetchedCars = await searchCars(searchTerm);
      setCars(fetchedCars || []); // Ensure fallback to an empty array
    } catch (error) {
      console.error('Error searching cars:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred while searching');
      setCars([]); // Reset cars to an empty array in case of an error
    }
  };   

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Your Cars
        </Typography>

        {/* Button to navigate to Add Car form */}
        <Button
          component={Link}
          to="/cars/new"
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
        >
          Add a Car
        </Button>

        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Search Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ mb: 3 }}
        >
          Search
        </Button>

        {/* Cars Grid */}
        <Grid container spacing={3}>
          {error && <Typography color="error">{error}</Typography>}
          {cars.length === 0 ? (
            <Typography variant="h6" sx={{ width: '100%' }}>
              No cars available. Add a car to get started!
            </Typography>
          ) : (
            cars.map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car._id}>
                <Card>
                  <CardContent>
                    {/* Display the car image */}
                    {car.images && car.images.length > 0 && (
                      <img
                        src={car.images[0].startsWith('http') ? car.images[0] : `http://localhost:5000/${car.images[0]}`}
                        alt={car.title}
                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                      />
                    )}
                    <Typography variant="h6" sx={{ mt: 2 }}>{car.title}</Typography>
                    <Typography variant="body2">{car.description}</Typography>
                    <Button
                      component={Link}
                      to={`/cars/${car._id}`}
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
};

export default CarList;
