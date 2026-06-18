import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes';

dotenv.config();

const app = Express();

app.use(cors());
app.use(Express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});