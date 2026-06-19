import * as express from 'express';
import { getProducts, getProductsById, createProduct, updateProduct, deleteProduct } from '../controllers/productsControllers';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductsById);

router.post('/', authMiddleware, createProduct);

router.put('/:id', authMiddleware, updateProduct);

router.delete('/:id', authMiddleware, deleteProduct);

export default router;