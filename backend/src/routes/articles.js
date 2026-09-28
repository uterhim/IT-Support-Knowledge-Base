const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/articles — list, with optional category filter and full-text search
router.get('/', async (req, res) => {
  try {
    const { category, search, tag } = req.query;
    const conditions = [];
    const values = [];

    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }
    if (tag) {
      values.push(tag);
      conditions.push(`$${values.length} = ANY(tags)`);
    }
    if (search) {
      values.push(search);
      conditions.push(`to_tsvector('english', title || ' ' || content) @@ plainto_tsquery('english', $${values.length})`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const { rows } = await pool.query(
      `SELECT id, title, category, tags, views, created_at, updated_at
       FROM articles ${where} ORDER BY updated_at DESC`,
      values
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// GET /api/articles/categories — distinct category list, for building nav/filters
router.get('/categories', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT category, COUNT(*)::int AS count FROM articles GROUP BY category ORDER BY category`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/articles/:id — full content, increments view count
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `UPDATE articles SET views = views + 1 WHERE id = $1 RETURNING *`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Article not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// POST /api/articles
router.post('/', async (req, res) => {
  try {
    const { title, category, tags, content } = req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ error: 'title, category, and content are required' });
    }
    const { rows } = await pool.query(
      `INSERT INTO articles (title, category, tags, content) VALUES ($1, $2, COALESCE($3::text[], '{}'::text[]), $4) RETURNING *`,
      [title, category, tags, content]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// PATCH /api/articles/:id
router.patch('/:id', async (req, res) => {
  try {
    const { title, category, tags, content } = req.body;
    const { rows } = await pool.query(
      `UPDATE articles
       SET title = COALESCE($1, title),
           category = COALESCE($2, category),
           tags = COALESCE($3, tags),
           content = COALESCE($4, content)
       WHERE id = $5
       RETURNING *`,
      [title, category, tags, content, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Article not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// DELETE /api/articles/:id
router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM articles WHERE id = $1', [req.params.id]);
    if (!rowCount) return res.status(404).json({ error: 'Article not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

module.exports = router;
