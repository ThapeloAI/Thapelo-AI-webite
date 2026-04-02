import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { media, starterCategories, timeline } from './data/seed.mjs';

const PORT = Number(process.env.PORT || 8787);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@vukastream.local';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-me';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'dev-admin-token';

const db = { media: [...media], timeline: [...timeline], categories: [...starterCategories], auditLogs: [] };

const json = (res, code, data) => {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type, authorization', 'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS' });
  res.end(JSON.stringify(data));
};

const parseBody = (req) => new Promise((resolve) => {
  let body = '';
  req.on('data', (c) => body += c);
  req.on('end', () => resolve(body ? JSON.parse(body) : {}));
});

const auth = (req) => req.headers.authorization === `Bearer ${ADMIN_TOKEN}`;

createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, 200, {});
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/api/health') return json(res, 200, { ok: true });
  if (url.pathname === '/api/auth/login' && req.method === 'POST') {
    const body = await parseBody(req);
    return body.email === ADMIN_EMAIL && body.password === ADMIN_PASSWORD ? json(res, 200, { token: ADMIN_TOKEN }) : json(res, 401, { error: 'Invalid credentials' });
  }
  if (url.pathname === '/api/media') {
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const items = db.media.filter((m) => m.status === 'published' && JSON.stringify(m).toLowerCase().includes(q));
    return json(res, 200, items);
  }
  if (url.pathname === '/api/taxonomy') return json(res, 200, { timeline: db.timeline, categories: db.categories });
  if (url.pathname === '/api/admin/media' && req.method === 'GET') return auth(req) ? json(res, 200, db.media) : json(res, 401, { error: 'Unauthorized' });
  if (url.pathname === '/api/admin/media' && req.method === 'POST') {
    if (!auth(req)) return json(res, 401, { error: 'Unauthorized' });
    const body = await parseBody(req);
    const now = new Date().toISOString();
    const record = { ...body, id: body.id || randomUUID(), createdAt: body.createdAt || now, updatedAt: now };
    db.media.unshift(record);
    db.auditLogs.unshift({ id: randomUUID(), action: 'create', entityId: record.id, timestamp: now });
    return json(res, 201, record);
  }

  json(res, 404, { error: 'Not found' });
}).listen(PORT, () => console.log(`API: http://localhost:${PORT}/api`));
