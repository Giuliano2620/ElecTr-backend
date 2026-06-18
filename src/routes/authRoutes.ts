import * as express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.post ('/register', register);

router.post('/login', (req, res, next) => {
  console.log('ruta login llamada');
  next();
}, login);

export default router;  