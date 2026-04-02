import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ratioPadding } from './shared/media';

type AspectRatio = '1:1' | '3:4' | '2:3' | '9:16';
type MediaType = 'video' | 'image';
type PublishStatus = 'draft' | 'published';
interface MediaItem { id:string; title:string; description:string; mediaType:MediaType; src:string; poster?:string; ratio:AspectRatio; year:number; decade:string; events:string[]; people:string[]; parties:string[]; places:string[]; tags:string[]; status:PublishStatus; featured?:boolean; createdAt:string; updatedAt:string; }
import './styles.css';

const API = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8787/api';
const tagline = 'Freedom Was Not Free — telling the story of the South African liberation struggle';

type Tab = 'home' | 'browse' | 'timeline' | 'gallery' | 'admin';

const Card = ({ item }: { item: MediaItem }) => (
  <article className="card">
    <div className="ratio" style={{ paddingTop: ratioPadding[item.ratio] }}>
      {item.mediaType === 'video' ? <video controls preload="metadata" poster={item.poster} src={item.src} /> : <img src={item.src} alt={item.title} loading="lazy" />}
    </div>
    <h4>{item.title}</h4>
    <p>{item.year} · {item.events[0]} · {item.ratio}</p>
  </article>
);

function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [query, setQuery] = useState('');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [token, setToken] = useState('');
  const [form, setForm] = useState({ email: 'admin@vukastream.local', password: 'change-me' });

  useEffect(() => {
    fetch(`${API}/media`).then((r) => r.json()).then(setMedia);
    fetch(`${API}/taxonomy`).then((r) => r.json()).then((t) => setTimeline(t.timeline || []));
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => undefined);
  }, []);

  const filtered = useMemo(() => media.filter((m) => JSON.stringify(m).toLowerCase().includes(query.toLowerCase())), [media, query]);
  const featured = filtered.filter((m) => m.featured);
  const images = filtered.filter((m) => m.mediaType === 'image');

  const login = async () => {
    const res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    if (data.token) setToken(data.token);
  };

  return <div>
    <header className="topbar">
      <div className="brand"><img src="/assets/logo.svg" alt="logo" /><div><strong>VukaStream</strong><small>Publisher: SA Liberation Struggle Stories</small></div></div>
      <nav>{(['home','browse','timeline','gallery','admin'] as Tab[]).map((t) => <button key={t} onClick={() => setTab(t)}>{t}</button>)}</nav>
    </header>

    <section className="hero">
      <div>
        <h1>Amandla+ Archive Platform</h1>
        <p>{tagline}</p>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, people, places, events, year" />
      </div>
    </section>

    {tab === 'home' && <section><h2>Featured Collections</h2><div className="grid">{featured.map((m) => <Card key={m.id} item={m} />)}</div></section>}
    {tab === 'browse' && <section><h2>Continue Watching / Browse</h2><div className="grid">{filtered.map((m) => <Card key={m.id} item={m} />)}</div></section>}
    {tab === 'gallery' && <section><h2>Image Gallery</h2><div className="grid">{images.map((m) => <Card key={m.id} item={m} />)}</div></section>}
    {tab === 'timeline' && <section><h2>Timeline</h2><ul className="timeline">{timeline.map((e) => <li key={e.id}><b>{e.date}</b> <span>{e.title}</span><p>{e.summary}</p><a href={e.sourceUrl} target="_blank">Source</a></li>)}</ul></section>}

    {tab === 'admin' && <section className="admin">
      <h2>Admin CMS</h2>
      {!token ? <div className="admin-panel"><input value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} /><input type="password" value={form.password} onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))} /><button onClick={login}>Secure login</button></div> : <AdminDashboard token={token} />}
    </section>}
  </div>;
}

const AdminDashboard = ({ token }: { token: string }) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [draft, setDraft] = useState<Partial<MediaItem>>({ ratio: '9:16', mediaType: 'video', status: 'draft', title: '', description: '', src: '', year: 1990 });

  const load = () => fetch(`${API}/admin/media`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const save = async () => {
    await fetch(`${API}/admin/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...draft, decade: `${String(draft.year).slice(0, 3)}0s`, events: ['Mandela Released'], people: ['Nelson Mandela'], parties: ['ANC'], places: ['Cape Town'], tags: ['manual entry'] })
    });
    await load();
  };

  return <div className="admin-panel">
    <p>Draft/publish workflow enabled. Aspect ratio required for every upload.</p>
    <div className="row">
      <input placeholder="Title" onChange={(e) => setDraft((s) => ({ ...s, title: e.target.value }))} />
      <select onChange={(e) => setDraft((s) => ({ ...s, ratio: e.target.value as AspectRatio }))}>
        <option>1:1</option><option>3:4</option><option>2:3</option><option>9:16</option>
      </select>
      <select onChange={(e) => setDraft((s) => ({ ...s, mediaType: e.target.value as any }))}><option value="video">Video</option><option value="image">Image</option></select>
      <input placeholder="Media URL" onChange={(e) => setDraft((s) => ({ ...s, src: e.target.value }))} />
      <button onClick={save}>Save item</button>
    </div>
    <ul>{items.map((m) => <li key={m.id}>{m.title} ({m.status}) - {m.ratio}</li>)}</ul>
  </div>;
};

createRoot(document.getElementById('root')!).render(<App />);
