// routes/portfolio.js
const router = require('express').Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM portfolio ORDER BY sort_order, id DESC');
  res.json({ success: true, data: rows });
});

router.post('/', auth, async (req, res) => {
  const { title, description, thumbnail, live_url, github_url, tech_stack, category, featured, sort_order } = req.body;
  const [r] = await db.execute(
    'INSERT INTO portfolio (title,description,thumbnail,live_url,github_url,tech_stack,category,featured,sort_order) VALUES (?,?,?,?,?,?,?,?,?)',
    [title, description, thumbnail || '', live_url || '', github_url || '', tech_stack || '', category || '', featured ? 1 : 0, sort_order || 0]
  );
  res.status(201).json({ success: true, id: r.insertId });
});

router.put('/:id', auth, async (req, res) => {
  const { title, description, thumbnail, live_url, github_url, tech_stack, category, featured, sort_order } = req.body;
  await db.execute(
    'UPDATE portfolio SET title=?,description=?,thumbnail=?,live_url=?,github_url=?,tech_stack=?,category=?,featured=?,sort_order=? WHERE id=?',
    [title, description, thumbnail, live_url, github_url, tech_stack, category, featured ? 1 : 0, sort_order, req.params.id]
  );
  res.json({ success: true });
});

router.delete('/:id', auth, async (req, res) => {
  await db.execute('DELETE FROM portfolio WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
