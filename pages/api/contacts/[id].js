import db from '../../../lib/db';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const [contact] = await db.query('SELECT id, name, email, phone, created_at, updated_at FROM contacts WHERE id = ?', [id]);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        return res.status(200).json(contact);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching contact', error: error.message });
      }

    case 'PUT':
      try {
        const { name, email, phone } = req.body;
        const result = await db.query('UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone || null, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Contact not found' });
        const [updated] = await db.query('SELECT id, name, email, phone, created_at, updated_at FROM contacts WHERE id = ?', [id]);
        return res.status(200).json(updated);
      } catch (error) {
        if (error && error.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Error updating contact', error: error.message });
      }

    case 'DELETE':
      try {
        const result = await db.query('DELETE FROM contacts WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Contact not found' });
        res.status(204).end();
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting contact', error: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
