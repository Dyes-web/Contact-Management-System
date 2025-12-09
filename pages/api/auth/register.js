import db from '../../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUsers = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name.trim(), email.trim(), hashed]
    );

    // Get the created user
    const [user] = await db.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [result.insertId]);

    return res.status(201).json({
      message: 'Account created successfully',
      user: user
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    return res.status(500).json({ message: 'Error creating account', error: error.message });
  }
}
