
const express = require('express');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin_user');
const { setFeedbackApproval, blockUser, exportFeedback } = require('../controllers/adminController');
const router = express.Router();

router.put('/feedback/:id/approval', protect, adminOnly, setFeedbackApproval);
router.put('/user/:id/block', protect, adminOnly, blockUser);
router.get('/feedback/export', protect, adminOnly, exportFeedback);

module.exports = router;
