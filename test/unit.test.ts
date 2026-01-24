import db from '../src/database/db';
import {
  getArticle,
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle
} from '../src/api/models/articleModel';

import {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from '../src/api/models/author-model';

beforeEach(() => {
  // Clear all data before each test to avoid UNIQUE constraint errors
  db.prepare('DELETE FROM articles').run();
  db.prepare('DELETE FROM authors').run();
});


describe('Article functions', () => {
  let authorId: number;
  let articleId: number;

  beforeAll(() => {
    // Create a test author
    const author = createAuthor({ name: 'Test Author', email: 'test@example.com' });
    authorId = author.id;
  });

  it('createArticle should return the article', () => {
    const article = createArticle({
      title: 'Test Article',
      description: 'This is the content of article 1',
      author_id: authorId
    });
    articleId = article.id;

    expect(article).toEqual({
      id: article.id,
      title: 'Test Article',
      description: 'This is the content of article 1',
      author_id: authorId,
      author: {
        id: authorId,
        name: 'Test Author',
        email: 'test@example.com'
      }
    });
  });

  it('getArticle should return the article', () => {
    const foundArticle = getArticle(articleId);
    expect(foundArticle).toEqual({
      id: articleId,
      title: 'Test Article',
      description: 'This is the content of article 1',
      author_id: authorId,
      author: {
        id: authorId,
        name: 'Test Author',
        email: 'test@example.com'
      }
    });
  });

  it('updateArticle should update the article', () => {
    const updated = updateArticle(
      articleId,
      'Updated Article',
      'Updated description',
      authorId
    );
    expect(updated.title).toBe('Updated Article');
    expect(updated.description).toBe('Updated description');
  });

  it('getAllArticles should return an array', () => {
    const all = getAllArticles();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
  });

  it('deleteArticle should delete the article', () => {
    deleteArticle(articleId, authorId);
    expect(() => getArticle(articleId)).toThrow('Article not found');
  });
});

describe('Author functions', () => {
  let authorId: number;

  it('createAuthor should return the author', () => {
    const author = createAuthor({ name: 'New Author', email: 'new@example.com' });
    authorId = author.id;
    expect(author).toEqual({
      id: authorId,
      name: 'New Author',
      email: 'new@example.com'
    });
  });

  it('getAllAuthors should return array', () => {
    const all = getAllAuthors();
    expect(Array.isArray(all)).toBe(true);
  });

  it('updateAuthor should update author', () => {
    const updated = updateAuthor(authorId, 'Updated Author', 'updated@example.com');
    expect(updated.name).toBe('Updated Author');
    expect(updated.email).toBe('updated@example.com');
  });

  it('deleteAuthor should delete author without articles', () => {
    // Ensure no articles are linked to this author before deleting
    deleteAuthor(authorId);
    const authors = getAllAuthors();
    expect(authors.find(a => a.id === authorId)).toBeUndefined();
  });
});
