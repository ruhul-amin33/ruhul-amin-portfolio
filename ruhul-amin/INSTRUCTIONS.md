# 🚀 Ruhul Amin Portfolio — সম্পূর্ণ Setup গাইড
### VS Code থেকে শুরু করে Live Deploy পর্যন্ত — A to Z

---

## 📁 প্রজেক্ট স্ট্রাকচার

```
ruhul-amin/
├── backend/
│   ├── config/
│   │   ├── db.js              ← MySQL connection
│   │   └── initDB.js          ← Database & table তৈরি
│   ├── middleware/
│   │   └── auth.js            ← JWT authentication
│   ├── routes/
│   │   ├── auth.js            ← Login/Logout API
│   │   ├── posts.js           ← Blog posts API
│   │   ├── skills.js          ← Skills API
│   │   ├── portfolio.js       ← Portfolio API
│   │   ├── contact.js         ← Contact messages API
│   │   └── profile.js         ← Profile/Education/Services API
│   ├── server.js              ← Main Express server
│   ├── package.json
│   ├── .env.example           ← Environment variables template
│   └── .gitignore
├── frontend/
│   ├── index.html             ← Homepage (সব section)
│   ├── js/
│   │   └── api.js             ← API helper functions
│   ├── admin/
│   │   ├── login.html         ← Admin login page
│   │   └── dashboard.html     ← Admin dashboard
│   └── pages/
│       ├── contact.html       ← Contact page with form
│       ├── services.html      ← Services page
│       └── post.html          ← Single blog post page
└── INSTRUCTIONS.md            ← এই ফাইল
```

---

## ✅ STEP 1 — Software ইনস্টল করুন

নিচের software গুলো আপনার PC তে থাকতে হবে:

| Software | Download Link | কিসের জন্য |
|----------|--------------|------------|
| VS Code  | https://code.visualstudio.com | Code editor |
| Node.js (LTS) | https://nodejs.org | Backend run করতে |
| Git | https://git-scm.com | GitHub push এর জন্য |

**Node.js ইনস্টল হয়েছে কিনা চেক করুন:**
Terminal/PowerShell খুলে টাইপ করুন:
```bash
node --version
npm --version
```
যদি version number দেখায় (যেমন v20.x.x) তাহলে ইনস্টল সফল।

---

## ✅ STEP 2 — প্রজেক্ট VS Code এ খুলুন

1. ZIP ফাইলটি Extract করুন
2. VS Code খুলুন
3. `File → Open Folder` → extract করা `ruhul-amin` folder টি select করুন
4. VS Code এ Terminal খুলুন: `Ctrl + `` ` (backtick key)

---

## ✅ STEP 3 — Railway তে MySQL Database তৈরি করুন

### 3.1 — Railway Account তৈরি
1. **https://railway.app** এ যান
2. **"Login with GitHub"** দিয়ে sign up করুন

### 3.2 — নতুন Project তৈরি
1. Dashboard এ **"New Project"** বাটনে ক্লিক করুন
2. **"Deploy MySQL"** বা **"Provision MySQL"** বাটন দেখতে পাবেন — সেটিতে ক্লিক করুন

   > **নতুন Railway interface এ:**
   > - "New Project" → "Database" → "Add MySQL" select করুন
   > - অথবা "New Project" → Empty Project → তারপর "+ Add Service" → "Database" → "MySQL"

3. কয়েক সেকেন্ড পরে MySQL service তৈরি হয়ে যাবে

### 3.3 — Database Credentials সংগ্রহ করুন
1. MySQL service এ ক্লিক করুন
2. **"Variables"** ট্যাবে যান
3. নিচের values গুলো note করুন:
   ```
   MYSQLHOST     → আপনার DB_HOST
   MYSQLPORT     → আপনার DB_PORT (সাধারণত 3306)
   MYSQLUSER     → আপনার DB_USER (সাধারণত root)
   MYSQLPASSWORD → আপনার DB_PASSWORD
   MYSQLDATABASE → আপনার DB_NAME (সাধারণত railway)
   ```

---

## ✅ STEP 4 — .env ফাইল তৈরি করুন

VS Code এ `backend` ফোল্ডারে গিয়ে `.env.example` ফাইলটি **copy** করে নতুন ফাইল তৈরি করুন নাম দিন `.env`

```bash
# Terminal এ এই command দিন:
cd backend
cp .env.example .env
```

এখন `.env` ফাইলটি খুলুন এবং Railway থেকে পাওয়া values দিয়ে fill করুন:

```env
PORT=5000
NODE_ENV=development

DB_HOST=containers-us-west-xxx.railway.app    ← Railway থেকে কপি করুন
DB_PORT=3306
DB_USER=root
DB_PASSWORD=আপনার_password_এখানে           ← Railway থেকে কপি করুন
DB_NAME=railway

JWT_SECRET=RuhulAmin2024SuperSecretKey@#$xyz123456789

FRONTEND_URL=http://localhost:5500

ADMIN_EMAIL=ruhul@youremail.com              ← আপনার email দিন
ADMIN_PASSWORD=Admin@123456                  ← strong password দিন
```

