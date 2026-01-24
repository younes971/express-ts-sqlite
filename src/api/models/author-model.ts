import db from '../../database/db';
import { Author } from '../../types/LocalTypes';

const getAllAuthors = (): Author[] => {
  return db.prepare('SELECT * FROM authors').all() as Author[];
};

const getAuthor = (id: number): Author => {
  const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(id);
  if (!author) throw new Error('Author not found');
  return author as Author;
};

const createAuthor = (author: Omit<Author, 'id'>): Author => {
  const stmt = db
    .prepare('INSERT INTO authors (name, email) VALUES (?, ?)')
    .run(author.name, author.email);
  if (!stmt.lastInsertRowid) throw new Error('Failed to create author');
  return getAuthor(Number(stmt.lastInsertRowid));
};

const updateAuthor = (id: number, name: string, email: string): Author => {
  const stmt = db
    .prepare('UPDATE authors SET name = ?, email = ? WHERE id = ?')
    .run(name, email, id);
  if (stmt.changes === 0) throw new Error('Author not found or nothing to update');
  return getAuthor(id);
};

const deleteAuthor = (id: number): void => {
  const stmt = db
    .prepare('DELETE FROM authors WHERE id = ? AND NOT EXISTS (SELECT 1 FROM articles WHERE author_id = ?)')
    .run(id, id);

  if (stmt.changes === 0) throw new Error('Author not found or cannot delete because of articles');
};

export { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor };
