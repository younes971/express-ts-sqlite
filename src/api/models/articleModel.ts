import db from '../../database/db';
import { Article, Author } from '../../types/LocalTypes';

type ArticleWithAuthor = Article & { author: Author };

// Get all articles with author info
const getAllArticles = (): ArticleWithAuthor[] => {
  const rows = db.prepare(`
    SELECT a.id, a.title, a.description, a.author_id,
           au.id as author_id, au.name as author_name, au.email as author_email
    FROM articles a
    JOIN authors au ON a.author_id = au.id
  `).all() as {
    id: number;
    title: string;
    description: string;
    author_id: number;
    author_name: string;
    author_email: string;
  }[];

  return rows.map(row => ({
    id: row.id,
    title: row.title,
    description: row.description,
    author_id: row.author_id,
    author: {
      id: row.author_id,
      name: row.author_name,
      email: row.author_email
    }
  }));
};

// Get single article by id with author info
const getArticle = (id: number | bigint): ArticleWithAuthor => {
  const row = db.prepare(`
    SELECT a.id, a.title, a.description, a.author_id,
           au.id as author_id, au.name as author_name, au.email as author_email
    FROM articles a
    JOIN authors au ON a.author_id = au.id
    WHERE a.id = ?
  `).get(id) as {
    id: number;
    title: string;
    description: string;
    author_id: number;
    author_name: string;
    author_email: string;
  } | undefined;

  if (!row) throw new Error('Article not found');

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    author_id: row.author_id,
    author: {
      id: row.author_id,
      name: row.author_name,
      email: row.author_email
    }
  };
};

// Create a new article with author_id
const createArticle = (article: Omit<Article, 'id'>): ArticleWithAuthor => {
  const stmt = db.prepare(`
    INSERT INTO articles (title, description, author_id)
    VALUES (?, ?, ?)
  `).run(article.title, article.description, article.author_id);

  return getArticle(stmt.lastInsertRowid);
};

// Update an article by id and author_id
const updateArticle = (
  id: number | bigint,
  title: string,
  description: string,
  author_id: number
): ArticleWithAuthor => {
  const stmt = db.prepare(`
    UPDATE articles
    SET title = ?, description = ?
    WHERE id = ? AND author_id = ?
  `).run(title, description, id, author_id);

  if (stmt.changes === 0) throw new Error('Failed to update article');

  return getArticle(id);
};

// Delete an article by id and author_id
const deleteArticle = (id: number | bigint, author_id: number): void => {
  const stmt = db.prepare(`
    DELETE FROM articles
    WHERE id = ? AND author_id = ?
  `).run(id, author_id);

  if (stmt.changes === 0) throw new Error('Article not found');
};

export {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
};
