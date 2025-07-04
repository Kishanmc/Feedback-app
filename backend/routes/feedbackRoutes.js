
const express = require('express');
const { submitFeedback, getAllFeedbacks } = require('../controllers/feedbackController');
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const { userOnly, adminOnly } = require('../middleware/admin_user');
const router = express.Router();

router.post('/', protect, userOnly, submitFeedback);
router.get('/', protect,adminOnly, getAllFeedbacks);

module.exports = router;
