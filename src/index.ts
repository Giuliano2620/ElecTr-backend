import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes';
import productRouter from './routes/productsRoutes';
import { CategoryScalarFieldEnum } from './generated/prisma/internal/prismaNamespace';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();

const app = Express();

app.use(cors());
app.use(Express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use('/api/auth', authRouter);

app.use('/api/products', productRouter);

app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});