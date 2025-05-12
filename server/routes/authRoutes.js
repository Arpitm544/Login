
const express = require('express');
const passport = require('passport');
const { authenticate } = require('../middleware/auth');
const { 
  register, 
  login, 
  forgotPassword, 
  resetPassword, 
  getUser 
} = require('../controllers/authController');
const { generateToken } = require('../utils/token');

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:8080'}?error=google_login_failed` 
  }),
  (req, res) => {
    // Generate token
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    const redirectUrl = `${process.env.CLIENT_URL || 'http://localhost:8080'}/dashboard?token=${token}`;
    res.redirect(redirectUrl);
  }
);

// Test route for Google OAuth
router.get('/google/test', (req, res) => {
  res.send('Google OAuth test route is working. Use /api/auth/google to initiate the login flow.');
});

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.post('/reset-password', resetPassword);

// Get user data
router.get('/user', authenticate, getUser);

module.exports = router;
