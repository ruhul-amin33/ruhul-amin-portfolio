// frontend/js/api.js — Central API helper

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://ruhul-amin-portfolio.onrender.com/api';

window.API_BASE = API_BASE;

// Token management
const token = {
  get: () => localStorage.getItem('ra_token'),
  set: (t) => localStorage.setItem('ra_token', t),
  remove: () => localStorage.removeItem('ra_token'),
};
window.token = token;

// Core fetch wrapper
async function api(method, path, body = null, requiresAuth = false) {
  const headers = { 'Content-Type': 'application/json' };
  if (requiresAuth && token.get()) {
    headers['Authorization'] = `Bearer ${token.get()}`;
  }
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, opts);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// Convenience methods
window.apiGet    = (p, auth) => api('GET', p, null, auth);
window.apiPost   = (p, b, auth) => api('POST', p, b, auth);
window.apiPut    = (p, b, auth) => api('PUT', p, b, auth);
window.apiDelete = (p, auth) => api('DELETE', p, null, auth);

// Toast notification
window.toast = function(msg, type = 'success') {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.style.cssText = `
      position:fixed; bottom:24px; right:24px; z-index:9999;
      padding:14px 22px; border-radius:10px; font-size:14px;
      font-weight:500; color:#fff; min-width:220px; text-align:center;
      box-shadow: 0 4px 20px rgba(0,0,0,.18); transition: opacity .3s;
    `;
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.background = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, 3000);
};