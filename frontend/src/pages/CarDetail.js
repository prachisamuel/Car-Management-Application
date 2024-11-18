import React, { useEffect, useState } from 'react';
import { getCarById, deleteCar } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Container, Typography, Button, Box } from '@mui/material';

const CarDetail = () => {
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const { data } = await getCarById(id);
      setCar(data);
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    await deleteCar(id);
    navigate('/cars');
  };

  if (!car) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        {car.images && car.images.length > 0 && (
          <img
            src={car.images[0].startsWith('http') ? car.images[0] : `http://localhost:5000/${car.images[0]}`}
            alt={car.title}
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
        )}
        <Typography variant="h4" gutterBottom>
          {car.title}
        </Typography>
        <Typography variant="body1">{car.description}</Typography>
        <Box sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          onClick={() => navigate(`/cars/edit/${id}`)} // Direct to CarForm page with car ID
          sx={{ mr: 2 }}
        >
          Edit
        </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CarDetail;
