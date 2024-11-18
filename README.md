# Car Management Application

## Overview
The **Car Management Application** is a full-stack project that enables users to manage a list of cars. Users can register, log in, add, edit, and delete cars, as well as search through their cars using keywords. The application includes a **React.js** frontend, a **Node.js and Express** backend, and a **MongoDB** database.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contributing](#contributing)

---

## Features

### Authentication
- User registration and login.
- Secure authentication using **JSON Web Token (JWT)**.

### Car Management
- Add, edit, and delete cars.
- View detailed information for each car.

### Search Functionality
- Search cars by title, description, or tags.

### Responsive Design
- User-friendly interface designed with **Material-UI**.

### API Documentation
- Accessible via **Postman** for easy API reference.

---

## Technologies Used

### Frontend
- **React.js**
- **Material-UI**
- **Axios** for API communication.

### Backend
- **Node.js** and **Express.js**
- **Multer** for file uploads.
- **JSON Web Token (JWT)** for authentication.

### Database
- **MongoDB** with **Mongoose ORM**.

### Deployment
- **Vercel** for hosting the frontend and backend.

---

## Project Structure

### Frontend
Located in the `frontend` folder:
- `src/` - Contains components, pages, and API service files.
- `public/` - Contains static assets.

### Backend
Located in the `backend` folder:
- `routes/` - Contains route definitions.
- `controllers/` - Implements business logic for routes.
- `models/` - Defines database schemas.
- `middleware/` - Includes authentication middleware.
- `uploads/` - Stores uploaded car images.

---

## Setup and Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **MongoDB** (local or cloud-based, e.g., MongoDB Atlas)
- **Git**

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/car-management-application.git
   cd car-management-application
   ```

2. **Frontend Setup**
    
    Navigate to the frontend folder and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

3. **Backend Setup**

    Navigate to the backend folder and install dependencies:
    ```bash
    cd ../backend
    npm install
    ```

    Create a .env file in the backend folder and add the following:

    ```env
    MONGO_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    PORT=5000
    ```

4. **Run the Application Locally**

    **Start the backend:**
    ```bash
    cd backend
    node server.js
    ```
    **Start the frontend:**
    ```bash
    Copy code
    cd ../frontend
    npm start
    ```
    The application will run at [http://localhost:3000](http://localhost:3000) (frontend) and [http://localhost:5000](http://localhost:5000) (backend).

---

## API Documentation

View the API documentation here: [Postman Documentation](https://www.postman.com/prachisamuel/workspace/public-workspace/collection/28694301-9583ec24-ef42-4a50-9c13-230a60509659?action=share&creator=28694301).

---

## Deployment

The application is deployed on **Vercel**. Both the frontend and backend are combined in the backend directory:

- **Frontend**: Built React files are located in `backend/public`.
- **Backend**: Serves APIs and static React files.

Live Deployment: [Car Management App](https://car-management-app-ecru.vercel.app)

---

## Usage

1. **Register and Log In:**
    - Create an account or log in with an existing account to access the application.

2. **Manage Cars:**
    - Add cars with a title, description, tags, and images.
    - View all your cars in the dashboard.
    - Edit or delete cars as needed.

3. **Search Cars:**
    - Use the search bar to find cars by keywords in their title, description, or tags.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch: (`git checkout -b feature-name`)
3. Commit your changes:
(`git commit -m "Add some feature"`)
4. Push to the branch:
(`git push origin feature-name`)
5. Open a pull request.