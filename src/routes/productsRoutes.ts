import * as express from 'express';
import { getProducts, getProductsById, createProduct, updateProduct, deleteProduct } from '../controllers/productsControllers';
import { authMiddleware } from '../middlewares/authMiddlewares';
import upload from '../lib/upload';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductsById);

router.post('/', authMiddleware, adminMiddleware, createProduct);

router.put('/:id', authMiddleware, adminMiddleware, updateProduct)

router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

router.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file?.path });
});

export default router;