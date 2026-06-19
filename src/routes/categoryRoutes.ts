import * as express from 'express';
import { getCategories, createCategory } from '../controllers/categoryControllers';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = express.Router();

router.get('/', getCategories);

router.post('/', authMiddleware, createCategory);

export default router;