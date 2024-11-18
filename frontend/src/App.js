import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import CarForm from './pages/CarForm';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cars" element={<CarList />} />
      <Route path="/cars/new" element={<CarForm />} />
      <Route path="/cars/edit/:id" element={<CarForm />} />
      <Route path="/cars/:id" element={<CarDetail />} />
      <Route path="/docs" element={<RedirectToPostman />} />
    </Routes>
  </Router>
);

const RedirectToPostman = () => {
  window.location.href = 'https://www.postman.com/prachisamuel/workspace/public-workspace/collection/28694301-9583ec24-ef42-4a50-9c13-230a60509659?action=share&creator=28694301';
  return null;
};

export default App;
