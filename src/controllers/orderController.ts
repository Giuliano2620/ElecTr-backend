import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createOrder = async (req: Request, res: Response) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: req.userId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if(!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'El carrito está vacío' });
  }

  const total = cart.items.reduce((acc, item ) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      userId: req.userId!,
      total,
      items: {
        create: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price
        }))
      }
    },
    include: {
      items: true
    }
  });

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id }
  }); 
  
  res.status(201).json(order);
}

export const getOrder = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  res.json(orders);
}