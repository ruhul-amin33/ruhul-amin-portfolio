// routes/posts.js
const router = require('express').Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// GET /api/posts — public (published only)
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page  = parseInt(req.query.page)  || 1;
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(
      `SELECT id, title, slug, excerpt, thumbnail, tags, created_at
       FROM posts WHERE status='published'
       ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    const [[{ total }]] = await db.execute(`SELECT COUNT(*) as total FROM posts WHERE status='published'`);
    res.json({ success: true, data: rows, total, page, limit });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/posts/all — admin only (all statuses)
router.get('/all', auth, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM posts ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/posts/:slug
router.get('/:slug', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM posts WHERE slug = ? AND status = "published"',
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Post not found.' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/posts — admin only
router.post('/', auth, async (req, res) => {
  const { title, content, excerpt, thumbnail, tags, status } = req.body;
  if (!title || !content)
    return res.status(400).json({ success: false, message: 'Title and content required.' });

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();

  try {
    const [result] = await db.execute(
      'INSERT INTO posts (title, slug, content, excerpt, thumbnail, tags, status) VALUES (?,?,?,?,?,?,?)',
      [title, slug, content, excerpt || '', thumbnail || '', tags || '', status || 'published']
    );
    res.status(201).json({ success: true, id: result.insertId, slug });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/posts/:id — admin only
router.put('/:id', auth, async (req, res) => {
  const { title, content, excerpt, thumbnail, tags, status } = req.body;
  try {
    await db.execute(
      'UPDATE posts SET title=?, content=?, excerpt=?, thumbnail=?, tags=?, status=? WHERE id=?',
      [title, content, excerpt, thumbnail, tags, status, req.params.id]
    );
    res.json({ success: true, message: 'Post updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/posts/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.execute('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Post deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