> ⚠️ **গুরুত্বপূর্ণ:** `.env` ফাইল কখনো GitHub এ push করবেন না!

---

## ✅ STEP 5 — Backend Dependencies ইনস্টল করুন

VS Code Terminal এ:
```bash
cd backend
npm install
```

এটি সব প্যাকেজ ডাউনলোড করবে (কিছুটা সময় লাগতে পারে)।

---

## ✅ STEP 6 — Database Initialize করুন (Tables তৈরি)

```bash
# backend ফোল্ডারে থাকুন
node config/initDB.js
```

সফল হলে দেখাবে:
```
✅ MySQL connected successfully
📦 Creating tables...
✅ All tables created successfully!
👤 Admin login: ruhul@youremail.com
```

এই command টি:
- সব tables তৈরি করে (posts, skills, portfolio, contacts, users, profile, education, services)
- Admin account তৈরি করে
- Sample skills ও education data add করে

---

## ✅ STEP 7 — Backend Server চালু করুন

```bash
# backend ফোল্ডারে:
npm run dev
```

দেখাবে:
```
🚀 Server running on http://localhost:5000
📊 Environment: development
✅ MySQL connected successfully
```

**Server চালু আছে কিনা test করুন:**
Browser এ যান: `http://localhost:5000/api/health`
দেখাবে: `{"success":true,"message":"Server running ✅"}`

---

## ✅ STEP 8 — Frontend চালু করুন (Local)

### Option A: VS Code Live Server (সবচেয়ে সহজ)
1. VS Code এ **Extensions** (Ctrl+Shift+X) এ যান
2. **"Live Server"** by Ritwick Dey সার্চ করে ইনস্টল করুন
3. `frontend/index.html` ফাইলটি খুলুন
4. নিচে **"Go Live"** বাটনে ক্লিক করুন
5. Browser এ `http://127.0.0.1:5500` খুলবে

### Option B: Terminal দিয়ে
```bash
cd frontend
npx serve .
```

---

## ✅ STEP 9 — api.js তে URL সেট করুন (Local test এর জন্য)

`frontend/js/api.js` ফাইলে এই line টি ঠিক আছে কিনা দেখুন:
```javascript
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'    ← এটি local এর জন্য
  :  'https://ruhul-amin-portfolio.onrender.com/api'; // ← Deploy এর পরে update করুন
```

---

## ✅ STEP 10 — Admin Panel Test করুন

1. Browser এ যান: `http://127.0.0.1:5500/admin/login.html`
2. Email: `.env` এ যে email দিয়েছেন
3. Password: `.env` এ যে password দিয়েছেন
4. Login করুন → Dashboard দেখতে পাবেন
5. Posts, Skills, Portfolio, Profile সব manage করুন

---

## 🌐 STEP 11 — GitHub এ Code Push করুন

### 11.1 — GitHub Account তৈরি (না থাকলে)
https://github.com/signup এ যান

### 11.2 — নতুন Repository তৈরি
1. GitHub এ **"New repository"** বাটনে ক্লিক করুন
2. Repository name: `ruhul-amin-portfolio`
3. **Public** রাখুন
4. **"Create repository"** ক্লিক করুন

### 11.3 — VS Code Terminal এ Git Setup করুন
```bash
# রুট ফোল্ডারে যান (ruhul-amin/)
cd ..

# Git initialize
git init

# সব ফাইল add করুন
git add .

# First commit
git commit -m "Initial commit: Ruhul Amin Portfolio"

# GitHub এর সাথে connect করুন (আপনার username দিন)
git remote add origin https://github.com/YOUR_USERNAME/ruhul-amin-portfolio.git

# Push করুন
git branch -M main
git push -u origin main
```

> GitHub username ও password চাইলে: GitHub → Settings → Developer settings → Personal access tokens → Generate new token → সেটি password হিসেবে দিন।

---

## 🚀 STEP 12 — Render এ Backend Deploy করুন

### 12.1 — Render Account তৈরি
https://render.com এ GitHub দিয়ে signup করুন

### 12.2 — New Web Service তৈরি
1. Dashboard এ **"New +"** → **"Web Service"**
2. **"Connect a repository"** → আপনার `ruhul-amin-portfolio` repo select করুন
3. নিচের settings দিন:

   | Setting | Value |
   |---------|-------|
   | Name | ruhul-amin-backend |
   | Root Directory | backend |
   | Runtime | Node |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Plan | Free |

4. **"Advanced"** এ ক্লিক করুন → **"Add Environment Variable"**

### 12.3 — Environment Variables Render এ add করুন
একে একে এই variables গুলো add করুন:

