
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, 
    process.env.JWT_SECRET || 'your-jwt-secret', 
    { expiresIn: '1d' }
  );
};

module.exports = { generateToken };
