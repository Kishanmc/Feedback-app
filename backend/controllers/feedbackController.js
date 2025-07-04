
const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  const { category, message, rating } = req.body;
  const feedback = new Feedback({
    userId: req.user.id,
    category,
    message,
    rating
  });
  await feedback.save();
  res.status(201).json({ message: 'Feedback submitted', feedback });
};

exports.getAllFeedbacks = async (req, res) => {
  const { status, keyword } = req.query;
  const query = {};
  if (status) query.approvalStatus = status;
  if (keyword) query.message = new RegExp(keyword, 'i');

  const feedbacks = await Feedback.find(query).populate('userId', 'name email');
  res.json(feedbacks);
};
