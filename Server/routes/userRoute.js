const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Define user-related routes
router.post('/register', registerUser);       // POST /api/users/register
router.post('/login', loginUser);            // POST /api/users/login
router.get('/profile', protect, getUserProfile); // GET /api/users/profile (protected route)

module.exports = router;
