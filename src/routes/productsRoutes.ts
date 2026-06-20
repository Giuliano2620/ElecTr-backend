import * as express from 'express';
import { getProducts, getProductsById, createProduct, updateProduct, deleteProduct } from '../controllers/productsControllers';
import { authMiddleware } from '../middlewares/authMiddlewares';
import upload from '../lib/upload';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductsById);

router.post('/', authMiddleware, createProduct);

router.put('/:id', authMiddleware, updateProduct);

router.delete('/:id', authMiddleware, deleteProduct);

router.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file?.path });
});

export default router;