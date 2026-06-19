import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: {
      category: true 
    }
  });

  res.json(products);
}

export const getProductsById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true }
  });

  if(!product) {
    res.status(404).json({ message: 'Producto no encontrado' });
  } else {
    res.json(product)
  }
}

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, imageUrl, categoryId } = req.body;
  const product = await prisma.product.create({
    data: {
      name, 
      description,
      price,
      stock,
      imageUrl,
      categoryId
    }
  });

  res.status(201).json(product)

}

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await prisma.product.update({
    where: { id },
    data: req.body
  });

  res.json(product)
}

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await prisma.product.delete({
    where: { id }
  });

  res.json({ message: 'Producto eliminado' });
}

