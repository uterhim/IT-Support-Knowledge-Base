-- IT Support Knowledge Base — database schema (PostgreSQL)

DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    category    VARCHAR(100) NOT NULL,
    tags        TEXT[] NOT NULL DEFAULT '{}',
    content     TEXT NOT NULL,
    views       INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_tags ON articles USING GIN(tags);
-- Full-text search index across title + content
CREATE INDEX idx_articles_search ON articles USING GIN(to_tsvector('english', title || ' ' || content));

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
