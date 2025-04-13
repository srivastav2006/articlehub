const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  updateDetails,
} = require('../controllers/userController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);

module.exports = router;