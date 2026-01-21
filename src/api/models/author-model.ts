import db from '../../database/db';
import {Author} from '../../types/LocalTypes';

const getAllAuthors = (): Author[] => {
  const stmt = db.prepare('SELECT * FROM authors');
  return stmt.all() as Author[];
};

export {getAllAuthors};
