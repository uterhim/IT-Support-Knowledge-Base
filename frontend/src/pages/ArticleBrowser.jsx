import { useEffect, useState } from 'react';
import { api } from '../api';

export default function ArticleBrowser({ onSelect }) {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.getCategories().then(setCategories).catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    const filters = {};
    if (activeCategory) filters.category = activeCategory;
    if (search) filters.search = search;
    api.getArticles(filters).then(setArticles).catch((e) => setError(e.message));
  }, [activeCategory, search]);

  return (
    <div className="layout">
      <div className="sidebar">
        <h3>Categories</h3>
        <ul>
          <li className={!activeCategory ? 'active' : ''} onClick={() => setActiveCategory('')}>
            All articles
          </li>
          {categories.map((c) => (
            <li key={c.category} className={activeCategory === c.category ? 'active' : ''} onClick={() => setActiveCategory(c.category)}>
              <span>{c.category}</span><span>{c.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="main">
        {error && <div className="error-banner">{error}</div>}
        <div className="search-bar">
          <input placeholder="Search articles…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="article-list">
          {articles.map((a) => (
            <div className="article-card" key={a.id} onClick={() => onSelect(a.id)}>
              <h4>{a.title}</h4>
              <div className="meta">
                {a.category} · {a.views} views · updated {new Date(a.updated_at).toLocaleDateString()}
              </div>
              <div style={{ marginTop: 6 }}>
                {(a.tags || []).map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
          {!articles.length && <p style={{ color: '#999' }}>No articles match your search.</p>}
        </div>
      </div>
    </div>
  );
}
