import { NextFunction, Request, Response } from 'express';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  updateArticle,
} from '../models/articleModel';
import CustomError from '../../classes/CustomError';

// GET all articles
const articlesGet = (req: Request, res: Response) => {
  const articles = getAllArticles();
  res.json(articles);
};

// GET one article
const articleGet = (req: Request<{ id: string }>, res: Response) => {
  try {
    const article = getArticle(Number(req.params.id));
    res.json(article);
  } catch (error) {
    throw new CustomError((error as Error).message, 404);
  }
};

// POST article
const articlePost = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const article = createArticle(req.body);
    res.status(201).json(article);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// PUT article
const articlePut = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const article = updateArticle(
      Number(req.params.id),
      req.body.title,
      req.body.description,
      req.body.author_id
    );
    res.json(article);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// DELETE article
const articleDelete = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    deleteArticle(
      Number(req.params.id),
      req.body.author_id
    );
    res.status(204).end();
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {
  articlesGet,
  articleGet,
  articlePost,
  articlePut,
  articleDelete
};
