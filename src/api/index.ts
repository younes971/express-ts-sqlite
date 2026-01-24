import express, { Request, Response } from 'express';
import authorRoutes from './routes/author-routes';
import articleRoutes from './routes/articleRouter';

const router = express.Router();

// ✅ Root route to pass the integration test
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'media api v1' });
});

// API routes
router.use('/authors', authorRoutes);
router.use('/articles', articleRoutes);

export default router;
