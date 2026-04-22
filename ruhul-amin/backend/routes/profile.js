// routes/profile.js
const router = require('express').Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// GET profile (public)
router.get('/', async (req, res) => {
  const [profile] = await db.execute('SELECT * FROM profile WHERE id=1');
  const [education] = await db.execute('SELECT * FROM education ORDER BY sort_order, start_year DESC');
  const [services] = await db.execute('SELECT * FROM services ORDER BY sort_order');
  res.json({ success: true, data: { profile: profile[0] || {}, education, services } });
});

// PUT profile (admin)
router.put('/', auth, async (req, res) => {
  const { full_name, title, bio, email, phone, location, github_url, linkedin_url, resume_url, avatar } = req.body;
  await db.execute(
    `INSERT INTO profile (id,full_name,title,bio,email,phone,location,github_url,linkedin_url,resume_url,avatar)
     VALUES (1,?,?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE
     full_name=VALUES(full_name), title=VALUES(title), bio=VALUES(bio),
     email=VALUES(email), phone=VALUES(phone), location=VALUES(location),
     github_url=VALUES(github_url), linkedin_url=VALUES(linkedin_url),
     resume_url=VALUES(resume_url), avatar=VALUES(avatar)`,
    [full_name, title, bio, email, phone, location, github_url, linkedin_url, resume_url, avatar]
  );
  res.json({ success: true });
});

// Education CRUD
router.post('/education', auth, async (req, res) => {
  const { degree, institution, field_of_study, start_year, end_year, description, sort_order } = req.body;
  const [r] = await db.execute(
    'INSERT INTO education (degree,institution,field_of_study,start_year,end_year,description,sort_order) VALUES (?,?,?,?,?,?,?)',
    [degree, institution, field_of_study, start_year, end_year, description, sort_order || 0]
  );
  res.status(201).json({ success: true, id: r.insertId });
});

router.put('/education/:id', auth, async (req, res) => {
  const { degree, institution, field_of_study, start_year, end_year, description, sort_order } = req.body;
  await db.execute(
    'UPDATE education SET degree=?,institution=?,field_of_study=?,start_year=?,end_year=?,description=?,sort_order=? WHERE id=?',
    [degree, institution, field_of_study, start_year, end_year, description, sort_order, req.params.id]
  );
  res.json({ success: true });
});

router.delete('/education/:id', auth, async (req, res) => {
  await db.execute('DELETE FROM education WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

// Services CRUD
router.post('/services', auth, async (req, res) => {
  const { title, description, icon, sort_order } = req.body;
  const [r] = await db.execute(
    'INSERT INTO services (title,description,icon,sort_order) VALUES (?,?,?,?)',
    [title, description, icon || '', sort_order || 0]
  );
  res.status(201).json({ success: true, id: r.insertId });
});

router.put('/services/:id', auth, async (req, res) => {
  const { title, description, icon, sort_order } = req.body;
  await db.execute(
    'UPDATE services SET title=?,description=?,icon=?,sort_order=? WHERE id=?',
    [title, description, icon, sort_order, req.params.id]
  );
  res.json({ success: true });
});

router.delete('/services/:id', auth, async (req, res) => {
  await db.execute('DELETE FROM services WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
