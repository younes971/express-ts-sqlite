import express from 'express';
import authorRoutes from './routes/author-routes';
import articleRoutes from './routes/articleRouter';

const router = express.Router();

router.use('/authors', authorRoutes);
router.use('/articles', articleRoutes);

export default router;