```
DB_HOST        = [Railway এর MYSQLHOST]
DB_PORT        = 3306
DB_USER        = root
DB_PASSWORD    = [Railway এর MYSQLPASSWORD]
DB_NAME        = railway
JWT_SECRET     = RuhulAmin2024SuperSecretKey@#$xyz123456789
NODE_ENV       = production
FRONTEND_URL   = *
ADMIN_EMAIL    = [আপনার email]
ADMIN_PASSWORD = [আপনার password]
```

5. **"Create Web Service"** ক্লিক করুন
6. Deploy হতে ৩-৫ মিনিট লাগবে
7. Deploy হলে একটি URL পাবেন, যেমন: `https://ruhul-amin-backend.onrender.com`

### 12.4 — Database Initialize করুন Render এ
Render Dashboard → আপনার service → **"Shell"** ট্যাব → টাইপ করুন:
```bash
node config/initDB.js
```

---

## ✅ STEP 13 — Frontend URL Update করুন

`frontend/js/api.js` এ এই line update করুন:
```javascript
: 'https://ruhul-amin-backend.onrender.com/api'; // ← আপনার Render URL দিন
```

তারপর আবার GitHub এ push করুন:
```bash
git add .
git commit -m "Update API URL to production"
git push
```

---

## 🌐 STEP 14 — Frontend Deploy (GitHub Pages)

### Option A: GitHub Pages (Free — সহজ)
1. GitHub এ আপনার repo তে যান
2. **Settings** → **Pages**
3. Source: **"Deploy from a branch"**
4. Branch: **main**, Folder: **/ (root)**
5. **Save** করুন
6. কিছুক্ষণ পরে URL পাবেন: `https://YOUR_USERNAME.github.io/ruhul-amin-portfolio/frontend/`

### Option B: Netlify (আরো ভালো)
1. https://netlify.com এ GitHub দিয়ে login করুন
2. **"Add new site"** → **"Import an existing project"**
3. GitHub repo select করুন
4. Publish directory: `frontend`
5. Deploy করুন → একটি `.netlify.app` URL পাবেন

---

## 🔧 Common সমস্যা ও সমাধান

### সমস্যা: "Cannot connect to database"
**সমাধান:**
- Railway এর MYSQLHOST সঠিক কিনা চেক করুন
- `.env` ফাইলে কোনো space আছে কিনা দেখুন
- Railway তে MySQL service চালু আছে কিনা দেখুন

### সমস্যা: "Invalid credentials" login এ
**সমাধান:**
- `node config/initDB.js` আবার run করুন
- `.env` এ ADMIN_EMAIL ও ADMIN_PASSWORD ঠিক আছে কিনা দেখুন

### সমস্যা: Frontend এ data আসছে না
**সমাধান:**
- Backend server চালু আছে কিনা দেখুন
- `api.js` এ API_BASE URL সঠিক কিনা দেখুন
- Browser Console (F12) এ error message দেখুন

### সমস্যা: Render deploy fail
**সমাধান:**
- Render logs দেখুন (Dashboard → Logs tab)
- সব Environment Variables ঠিকমতো দেওয়া আছে কিনা চেক করুন
- Root directory `backend` দেওয়া আছে কিনা দেখুন

---

## 📱 ব্যবহারের নির্দেশনা

### নতুন Blog Post লিখতে:
1. `/admin/login.html` → Login করুন
2. **Posts** → **"+ New Post"**
3. Title, Content, Tags দিন → Save

### নতুন Skill যোগ করতে:
1. Dashboard → **Skills** → **"+ Add Skill"**
2. Skill name, Category (Frontend/EEE/Backend), Level (0-100) দিন

### নতুন Project যোগ করতে:
1. Dashboard → **Portfolio** → **"+ Add Project"**
2. Title, Description, Live URL, GitHub URL, Tech Stack দিন

### Profile update করতে:
1. Dashboard → **Profile**
2. Name, Bio, Email, Phone, Location, GitHub URL update করুন

---

## 🔐 Security Notes

- `.env` ফাইল কখনো GitHub এ push করবেন না
- Admin password শক্তিশালী রাখুন (uppercase + lowercase + number + symbol)
- JWT_SECRET লম্বা এবং random রাখুন
- Production এ NODE_ENV=production রাখুন

---

## 📞 Quick Reference

| কাজ | Command |
|-----|---------|
| Backend start | `cd backend && npm run dev` |
| DB initialize | `cd backend && node config/initDB.js` |
| Dependencies install | `cd backend && npm install` |
| GitHub push | `git add . && git commit -m "msg" && git push` |

**Local URLs:**
- Website: `http://127.0.0.1:5500/index.html`
- Admin: `http://127.0.0.1:5500/admin/login.html`
- API: `http://localhost:5000/api/health`

---

*Made with ❤️ for Ruhul Amin Portfolio Project*
