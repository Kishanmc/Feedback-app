const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user._id, user.role);

  res.status(201).json({
    message: `${role} registered successfully`,
    token,
    [`${role}Id`]: user._id,
    role
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (user.blocked) {
    return res.status(403).json({ message: 'Your account is blocked' });
  }

  const token = generateToken(user._id, user.role);

  res.json({
    message: `${user.role} logged in successfully`,
    token,
    [`${user.role}Id`]: user._id,
    role: user.role
  });
};
