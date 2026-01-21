import {Request, Response} from 'express';
import {Author} from '../../types/LocalTypes';
import {getAllAuthors} from '../models/author-model';

const authorsGet = (_req: Request, res: Response<Author[]>) => {
  console.log('✅ authorsGet CALLED');
  const authors = getAllAuthors();
  res.json(authors);
};

export {authorsGet};
