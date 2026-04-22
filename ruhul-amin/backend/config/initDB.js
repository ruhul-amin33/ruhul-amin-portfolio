require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function initDB() {
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT || 3306,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });

  console.log('📦 Creating tables...');

  await conn.execute(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, role ENUM('admin') DEFAULT 'admin', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);

  await conn.execute(`CREATE TABLE IF NOT EXISTS posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL, content LONGTEXT NOT NULL, excerpt TEXT, thumbnail VARCHAR(500), tags VARCHAR(500), status ENUM('draft','published') DEFAULT 'published', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`);

  await conn.execute(`CREATE TABLE IF NOT EXISTS skills (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, category VARCHAR(100), level INT DEFAULT 80, icon VARCHAR(50), sort_order INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);

  await conn.execute(`CREATE TABLE IF NOT EXISTS portfolio (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, thumbnail VARCHAR(500), live_url VARCHAR(500), github_url VARCHAR(500), tech_stack VARCHAR(500), category VARCHAR(100), featured BOOLEAN DEFAULT false, sort_order INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);

  await conn.execute(`CREATE TABLE IF NOT EXISTS contacts (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, subject VARCHAR(255), message TEXT NOT NULL, is_read BOOLEAN DEFAULT false, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);

  await conn.execute(`CREATE TABLE IF NOT EXISTS profile (id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(100) DEFAULT 'Ruhul Amin', title VARCHAR(200), bio TEXT, email VARCHAR(100), phone VARCHAR(30), location VARCHAR(100), github_url VARCHAR(500), linkedin_url VARCHAR(500), resume_url VARCHAR(500), avatar VARCHAR(500), updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`);

  await conn.execute(`CREATE TABLE IF NOT EXISTS education (id INT AUTO_INCREMENT PRIMARY KEY, degree VARCHAR(255) NOT NULL, institution VARCHAR(255) NOT NULL, field_of_study VARCHAR(255), start_year INT, end_year INT, description TEXT, sort_order INT DEFAULT 0)`);

  await conn.execute(`CREATE TABLE IF NOT EXISTS services (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(200) NOT NULL, description TEXT, icon VARCHAR(50), sort_order INT DEFAULT 0)`);

  const adminEmail    = process.env.ADMIN_EMAIL    || 'ruhul@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
  const hash = await bcrypt.hash(adminPassword, 12);

  await conn.execute(
    `INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, 'admin')`,
    ['Ruhul Amin', adminEmail, hash]
  );

  await conn.execute(
    `INSERT IGNORE INTO profile (id, full_name, title, bio, email) VALUES (1, 'Ruhul Amin', 'EEE Engineer & Web Developer', 'আমি Ruhul Amin।', ?)`,
    [adminEmail]
  );

  const skills = [
    ['HTML5','Frontend',95], ['CSS3 / Tailwind','Frontend',90],
    ['JavaScript','Frontend',80], ['Node.js','Backend',75],
    ['MySQL','Backend',70], ['Circuit Design','EEE',85],
    ['MATLAB','EEE',70], ['PLC Programming','EEE',65],
  ];
  for (const [name, cat, level] of skills) {
    await conn.execute(`INSERT IGNORE INTO skills (name, category, level) VALUES (?, ?, ?)`, [name, cat, level]);
  }

  await conn.execute(`INSERT IGNORE INTO education (id, degree, institution, field_of_study, start_year, end_year) VALUES (1, 'B.Sc. Engineering', 'Your University', 'EEE', 2020, 2024), (2, 'HSC', 'Your College', 'Science', 2017, 2019)`);

  console.log('✅ All tables created!');
  console.log('👤 Admin Email   :', adminEmail);
  console.log('🔑 Admin Password:', adminPassword);
  console.log('🌐 Now run: npm run dev');

  await conn.end();
}

initDB().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });