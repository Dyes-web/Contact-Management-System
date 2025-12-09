import db from '../../../lib/db';

export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case 'GET':
      try {
        const rows = await db.query('SELECT id, name, email, phone, created_at, updated_at FROM contacts ORDER BY created_at DESC');
        return res.status(200).json(rows);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching contacts', error: error.message });
      }

    case 'POST':
      try {
        const { name, email, phone } = req.body;
        if (!name || !email) {
          return res.status(400).json({ message: 'Name and Email are required' });
        }

        // Insert and return created row
        const result = await db.query(
          'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)',
          [name.trim(), email.trim(), phone ? String(phone).trim() : null]
        );
        const [created] = await db.query('SELECT id, name, email, phone, created_at, updated_at FROM contacts WHERE id = ?', [result.insertId]);
        return res.status(201).json(created);
      } catch (error) {
        // Handle duplicate email
        if (error && error.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Error creating contact', error: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
