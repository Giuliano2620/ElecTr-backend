import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'elect-products',
    allowed_format: ['jpg', 'png', 'jpeg', 'webp'],
  } as any,
});

const upload = multer({ storage });

export default upload;