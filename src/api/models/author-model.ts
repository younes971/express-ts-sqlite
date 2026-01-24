import db from '../../database/db';
import { Author } from '../../types/LocalTypes';

// Get all authors
const getAllAuthors = (): Author[] => {
  const rows = db.prepare('SELECT * FROM authors').all();
  return rows as Author[];
};

// Get author by ID
const getAuthor = (id: number): Author => {
  const row = db.prepare('SELECT * FROM authors WHERE id = ?').get(id) as Author;
  if (!row) {
    throw new Error('Author not found');
  }
  return row;
};

// Create new author
const createAuthor = (author: Omit<Author, 'id'>): Author => {
  const stmt = db
    .prepare('INSERT INTO authors (name, email) VALUES (?, ?)')
    .run(author.name, author.email);

  return getAuthor(Number(stmt.lastInsertRowid));
};

// Update existing author
const updateAuthor = (id: number, name: string, email: string): Author => {
  const stmt = db
    .prepare('UPDATE authors SET name = ?, email = ? WHERE id = ?')
    .run(name, email, id);

  if (stmt.changes === 0) {
    throw new Error('Author not found or nothing to update');
  }

  return getAuthor(id);
};

// Delete author
const deleteAuthor = (id: number): void => {
  const stmt = db.prepare('DELETE FROM authors WHERE id = ?').run(id);

  if (stmt.changes === 0) {
    throw new Error('Author not found or cannot delete because of articles');
  }
};

export { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor };
