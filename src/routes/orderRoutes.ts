import * as express from 'express';
import { createOrder, getOrder } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = express.Router();

router.post('/', authMiddleware, createOrder);

router.get('/', authMiddleware, getOrder);

export default router;