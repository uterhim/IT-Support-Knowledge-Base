import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { api } from '../api';

export default function ArticleView({ articleId, onBack }) {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getArticle(articleId).then(setArticle).catch((e) => setError(e.message));
  }, [articleId]);

  if (error) return <div className="error-banner">{error}</div>;
  if (!article) return <p>Loading…</p>;

  return (
    <div className="layout">
      <div className="main" style={{ width: '100%' }}>
        <button className="back-link" onClick={onBack}>← Back to all articles</button>
        <div className="article-view">
          <div className="meta" style={{ marginBottom: 8 }}>{article.category} · {article.views} views</div>
          <h1>{article.title}</h1>
          <div style={{ marginBottom: 16 }}>
            {(article.tags || []).map((t) => <span className="tag" key={t}>{t}</span>)}
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: marked.parse(article.content) }} />
        </div>
      </div>
    </div>
  );
}
