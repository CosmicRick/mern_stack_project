import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);

    if (isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const me = async (req, res) => {
  res.json(req.user);
};