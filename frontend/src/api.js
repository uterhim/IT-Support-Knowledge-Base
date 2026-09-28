const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4200/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getArticles: (filters = {}) => {
    const qs = new URLSearchParams(filters).toString();
    return request(`/articles${qs ? `?${qs}` : ''}`);
  },
  getCategories: () => request('/articles/categories'),
  getArticle: (id) => request(`/articles/${id}`),
  createArticle: (data) => request('/articles', { method: 'POST', body: JSON.stringify(data) }),
  updateArticle: (id, data) => request(`/articles/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteArticle: (id) => request(`/articles/${id}`, { method: 'DELETE' }),
};
