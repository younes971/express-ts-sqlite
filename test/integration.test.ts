import request from 'supertest';
import app from '../src/app';

describe('GET /api/v1', () => {
  it('should return 200 OK', async () => {
    await request(app)
      .get('/api/v1') // ✅ updated URL
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

describe('GET /api/v1/articles', () => {
  it('should return 200 OK', async () => {
    await request(app)
      .get('/api/v1/articles')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

describe('GET /api/v1/authors', () => {
  it('should return 200 OK', async () => {
    await request(app)
      .get('/api/v1/authors')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});
