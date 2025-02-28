const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
        const message = existingUser.email === email ? 'Email already exists' : 'Mobile number already exists';
        return res.status(400).json({ statusCode: 400, message });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, mobile, password: hashedPassword });
    await newUser.save();
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      mobile: newUser.mobile,
    };
    return res.status(200).json({ statusCode: 200, message: 'User registered successfully', data: userData });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ statusCode: 400, error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, email: user.email}, process.env.JWT_SECRET, { expiresIn: '7d' });
    const userData = {
      id: user._id,
      name: user.name,
      token: token,
    };
    return res.status(200).json({ statusCode: 200, message: 'User login successfully', data: userData });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};
