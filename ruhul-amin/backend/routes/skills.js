// routes/skills.js
const router = require('express').Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM skills ORDER BY sort_order, id');
  res.json({ success: true, data: rows });
});

router.post('/', auth, async (req, res) => {
  const { name, category, level, icon, sort_order } = req.body;
  const [r] = await db.execute(
    'INSERT INTO skills (name, category, level, icon, sort_order) VALUES (?,?,?,?,?)',
    [name, category || '', level || 80, icon || '', sort_order || 0]
  );
  res.status(201).json({ success: true, id: r.insertId });
});

router.put('/:id', auth, async (req, res) => {
  const { name, category, level, icon, sort_order } = req.body;
  await db.execute(
    'UPDATE skills SET name=?, category=?, level=?, icon=?, sort_order=? WHERE id=?',
    [name, category, level, icon, sort_order, req.params.id]
  );
  res.json({ success: true });
});

router.delete('/:id', auth, async (req, res) => {
  await db.execute('DELETE FROM skills WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
