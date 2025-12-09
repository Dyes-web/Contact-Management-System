import db from '../../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const users = await db.query('SELECT id FROM users WHERE email = ?', [email.trim()]);
    if (users.length === 0) return res.status(404).json({ exists: false });
    return res.status(200).json({ exists: true });
  } catch (error) {
    console.error('check-email error:', error.message);
    return res.status(500).json({ message: 'Error checking email', error: error.message });
  }
}
