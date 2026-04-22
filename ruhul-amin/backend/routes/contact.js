// routes/contact.js
const router = require('express').Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// POST — public can send message
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ success: false, message: 'Name, email, message required.' });
  await db.execute(
    'INSERT INTO contacts (name, email, subject, message) VALUES (?,?,?,?)',
    [name, email, subject || '', message]
  );
  res.status(201).json({ success: true, message: 'Message sent successfully!' });
});

// GET all — admin only
router.get('/', auth, async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM contacts ORDER BY created_at DESC');
  res.json({ success: true, data: rows });
});

// Mark read
router.put('/:id/read', auth, async (req, res) => {
  await db.execute('UPDATE contacts SET is_read=1 WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  await db.execute('DELETE FROM contacts WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
