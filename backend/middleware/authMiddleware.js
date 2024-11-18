const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header
  // console.log('Incoming Authorization Header:', authHeader);

  if (!authHeader) {
    console.error('Authorization header not provided');
    return res.status(401).json({ error: 'Authorization header not provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token part
  if (!token) {
    console.error('Token not provided');
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    // console.log('Decoded token:', decoded);
    req.user = { userId: decoded.userId }; // Attach the userId to the request object
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
