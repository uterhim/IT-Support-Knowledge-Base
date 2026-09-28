import { useState } from 'react';
import { api } from '../api';

const initial = { title: '', category: 'General', tags: '', content: '' };

export default function NewArticle({ onCreated, onCancel }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState('');

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean);
      const article = await api.createArticle({ ...form, tags });
      onCreated(article.id);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="layout">
      <div className="main article-view">
        <h2>New Article</h2>
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={submit}>
          <label>Title</label>
          <input required value={form.title} onChange={set('title')} />

          <label>Category</label>
          <select value={form.category} onChange={set('category')}>
            {['General', 'Account Access', 'Software', 'Hardware', 'Network', 'Onboarding'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <label>Tags (comma-separated)</label>
          <input value={form.tags} onChange={set('tags')} placeholder="e.g. vpn, remote-access" />

          <label>Content (Markdown supported)</label>
          <textarea required rows="12" value={form.content} onChange={set('content')} />

          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button className="btn" type="submit">Publish article</button>
            <button type="button" className="btn" style={{ background: '#999' }} onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
