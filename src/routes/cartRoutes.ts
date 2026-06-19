import * as express from 'express';
import { getCart, addCart } from '../controllers/cartControllers';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = express.Router();

router.get('/', authMiddleware, getCart);

router.post('/', authMiddleware, addCart);

export default router;