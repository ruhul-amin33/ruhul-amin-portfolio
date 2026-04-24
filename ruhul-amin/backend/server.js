require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.set('trust proxy', 1);

app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',      require('./routes/auth'));
app.use('/api/posts',     require('./routes/posts'));
app.use('/api/skills',    require('./routes/skills'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/contact',   require('./routes/contact'));
app.use('/api/profile',   require('./routes/profile'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Ruhul Amin API running ✅', time: new Date() });
});

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: 'Server error.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;