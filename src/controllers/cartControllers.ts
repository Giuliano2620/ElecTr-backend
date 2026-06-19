import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getCart = async (req: Request, res: Response)=> {
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

  res.json(cart);
}

export const addCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  let cart = await prisma.cart.findUnique({
    where: { userId: req.userId }
  });

  if(!cart) {
    cart = await prisma.cart.create({
      data: { userId: req.userId! }
    });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId
    }
  });

  if(existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity }
    });
  }

  res.json({ message: 'Producto agregado al carrito' });
}