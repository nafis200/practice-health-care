// otpController.ts
import express from 'express';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();
const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// ✅ Memory তে object দিয়ে OTP রাখা
const otpStore: { [email: string]: string } = {};

// ✅ OTP পাঠানোর ফাংশন
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP

  // Store করা হলো (পরবর্তীতে verification এর জন্য)
  otpStore[email] = otp;

  const msg = {
    to: email,
    from: process.env.FROM_EMAIL!,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// ✅ OTP verify করার ফাংশন
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otpStore[email];

  if (storedOtp === otp) {
    delete otpStore[email]; // OTP expire করে দিলাম
    return res.status(200).json({ message: 'OTP verified successfully' });
  }

  return res.status(400).json({ message: 'Invalid OTP' });
});

export default router;










// models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  verified: { type: Boolean, default: false },
});

export default mongoose.model('User', userSchema);

const otpStore: {
  [email: string]: { code: string; expiresAt: number };
} = {};


router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[email] = {
    code: otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // ৫ মিনিটের জন্য valid
  };

  const msg = {
    to: email,
    from: process.env.FROM_EMAIL!,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'OTP sent' });
  } catch {
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});


import User from './models/User';

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore[email];

  if (!stored || Date.now() > stored.expiresAt) {
    return res.status(400).json({ message: 'OTP expired or not found' });
  }

  if (stored.code !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  await User.updateOne({ email }, { verified: true });
  delete otpStore[email];

  return res.status(200).json({ message: 'OTP verified successfully' });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: 'User not found' });

  if (!user.verified) {
    return res.status(403).json({ message: 'Please verify your email with OTP' });
  }

  // Check password (use bcrypt.compare in real case)
  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) return res.status(400).json({ message: 'Wrong credentials' });

  return res.status(200).json({ message: 'Login successful' });
});



