import { Request, Response, NextFunction } from 'express';
import { Author } from '../../types/LocalTypes';
import { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } from '../models/author-model';
import CustomError from '../../classes/CustomError';

// GET /authors
const authorsGet = (_req: Request, res: Response<Author[]>) => {
  const authors = getAllAuthors();
  res.json(authors);
};

// GET /authors/:id
const authorGet = (req: Request<{ id: string }>, res: Response<Author>, next: NextFunction) => {
  try {
    const author = getAuthor(Number(req.params.id));
    res.json(author);
  } catch (error) {
    next(new CustomError((error as Error).message, 404));
  }
};

// POST /authors
const authorPost = (req: Request<unknown, unknown, Omit<Author, 'id'>>, res: Response<Author>, next: NextFunction) => {
  try {
    const author = createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// PUT /authors/:id
const authorPut = (req: Request<{ id: string }, unknown, Omit<Author, 'id'>>, res: Response<Author>, next: NextFunction) => {
  try {
    const author = updateAuthor(Number(req.params.id), req.body.name, req.body.email);
    res.json(author);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// DELETE /authors/:id
const authorDelete = (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    deleteAuthor(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export { authorsGet, authorGet, authorPost, authorPut, authorDelete };
