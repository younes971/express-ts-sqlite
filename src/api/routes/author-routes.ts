import express from 'express';
import {authorsGet} from '../controllers/authorcontroller';

const router = express.Router();

router.get('/', authorsGet);

export default router;
