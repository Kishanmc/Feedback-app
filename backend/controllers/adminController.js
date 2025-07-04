
const Feedback = require('../models/Feedback');
const User = require('../models/User');
const { Parser } = require('json2csv');

exports.setFeedbackApproval = async (req, res) => {
  const { status } = req.body;
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
  feedback.approvalStatus = status;
  await feedback.save();
  res.json({ message: 'Feedback status updated', feedback });
};

exports.blockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.blocked = true;
  await user.save();
  res.json({ message: 'User has been blocked' });
};

exports.exportFeedback = async (req, res) => {
  const feedbacks = await Feedback.find({ approvalStatus: 'approved' }).populate('userId', 'name email');
  const fields = ['_id', 'category', 'message', 'rating', 'approvalStatus', 'createdAt'];
  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(feedbacks);
  res.header('Content-Type', 'text/csv');
  res.attachment('feedbacks.csv');
  return res.send(csv);
};
