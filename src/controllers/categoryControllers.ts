import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
}

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const categories = await prisma.category.create({
    data: {
      name
    }
  });
  res.status(201).json(categories);
}