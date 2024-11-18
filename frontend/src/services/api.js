import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('token');
    // console.log('Token being sent:', token); // Debug token sent in API requests

    if (token) {
      req.headers.Authorization = `Bearer ${token}`; // Attach the token to Authorization header
    }
    return req;
  },
  (error) => {
    console.error('Error in API request:', error);
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const register = (data) => API.post('/users/register', data);
export const login = (data) => API.post('/users/login', data);

// Car Endpoints
export const createCar = (data) => API.post('/cars', data);
export const getCars = async () => {
  try {
    const response = await API.get('/cars');
    return response.data; // Return the fetched cars
  } catch (error) {
    console.error('Error fetching cars:', error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error fetching cars');
    } else {
      throw new Error('Error fetching cars');
    }
  }
};
export const getCarById = (id) => API.get(`/cars/${id}`);
export const updateCar = (id, data) => API.put(`/cars/${id}`, data);
export const deleteCar = (id) => API.delete(`/cars/${id}`);
export const searchCars = async (keyword) => {
  try {
    const url = `/cars/search?keyword=${encodeURIComponent(keyword)}`;
    const response = await API.get(url);
    return response.data || []; // Return data or an empty array
  } catch (error) {
    console.error('Search API Error:', error.response?.data || error.message);
    throw error;
  }
};

export default API;
